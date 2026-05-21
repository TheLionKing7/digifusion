import { NextRequest, NextResponse } from 'next/server';
import * as flutterwave from '@/lib/shop/gateways/flutterwave';
import { processNormalizedEvent } from '@/lib/shop/webhook-shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const hash = req.headers.get('verif-hash');

  let event;
  try {
    event = await flutterwave.verifyAndParseWebhook(raw, hash);
  } catch (err) {
    console.warn('[webhooks/flutterwave] verify failed:', (err as Error).message);
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  if (!event) return NextResponse.json({ received: true, handled: false });

  const result = await processNormalizedEvent(event);
  return NextResponse.json({ received: true, handled: result.ok, reason: result.reason });
}
