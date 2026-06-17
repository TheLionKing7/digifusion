import { NextRequest, NextResponse } from 'next/server';
import { getShopDb } from '@/lib/shop/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cron/publish-scheduled-posts
 * Publishes draft posts whose scheduled_publish_at is due.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET || process.env.PATHGURU_CMS_TOKEN;
  const auth =
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    req.nextUrl.searchParams.get('secret') ||
    req.headers.get('x-cron-secret');
  if (!secret || auth !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const db = getShopDb();
  const now = new Date().toISOString();

  const { data: due, error } = await db
    .from('posts')
    .select('id, slug, title, tags, scheduled_publish_at')
    .eq('status', 'draft');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const nowMs = Date.now();
  const duePosts = (due || []).filter((post) => {
    if (post.scheduled_publish_at) {
      return new Date(post.scheduled_publish_at).getTime() <= nowMs;
    }
    const tag = (post.tags || []).find((t: string) => /^publish-at:/i.test(t));
    if (!tag) return false;
    const iso = tag.replace(/^publish-at:/i, '').trim();
    const ms = new Date(iso).getTime();
    return !Number.isNaN(ms) && ms <= nowMs;
  });

  const published: string[] = [];
  for (const post of duePosts) {
    const { error: updErr } = await db
      .from('posts')
      .update({
        status: 'published',
        published_at: now,
        scheduled_publish_at: null,
      })
      .eq('id', post.id);
    if (!updErr) published.push(post.slug);
  }

  return NextResponse.json({ ok: true, published, count: published.length });
}
