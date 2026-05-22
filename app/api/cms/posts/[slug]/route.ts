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
