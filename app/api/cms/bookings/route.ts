/**
 * GET /api/cms/bookings
 *
 * Lists service bookings joined with order and product info.
 *
 * Query params:
 *   status   — awaiting_intake | scheduled | in_progress | completed | canceled
 *   page     — default 1
 *   per_page — default 25
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';

const QuerySchema = z.object({
  status:   z.enum(['awaiting_intake', 'scheduled', 'in_progress', 'completed', 'canceled']).optional(),
  page:     z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(100).default(25),
});

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = QuerySchema.safeParse(params);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { page, per_page, status } = parsed.data;
  const from = (page - 1) * per_page;
  const to   = from + per_page - 1;

  const db = getShopDb();

  // Join bookings with orders (for customer info) and products (for name)
  let query = db
    .from('service_bookings')
    .select(
      `id, status, intake, scheduled_at, notes, created_at, updated_at,
       order:orders!service_bookings_order_id_fkey(
         id, public_id, customer_email, customer_name, currency, total
       ),
       product:products!service_bookings_product_id_fkey(
         id, slug, name
       )`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  if (status) query = query.eq('status', status);

  const { data: bookings, count, error } = await query;
  if (error) {
    console.error('[cms/bookings GET]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok({
    bookings: bookings ?? [],
    pagination: {
      page,
      per_page,
      total:       count ?? 0,
      total_pages: Math.ceil((count ?? 0) / per_page),
    },
  });
}
