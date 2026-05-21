import { NextRequest, NextResponse } from 'next/server';
import { getShopDb } from '@/lib/shop/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function requireAdmin(req: NextRequest): NextResponse | null {
  const expectedUser = process.env.ADMIN_USER || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) return NextResponse.json({ error: 'admin not configured' }, { status: 503 });
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return new NextResponse('auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="DigiFusion Admin"' } });
  try {
    const [u, p] = atob(auth.slice(6)).split(':');
    if (u !== expectedUser || p !== expectedPass) return new NextResponse('forbidden', { status: 401 });
  } catch { return new NextResponse('bad auth', { status: 400 }); }
  return null;
}

interface Props { params: Promise<{ id: string }>; }

export async function PATCH(req: NextRequest, { params }: Props) {
  const gate = requireAdmin(req); if (gate) return gate;
  const { id } = await params;
  const updates = await req.json().catch(() => null);
  if (!updates) return NextResponse.json({ error: 'invalid body' }, { status: 400 });

  const { error, data } = await getShopDb().from('products').update(updates).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const gate = requireAdmin(req); if (gate) return gate;
  const { id } = await params;
  // Soft-delete to preserve order_items.product_id integrity
  const { error } = await getShopDb().from('products').update({ active: false }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
