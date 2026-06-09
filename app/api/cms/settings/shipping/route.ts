/**
 * PUT /api/cms/settings/shipping
 *
 * Saves shipping rules to the settings table.
 *
 * Body:
 * {
 *   "rules": [
 *     { "region": "Nigeria", "method": "Standard", "price_ngn": 150000, "eta": "3–5 days" },
 *     { "region": "International", "method": "DHL Express", "price_usd": 2500, "eta": "5–7 days" }
 *   ],
 *   "free_threshold_usd": 5000,   // order total above which shipping is free (cents)
 *   "notes": "Physical products only. Digital products ship instantly."
 * }
 *
 * The checkout flow reads this key to determine available shipping options.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';

const ShippingRuleSchema = z.object({
  region:     z.string().min(1),
  method:     z.string().min(1),
  price_ngn:  z.number().int().min(0).optional(),
  price_usd:  z.number().int().min(0).optional(),
  price_gbp:  z.number().int().min(0).optional(),
  eta:        z.string().optional(),
});

const ShippingSchema = z.object({
  rules:                z.array(ShippingRuleSchema).default([]),
  free_threshold_usd:   z.number().int().min(0).default(0),
  notes:                z.string().default(''),
});

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { data, error } = await getShopDb()
    .from('settings')
    .select('value')
    .eq('key', 'shipping')
    .maybeSingle();

  if (error) {
    console.error('[cms/settings/shipping GET]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  const value = (data?.value as Record<string, unknown> | null) || {
    rules: [],
    free_threshold_usd: 0,
    notes: '',
  };
  return ok(value);
}

export async function PUT(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  let body: unknown;
  try { body = await req.json(); }
  catch { return fail('INVALID_JSON', 'Request body must be valid JSON.'); }

  const parsed = ShippingSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { error } = await getShopDb()
    .from('settings')
    .update({ value: parsed.data })
    .eq('key', 'shipping');

  if (error) {
    console.error('[cms/settings/shipping PUT]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok({ key: 'shipping', updated: true, rules_count: parsed.data.rules.length });
}
