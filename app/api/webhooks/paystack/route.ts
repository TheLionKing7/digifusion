import { NextRequest, NextResponse } from 'next/server';
import * as paystack from '@/lib/shop/gateways/paystack';
import { processNormalizedEvent } from '@/lib/shop/webhook-shared';
import {
  affiliateosWebhookUrl,
  resolvePaystackRoute,
  productWebhookUrl,
  type ProductSlug,
} from '@/lib/billing/paystack-router';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function forwardWebhook(
  url: string,
  raw: string,
  signature: string | null,
  label: string,
): Promise<boolean> {
  if (!url) {
    console.warn(`[webhooks/paystack] no forward URL for ${label}`);
    return false;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature ? { 'x-paystack-signature': signature } : {}),
    },
    body: raw,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.warn(
      `[webhooks/paystack] ${label} forward failed:`,
      res.status,
      text.slice(0, 200),
    );
  }

  return res.ok;
}

/** Forward SaaS product payments to the Products billing hub (per-product backends). */
async function forwardToProductsBilling(product: ProductSlug, raw: string, signature: string | null) {
  return forwardWebhook(productWebhookUrl(product), raw, signature, `products:${product}`);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature');

  if (!paystack.verifyPaystackSignature(raw, signature)) {
    console.warn('[webhooks/paystack] invalid x-paystack-signature');
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  const route = resolvePaystackRoute(raw);

  // Intelligence Store — df_* references
  if (route.destination === 'shop') {
    let event;
    try {
      event = await paystack.verifyAndParseWebhook(raw, signature);
    } catch (err) {
      console.warn('[webhooks/paystack] shop parse failed:', (err as Error).message);
      return NextResponse.json({ error: 'parse failed' }, { status: 400 });
    }

    if (!event) return NextResponse.json({ received: true, routed: 'shop', handled: false });

    const result = await processNormalizedEvent(event);
    return NextResponse.json({ received: true, routed: 'shop', handled: result.ok, reason: result.reason });
  }

  // AffiliateOS marketplace — affos_* references (WorkSpace/AffiliateOS workers)
  if (route.destination === 'affiliateos') {
    const forwarded = await forwardWebhook(
      affiliateosWebhookUrl(),
      raw,
      signature,
      'affiliateos',
    );
    return NextResponse.json({
      received: true,
      routed: 'affiliateos',
      forwarded,
      backend: new URL(affiliateosWebhookUrl()).host,
    });
  }

  // SaaS products — Vektor, SabiWork, Receptra, AdPilot
  if (route.destination === 'products') {
    const forwarded = await forwardToProductsBilling(route.product, raw, signature);
    return NextResponse.json({
      received: true,
      routed: 'products',
      product: route.product,
      forwarded,
    });
  }

  console.warn(
    '[webhooks/paystack] unrouteable reference — not forwarding:',
    route.reference ?? '(missing)',
  );
  return NextResponse.json({
    received: true,
    routed: 'unknown',
    reference: route.reference ?? null,
    handled: false,
  });
}
