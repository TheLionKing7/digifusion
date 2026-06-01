/**
 * POST /api/track
 *
 * Site-wide visitor analytics beacon — full footprint capture.
 * Receives enriched event data from the DigiFusion tracking script and writes
 * to the `pageviews` Supabase table.
 *
 * Called via navigator.sendBeacon() or fetch — no auth required.
 * The table has RLS enabled with no public policies, so writes only succeed
 * from the server (service_role key).
 *
 * Payload schema:
 *   path          string   required  — pathname (e.g. "/agency")
 *   event         string   optional  — "pageview"|"scroll_depth"|"click"|"exit"|"focus_time"
 *   referrer      string   optional
 *   sessionId     string   optional  — client-generated UUID persisted in sessionStorage
 *   pageTitle     string   optional
 *   scrollDepth   number   optional  — 0–100 (percent)
 *   timeOnPage    number   optional  — seconds
 *   clickTarget   string   optional  — text or aria-label of clicked element
 *   viewport      string   optional  — "WxH" e.g. "1440x900"
 *   language      string   optional  — navigator.language
 *   timezone      string   optional  — Intl timezone string
 *   deviceType    string   optional  — "desktop"|"tablet"|"mobile"
 *   utmSource     string   optional
 *   utmMedium     string   optional
 *   utmCampaign   string   optional
 */
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Discard obvious crawlers
const BOT_RE = /bot|crawl|spider|slurp|mediapartners|archive|facebookexternalhit|whatsapp|googlebot|bingbot|yandex/i;

function detectDevice(ua: string): 'mobile' | 'tablet' | 'desktop' {
  if (/mobi|android|iphone|ipod/i.test(ua)) return 'mobile';
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  return 'desktop';
}

function getIp(req: Request): string | null {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null
  );
}

function parseGeo(req: Request) {
  // Vercel injects these headers automatically on Edge/serverless
  return {
    country: req.headers.get('x-vercel-ip-country'),
    city:    req.headers.get('x-vercel-ip-city'),
    region:  req.headers.get('x-vercel-ip-country-region'),
  };
}

function anonymiseIp(ip: string | null): string | null {
  if (!ip) return null;
  // IPv6: keep first 4 groups → privacy-safe /64 prefix
  if (ip.includes(':')) return ip.split(':').slice(0, 4).join(':') + '::';
  // IPv4: zero last octet → /24 (GDPR-friendly)
  return ip.split('.').slice(0, 3).join('.') + '.0';
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      path,
      event        = 'pageview',
      referrer,
      sessionId,
      pageTitle,
      scrollDepth,
      timeOnPage,
      clickTarget,
      viewport,
      language,
      timezone,
      deviceType:  clientDevice,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body as Record<string, unknown>;

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ ok: false, error: 'path required' }, { status: 400 });
    }

    const ua     = request.headers.get('user-agent') ?? '';

    // Drop bots silently
    if (BOT_RE.test(ua)) return NextResponse.json({ ok: true });

    const geo    = parseGeo(request);
    const ip     = getIp(request);
    const device = typeof clientDevice === 'string' ? clientDevice : detectDevice(ua);

    const { error: insertError } = await supabase.from('pageviews').insert({
      path:         String(path).slice(0, 500),
      event:        typeof event === 'string' ? event.slice(0, 50) : 'pageview',
      referrer:     referrer    ? String(referrer).slice(0, 500)    : null,
      user_agent:   ua.slice(0, 300),
      session_id:   sessionId   ? String(sessionId).slice(0, 64)   : null,
      page_title:   pageTitle   ? String(pageTitle).slice(0, 300)  : null,
      scroll_depth: typeof scrollDepth === 'number'
        ? Math.min(100, Math.max(0, Math.round(scrollDepth))) : null,
      time_on_page: typeof timeOnPage === 'number' ? Math.round(timeOnPage) : null,
      click_target: clickTarget ? String(clickTarget).slice(0, 200) : null,
      viewport:     viewport    ? String(viewport).slice(0, 20)    : null,
      language:     language    ? String(language).slice(0, 20)    : null,
      timezone:     timezone    ? String(timezone).slice(0, 60)    : null,
      device_type:  device,
      country:      geo.country,
      city:         geo.city ? decodeURIComponent(geo.city) : null,
      region:       geo.region,
      ip_anon:      anonymiseIp(ip),
      utm_source:   utmSource   ? String(utmSource).slice(0, 100)   : null,
      utm_medium:   utmMedium   ? String(utmMedium).slice(0, 100)   : null,
      utm_campaign: utmCampaign ? String(utmCampaign).slice(0, 100) : null,
    });

    if (insertError) {
      // Surface in Vercel function logs without breaking the caller
      console.error('[track] Supabase insert error:', insertError.message, insertError.details ?? '');
      return NextResponse.json({ ok: false, error: insertError.message });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Never break the page for analytics failures
    console.error('[track] Unexpected error:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: false });
  }
}
