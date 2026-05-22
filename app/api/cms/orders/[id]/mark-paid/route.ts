/**
 * POST /api/cms/orders/[id]/mark-paid
 *
 * Manually marks an order as paid and runs fulfillment.
 * Idempotent: if the order is already paid, fulfillment re-runs safely
 * (fulfillOrder deduplicates downloads and bookings).
 *
 * Use case: manual bank transfers, OPay orders confirmed out-of-band,
 * or correcting a missed webhook.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';
import { fulfillOrder } from '@/lib/shop/fulfillment';
import type { Order } from '@/types/shop';

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Ctx) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { id } = await params;
  const db = getShopDb();

  // Load the order
  const { data: order, error: loadErr } = await db
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (loadErr) {
    console.error('[cms/orders/mark-paid]', loadErr);
    return fail('DB_ERROR', loadErr.message, 500);
  }
  if (!order) return fail('NOT_FOUND', `No order with id "${id}".`, 404);

  const typedOrder = order as Order;

  // If not yet paid, flip the status first
  if (typedOrder.status !== 'paid') {
    const { error: updateErr } = await db
      .from('orders')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', id);

    if (updateErr) {
      console.error('[cms/orders/mark-paid] status update failed', updateErr);
      return fail('DB_ERROR', updateErr.message, 500);
    }

    typedOrder.status  = 'paid';
    typedOrder.paid_at = new Date().toISOString();
  }

  // Run fulfillment (idempotent — safe to re-run on already-paid orders)
  const fulfillResult = await fulfillOrder(typedOrder);
  if (!fulfillResult.ok) {
    // Fulfillment failure is non-fatal for the endpoint: the order IS paid,
    // fulfillment can be retried. Log and surface the warning.
    console.warn('[cms/orders/mark-paid] fulfillment warning:', fulfillResult.error);
    return ok({
      order_id:   id,
      status:     'paid',
      fulfillment: 'partial',
      warning:    fulfillResult.error,
    });
  }

  return ok({ order_id: id, status: 'paid', fulfillment: 'ok' });
}
