import { NextRequest, NextResponse } from 'next/server';
import { verifyCaseStudyAccess } from '@/lib/intelligence/access';

export const dynamic = 'force-dynamic';

/**
 * GET /api/intelligence/access?order={public_id}&slug={product_slug}
 * Returns { granted: boolean } when buyer has paid for the case study.
 */
export async function GET(req: NextRequest) {
  const order = req.nextUrl.searchParams.get('order');
  const slug = req.nextUrl.searchParams.get('slug');

  if (!order || !slug) {
    return NextResponse.json({ error: 'order and slug required' }, { status: 400 });
  }

  const granted = await verifyCaseStudyAccess(order, slug);
  return NextResponse.json({ granted });
}
