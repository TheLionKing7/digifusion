/**
 * OPay adapter — NGN one-time payments via the OPay Cashier API.
 *
 * OPay docs vary by region; this matches their International "Standard"
 * cashier flow. Auth is HMAC-SHA512(privateKey, JSON.stringify(body))
 * appended as `Authorization: Bearer …` and `MerchantId: …`.
 *
 * The cashier returns a hosted checkout URL we redirect the buyer to.
 * Webhooks come back to /api/webhooks/opay signed with the same HMAC.
 */

import { createHmac } from 'node:crypto';
import type { Order, OrderItem, NormalizedPaymentEvent } from '@/types/shop';

const OPAY_BASE = process.env.OPAY_BASE_URL || 'https://liveapi.opaycheckout.com';
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

function creds() {
  const merchantId = process.env.OPAY_MERCHANT_ID;
  const publicKey  = process.env.OPAY_PUBLIC_KEY;
  const privateKey = process.env.OPAY_PRIVATE_KEY;
  if (!merchantId || !publicKey || !privateKey) {
    throw new Error('[opay] OPAY_MERCHANT_ID, OPAY_PUBLIC_KEY, OPAY_PRIVATE_KEY required');
  }
  return { merchantId, publicKey, privateKey };
}

function sign(body: string, privateKey: string): string {
  return createHmac('sha512', privateKey).update(body).digest('hex');
}

export async function createCheckoutSession(args: {
  order: Order;
  items: OrderItem[];
}): Promise<{ url: string; session_id: string }> {
  if (args.order.currency !== 'NGN') {
    throw new Error('[opay] only NGN supported');
  }

  const { merchantId, publicKey, privateKey } = creds();
  const reference = `df_${args.order.public_id}_${Date.now()}`;

  const body = {
    country: 'NG',
    reference,
    amount: { total: args.order.total, currency: 'NGN' }, // OPay expects minor units (kobo)
    callbackUrl: `${SITE}/api/webhooks/opay`,
    returnUrl:   `${SITE}/checkout/success?o=${args.order.public_id}`,
    cancelUrl:   `${SITE}/orders/${args.order.public_id}`,
    expireAt: 30, // minutes
    productList: args.items.map((it) => ({
      productId: it.product_id,
      name: it.snapshot.name,
      description: it.snapshot.name,
      price: it.unit_price,
      quantity: it.qty,
    })),
    payMethod: 'BankCard',
    userInfo: {
      userEmail: args.order.customer_email,
      userName:  args.order.customer_name || 'Customer',
    },
  };

  const raw = JSON.stringify(body);
  const signature = sign(raw, privateKey);

  const res = await fetch(`${OPAY_BASE}/api/v1/international/cashier/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${signature}`,
      MerchantId: merchantId,
      'Content-Type': 'application/json',
    },
    body: raw,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.code !== '00000' || !json?.data?.cashierUrl) {
    throw new Error(`[opay] create failed: ${json?.message || res.statusText}`);
  }
  // Reference publicKey to keep linter happy when not used in headers
  void publicKey;

  return { url: json.data.cashierUrl as string, session_id: reference };
}

/** Verify HMAC + parse webhook. OPay sends sha512 hex in `Authorization` header. */
export function verifyAndParseWebhook(
  rawBody: string,
  authHeader: string | null
): NormalizedPaymentEvent | null {
  const { privateKey } = creds();
  const expected = sign(rawBody, privateKey);
  // Header arrives as "Bearer <hex>" or sometimes just <hex>
  const provided = (authHeader || '').replace(/^Bearer\s+/i, '').trim();
  if (provided !== expected) throw new Error('[opay] invalid signature');

  let payload: {
    payload?: {
      reference?: string;
      transactionId?: string;
      status?: 'SUCCESS' | 'FAIL' | 'CLOSE';
      amount?: { total: number; currency: string };
      country?: string;
    };
  };
  try { payload = JSON.parse(rawBody); } catch { throw new Error('[opay] invalid JSON body'); }

  const inner = payload?.payload;
  if (!inner?.reference || !inner?.transactionId) return null;

  const succeeded = inner.status === 'SUCCESS';
  return {
    gateway: 'opay',
    event_type: succeeded ? 'payment.succeeded' : 'payment.failed',
    gateway_event_id: inner.transactionId,
    order_session_id: inner.reference,
    amount: inner.amount?.total,
    currency: (inner.amount?.currency as 'NGN') || 'NGN',
    raw: payload,
  };
}
