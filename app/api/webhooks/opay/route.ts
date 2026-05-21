import { NextRequest, NextResponse } from 'next/server';
import * as opay from '@/lib/shop/gateways/opay';
import { processNormalizedEvent } from '@/lib/shop/webhook-shared';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const auth = req.headers.get('authorization');

  let event;
  try {
    event = opay.verifyAndParseWebhook(raw, auth);
  } catch (err) {
    console.warn('[webhooks/opay] verify failed:', (err as Error).message);
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  if (!event) return NextResponse.json({ received: true, handled: false });

  const result = await processNormalizedEvent(event);
  return NextResponse.json({ received: true, handled: result.ok, reason: result.reason });
}
