/**
 * POST /api/cms/orders/[id]/refund
 *
 * Issues a refund via the original payment gateway and marks the order
 * as 'refunded' in the database.
 *
 * Gateway support:
 *   stripe      — full refund via Stripe Refunds API (uses gateway_payment_id)
 *   flutterwave — full refund via FLW /v3/transactions/:id/refund
 *   opay        — not supported programmatically in v1; returns 422 with instructions
 *   manual      — DB-only status update (no payment to reverse)
 *
 * Idempotent: refunding an already-refunded order returns 200 with a no-op notice.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';
import type { Order } from '@/types/shop';

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Ctx) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { id } = await params;
  const db = getShopDb();

  const { data: order, error: loadErr } = await db
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (loadErr) {
    console.error('[cms/orders/refund]', loadErr);
    return fail('DB_ERROR', loadErr.message, 500);
  }
  if (!order) return fail('NOT_FOUND', `No order with id "${id}".`, 404);

  const typedOrder = order as Order;

  // No-op if already refunded
  if (typedOrder.status === 'refunded') {
    return ok({ order_id: id, status: 'refunded', note: 'Order was already refunded — no action taken.' });
  }

  // Only paid orders can be refunded
  if (typedOrder.status !== 'paid') {
    return fail(
      'NOT_REFUNDABLE',
      `Order status is "${typedOrder.status}". Only paid orders can be refunded.`,
      422
    );
  }

  // ── Gateway refund ──────────────────────────────────────────────────────

  let gatewayRef: string | null = null;

  switch (typedOrder.gateway) {
    case 'stripe': {
      if (!typedOrder.gateway_payment_id) {
        return fail('MISSING_PAYMENT_ID', 'Order has no gateway_payment_id — cannot issue Stripe refund automatically. Refund manually in the Stripe dashboard.', 422);
      }

      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) return fail('GATEWAY_NOT_CONFIGURED', 'STRIPE_SECRET_KEY is not set.', 503);

      // Dynamically import Stripe to avoid bundling it when unused
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia', typescript: true });

      const refund = await stripe.refunds.create({
        payment_intent: typedOrder.gateway_payment_id,
      }).catch((e: Error) => { throw new Error(`[stripe] ${e.message}`); });

      gatewayRef = refund.id;
      break;
    }

    case 'flutterwave': {
      if (!typedOrder.gateway_payment_id) {
        return fail('MISSING_PAYMENT_ID', 'Order has no gateway_payment_id — cannot issue Flutterwave refund automatically.', 422);
      }

      const flwKey = process.env.FLW_SECRET_KEY;
      if (!flwKey) return fail('GATEWAY_NOT_CONFIGURED', 'FLW_SECRET_KEY is not set.', 503);

      const res = await fetch(
        `https://api.flutterwave.com/v3/transactions/${typedOrder.gateway_payment_id}/refund`,
        {
          method: 'POST',
          headers: {
            Authorization:  `Bearer ${flwKey}`,
            'Content-Type': 'application/json',
          },
          // amount omitted = full refund
          body: JSON.stringify({}),
        }
      );

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.status !== 'success') {
        return fail('GATEWAY_ERROR', `Flutterwave refund failed: ${json?.message || res.statusText}`, 502);
      }

      gatewayRef = String(json?.data?.id ?? '');
      break;
    }

    case 'opay': {
      // OPay does not have a stable programmatic refund endpoint in v1.
      // Return a 422 with instructions for the operator.
      return fail(
        'GATEWAY_NOT_SUPPORTED',
        'OPay refunds must be processed manually via the OPay merchant dashboard. Once complete, call this endpoint with gateway overridden to "manual" or update the order status directly.',
        422
      );
    }

    case 'manual': {
      // Manual orders have no gateway to reverse — DB update only.
      break;
    }

    default: {
      return fail('UNKNOWN_GATEWAY', `Unrecognised gateway "${typedOrder.gateway}".`, 422);
    }
  }

  // ── Mark refunded in DB ─────────────────────────────────────────────────

  const metadata = {
    ...(typedOrder.metadata ?? {}),
    refunded_at:   new Date().toISOString(),
    ...(gatewayRef ? { refund_gateway_ref: gatewayRef } : {}),
  };

  const { error: updateErr } = await db
    .from('orders')
    .update({ status: 'refunded', metadata })
    .eq('id', id);

  if (updateErr) {
    console.error('[cms/orders/refund] DB update failed after gateway refund', updateErr);
    // Gateway refund succeeded but DB failed — surface the gateway ref so it
    // can be reconciled manually.
    return fail(
      'DB_ERROR',
      `Gateway refund issued (ref: ${gatewayRef}) but DB update failed: ${updateErr.message}. Update the order status manually.`,
      500
    );
  }

  return ok({ order_id: id, status: 'refunded', gateway_ref: gatewayRef });
}
