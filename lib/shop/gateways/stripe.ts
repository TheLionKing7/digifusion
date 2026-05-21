/**
 * Stripe adapter — handles USD/GBP one-time payments and subscriptions.
 *
 * One-time: creates a Stripe Checkout Session with `mode: 'payment'`.
 * Subscription: uses `mode: 'subscription'` with the product's stripe_price_id.
 *
 * Webhook signature verification uses Stripe.webhooks.constructEvent — we
 * MUST receive the raw request body, not JSON-parsed. The webhook route
 * passes Buffer/text in unchanged.
 */

import Stripe from 'stripe';
import type { Currency, Order, OrderItem, Product, NormalizedPaymentEvent } from '@/types/shop';

let cached: Stripe | null = null;
function client(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('[stripe] STRIPE_SECRET_KEY not set');
  cached = new Stripe(key, { apiVersion: '2025-09-30.clover', typescript: true });
  return cached;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export async function createCheckoutSession(args: {
  order: Order;
  items: OrderItem[];
  products: Product[]; // hydrated for line item metadata + subscription detection
}): Promise<{ url: string; session_id: string }> {
  const stripe = client();
  const productById = new Map(args.products.map((p) => [p.id, p]));
  const hasSub = args.items.some((it) => productById.get(it.product_id)?.type === 'subscription');

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = args.items.map((it) => {
    const p = productById.get(it.product_id);
    if (hasSub && p?.type === 'subscription') {
      const priceId = (p.fulfillment as { stripe_price_id?: string })?.stripe_price_id;
      if (!priceId) throw new Error(`[stripe] product ${p.slug} missing fulfillment.stripe_price_id`);
      return { price: priceId, quantity: it.qty };
    }
    return {
      price_data: {
        currency: it.currency.toLowerCase(),
        product_data: { name: it.snapshot.name, metadata: { slug: it.snapshot.slug, product_id: it.product_id } },
        unit_amount: it.unit_price,
      },
      quantity: it.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: hasSub ? 'subscription' : 'payment',
    customer_email: args.order.customer_email,
    line_items: lineItems,
    success_url: `${SITE}/checkout/success?o=${args.order.public_id}`,
    cancel_url:  `${SITE}/orders/${args.order.public_id}`,
    metadata:    { order_id: args.order.id, order_public_id: args.order.public_id },
    payment_intent_data: hasSub ? undefined : {
      metadata: { order_id: args.order.id, order_public_id: args.order.public_id },
    },
  });

  if (!session.url) throw new Error('[stripe] no checkout url returned');
  return { url: session.url, session_id: session.id };
}

/** Verify + parse a webhook payload. Returns null for events we don't care about. */
export function verifyAndParseWebhook(rawBody: string | Buffer, signatureHeader: string | null): NormalizedPaymentEvent | null {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('[stripe] STRIPE_WEBHOOK_SECRET not set');
  if (!signatureHeader) throw new Error('[stripe] missing Stripe-Signature header');

  const stripe = client();
  const event = stripe.webhooks.constructEvent(rawBody, signatureHeader, secret);

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object as Stripe.Checkout.Session;
      return {
        gateway: 'stripe',
        event_type: 'payment.succeeded',
        gateway_event_id: event.id,
        order_session_id: s.id,
        amount: s.amount_total ?? undefined,
        currency: (s.currency?.toUpperCase() as Currency) ?? undefined,
        customer_email: s.customer_email || s.customer_details?.email || undefined,
        raw: event,
      };
    }
    case 'checkout.session.async_payment_failed': {
      const s = event.data.object as Stripe.Checkout.Session;
      return {
        gateway: 'stripe',
        event_type: 'payment.failed',
        gateway_event_id: event.id,
        order_session_id: s.id,
        raw: event,
      };
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      return {
        gateway: 'stripe',
        event_type: event.type === 'customer.subscription.deleted' ? 'subscription.deleted' : 'subscription.updated',
        gateway_event_id: event.id,
        subscription_id: sub.id,
        raw: event,
      };
    }
    default:
      return null;
  }
}
