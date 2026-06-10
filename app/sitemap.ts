/**
 * sitemap.ts — DigiFusion XML sitemap
 *
 * Served at /sitemap.xml by Next.js automatically.
 * Google requires this to be XML — the separate /sitemap HTML page is
 * a human-readable index (not submitted to GSC).
 *
 * NOTE: Fragment URLs (#id anchors) are excluded — Google ignores them
 * in sitemaps. Section links are handled via on-page heading signals.
 */
import type { MetadataRoute } from 'next';
import { fetchBlogPosts } from '@/lib/api/pathguru';

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.digitafusion.com').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    // ── Core ────────────────────────────────────────────────────────────────
    { url: BASE,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${BASE}/about`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.6  },
    { url: `${BASE}/contact`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.5  },
    { url: `${BASE}/privacy-policy`,                lastModified: now, changeFrequency: 'yearly',  priority: 0.2  },
    { url: `${BASE}/terms`,                         lastModified: now, changeFrequency: 'yearly',  priority: 0.2  },

    // ── Blog ────────────────────────────────────────────────────────────────
    { url: `${BASE}/blog`,                          lastModified: now, changeFrequency: 'daily',   priority: 0.9  },
    { url: `${BASE}/blog/topics/ai-automation`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/blog/topics/digital-business`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/blog/topics/content-visibility`, lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },

    // ── Agency ──────────────────────────────────────────────────────────────
    // /agency is the main pillar page — elevated to 0.9
    { url: `${BASE}/agency`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/agency/services`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/agency/methodology`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE}/agency/case-studies`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
    { url: `${BASE}/agency/booking`,                lastModified: now, changeFrequency: 'monthly', priority: 0.8  },

    // ── Intelligence hub ────────────────────────────────────────────────────
    { url: `${BASE}/intelligence`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/intelligence/field-guides`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${BASE}/intelligence/playbooks`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${BASE}/intelligence/research`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${BASE}/intelligence/tools`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },

    // ── Products ────────────────────────────────────────────────────────────
    { url: `${BASE}/products`,                      lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/products/sabiwork`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/products/receptra`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/products/adpilot`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/products/vektor`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8  },

    // NOTE: /sitemap (HTML page) is intentionally excluded here.
    // It is noindex and must not appear in the XML sitemap — including it
    // causes the GSC "HTML page submitted as XML sitemap" error.
  ];

  // ── Dynamic blog post routes ─────────────────────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await fetchBlogPosts({ limit: 500 });
    blogRoutes = posts.map((post) => ({
      url:             `${BASE}/blog/${post.slug}`,
      lastModified:    new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority:        0.7,
    }));
  } catch {
    // DB unavailable — omit dynamic routes gracefully, static routes still ship
  }

  return [...staticRoutes, ...blogRoutes];
}
