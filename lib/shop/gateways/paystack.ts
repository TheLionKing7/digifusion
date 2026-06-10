/**
 * Paystack adapter — one-time payments via Initialize Transaction API.
 * https://paystack.com/docs/api/transaction/#initialize
 *
 * Amounts are in minor units (kobo/cents) — same convention as our orders table.
 * Webhook auth: HMAC SHA512 of raw body with PAYSTACK_SECRET_KEY.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Currency, Order, OrderItem, NormalizedPaymentEvent } from '@/types/shop';

const PAYSTACK_BASE = 'https://api.paystack.co';
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

function secret(): string {
  const k = process.env.PAYSTACK_SECRET_KEY;
  if (!k) throw new Error('[paystack] PAYSTACK_SECRET_KEY not set');
  return k;
}

export async function createCheckoutSession(args: {
  order: Order;
  items: OrderItem[];
}): Promise<{ url: string; session_id: string }> {
  const reference = `df_${args.order.public_id}_${Date.now()}`;

  const body = {
    email: args.order.customer_email,
    amount: args.order.total,
    currency: args.order.currency,
    reference,
    callback_url: `${SITE}/checkout/success?o=${args.order.public_id}`,
    metadata: {
      order_id: args.order.id,
      order_public_id: args.order.public_id,
      custom_fields: [
        {
          display_name: 'Customer',
          variable_name: 'customer_name',
          value: args.order.customer_name || args.order.customer_email,
        },
        {
          display_name: 'Items',
          variable_name: 'items',
          value: args.items.map((i) => i.snapshot.name).join(', ').slice(0, 100),
        },
      ],
    },
  };

  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json?.status || !json?.data?.authorization_url) {
    throw new Error(`[paystack] create failed: ${json?.message || res.statusText}`);
  }

  return { url: json.data.authorization_url as string, session_id: reference };
}

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  const hash = createHmac('sha512', secret()).update(rawBody).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}

/** Verify webhook signature and re-fetch transaction to confirm amount/currency. */
export async function verifyAndParseWebhook(
  rawBody: string,
  signatureHeader: string | null
): Promise<NormalizedPaymentEvent | null> {
  if (!verifySignature(rawBody, signatureHeader)) {
    throw new Error('[paystack] invalid x-paystack-signature');
  }

  let payload: {
    event?: string;
    data?: {
      id?: number;
      reference?: string;
      status?: string;
      amount?: number;
      currency?: string;
      customer?: { email?: string };
    };
  };
  try { payload = JSON.parse(rawBody); } catch { throw new Error('[paystack] invalid JSON body'); }

  if (payload.event !== 'charge.success') return null;
  const reference = payload.data?.reference;
  if (!reference) return null;

  const verifyRes = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret()}` },
  });
  const verify = await verifyRes.json().catch(() => ({}));

  const ok = verify?.status === true && verify?.data?.status === 'success';

  return {
    gateway: 'paystack',
    event_type: ok ? 'payment.succeeded' : 'payment.failed',
    gateway_event_id: String(verify?.data?.id || payload.data?.id || reference),
    order_session_id: reference,
    amount: verify?.data?.amount ?? payload.data?.amount,
    currency: (verify?.data?.currency || payload.data?.currency) as Currency | undefined,
    customer_email: verify?.data?.customer?.email || payload.data?.customer?.email,
    raw: payload,
  };
}
