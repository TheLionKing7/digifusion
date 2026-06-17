/**
 * POST  /api/cms/posts  — create or update a post (upsert by slug)
 * GET   /api/cms/posts  — list posts (paginated, filterable)
 *
 * Called by PathGuru's cmsClient.publishPost() and cmsClient.listPosts().
 *
 * POST is idempotent: posting the same slug a second time updates the row,
 * it never creates a duplicate. PathGuru can safely retry on network failure.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { requireCmsToken } from '@/lib/cms/auth';
import { ok, fail } from '@/lib/cms/respond';
import { PostWriteSchema, PostListQuerySchema } from '@/lib/cms/schemas';
import { getShopDb } from '@/lib/shop/supabase';

/* ── POST — upsert by slug ──────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  let body: unknown;
  try { body = await req.json(); }
  catch { return fail('INVALID_JSON', 'Request body must be valid JSON.'); }

  const parsed = PostWriteSchema.safeParse(body);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const data = parsed.data;

  // Build the upsert payload — only include optional fields if they were sent
  const row = {
    slug:                   data.slug,
    title:                  data.title,
    excerpt:                data.excerpt,
    content:                data.content,
    post_type:              data.post_type,
    status:                 data.status,
    meta_description:       data.meta_description,
    focus_keyword:          data.focus_keyword,
    featured_image_url:     data.featured_image_url ?? null,
    featured_image_credit:  data.featured_image_credit,
    social_caption:         data.social_caption,
    linkedin_caption:       data.linkedin_caption,
    categories:             data.categories,
    tags:                   data.tags,
    reading_time_minutes:   data.reading_time_minutes,
    word_count:             data.word_count,
    author_name:            data.author_name,
    author_avatar:          data.author_avatar ?? null,
    // Post-type specific
    list_items:             data.list_items,
    steps:                  data.steps,
    client_name:            data.client_name ?? null,
    client_results:         data.client_results,
    rating:                 data.rating ?? null,
    pros_cons:              data.pros_cons,
    experts:                data.experts,
    // Allow PathGuru to set/override published_at (e.g. backdated posts)
    ...(data.published_at !== undefined ? { published_at: data.published_at } : {}),
    ...(data.scheduled_publish_at !== undefined ? { scheduled_publish_at: data.scheduled_publish_at } : {}),
  };

  const db = getShopDb();

  const { data: post, error } = await db
    .from('posts')
    .upsert(row, { onConflict: 'slug' })
    .select('id, slug, title, status, post_type, published_at, updated_at')
    .single();

  if (error) {
    console.error('[cms/posts POST] upsert failed', error);
    return fail('DB_ERROR', error.message, 500);
  }

  const isNew = post.updated_at === post.published_at || !post.published_at;
  return ok(post, { status: isNew ? 201 : 200 });
}

/* ── GET — paginated list ───────────────────────────────────────────────── */

export async function GET(req: NextRequest) {
  const gate = requireCmsToken(req);
  if (gate) return gate;

  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = PostListQuerySchema.safeParse(params);
  if (!parsed.success) {
    return fail('VALIDATION_ERROR', parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '));
  }

  const { page, per_page, status, post_type } = parsed.data;
  const from = (page - 1) * per_page;
  const to   = from + per_page - 1;

  const db = getShopDb();
  let query = db
    .from('posts')
    .select('id, slug, title, status, post_type, categories, tags, reading_time_minutes, published_at, updated_at, author_name', { count: 'exact' })
    .order('updated_at', { ascending: false })
    .range(from, to);

  if (status)    query = query.eq('status', status);
  if (post_type) query = query.eq('post_type', post_type);

  const { data: posts, count, error } = await query;

  if (error) {
    console.error('[cms/posts GET] list failed', error);
    return fail('DB_ERROR', error.message, 500);
  }

  return ok({
    posts:      posts ?? [],
    pagination: {
      page,
      per_page,
      total:       count ?? 0,
      total_pages: Math.ceil((count ?? 0) / per_page),
    },
  });
}
