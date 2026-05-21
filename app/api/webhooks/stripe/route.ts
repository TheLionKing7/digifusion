import { NextRequest, NextResponse } from 'next/server';
import * as stripe from '@/lib/shop/gateways/stripe';
import { processNormalizedEvent } from '@/lib/shop/webhook-shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // CRITICAL: Stripe needs the raw body for signature verification.
  // Don't await req.json() — use req.text() so the body bytes are unchanged.
  const raw = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.verifyAndParseWebhook(raw, sig);
  } catch (err) {
    console.warn('[webhooks/stripe] verify failed:', (err as Error).message);
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  if (!event) return NextResponse.json({ received: true, handled: false });

  const result = await processNormalizedEvent(event);
  return NextResponse.json({ received: true, handled: result.ok, reason: result.reason });
}
