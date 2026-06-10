import { NextRequest, NextResponse } from 'next/server';
import * as paystack from '@/lib/shop/gateways/paystack';
import { processNormalizedEvent } from '@/lib/shop/webhook-shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature');

  let event;
  try {
    event = await paystack.verifyAndParseWebhook(raw, signature);
  } catch (err) {
    console.warn('[webhooks/paystack] verify failed:', (err as Error).message);
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  if (!event) return NextResponse.json({ received: true, handled: false });

  const result = await processNormalizedEvent(event);
  return NextResponse.json({ received: true, handled: result.ok, reason: result.reason });
}
