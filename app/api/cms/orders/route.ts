/**
 * GET /api/cms/orders  — list orders with optional filters
 *
 * Query params:
 *   status   — pending | paid | failed | refunded | canceled
 *   gateway  — stripe | flutterwave | opay | manual
 *   from     — ISO datetime (created_at >=)
 *   to       — ISO datetime (created_at <=)
 *   page     — default 1
 *   per_page — default 25, max 100
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { OrderListQuerySchema } from '@/lib/cms/schemas';
import { getShopDb } from '@/lib/shop/supabase';

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = OrderListQuerySchema.safeParse(params);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { page, per_page, status, gateway, from, to } = parsed.data;
  const rangeFrom = (page - 1) * per_page;
  const rangeTo   = rangeFrom + per_page - 1;

  const db = getShopDb();
  let query = db
    .from('orders')
    .select(
      'id, public_id, customer_email, customer_name, customer_country, currency, subtotal, total, gateway, status, paid_at, created_at, updated_at',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(rangeFrom, rangeTo);

  if (status)  query = query.eq('status', status);
  if (gateway) query = query.eq('gateway', gateway);
  if (from)    query = query.gte('created_at', from);
  if (to)      query = query.lte('created_at', to);

  const { data: orders, count, error } = await query;
  if (error) {
    console.error('[cms/orders GET]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok({
    orders: orders ?? [],
    pagination: {
      page,
      per_page,
      total:       count ?? 0,
      total_pages: Math.ceil((count ?? 0) / per_page),
    },
  });
}
