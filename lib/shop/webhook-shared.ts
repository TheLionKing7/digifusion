/**
 * Shared post-verification webhook handling. Each gateway route parses its
 * own signature, then hands a NormalizedPaymentEvent here.
 *
 * Idempotency: every event is keyed by (gateway, gateway_event_id) in the
 * webhook_events table. Re-deliveries become no-ops. The unique constraint
 * on (gateway, gateway_event_id) is the source of truth.
 */

import { getShopDb } from './supabase';
import { fulfillOrder } from './fulfillment';
import type { NormalizedPaymentEvent, Order, Subscription } from '@/types/shop';

export async function processNormalizedEvent(event: NormalizedPaymentEvent): Promise<{ ok: boolean; reason?: string }> {
  const db = getShopDb();

  // 1. Insert (gateway, event_id) row — duplicate → no-op
  const { error: insertErr, data: insertRow } = await db
    .from('webhook_events')
    .insert({
      gateway:           event.gateway,
      event_type:        event.event_type,
      gateway_event_id:  event.gateway_event_id,
      payload:           event.raw as object,
    })
    .select('id')
    .maybeSingle();

  if (insertErr) {
    // 23505 unique_violation → already processed
    const code = (insertErr as { code?: string }).code;
    if (code === '23505') return { ok: true, reason: 'duplicate' };
    return { ok: false, reason: `event insert: ${insertErr.message}` };
  }
  const eventRowId = insertRow?.id;

  try {
    if (event.event_type === 'payment.succeeded' && event.order_session_id) {
      const order = await findOrderBySession(event);
      if (!order) return mark(eventRowId, false, 'order not found');

      // Already paid? still fine — mark event processed.
      if (order.status !== 'paid') {
        await db.from('orders').update({
          status: 'paid',
          gateway_payment_id: event.gateway_event_id,
          paid_at: new Date().toISOString(),
        }).eq('id', order.id);
      }

      const fresh = { ...order, status: 'paid' as const, paid_at: new Date().toISOString() };
      const f = await fulfillOrder(fresh);
      return mark(eventRowId, f.ok, f.error);
    }

    if (event.event_type === 'payment.failed' && event.order_session_id) {
      const order = await findOrderBySession(event);
      if (order && order.status === 'pending') {
        await db.from('orders').update({ status: 'failed' }).eq('id', order.id);
      }
      return mark(eventRowId, true);
    }

    if (event.event_type === 'subscription.updated' || event.event_type === 'subscription.deleted') {
      if (event.subscription_id) {
        const raw = event.raw as { data?: { object?: { status?: string; current_period_end?: number; cancel_at_period_end?: boolean; customer?: string } } };
        const obj = raw?.data?.object;
        const status = (obj?.status || (event.event_type === 'subscription.deleted' ? 'canceled' : 'active')) as Subscription['status'];

        await db.from('subscriptions').upsert({
          gateway_subscription_id: event.subscription_id,
          status,
          current_period_end: obj?.current_period_end ? new Date(obj.current_period_end * 1000).toISOString() : null,
          cancel_at_period_end: !!obj?.cancel_at_period_end,
          // customer_email / product_id are populated on first create — leave alone here
        }, { onConflict: 'gateway_subscription_id' });
      }
      return mark(eventRowId, true);
    }

    return mark(eventRowId, true, 'unhandled event_type');
  } catch (err) {
    return mark(eventRowId, false, (err as Error).message);
  }
}

async function findOrderBySession(event: NormalizedPaymentEvent): Promise<Order | null> {
  const db = getShopDb();
  const { data } = await db
    .from('orders')
    .select('*')
    .eq('gateway', event.gateway)
    .eq('gateway_session_id', event.order_session_id!)
    .maybeSingle();
  return (data as Order) || null;
}

async function mark(eventRowId: string | undefined, ok: boolean, reason?: string) {
  if (!eventRowId) return { ok, reason };
  const db = getShopDb();
  await db.from('webhook_events').update({
    processed: ok,
    processed_at: new Date().toISOString(),
    error: ok ? null : (reason || 'unknown'),
  }).eq('id', eventRowId);
  return { ok, reason };
}
