import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/api/pathguru';
import { formatDate } from '@/lib/utils/formatters';

export const metadata = {
  title: 'Site Map',
  description: 'A complete map of all pages and content on the DigiFusion website.',
  robots: { index: true, follow: true },
};

export const revalidate = 3600;

const SECTIONS = [
  {
    title: 'Main',
    links: [
      { label: 'Home', href: '/', desc: 'Enterprise AI agency overview and services' },
      { label: 'About DigiFusion', href: '/about', desc: 'Our story, team and mission' },
      { label: 'Contact', href: '/contact', desc: 'Get in touch with our team' },
    ],
  },
  {
    title: 'Agency',
    links: [
      { label: 'Agency Overview', href: '/agency', desc: 'Three practice areas — AI Automation, Business Development, Digital Media' },
      { label: '→ AI & SaaS Automation', href: '/agency#ai-automation', desc: 'Automation Velocity Engine (AVE) — Nova\'s 5-phase framework' },
      { label: '→ Business Development', href: '/agency#business-development', desc: 'Deal Engine — Atlas\'s 5-phase BD framework' },
      { label: '→ Digital Media', href: '/agency#digital-media', desc: 'C2C Pipeline — pillar-cluster content authority system' },
      { label: 'Services & Pricing', href: '/agency/services', desc: 'Transparent pricing for all three service tracks' },
      { label: 'Methodology', href: '/agency/methodology', desc: '4-phase engagement model — diagnosis before prescription' },
      { label: 'Case Studies', href: '/agency/case-studies', desc: 'Measured results from real client engagements' },
      { label: 'Book a Strategy Session', href: '/agency/booking', desc: 'Free 30-minute diagnostic — leaves with a roadmap and ROI projection' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'All Products', href: '/products', desc: 'Software, extensions and templates' },
      { label: 'Software', href: '/products?category=software', desc: 'Standalone software tools' },
      { label: 'Browser Extensions', href: '/products?category=extension', desc: 'Productivity extensions' },
      { label: 'Templates', href: '/products?category=template', desc: 'Ready-to-use templates' },
    ],
  },
  {
    title: 'Knowledge Base',
    links: [
      { label: 'All Posts', href: '/blog', desc: 'Full archive of guides, case studies and articles' },
      { label: 'Guides', href: '/blog?postType=guide', desc: 'In-depth how-to guides' },
      { label: 'Case Studies', href: '/blog?postType=case-study', desc: 'Client success stories' },
      { label: 'How-To Tutorials', href: '/blog?postType=how-to', desc: 'Step-by-step tutorials' },
      { label: 'Listicles', href: '/blog?postType=listicle', desc: 'Curated lists and roundups' },
      { label: 'Reviews', href: '/blog?postType=review', desc: 'Tool and product reviews' },
      { label: 'Opinion', href: '/blog?postType=opinion', desc: 'Industry perspectives' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy', desc: 'How we handle your data' },
      { label: 'Site Map', href: '/sitemap', desc: 'This page' },
    ],
  },
];

export default async function SitemapPage() {
  let recentPosts: { slug: string; title: string; publishedAt: string; postType: string }[] = [];
  try {
    const { posts } = await fetchBlogPosts({ limit: 20 });
    recentPosts = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      publishedAt: p.publishedAt,
      postType: p.postType,
    }));
  } catch {
    // graceful fallback
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Navigation
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Site Map
          </h1>
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            A complete index of every section and page on the DigiFusion website.
          </p>
        </div>
      </section>

      {/* Static sections grid */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-lg font-bold text-foreground mb-4 pb-2 border-b border-border/40">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex flex-col gap-0.5 hover:text-accent transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        {link.label}
                      </span>
                      <span className="text-xs text-muted pl-[20px]">{link.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recent blog posts */}
      {recentPosts.length > 0 && (
        <div className="border-t border-border/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-serif text-2xl font-bold tracking-tight mb-8">
              Recent Blog Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-surface transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1 text-accent">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {post.postType} &middot; {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                View all posts
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
