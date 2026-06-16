/**
 * Products (SaaS & tools) Paystack webhook hub.
 *
 * Vektor is the first live product; SabiWork, Receptra, and AdPilot can register
 * PAYSTACK_PRODUCT_WEBHOOK_* env URLs when billing goes live.
 *
 * Called internally from /api/webhooks/paystack for non-shop (non df_*) payments.
 * Can also be hit directly if you split Paystack routing later.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPaystackSignature,
  extractPaystackReference,
} from '@/lib/shop/gateways/paystack';
import {
  affiliateosWebhookUrl,
  resolvePaystackRoute,
  productWebhookUrl,
  type ProductSlug,
} from '@/lib/billing/paystack-router';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function forwardToUrl(
  url: string,
  raw: string,
  signature: string | null,
): Promise<{ ok: boolean; url: string }> {
  if (!url) {
    return { ok: false, url: '' };
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
    console.warn('[products/billing/webhook] forward failed:', res.status, text.slice(0, 200));
  }

  return { ok: res.ok, url };
}

async function forwardToProductBackend(
  product: ProductSlug,
  raw: string,
  signature: string | null
): Promise<{ ok: boolean; url: string }> {
  const url = productWebhookUrl(product);
  if (!url) {
    console.warn(`[products/billing/webhook] no webhook URL for ${product}`);
    return { ok: false, url: '' };
  }
  return forwardToUrl(url, raw, signature);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature');

  if (!verifyPaystackSignature(raw, signature)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  const route = resolvePaystackRoute(raw);
  const reference = extractPaystackReference(raw);

  if (route.destination === 'shop') {
    return NextResponse.json(
      { error: 'shop payments use /api/webhooks/paystack directly' },
      { status: 400 }
    );
  }

  if (route.destination === 'affiliateos') {
    const url = affiliateosWebhookUrl();
    const { ok } = await forwardToUrl(url, raw, signature);
    return NextResponse.json({
      received: true,
      routed: 'affiliateos',
      reference,
      forwarded: ok,
      backend: url ? new URL(url).host : null,
    });
  }

  if (route.destination === 'unknown') {
    return NextResponse.json({
      received: true,
      routed: 'unknown',
      reference,
      forwarded: false,
    });
  }

  const { ok, url } = await forwardToProductBackend(route.product, raw, signature);

  return NextResponse.json({
    received: true,
    routed: 'products',
    product: route.product,
    reference,
    forwarded: ok,
    backend: url ? new URL(url).host : null,
  });
}
