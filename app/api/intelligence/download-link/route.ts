import { NextRequest, NextResponse } from 'next/server';
import { verifyCaseStudyAccess } from '@/lib/intelligence/access';
import { getShopDb } from '@/lib/shop/supabase';
import { getProductBySlug } from '@/lib/shop/products';
import type { Order } from '@/types/shop';

export const dynamic = 'force-dynamic';

/**
 * GET /api/intelligence/download-link?order={public_id}&slug={product_slug}
 * Returns a token-gated PDF download URL when the buyer has paid.
 */
export async function GET(req: NextRequest) {
  const orderPublicId = req.nextUrl.searchParams.get('order');
  const slug = req.nextUrl.searchParams.get('slug');

  if (!orderPublicId || !slug) {
    return NextResponse.json({ error: 'order and slug required' }, { status: 400 });
  }

  const granted = await verifyCaseStudyAccess(orderPublicId, slug);
  if (!granted) {
    return NextResponse.json({ error: 'access denied' }, { status: 403 });
  }

  const product = await getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: 'product not found' }, { status: 404 });
  }

  const db = getShopDb();
  const { data: orderRow } = await db
    .from('orders')
    .select('id')
    .eq('public_id', orderPublicId)
    .maybeSingle();

  if (!orderRow) {
    return NextResponse.json({ error: 'order not found' }, { status: 404 });
  }

  const { data: items } = await db
    .from('order_items')
    .select('id')
    .eq('order_id', (orderRow as Order).id)
    .eq('product_id', product.id);

  const orderItemId = items?.[0]?.id;
  if (!orderItemId) {
    return NextResponse.json({ error: 'order item not found' }, { status: 404 });
  }

  const { data: download } = await db
    .from('downloads')
    .select('token, expires_at, used_count, max_uses')
    .eq('order_item_id', orderItemId)
    .maybeSingle();

  if (!download?.token) {
    return NextResponse.json({ error: 'download not ready yet' }, { status: 202 });
  }

  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitafusion.com').replace(/\/$/, '');
  return NextResponse.json({ url: `${base}/api/download/${download.token}` });
}
