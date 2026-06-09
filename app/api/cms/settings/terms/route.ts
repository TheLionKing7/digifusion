/**
 * PUT /api/cms/settings/terms
 *
 * Saves the Terms & Conditions content to the settings table.
 * The /terms page on the site reads this row to render the live copy.
 *
 * Body: { "content": "<markdown or HTML string>" }
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';

const TermsSchema = z.object({
  content: z.string().min(1, 'content must not be empty'),
});

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { data, error } = await getShopDb()
    .from('settings')
    .select('value')
    .eq('key', 'terms')
    .maybeSingle();

  if (error) {
    console.error('[cms/settings/terms GET]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  const content = (data?.value as { content?: string } | null)?.content || '';
  return ok({ content });
}

export async function PUT(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  let body: unknown;
  try { body = await req.json(); }
  catch { return fail('INVALID_JSON', 'Request body must be valid JSON.'); }

  const parsed = TermsSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { error } = await getShopDb()
    .from('settings')
    .update({ value: { content: parsed.data.content } })
    .eq('key', 'terms');

  if (error) {
    console.error('[cms/settings/terms PUT]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok({ key: 'terms', updated: true });
}
