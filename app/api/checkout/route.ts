/**
 * POST /api/checkout
 *
 * Body: { gateway, currency, customer_email, customer_name?, items: [{product_id, qty}] }
 *
 * 1. Re-fetch products from DB (never trust client-side prices)
 * 2. Verify currency support per product and gateway
 * 3. Create order + order_items rows with status='pending'
 * 4. Call the gateway adapter to spawn a checkout session
 * 5. Return { redirect_url, public_id }
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getShopDb } from '@/lib/shop/supabase';
import { gatewaysForCurrency, priceIn } from '@/lib/utils/money';
import * as stripe from '@/lib/shop/gateways/stripe';
import * as flutterwave from '@/lib/shop/gateways/flutterwave';
import * as opay from '@/lib/shop/gateways/opay';
import * as paystack from '@/lib/shop/gateways/paystack';
import type { Currency, Order, OrderItem, Product } from '@/types/shop';

const BodySchema = z.object({
  gateway: z.enum(['stripe', 'flutterwave', 'opay', 'paystack']),
  currency: z.enum(['USD', 'NGN', 'GBP']),
  customer_email: z.string().email().max(200),
  customer_name: z.string().max(120).nullable().optional(),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    qty: z.number().int().min(1).max(20),
  })).min(1).max(20),
  return_path: z.string().max(200).optional(),
});

export async function POST(req: NextRequest) {
  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request', detail: (err as Error).message }, { status: 400 });
  }

  // Gateway must support the chosen currency
  if (!gatewaysForCurrency(body.currency).includes(body.gateway)) {
    return NextResponse.json(
      { error: `${body.gateway} does not support ${body.currency}` },
      { status: 400 }
    );
  }

  const db = getShopDb();

  // Fetch all products in one round trip
  const ids = body.items.map((i) => i.product_id);
  const { data: prodRows, error: prodErr } = await db
    .from('products')
    .select('*')
    .in('id', ids)
    .eq('active', true);

  if (prodErr) {
    console.error('[checkout] product fetch failed', prodErr);
    return NextResponse.json({ error: 'Could not load products' }, { status: 500 });
  }
  const products = (prodRows || []) as Product[];
  const byId = new Map(products.map((p) => [p.id, p]));

  // Validate every item exists and supports currency
  for (const item of body.items) {
    const p = byId.get(item.product_id);
    if (!p) return NextResponse.json({ error: `Product not found: ${item.product_id}` }, { status: 404 });
    if (priceIn(p.prices, body.currency) == null) {
      return NextResponse.json(
        { error: `${p.name} is not available in ${body.currency}` },
        { status: 400 }
      );
    }
  }

  // Subscriptions only via Stripe
  const hasSubscription = body.items.some((it) => byId.get(it.product_id)?.type === 'subscription');
  if (hasSubscription && body.gateway !== 'stripe') {
    return NextResponse.json(
      { error: 'Subscription products require paying with Stripe (card).' },
      { status: 400 }
    );
  }

  // Compute totals from server-side prices
  let subtotal = 0;
  const itemRows = body.items.map((it) => {
    const p = byId.get(it.product_id)!;
    const unit = priceIn(p.prices, body.currency)!;
    subtotal += unit * it.qty;
    return {
      product_id: p.id,
      qty:        it.qty,
      unit_price: unit,
      currency:   body.currency,
      snapshot: { slug: p.slug, name: p.name, type: p.type, recurring: p.recurring },
    };
  });

  // Insert order
  const { data: orderRow, error: orderErr } = await db
    .from('orders')
    .insert({
      customer_email:  body.customer_email,
      customer_name:   body.customer_name ?? null,
      customer_country: req.headers.get('x-vercel-ip-country') || null,
      currency:        body.currency,
      subtotal,
      total:           subtotal,
      gateway:         body.gateway,
      status:          'pending',
      metadata: {
        ua: req.headers.get('user-agent') || null,
        referer: req.headers.get('referer') || null,
        ...(body.return_path ? { return_path: body.return_path } : {}),
      },
    })
    .select('*')
    .single();

  if (orderErr || !orderRow) {
    console.error('[checkout] order insert failed', orderErr);
    return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
  }
  const order = orderRow as Order;

  // Insert order_items
  const { data: itemsData, error: itemsErr } = await db
    .from('order_items')
    .insert(itemRows.map((r) => ({ ...r, order_id: order.id })))
    .select('*');
  if (itemsErr) {
    console.error('[checkout] order_items insert failed', itemsErr);
    return NextResponse.json({ error: 'Could not create order items' }, { status: 500 });
  }
  const orderItems = (itemsData || []) as OrderItem[];

  // Hand off to gateway
  try {
    let session: { url: string; session_id: string };
    if (body.gateway === 'stripe') {
      session = await stripe.createCheckoutSession({ order, items: orderItems, products });
    } else if (body.gateway === 'flutterwave') {
      session = await flutterwave.createCheckoutSession({ order, items: orderItems });
    } else if (body.gateway === 'paystack') {
      session = await paystack.createCheckoutSession({ order, items: orderItems });
    } else {
      session = await opay.createCheckoutSession({ order, items: orderItems });
    }

    await db.from('orders')
      .update({ gateway_session_id: session.session_id })
      .eq('id', order.id);

    return NextResponse.json({ redirect_url: session.url, public_id: order.public_id });
  } catch (err) {
    console.error('[checkout] gateway dispatch failed', err);
    await db.from('orders').update({ status: 'failed' }).eq('id', order.id);
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

// Force this route to run on the Node runtime — Stripe SDK + node:crypto need it.
export const runtime = 'nodejs';
// Currency-aware payment flows shouldn't be cached.
export const dynamic = 'force-dynamic';
// Used as Currency type for downstream — silences "unused" linter check.
export type _CurrencyAlias = Currency;
