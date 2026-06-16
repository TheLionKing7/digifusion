/**
 * Paystack event routing — one Live Webhook URL on Paystack, multiple destinations.
 *
 *   df_*         → DigiFusion Intelligence Store / shop
 *   affos_*      → AffiliateOS edge worker (ledger split) — api.affos.link
 *   vek_ / vk_*  → Vektor SaaS billing
 *   sw_ / rec_ / ap_* → future product backends
 *   (unknown)    → logged, not silently routed to Vektor
 */

import {
  extractPaystackReference,
  isAffiliateOSPaystackReference,
  isShopPaystackReference,
} from '@/lib/shop/gateways/paystack';

export type ProductSlug = 'vektor' | 'sabiwork' | 'receptra' | 'adpilot';

export type PaystackRoute =
  | { destination: 'shop' }
  | { destination: 'affiliateos' }
  | { destination: 'products'; product: ProductSlug }
  | { destination: 'unknown'; reference?: string | null };

const PRODUCT_REF_PREFIXES: Record<string, ProductSlug> = {
  vek_: 'vektor',
  vk_:  'vektor',
  sw_:  'sabiwork',
  rec_: 'receptra',
  ap_:  'adpilot',
};

const DEFAULT_PRODUCT_WEBHOOKS: Record<ProductSlug, string> = {
  vektor:    process.env.PAYSTACK_PRODUCT_WEBHOOK_VEKTOR?.trim()
    || process.env.VEKTOR_PAYSTACK_WEBHOOK_URL?.trim()
    || 'https://vektor-xr-1.onrender.com/billing/webhook',
  sabiwork:  process.env.PAYSTACK_PRODUCT_WEBHOOK_SABIWORK?.trim() || '',
  receptra:  process.env.PAYSTACK_PRODUCT_WEBHOOK_RECEPTRA?.trim() || '',
  adpilot:   process.env.PAYSTACK_PRODUCT_WEBHOOK_ADPILOT?.trim() || '',
};

const PRODUCTS_DEFAULT_WEBHOOK =
  process.env.PRODUCTS_PAYSTACK_WEBHOOK_URL?.trim()
  || DEFAULT_PRODUCT_WEBHOOKS.vektor;

/** AffiliateOS worker payment webhook (repo: WorkSpace/AffiliateOS). */
export function affiliateosWebhookUrl(): string {
  return (
    process.env.PAYSTACK_AFFILIATEOS_WEBHOOK_URL?.trim()
    || process.env.AFFILIATEOS_PAYSTACK_WEBHOOK_URL?.trim()
    || 'https://api.affos.link/webhook/payment'
  );
}

function readMetadata(rawBody: string): Record<string, unknown> {
  try {
    const payload = JSON.parse(rawBody) as { data?: { metadata?: Record<string, unknown> } };
    return payload?.data?.metadata ?? {};
  } catch {
    return {};
  }
}

function productFromMetadata(meta: Record<string, unknown>): ProductSlug | null {
  const slug = String(meta.product_slug || meta.product || meta.app || '').toLowerCase();
  if (slug === 'vektor' || slug === 'sabiwork' || slug === 'receptra' || slug === 'adpilot') {
    return slug as ProductSlug;
  }
  return null;
}

function productFromReference(reference: string | null): ProductSlug | null {
  if (!reference) return null;
  const lower = reference.toLowerCase();
  for (const [prefix, product] of Object.entries(PRODUCT_REF_PREFIXES)) {
    if (lower.startsWith(prefix)) return product;
  }
  return null;
}

/** Decide which backend should handle a verified Paystack webhook payload. */
export function resolvePaystackRoute(rawBody: string): PaystackRoute {
  const reference = extractPaystackReference(rawBody);

  if (isShopPaystackReference(reference)) {
    return { destination: 'shop' };
  }

  if (isAffiliateOSPaystackReference(reference)) {
    return { destination: 'affiliateos' };
  }

  const meta = readMetadata(rawBody);
  const fromMeta = productFromMetadata(meta);
  if (fromMeta) {
    return { destination: 'products', product: fromMeta };
  }

  const fromRef = productFromReference(reference);
  if (fromRef) {
    return { destination: 'products', product: fromRef };
  }

  return { destination: 'unknown', reference };
}

/** Webhook URL for a SaaS product; falls back to shared products default. */
export function productWebhookUrl(product: ProductSlug): string {
  return DEFAULT_PRODUCT_WEBHOOKS[product] || PRODUCTS_DEFAULT_WEBHOOK;
}
