/* ── PathGuru Publishing Engine API Client ────────────── */

import type { BlogPost, BlogPostCollection, BlogPostType } from '@/types/blog';
import type { AgentStatusResponse } from '@/types/agent';

const PATHGURU_API = process.env.NEXT_PUBLIC_PATHGURU_API || 'http://localhost:8787';

/* ── Blog Posts ──────────────────────────────────────── */

export async function fetchBlogPosts(options?: {
  limit?: number;
  page?: number;
  category?: string;
  postType?: BlogPostType;
  revalidate?: number;
}): Promise<BlogPostCollection> {
  const params = new URLSearchParams();
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.page) params.set('page', String(options.page));
  if (options?.category) params.set('category', options.category);
  if (options?.postType) params.set('postType', options.postType);

  try {
    const res = await fetch(`${PATHGURU_API}/api/posts?${params}`, {
      next: { revalidate: options?.revalidate ?? 60 },
    });

    if (!res.ok) {
      // Fallback to mock data if server is unavailable
      console.warn(`[PathGuru API] Failed to fetch posts: ${res.statusText}. Using mock data.`);
      return fetchMockBlogPosts(options);
    }

    const data = await res.json();
    return {
      posts: (data.posts || []).map(mapPostFromDB),
      pagination: data.pagination || { page: 1, perPage: 10, total: 0, totalPages: 0 },
      categories: [],
      postTypes: ['listicle', 'how-to', 'case-study', 'review', 'roundup', 'guide', 'opinion'],
    };
  } catch {
    console.warn('[PathGuru API] Failed to fetch posts. Using mock data.');
    return fetchMockBlogPosts(options);
  }
}

export async function fetchBlogPost(
  slug: string,
  revalidate: number = 60
): Promise<BlogPost> {
  const res = await fetch(`${PATHGURU_API}/api/posts/${slug}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post: ${res.statusText}`);
  }

  const data = await res.json();
  return mapPostFromDB(data) as unknown as BlogPost;
}

/* ── Map Supabase DB post to BlogPost type ──────────── */

function mapPostFromDB(post: any): any {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content || '',
    postType: post.post_type || 'guide',
    metaDescription: post.meta_description || '',
    focusKeyword: post.focus_keyword || '',
    featuredImageUrl: post.featured_image_url || null,
    featuredImageCredit: post.featured_image_credit || null,
    socialCaption: post.social_caption || '',
    linkedinCaption: post.linkedin_caption || '',
    categories: post.categories || [],
    tags: post.tags || [],
    readingTimeMinutes: post.reading_time_minutes || 5,
    wordCount: post.word_count || 0,
    publishedAt: post.published_at || post.created_at,
    author: {
      name: post.author_name || 'Boroji',
      avatar: post.author_avatar || null,
    },
  };
}

/* ── Agent Status ────────────────────────────────────── */

export async function fetchAgentStatus(
  revalidate: number = 10
): Promise<AgentStatusResponse> {
  try {
    const res = await fetch(`${PATHGURU_API}/api/agent-status`, {
      next: { revalidate },
    });

    if (!res.ok) {
      return getMockAgentStatus();
    }

    return res.json();
  } catch {
    console.warn('[PathGuru API] Failed to fetch agent status. Using mock data.');
    return getMockAgentStatus();
  }
}

/* ── Mock Data (for development) ─────────────────────── */

function getMockAgentStatus(): AgentStatusResponse {
  return {
    agents: [
      {
        id: 'agent-1',
        name: 'Atlas',
        role: 'research',
        status: 'active',
        tasksCompleted: 1_247,
        tasksInQueue: 3,
        lastActivity: new Date().toISOString(),
        currentTask: 'Analyzing market trends for Q3',
        uptime: 86400 * 14,
        metrics: { avgResponseTime: 320, successRate: 0.98 },
      },
      {
        id: 'agent-2',
        name: 'Nova',
        role: 'content',
        status: 'busy',
        tasksCompleted: 892,
        tasksInQueue: 5,
        lastActivity: new Date().toISOString(),
        currentTask: 'Generating blog post draft',
        uptime: 86400 * 10,
        metrics: { avgResponseTime: 450, successRate: 0.95 },
      },
      {
        id: 'agent-3',
        name: 'Aether',
        role: 'design',
        status: 'active',
        tasksCompleted: 534,
        tasksInQueue: 2,
        lastActivity: new Date().toISOString(),
        currentTask: 'Composing visual assets',
        uptime: 86400 * 7,
        metrics: { avgResponseTime: 280, successRate: 0.99 },
      },
      {
        id: 'agent-4',
        name: 'Pulse',
        role: 'analytics',
        status: 'idle',
        tasksCompleted: 3_401,
        tasksInQueue: 0,
        lastActivity: new Date(Date.now() - 60000).toISOString(),
        uptime: 86400 * 30,
        metrics: { avgResponseTime: 150, successRate: 0.997 },
      },
    ],
    lastUpdated: new Date().toISOString(),
    systemHealth: 'healthy',
  };
}

export async function fetchMockBlogPosts(options?: {
  limit?: number;
  postType?: BlogPostType;
}): Promise<BlogPostCollection> {
  const posts: BlogPostCollection['posts'] = [
    {
      id: '1',
      slug: '10-ai-automation-tips-for-agencies',
      title: '10 AI Automation Tips That Saved Our Agency 40 Hours a Week',
      excerpt:
        'Discover the exact automation workflows we use at DigiFusion to eliminate repetitive tasks and scale our agency operations without hiring more people.',
      postType: 'listicle',
      featuredImageUrl: null,
      categories: ['AI Automation'],
      tags: ['automation', 'agency', 'workflow'],
      readingTimeMinutes: 8,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
    {
      id: '2',
      slug: 'how-to-build-an-ai-agent-for-customer-support',
      title: 'How to Build an AI Agent for Customer Support (Step-by-Step)',
      excerpt:
        'A practical guide to designing, training, and deploying an AI support agent that handles 80% of your customer inquiries autonomously.',
      postType: 'how-to',
      featuredImageUrl: null,
      categories: ['Tutorials'],
      tags: ['ai-agent', 'customer-support', 'tutorial'],
      readingTimeMinutes: 12,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
    {
      id: '3',
      slug: 'how-we-helped-a-saas-company-reduce-churn-by-34-percent',
      title: 'How We Helped a SaaS Company Reduce Churn by 34% Using AI',
      excerpt:
        'A deep dive into our engagement with TechFlow Inc., where we deployed predictive analytics and automated retention workflows to transform their customer lifecycle.',
      postType: 'case-study',
      featuredImageUrl: null,
      categories: ['Case Studies'],
      tags: ['saas', 'churn', 'retention', 'ai'],
      readingTimeMinutes: 10,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
    {
      id: '4',
      slug: 'best-ai-writing-tools-for-agencies-reviewed',
      title: 'Best AI Writing Tools for Agencies: 2026 Review & Comparison',
      excerpt:
        'We tested 12 AI writing platforms head-to-head. Here is our honest breakdown of the pros, cons, and which tool wins for each use case.',
      postType: 'review',
      featuredImageUrl: null,
      categories: ['Reviews'],
      tags: ['ai-writing', 'tools', 'comparison'],
      readingTimeMinutes: 15,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
    {
      id: '5',
      slug: 'expert-roundup-future-of-ai-in-digital-marketing',
      title: 'Expert Roundup: 15 Industry Leaders on the Future of AI in Digital Marketing',
      excerpt:
        'We asked 15 top AI and marketing executives one question: "What will AI change most in digital marketing over the next 3 years?" Here is what they said.',
      postType: 'roundup',
      featuredImageUrl: null,
      categories: ['Industry Insights'],
      tags: ['expert-roundup', 'ai-marketing', 'future'],
      readingTimeMinutes: 18,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
    {
      id: '6',
      slug: 'ultimate-guide-to-ai-agent-deployment',
      title: 'The Ultimate Guide to Deploying AI Agents in Production',
      excerpt:
        'Everything you need to know about taking AI agents from prototype to production: architecture patterns, monitoring, scaling, and best practices.',
      postType: 'guide',
      featuredImageUrl: null,
      categories: ['Guides'],
      tags: ['ai-agents', 'deployment', 'production'],
      readingTimeMinutes: 25,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
    {
      id: '7',
      slug: 'why-most-ai-agency-websites-look-the-same',
      title: 'Why Most AI Agency Websites Look the Same (And Why That Is a Problem)',
      excerpt:
        'A hot take on the homogenization of AI agency branding and why differentiation through design and UX is your biggest competitive advantage.',
      postType: 'opinion',
      featuredImageUrl: null,
      categories: ['Opinion'],
      tags: ['branding', 'design', 'differentiation'],
      readingTimeMinutes: 6,
      publishedAt: new Date().toISOString(),
      author: { name: 'Boroji' },
    },
  ];

  let filtered = posts;
  if (options?.postType) {
    filtered = posts.filter((p) => p.postType === options.postType);
  }
  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return {
    posts: filtered,
    pagination: {
      page: 1,
      perPage: options?.limit || 10,
      total: filtered.length,
      totalPages: 1,
    },
    categories: ['AI Automation', 'Tutorials', 'Case Studies', 'Reviews', 'Industry Insights', 'Guides', 'Opinion'],
    postTypes: ['listicle', 'how-to', 'case-study', 'review', 'roundup', 'guide', 'opinion'],
  };
}
