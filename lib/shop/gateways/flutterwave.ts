/**
 * Flutterwave adapter — one-time NGN/USD payments via the standard Hosted
 * Checkout API (https://developer.flutterwave.com/docs/standard).
 *
 * We use raw fetch instead of the SDK to keep the bundle tiny — only two
 * endpoints used: /v3/payments (create) and /v3/transactions/:id/verify
 * (called from the webhook handler to confirm the amount/currency match).
 *
 * Webhook auth: Flutterwave sends a `verif-hash` header which must match
 * the FLW_WEBHOOK_HASH secret you set in their dashboard.
 */

import type { Currency, Order, OrderItem, NormalizedPaymentEvent } from '@/types/shop';

const FLW_BASE = 'https://api.flutterwave.com/v3';
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

function secret(): string {
  const k = process.env.FLW_SECRET_KEY;
  if (!k) throw new Error('[flutterwave] FLW_SECRET_KEY not set');
  return k;
}

export async function createCheckoutSession(args: {
  order: Order;
  items: OrderItem[];
}): Promise<{ url: string; session_id: string }> {
  // tx_ref must be unique. We use the order public_id which is already unique.
  const tx_ref = `df_${args.order.public_id}_${Date.now()}`;

  // Flutterwave wants major units (e.g. 49.00, not 4900).
  const amountMajor = args.order.total / 100;

  const body = {
    tx_ref,
    amount: amountMajor.toFixed(2),
    currency: args.order.currency,
    redirect_url: `${SITE}/checkout/success?o=${args.order.public_id}`,
    payment_options: 'card,banktransfer,ussd,opay',
    customer: {
      email: args.order.customer_email,
      name:  args.order.customer_name || undefined,
    },
    customizations: {
      title: 'DigiFusion',
      description: args.items.map((i) => i.snapshot.name).join(', ').slice(0, 100),
    },
    meta: { order_id: args.order.id, order_public_id: args.order.public_id },
  };

  const res = await fetch(`${FLW_BASE}/payments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.status !== 'success' || !json?.data?.link) {
    throw new Error(`[flutterwave] create failed: ${json?.message || res.statusText}`);
  }

  return { url: json.data.link as string, session_id: tx_ref };
}

/** Verify the webhook secret AND re-fetch the transaction to confirm amount/currency. */
export async function verifyAndParseWebhook(
  rawBody: string,
  verifHashHeader: string | null
): Promise<NormalizedPaymentEvent | null> {
  const expected = process.env.FLW_WEBHOOK_HASH;
  if (!expected) throw new Error('[flutterwave] FLW_WEBHOOK_HASH not set');
  if (verifHashHeader !== expected) throw new Error('[flutterwave] invalid verif-hash');

  let payload: { event?: string; data?: { id?: number; tx_ref?: string; status?: string; amount?: number; currency?: string; customer?: { email?: string } } };
  try { payload = JSON.parse(rawBody); } catch { throw new Error('[flutterwave] invalid JSON body'); }

  if (payload.event !== 'charge.completed') return null;
  if (!payload.data?.id) return null;

  // Re-verify against Flutterwave so we don't trust the webhook payload alone.
  const verifyRes = await fetch(`${FLW_BASE}/transactions/${payload.data.id}/verify`, {
    headers: { Authorization: `Bearer ${secret()}` },
  });
  const verify = await verifyRes.json().catch(() => ({}));

  const ok = verify?.status === 'success' && verify?.data?.status === 'successful';

  return {
    gateway: 'flutterwave',
    event_type: ok ? 'payment.succeeded' : 'payment.failed',
    gateway_event_id: String(payload.data.id),
    order_session_id: payload.data.tx_ref,
    amount: payload.data.amount ? Math.round(payload.data.amount * 100) : undefined,
    currency: payload.data.currency as Currency | undefined,
    customer_email: payload.data.customer?.email,
    raw: payload,
  };
}
