/**
 * Fulfillment — the work that happens AFTER an order is marked paid.
 *
 *   1. Generate download tokens for every download-type line item
 *   2. Create service_bookings rows for service-type line items
 *   3. Email receipt + download links to the buyer
 *
 * All steps are idempotent: re-running fulfillment for the same order is
 * safe (existing downloads are reused, bookings deduped on order_item_id).
 *
 * Subscriptions are handled separately in the Stripe webhook because their
 * "fulfillment" is just the subscription staying active — there's no
 * one-shot side effect to fire.
 */

import { getShopDb } from './supabase';
import { sendOrderReceipt, sendBookingConfirmation } from './email';
import type { Order, OrderItem, Download, Product, DownloadFulfillment, ServiceFulfillment } from '@/types/shop';

const DOWNLOAD_TTL_HOURS = 72;
const DOWNLOAD_MAX_USES  = 5;

export async function fulfillOrder(order: Order): Promise<{ ok: boolean; error?: string }> {
  if (order.status !== 'paid') {
    return { ok: false, error: `order ${order.public_id} is ${order.status}, not paid` };
  }

  const db = getShopDb();

  const { data: items, error: itemsErr } = await db
    .from('order_items')
    .select('*')
    .eq('order_id', order.id);
  if (itemsErr || !items) return { ok: false, error: `items load: ${itemsErr?.message}` };

  const orderItemRows = (items || []) as OrderItem[];
  const productIds = [...new Set(orderItemRows.map((i: OrderItem) => i.product_id))];
  const { data: products } = await db.from('products').select('*').in('id', productIds);
  const productById = new Map<string, Product>(
    ((products || []) as Product[]).map((p: Product) => [p.id, p])
  );

  const newDownloads: Download[] = [];
  for (const it of orderItemRows) {
    const p = productById.get(it.product_id);
    if (!p || p.type !== 'download') continue;

    const { data: existing } = await db
      .from('downloads')
      .select('*')
      .eq('order_item_id', it.id)
      .maybeSingle();
    if (existing) { newDownloads.push(existing as Download); continue; }

    const ful = p.fulfillment as DownloadFulfillment;
    if (!ful?.r2_key || !ful?.filename) {
      console.warn(`[fulfillment] product ${p.slug} missing r2_key/filename — skipping`);
      continue;
    }

    const expires = new Date(Date.now() + DOWNLOAD_TTL_HOURS * 3600_000).toISOString();
    const { data: dl, error: dlErr } = await db
      .from('downloads')
      .insert({
        order_item_id: it.id,
        r2_key:        ful.r2_key,
        filename:      ful.filename,
        expires_at:    expires,
        max_uses:      DOWNLOAD_MAX_USES,
        used_count:    0,
      })
      .select('*')
      .single();
    if (dlErr || !dl) {
      console.error('[fulfillment] download insert failed', dlErr);
      continue;
    }
    newDownloads.push(dl as Download);
  }

  for (const it of orderItemRows) {
    const p = productById.get(it.product_id);
    if (!p || p.type !== 'service') continue;

    const { data: existing } = await db
      .from('service_bookings')
      .select('id')
      .eq('order_id', order.id)
      .eq('product_id', p.id)
      .maybeSingle();
    if (existing) continue;

    await db.from('service_bookings').insert({
      order_id:   order.id,
      product_id: p.id,
      status:     'awaiting_intake',
    });

    const intakeUrl = (p.fulfillment as ServiceFulfillment)?.intake_url
      || (p.fulfillment as ServiceFulfillment)?.calendar_url
      || undefined;
    await sendBookingConfirmation(order, p.name, intakeUrl).catch((e) =>
      console.warn('[fulfillment] booking email failed:', e?.message)
    );
  }

  await sendOrderReceipt(order, orderItemRows, newDownloads).catch((e) =>
    console.warn('[fulfillment] receipt email failed:', e?.message)
  );

  return { ok: true };
}
