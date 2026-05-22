/**
 * GET /api/cms/analytics/pageviews?range=7d|30d|90d
 *
 * Returns aggregated site-traffic stats for PathGuru's analytics dashboard.
 * Requires bearer token auth (same PATHGURU_CMS_TOKEN used by all CMS routes).
 */
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/cms/auth';
import { respond } from '@/lib/cms/respond';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(request: Request) {
  if (!verifyToken(request)) {
    return respond({ error: 'Unauthorized' }, 401);
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '30d';
  const days  = range === '7d' ? 7 : range === '90d' ? 90 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  // ── Total views ────────────────────────────────────────────────
  const { count: totalViews } = await supabase
    .from('pageviews')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', since);

  // ── Unique sessions ────────────────────────────────────────────
  const { data: sessions } = await supabase
    .from('pageviews')
    .select('session_id')
    .gte('created_at', since)
    .not('session_id', 'is', null);

  const uniqueSessions = new Set((sessions || []).map((r) => r.session_id)).size;

  // ── Top pages ──────────────────────────────────────────────────
  const { data: pathRows } = await supabase
    .from('pageviews')
    .select('path')
    .gte('created_at', since);

  const pathCounts: Record<string, number> = {};
  (pathRows || []).forEach((r) => {
    pathCounts[r.path] = (pathCounts[r.path] || 0) + 1;
  });
  const topPages = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([path, views]) => ({ path, views }));

  // ── Top referrers ──────────────────────────────────────────────
  const { data: refRows } = await supabase
    .from('pageviews')
    .select('referrer')
    .gte('created_at', since)
    .not('referrer', 'is', null);

  const refCounts: Record<string, number> = {};
  (refRows || []).forEach((r) => {
    if (!r.referrer) return;
    try {
      const host = new URL(r.referrer).hostname.replace(/^www\./, '');
      refCounts[host] = (refCounts[host] || 0) + 1;
    } catch { /* invalid URL — skip */ }
  });
  const topReferrers = Object.entries(refCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([referrer, views]) => ({ referrer, views }));

  // ── Daily views ────────────────────────────────────────────────
  const { data: dailyRows } = await supabase
    .from('pageviews')
    .select('created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: true });

  const dailyCounts: Record<string, number> = {};
  (dailyRows || []).forEach((r) => {
    const day = (r.created_at as string).slice(0, 10);
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });
  const dailyViews = Object.entries(dailyCounts).map(([date, views]) => ({ date, views }));

  return respond({
    range,
    total_views:    totalViews    ?? 0,
    unique_sessions: uniqueSessions,
    top_pages:      topPages,
    top_referrers:  topReferrers,
    daily_views:    dailyViews,
  });
}
