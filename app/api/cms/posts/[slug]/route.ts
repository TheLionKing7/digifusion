/**
 * GET    /api/cms/posts/[slug]  — fetch single post (full content)
 * DELETE /api/cms/posts/[slug]  — soft-delete (sets status = 'archived')
 *
 * Called by PathGuru's cmsClient.getPost() and cmsClient.deletePost().
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { getShopDb } from '@/lib/shop/supabase';

type Ctx = { params: Promise<{ slug: string }> };

/* ── GET — single post by slug ──────────────────────────────────────────── */

export async function GET(req: NextRequest, { params }: Ctx) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { slug } = await params;

  const { data: post, error } = await getShopDb()
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[cms/posts/[slug] GET] failed', error);
    return fail('DB_ERROR', error.message, 500);
  }
  if (!post) return fail('NOT_FOUND', `No post with slug "${slug}".`, 404);

  return ok(post);
}

/* ── PATCH — update status (publish / unpublish / archive) ─────────────── */

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { slug } = await params;

  let body: { status?: string };
  try { body = await req.json(); }
  catch { return fail('INVALID_JSON', 'Request body must be valid JSON.'); }

  const allowedStatuses = ['published', 'draft', 'archived'];
  if (!body.status || !allowedStatuses.includes(body.status)) {
    return fail('VALIDATION_ERROR', `status must be one of: ${allowedStatuses.join(', ')}`);
  }

  const updates: Record<string, unknown> = { status: body.status };
  if (body.status === 'published') updates.published_at = new Date().toISOString();
  if (body.status === 'draft')     updates.published_at = null;

  const { data: post, error } = await getShopDb()
    .from('posts')
    .update(updates)
    .eq('slug', slug)
    .select('id, slug, title, status, published_at')
    .maybeSingle();

  if (error) {
    console.error('[cms/posts/[slug] PATCH] failed', error);
    return fail('DB_ERROR', error.message, 500);
  }
  if (!post) return fail('NOT_FOUND', `No post with slug "${slug}".`, 404);

  return ok(post);
}

/* ── DELETE — soft-delete (archive) ────────────────────────────────────── */

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const { slug } = await params;

  const { data: post, error } = await getShopDb()
    .from('posts')
    .update({ status: 'archived' })
    .eq('slug', slug)
    .select('id, slug, status')
    .maybeSingle();

  if (error) {
    console.error('[cms/posts/[slug] DELETE] failed', error);
    return fail('DB_ERROR', error.message, 500);
  }
  if (!post) return fail('NOT_FOUND', `No post with slug "${slug}".`, 404);

  return ok(post);
}
