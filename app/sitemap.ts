import type { MetadataRoute } from 'next';
import { fetchBlogPosts } from '@/lib/api/pathguru';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.digitafusion.com').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                         lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/blog`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/agency`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/agency/services`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agency/methodology`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/agency/case-studies`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/agency/booking`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/products`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/sitemap`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/privacy-policy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ];

  // Dynamic blog post routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await fetchBlogPosts({ limit: 500 });
    blogRoutes = posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {
    // If DB is unavailable, omit dynamic routes gracefully
  }

  return [...staticRoutes, ...blogRoutes];
}
