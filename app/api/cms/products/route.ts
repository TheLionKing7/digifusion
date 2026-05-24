/**
 * GET   /api/cms/products  — list all products (including inactive)
 * POST  /api/cms/products  — create a new product
 *
 * PathGuru uses GET to populate the Shop tab and POST to push new products.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { ProductWriteSchema, ProductListQuerySchema } from '@/lib/cms/schemas';
import { getShopDb } from '@/lib/shop/supabase';

/* ── GET — list ─────────────────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = ProductListQuerySchema.safeParse(params);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { page, per_page, type, category, active } = parsed.data;
  const from = (page - 1) * per_page;
  const to   = from + per_page - 1;

  const db = getShopDb();
  let query = db
    .from('products')
    .select('id, slug, name, type, category, prices, recurring, featured, active, cover_image_url, description, created_at, updated_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (type)     query = query.eq('type', type);
  if (category) query = query.eq('category', category);
  if (active === 'true')  query = query.eq('active', true);
  if (active === 'false') query = query.eq('active', false);

  const { data: products, count, error } = await query;
  if (error) {
    console.error('[cms/products GET]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok({
    products: products ?? [],
    pagination: {
      page,
      per_page,
      total:       count ?? 0,
      total_pages: Math.ceil((count ?? 0) / per_page),
    },
  });
}

/* ── POST — create ──────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  let body: unknown;
  try { body = await req.json(); }
  catch { return fail('INVALID_JSON', 'Request body must be valid JSON.'); }

  const parsed = ProductWriteSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { data: product, error } = await getShopDb()
    .from('products')
    .insert(parsed.data)
    .select('*')
    .single();

  if (error) {
    // Duplicate slug
    if (error.code === '23505') {
      return fail('DUPLICATE_SLUG', `A product with slug "${parsed.data.slug}" already exists. Use PUT /api/cms/products/:id to update it.`, 409);
    }
    console.error('[cms/products POST]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok(product, { status: 201 });
}
