/**
 * POST /api/track
 *
 * Receives a lightweight page-view beacon from the DigiFusion frontend
 * and writes it to the `pageviews` Supabase table.
 *
 * Called via navigator.sendBeacon() — no auth required.
 * The table has RLS enabled with no public policies, so writes only succeed
 * from the server (service_role key).
 */
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { path, referrer, sessionId } = body as Record<string, unknown>;

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ua = request.headers.get('user-agent') ?? '';

    await supabase.from('pageviews').insert({
      path:       String(path).slice(0, 500),
      referrer:   referrer ? String(referrer).slice(0, 500) : null,
      user_agent: ua.slice(0, 300),
      session_id: sessionId ? String(sessionId).slice(0, 64) : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Silently absorb errors — never break the page for analytics failures
    return NextResponse.json({ ok: false });
  }
}
