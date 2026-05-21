/**
 * Admin product CRUD. The middleware already gates /admin pages but not
 * /api/admin/* — re-check Basic Auth here so curl-style attacks fail too.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getShopDb } from '@/lib/shop/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function requireAdmin(req: NextRequest): NextResponse | null {
  const expectedUser = process.env.ADMIN_USER || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) return NextResponse.json({ error: 'admin not configured' }, { status: 503 });

  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) {
    return new NextResponse('auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="DigiFusion Admin"' },
    });
  }
  try {
    const [u, p] = atob(auth.slice(6)).split(':');
    if (u !== expectedUser || p !== expectedPass) {
      return new NextResponse('forbidden', { status: 401 });
    }
  } catch {
    return new NextResponse('bad auth', { status: 400 });
  }
  return null;
}

const ProductSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(200),
  description: z.string().max(8000).optional().default(''),
  type: z.enum(['download', 'subscription', 'service']),
  recurring: z.enum(['monthly', 'yearly']).nullable().optional(),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  cover_image_url: z.string().url().nullable().optional(),
  prices: z.record(z.string(), z.number().int().min(0)).default({}),
  fulfillment: z.record(z.string(), z.unknown()).default({}),
});

export async function POST(req: NextRequest) {
  const gate = requireAdmin(req); if (gate) return gate;

  let body;
  try { body = ProductSchema.parse(await req.json()); }
  catch (err) { return NextResponse.json({ error: 'invalid', detail: (err as Error).message }, { status: 400 }); }

  const { error, data } = await getShopDb().from('products').insert(body).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
