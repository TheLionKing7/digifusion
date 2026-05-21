/**
 * Manual mark-paid — for off-platform payments (bank transfer, etc.). Sets
 * order.status to 'paid' if currently pending, then runs the same
 * fulfillment pipeline a webhook would.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getShopDb } from '@/lib/shop/supabase';
import { fulfillOrder } from '@/lib/shop/fulfillment';
import type { Order } from '@/types/shop';

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

export async function POST(req: NextRequest, { params }: Props) {
  const gate = requireAdmin(req); if (gate) return gate;
  const { id } = await params;

  const db = getShopDb();
  const { data: row, error } = await db.from('orders').select('*').eq('id', id).maybeSingle();
  if (error || !row) return NextResponse.json({ error: 'order not found' }, { status: 404 });
  const order = row as Order;

  if (order.status === 'paid') {
    // Idempotent — still re-run fulfillment in case downloads expired
    const r = await fulfillOrder(order);
    return NextResponse.json({ ok: r.ok, alreadyPaid: true, reason: r.error });
  }

  await db.from('orders').update({
    status: 'paid',
    paid_at: new Date().toISOString(),
  }).eq('id', id);

  const fresh = { ...order, status: 'paid' as const, paid_at: new Date().toISOString() };
  const r = await fulfillOrder(fresh);
  return NextResponse.json({ ok: r.ok, reason: r.error });
}
