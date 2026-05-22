/**
 * GET /api/cms/subscriptions
 *
 * Returns active subscriptions with computed MRR and a simple churn indicator.
 *
 * MRR calculation:
 *   - For each active subscription, look up the product's price in USD.
 *   - monthly recurring → price as-is
 *   - yearly recurring  → price ÷ 12
 *   - Sum all → MRR in USD minor units (cents)
 *
 * Churn (last 30 days):
 *   count of subscriptions that moved to 'canceled' in the last 30 days.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';
import type { Subscription, Product } from '@/types/shop';

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const db = getShopDb();

  // Active subscriptions
  const { data: activeSubs, error: activeErr } = await db
    .from('subscriptions')
    .select('*')
    .in('status', ['active', 'trialing'])
    .order('created_at', { ascending: false });

  if (activeErr) {
    console.error('[cms/subscriptions GET] active subs', activeErr);
    return fail('DB_ERROR', activeErr.message, 500);
  }

  // Canceled in last 30 days (churn)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 3600_000).toISOString();
  const { count: churnCount, error: churnErr } = await db
    .from('subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'canceled')
    .gte('updated_at', thirtyDaysAgo);

  if (churnErr) {
    console.error('[cms/subscriptions GET] churn', churnErr);
    return fail('DB_ERROR', churnErr.message, 500);
  }

  // Hydrate products for MRR calc
  const typedSubs = (activeSubs ?? []) as Subscription[];
  const productIds = [...new Set(typedSubs.map(s => s.product_id))];
  let productById = new Map<string, Product>();

  if (productIds.length > 0) {
    const { data: products } = await db
      .from('products')
      .select('id, prices, recurring')
      .in('id', productIds);

    productById = new Map(((products ?? []) as Product[]).map(p => [p.id, p]));
  }

  // Compute MRR (USD cents)
  let mrrCents = 0;
  for (const sub of typedSubs) {
    const product = productById.get(sub.product_id);
    if (!product) continue;
    const usdPrice = product.prices?.USD ?? 0;
    mrrCents += product.recurring === 'yearly'
      ? Math.round(usdPrice / 12)
      : usdPrice;
  }

  return ok({
    subscriptions:    typedSubs,
    total_active:     typedSubs.length,
    mrr_usd_cents:    mrrCents,
    mrr_usd:          (mrrCents / 100).toFixed(2),
    churn_last_30d:   churnCount ?? 0,
  });
}
