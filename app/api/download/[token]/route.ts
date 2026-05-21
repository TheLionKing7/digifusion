/**
 * GET /api/download/[token]
 *
 * Token-gated R2 streaming. Verifies expiry + max uses + bumps the counter
 * before opening the stream. We deliberately don't issue presigned URLs to
 * the buyer — that would let them keep the URL forever.
 */

import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { ReadableStream as NodeReadableStream } from 'node:stream/web';
import { getShopDb } from '@/lib/shop/supabase';
import { getDownloadStream } from '@/lib/shop/r2';
import type { Download } from '@/types/shop';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ token: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { token } = await params;
  if (!token || token.length < 16) {
    return NextResponse.json({ error: 'invalid token' }, { status: 400 });
  }

  const db = getShopDb();
  const { data, error } = await db
    .from('downloads')
    .select('*')
    .eq('token', token)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  const dl = data as Download;

  if (new Date(dl.expires_at) < new Date()) {
    return NextResponse.json({ error: 'link expired' }, { status: 410 });
  }
  if (dl.used_count >= dl.max_uses) {
    return NextResponse.json({ error: 'no downloads remaining' }, { status: 410 });
  }

  // Bump first, stream second. If R2 fails after we've bumped, the buyer can
  // still retry while they have uses left.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
  await db
    .from('downloads')
    .update({
      used_count: dl.used_count + 1,
      last_used_at: new Date().toISOString(),
      last_used_ip: ip,
    })
    .eq('id', dl.id);

  let r2;
  try {
    r2 = await getDownloadStream(dl.r2_key);
  } catch (err) {
    console.error('[download] r2 fetch failed', err);
    return NextResponse.json({ error: 'file unavailable' }, { status: 502 });
  }

  // Adapt Node Readable → Web ReadableStream for Next's Response.
  const webStream = Readable.toWeb(r2.body) as unknown as NodeReadableStream;

  return new Response(webStream as unknown as ReadableStream, {
    headers: {
      'Content-Type': r2.contentType || 'application/octet-stream',
      ...(r2.contentLength ? { 'Content-Length': String(r2.contentLength) } : {}),
      'Content-Disposition': `attachment; filename="${dl.filename.replace(/"/g, '')}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
