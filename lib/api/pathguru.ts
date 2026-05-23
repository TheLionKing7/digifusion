/**
 * lib/api/pathguru.ts
 *
 * Blog data layer for DigiFusion's public blog pages.
 * Reads directly from DigiFusion's own Supabase `posts` table —
 * the same table PathGuru writes to via POST /api/cms/posts.
 *
 * Previously called PathGuru's external Render API, which caused 404s
 * whenever Render was sleeping or unreachable. Direct DB access is
 * faster, more reliable, and removes the external dependency entirely.
 */

import { getShopDb } from '@/lib/shop/supabase';
import type { BlogPost, BlogPostCollection, BlogPostType } from '@/types/blog';
import type { AgentStatusResponse } from '@/types/agent';

/* ── Blog Posts ─────────────────────────────────────────────────────────── */

export async function fetchBlogPosts(options?: {
  limit?: number;
  page?: number;
  category?: string;
  postType?: BlogPostType;
}): Promise<BlogPostCollection> {
  const limit = options?.limit ?? 20;
  const page  = Math.max(1, options?.page ?? 1);
  const from  = (page - 1) * limit;
  const to    = from + limit - 1;

  try {
    const db = getShopDb();
    let query = db
      .from('posts')
      .select(
        'id, slug, title, excerpt, post_type, featured_image_url, categories, tags, reading_time_minutes, published_at, created_at, author_name, author_avatar',
        { count: 'exact' }
      )
      .eq('status', 'published')
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(from, to);

    if (options?.postType) query = query.eq('post_type', options.postType);

    const { data: posts, count, error } = await query;

    if (error) throw new Error(error.message);

    return {
      posts: (posts ?? []).map(mapPostSummaryFromDB),
      pagination: {
        page,
        perPage: limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
      categories: [],
      postTypes: ['listicle', 'how-to', 'case-study', 'review', 'roundup', 'guide', 'opinion', 'article'],
    };
  } catch (e) {
    console.error('[fetchBlogPosts] DB error:', e);
    // Fallback to mock data so the blog listing never goes blank
    return fetchMockBlogPosts(options);
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  const db = getShopDb();

  const { data: post, error } = await db
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw new Error(`DB error fetching post "${slug}": ${error.message}`);
  if (!post)  throw new Error(`Post not found: "${slug}"`);

  return mapPostFromDB(post) as BlogPost;
}

/* ── Map DB row → BlogPostSummary ───────────────────────────────────────── */

function mapPostSummaryFromDB(post: any) {
  return {
    id:                 post.id,
    slug:               post.slug,
    title:              post.title,
    excerpt:            post.excerpt            || '',
    postType:           post.post_type          || 'article',
    featuredImageUrl:   post.featured_image_url || null,
    categories:         post.categories         || [],
    tags:               post.tags               || [],
    readingTimeMinutes: post.reading_time_minutes ?? 5,
    publishedAt:        post.published_at        || post.created_at,
    author: {
      name:   post.author_name   || 'DigiFusion',
      avatar: post.author_avatar || null,
    },
  };
}

/* ── Map DB row → BlogPost (full) ───────────────────────────────────────── */

function mapPostFromDB(post: any): any {
  return {
    ...mapPostSummaryFromDB(post),
    content:            post.content             || '',
    metaDescription:    post.meta_description    || '',
    focusKeyword:       post.focus_keyword       || '',
    featuredImageCredit:post.featured_image_credit || null,
    socialCaption:      post.social_caption      || '',
    linkedinCaption:    post.linkedin_caption    || '',
    wordCount:          post.word_count          ?? 0,
    // Type-specific fields
    listItems:    post.list_items    || [],
    steps:        post.steps         || [],
    clientName:   post.client_name   || null,
    clientResults:post.client_results|| [],
    rating:       post.rating        ?? null,
    prosCons:     post.pros_cons     || { pros: [], cons: [] },
    experts:      post.experts       || [],
  };
}

/* ── Agent Status (still from PathGuru — agent-specific data) ───────────── */

const PATHGURU_API = process.env.NEXT_PUBLIC_PATHGURU_API || '';

export async function fetchAgentStatus(
  revalidate: number = 10
): Promise<AgentStatusResponse> {
  if (!PATHGURU_API) return getMockAgentStatus();
  try {
    const res = await fetch(`${PATHGURU_API}/api/agent-status`, {
      next: { revalidate },
    });
    if (!res.ok) return getMockAgentStatus();
    return res.json();
  } catch {
    return getMockAgentStatus();
  }
}

/* ── Mock Data (fallback / development) ─────────────────────────────────── */

function getMockAgentStatus(): AgentStatusResponse {
  return {
    agents: [
      { id: 'agent-1', name: 'Atlas',  role: 'research',  status: 'active', tasksCompleted: 1247, tasksInQueue: 3, lastActivity: new Date().toISOString(), currentTask: 'Analyzing market trends for Q3', uptime: 86400*14, metrics: { avgResponseTime: 320, successRate: 0.98 } },
      { id: 'agent-2', name: 'Nova',   role: 'content',   status: 'busy',   tasksCompleted: 892,  tasksInQueue: 5, lastActivity: new Date().toISOString(), currentTask: 'Generating blog post draft',       uptime: 86400*10, metrics: { avgResponseTime: 450, successRate: 0.95 } },
      { id: 'agent-3', name: 'Aether', role: 'design',    status: 'active', tasksCompleted: 534,  tasksInQueue: 2, lastActivity: new Date().toISOString(), currentTask: 'Composing visual assets',          uptime: 86400*7,  metrics: { avgResponseTime: 280, successRate: 0.99 } },
      { id: 'agent-4', name: 'Pulse',  role: 'analytics', status: 'idle',   tasksCompleted: 3401, tasksInQueue: 0, lastActivity: new Date(Date.now()-60000).toISOString(), uptime: 86400*30, metrics: { avgResponseTime: 150, successRate: 0.997 } },
    ],
    lastUpdated:  new Date().toISOString(),
    systemHealth: 'healthy',
  };
}

export async function fetchMockBlogPosts(options?: {
  limit?: number;
  postType?: BlogPostType;
}): Promise<BlogPostCollection> {
  const posts: BlogPostCollection['posts'] = [
    { id: '1', slug: '10-ai-automation-tips-for-agencies',              title: '10 AI Automation Tips That Saved Our Agency 40 Hours a Week',                    excerpt: 'Discover the exact automation workflows we use at DigiFusion.', postType: 'listicle',   featuredImageUrl: null, categories: ['AI Automation'],    tags: ['automation','agency'], readingTimeMinutes: 8,  publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
    { id: '2', slug: 'how-to-build-an-ai-agent-for-customer-support',  title: 'How to Build an AI Agent for Customer Support (Step-by-Step)',                  excerpt: 'A practical guide to designing and deploying an AI support agent.',       postType: 'how-to',    featuredImageUrl: null, categories: ['Tutorials'],        tags: ['ai-agent'],            readingTimeMinutes: 12, publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
    { id: '3', slug: 'how-we-helped-a-saas-company-reduce-churn',      title: 'How We Helped a SaaS Company Reduce Churn by 34% Using AI',                    excerpt: 'A deep dive into predictive analytics and automated retention workflows.', postType: 'case-study', featuredImageUrl: null, categories: ['Case Studies'],     tags: ['saas','churn'],        readingTimeMinutes: 10, publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
    { id: '4', slug: 'best-ai-writing-tools-for-agencies-reviewed',    title: 'Best AI Writing Tools for Agencies: 2026 Review & Comparison',                  excerpt: 'We tested 12 AI writing platforms head-to-head.',                        postType: 'review',    featuredImageUrl: null, categories: ['Reviews'],          tags: ['ai-writing','tools'],  readingTimeMinutes: 15, publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
    { id: '5', slug: 'expert-roundup-future-of-ai-in-digital-marketing',title: 'Expert Roundup: 15 Industry Leaders on the Future of AI in Digital Marketing', excerpt: 'We asked 15 top AI and marketing executives one question.',               postType: 'roundup',   featuredImageUrl: null, categories: ['Industry Insights'],tags: ['expert-roundup'],      readingTimeMinutes: 18, publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
    { id: '6', slug: 'ultimate-guide-to-ai-agent-deployment',          title: 'The Ultimate Guide to Deploying AI Agents in Production',                       excerpt: 'Everything you need to know about taking AI agents from prototype to production.', postType: 'guide', featuredImageUrl: null, categories: ['Guides'], tags: ['ai-agents','deployment'], readingTimeMinutes: 25, publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
    { id: '7', slug: 'why-most-ai-agency-websites-look-the-same',      title: 'Why Most AI Agency Websites Look the Same (And Why That Is a Problem)',         excerpt: 'A hot take on the homogenization of AI agency branding.',               postType: 'opinion',   featuredImageUrl: null, categories: ['Opinion'],          tags: ['branding','design'],   readingTimeMinutes: 6,  publishedAt: new Date().toISOString(), author: { name: 'DigiFusion' } },
  ];

  let filtered = posts;
  if (options?.postType) filtered = posts.filter(p => p.postType === options.postType);
  if (options?.limit)    filtered = filtered.slice(0, options.limit);

  return {
    posts: filtered,
    pagination: { page: 1, perPage: options?.limit || 10, total: filtered.length, totalPages: 1 },
    categories: ['AI Automation','Tutorials','Case Studies','Reviews','Industry Insights','Guides','Opinion'],
    postTypes:  ['listicle','how-to','case-study','review','roundup','guide','opinion','article'],
  };
}
