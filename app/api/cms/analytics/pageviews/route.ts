/**
 * GET /api/cms/analytics/pageviews?range=7d|30d|90d
 *
 * Returns enriched site-traffic analytics for PathGuru's analytics dashboard.
 * Requires bearer token auth (same PATHGURU_CMS_TOKEN used by all CMS routes).
 *
 * Response shape:
 *   range, range_days, from, to
 *   total_views        — all pageview events in range
 *   unique_sessions    — distinct session_ids
 *   avg_scroll_depth   — mean scroll depth % across all sessions
 *   avg_time_on_page   — mean seconds on page
 *   bounce_rate        — % sessions with only 1 pageview
 *   top_pages          — top 15 by view count (with avg_scroll, avg_time)
 *   top_referrers      — top 10 referrer hosts
 *   top_countries      — top 10 countries
 *   device_breakdown   — { desktop, mobile, tablet } counts
 *   daily_views        — { date, views, unique_sessions }[]
 *   top_clicks         — top 10 clicked elements
 *   utm_breakdown      — { source, medium, campaign } top 10 each
 *   events_breakdown   — count by event type
 */
import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const RANGE_DAYS: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };

function topN<T>(map: Record<string, T>, n: number, keyName: string, valName: string) {
  return Object.entries(map)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, n)
    .map(([k, v]) => ({ [keyName]: k, [valName]: v }));
}

export async function GET(request: NextRequest) {
  const authError = requireCmsToken(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const range = (searchParams.get('range') || '30d') as string;
  const days  = RANGE_DAYS[range] ?? 30;
  const to    = new Date();
  const from  = new Date(to.getTime() - days * 24 * 3600_000);
  const since = from.toISOString();

  // ── Fetch all rows in range (max 50k — sufficient for most sites) ──────────
  const { data: rows, error } = await supabase
    .from('pageviews')
    .select(
      'path,event,session_id,scroll_depth,time_on_page,click_target,' +
      'device_type,country,referrer,utm_source,utm_medium,utm_campaign,created_at'
    )
    .gte('created_at', since)
    .order('created_at', { ascending: true })
    .limit(50000);

  if (error) {
    console.error('[cms/analytics/pageviews GET]', error);
    return fail('DB_ERROR', error.message, 500);
  }

  type Row = {
    path: string;
    event: string | null;
    session_id: string | null;
    scroll_depth: number | null;
    time_on_page: number | null;
    click_target: string | null;
    device_type: string | null;
    country: string | null;
    referrer: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    created_at: string;
  };

  const all = (rows ?? []) as unknown as Row[];

  // ── Pageview-only rows ─────────────────────────────────────────────────────
  const pvRows = all.filter((r) => !r.event || r.event === 'pageview');

  // ── Aggregations ───────────────────────────────────────────────────────────
  const totalViews    = pvRows.length;
  const sessionSet    = new Set(all.filter((r) => r.session_id).map((r) => r.session_id!));
  const uniqueSessions = sessionSet.size;

  // Avg scroll depth & time on page (from exit / focus_time events)
  const scrollRows = all.filter((r) => r.scroll_depth !== null && r.scroll_depth !== undefined);
  const timeRows   = all.filter((r) => r.time_on_page !== null && r.time_on_page !== undefined);
  const avgScrollDepth = scrollRows.length
    ? Math.round(scrollRows.reduce((s, r) => s + (r.scroll_depth ?? 0), 0) / scrollRows.length)
    : null;
  const avgTimeOnPage = timeRows.length
    ? Math.round(timeRows.reduce((s, r) => s + (r.time_on_page ?? 0), 0) / timeRows.length)
    : null;

  // Bounce rate — sessions with only 1 pageview
  const sessionPageviews: Record<string, number> = {};
  pvRows.forEach((r) => {
    if (r.session_id) sessionPageviews[r.session_id] = (sessionPageviews[r.session_id] ?? 0) + 1;
  });
  const bouncedSessions = Object.values(sessionPageviews).filter((v) => v === 1).length;
  const bounceRate = uniqueSessions > 0 ? Math.round((bouncedSessions / uniqueSessions) * 100) : null;

  // Top pages with per-page stats
  const pageData: Record<string, { views: number; scrollSum: number; scrollCount: number; timeSum: number; timeCount: number }> = {};
  pvRows.forEach((r) => {
    if (!pageData[r.path]) pageData[r.path] = { views: 0, scrollSum: 0, scrollCount: 0, timeSum: 0, timeCount: 0 };
    pageData[r.path].views++;
  });
  all.filter((r) => r.scroll_depth !== null).forEach((r) => {
    if (pageData[r.path]) {
      pageData[r.path].scrollSum  += r.scroll_depth ?? 0;
      pageData[r.path].scrollCount++;
    }
  });
  all.filter((r) => r.time_on_page !== null).forEach((r) => {
    if (pageData[r.path]) {
      pageData[r.path].timeSum  += r.time_on_page ?? 0;
      pageData[r.path].timeCount++;
    }
  });
  const topPages = Object.entries(pageData)
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 15)
    .map(([path, d]) => ({
      path,
      views:           d.views,
      avg_scroll_depth: d.scrollCount > 0 ? Math.round(d.scrollSum / d.scrollCount) : null,
      avg_time_on_page: d.timeCount   > 0 ? Math.round(d.timeSum  / d.timeCount)   : null,
    }));

  // Top referrers
  const refCounts: Record<string, number> = {};
  pvRows.filter((r) => r.referrer).forEach((r) => {
    try {
      const host = new URL(r.referrer!).hostname.replace(/^www\./, '');
      refCounts[host] = (refCounts[host] ?? 0) + 1;
    } catch { /* skip invalid */ }
  });
  const topReferrers = topN(refCounts, 10, 'referrer', 'views');

  // Top countries
  const countryCounts: Record<string, number> = {};
  pvRows.filter((r) => r.country).forEach((r) => {
    countryCounts[r.country!] = (countryCounts[r.country!] ?? 0) + 1;
  });
  const topCountries = topN(countryCounts, 10, 'country', 'views');

  // Device breakdown
  const deviceCounts: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
  pvRows.forEach((r) => {
    const d = r.device_type ?? 'desktop';
    deviceCounts[d] = (deviceCounts[d] ?? 0) + 1;
  });

  // Daily views
  const dailyMap: Record<string, { views: number; sessions: Set<string> }> = {};
  pvRows.forEach((r) => {
    const day = r.created_at.slice(0, 10);
    if (!dailyMap[day]) dailyMap[day] = { views: 0, sessions: new Set() };
    dailyMap[day].views++;
    if (r.session_id) dailyMap[day].sessions.add(r.session_id);
  });
  const dailyViews = Object.entries(dailyMap).map(([date, d]) => ({
    date,
    views:           d.views,
    unique_sessions: d.sessions.size,
  }));

  // Top clicks
  const clickCounts: Record<string, number> = {};
  all.filter((r) => r.event === 'click' && r.click_target).forEach((r) => {
    clickCounts[r.click_target!] = (clickCounts[r.click_target!] ?? 0) + 1;
  });
  const topClicks = topN(clickCounts, 10, 'element', 'clicks');

  // UTM breakdown
  const utmSources: Record<string, number>   = {};
  const utmMediums: Record<string, number>   = {};
  const utmCampaigns: Record<string, number> = {};
  pvRows.forEach((r) => {
    if (r.utm_source)   utmSources[r.utm_source]     = (utmSources[r.utm_source]     ?? 0) + 1;
    if (r.utm_medium)   utmMediums[r.utm_medium]     = (utmMediums[r.utm_medium]     ?? 0) + 1;
    if (r.utm_campaign) utmCampaigns[r.utm_campaign] = (utmCampaigns[r.utm_campaign] ?? 0) + 1;
  });

  // Events breakdown
  const eventCounts: Record<string, number> = {};
  all.forEach((r) => {
    const ev = r.event ?? 'pageview';
    eventCounts[ev] = (eventCounts[ev] ?? 0) + 1;
  });

  return ok({
    range,
    range_days:       days,
    from:             from.toISOString(),
    to:               to.toISOString(),
    total_views:      totalViews,
    unique_sessions:  uniqueSessions,
    avg_scroll_depth: avgScrollDepth,
    avg_time_on_page: avgTimeOnPage,
    bounce_rate:      bounceRate,
    top_pages:        topPages,
    top_referrers:    topReferrers,
    top_countries:    topCountries,
    device_breakdown: deviceCounts,
    daily_views:      dailyViews,
    top_clicks:       topClicks,
    utm_breakdown: {
      top_sources:   topN(utmSources,   10, 'source',   'sessions'),
      top_mediums:   topN(utmMediums,   10, 'medium',   'sessions'),
      top_campaigns: topN(utmCampaigns, 10, 'campaign', 'sessions'),
    },
    events_breakdown: eventCounts,
  });
}
