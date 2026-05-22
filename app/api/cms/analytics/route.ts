/**
 * GET /api/cms/analytics?range=30d
 *
 * Returns a revenue/orders summary for the given time window.
 *
 * Metrics returned:
 *   revenue_cents      — sum of total (minor units) for paid orders in range
 *   revenue_usd        — same, formatted as decimal string
 *   orders_paid        — count of paid orders in range
 *   aov_cents          — average order value (revenue / orders), 0 if no orders
 *   aov_usd            — formatted
 *   new_subs           — subscriptions created in range
 *   range_days         — echoed back for convenience
 *   from               — range start ISO
 *   to                 — range end ISO (now)
 *
 * Currency note: revenue is summed raw across all currencies (USD, NGN, GBP
 * all in minor units). This gives a mixed-currency total which is only useful
 * if you're primarily single-currency. A per-currency breakdown is included
 * for reference.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { AnalyticsQuerySchema } from '@/lib/cms/schemas';
import { getShopDb } from '@/lib/shop/supabase';

const RANGE_DAYS: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = AnalyticsQuerySchema.safeParse(params);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { range } = parsed.data;
  const days = RANGE_DAYS[range];
  const to   = new Date();
  const from = new Date(to.getTime() - days * 24 * 3600_000);

  const db = getShopDb();

  // Paid orders in range
  const { data: orders, error: ordersErr } = await db
    .from('orders')
    .select('id, total, currency')
    .eq('status', 'paid')
    .gte('paid_at', from.toISOString())
    .lte('paid_at', to.toISOString());

  if (ordersErr) {
    console.error('[cms/analytics GET] orders', ordersErr);
    return fail('DB_ERROR', ordersErr.message, 500);
  }

  // New subscriptions in range
  const { count: newSubs, error: subsErr } = await db
    .from('subscriptions')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', from.toISOString())
    .lte('created_at', to.toISOString());

  if (subsErr) {
    console.error('[cms/analytics GET] subs', subsErr);
    return fail('DB_ERROR', subsErr.message, 500);
  }

  const typedOrders = (orders ?? []) as { id: string; total: number; currency: string }[];

  // Revenue breakdown per currency
  const byCurrency: Record<string, number> = {};
  let totalRevenueCents = 0;
  for (const o of typedOrders) {
    byCurrency[o.currency] = (byCurrency[o.currency] ?? 0) + o.total;
    totalRevenueCents += o.total;
  }

  const orderCount = typedOrders.length;
  const aovCents   = orderCount > 0 ? Math.round(totalRevenueCents / orderCount) : 0;

  return ok({
    range,
    range_days:    days,
    from:          from.toISOString(),
    to:            to.toISOString(),
    orders_paid:   orderCount,
    revenue_cents: totalRevenueCents,
    revenue_usd:   (totalRevenueCents / 100).toFixed(2),
    aov_cents:     aovCents,
    aov_usd:       (aovCents / 100).toFixed(2),
    new_subs:      newSubs ?? 0,
    revenue_by_currency: byCurrency,
  });
}
