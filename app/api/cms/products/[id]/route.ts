/**
 * PUT /api/cms/products/[id]  — partial update of an existing product
 *
 * Accepts any subset of the product fields. Only provided keys are updated —
 * omitted keys are left unchanged (true PATCH semantics despite using PUT
 * to keep the endpoint table simple).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { ProductPatchSchema } from '@/lib/cms/schemas';
import { getShopDb } from '@/lib/shop/supabase';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); }
  catch { return fail('INVALID_JSON', 'Request body must be valid JSON.'); }

  const parsed = ProductPatchSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  if (Object.keys(parsed.data).length === 0) {
    return fail('EMPTY_BODY', 'Provide at least one field to update.');
  }

  const db = getShopDb();

  const { data: product, error } = await db
    .from('products')
    .update(parsed.data)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) {
    if (error.code === '23505') {
      return fail('DUPLICATE_SLUG', 'That slug is already taken by another product.', 409);
    }
    console.error('[cms/products/[id] PUT]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  if (!product) return fail('NOT_FOUND', `No product with id "${id}".`, 404);

  return ok(product);
}
