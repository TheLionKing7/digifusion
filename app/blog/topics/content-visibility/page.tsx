import type { Metadata } from 'next';
import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { fetchBlogPosts } from '@/lib/api/pathguru';

export const metadata: Metadata = {
  title: "Content & Visibility  -  Topic Hub",
  description:
    'SEO, content strategy and distribution guides for digital businesses. Learn how to build authority, rank consistently and turn content into compounding organic traffic.',
  alternates: { canonical: 'https://www.digitafusion.com/blog/topics/content-visibility' },
  openGraph: {
    title: "Content & Visibility | DigiFusion Knowledge Base",
    description:
      'From topic clusters and technical SEO to content distribution and AI-assisted publishing  -  everything you need to build lasting organic visibility.',
    type: "website",
    url: "https://www.digitafusion.com/blog/topics/content-visibility",
  },
};

const SUBTOPICS = [
  {
    title: "SEO Fundamentals",
    desc: "Technical SEO, on-page signals and crawlability  -  the foundations every site needs before any content strategy can work.",
  },
  {
    title: "Topic Clusters & Authority",
    desc: "How to build a content architecture that signals subject-matter expertise to both Google and the humans actually reading your pages.",
  },
  {
    title: "Content Strategy",
    desc: "Choosing what to write, for whom and why  -  aligning content production with search demand, buyer journey and business goals.",
  },
  {
    title: "AI-Assisted Publishing",
    desc: "How to use large language models to research, draft and optimise content at scale without losing quality, voice or human judgement.",
  },
  {
    title: "Distribution & Amplification",
    desc: "Getting content in front of the right audiences through organic search, social, email, syndication and community channels.",
  },
  {
    title: "Measurement & Iteration",
    desc: "How to read Search Console, diagnose underperforming content and make data-informed decisions about what to create next.",
  },
];

const FAQ_ITEMS_CV = [
  {
    q: "How long does SEO take to show results?",
    a: "For a new or low-authority site, expect 3-6 months before meaningful organic traffic growth appears, and 6-12 months to see the full impact of a content strategy. Topic cluster pages targeting specific niche queries can rank faster - sometimes within 4-8 weeks. The timeline depends on your domain authority, competition, and how consistently you publish.",
  },
  {
    q: "What is a topic cluster and why does it matter for SEO?",
    a: "A topic cluster is a group of content pages built around one central pillar page. The pillar covers a broad subject comprehensively; cluster posts dive into specific sub-questions and link back to the pillar. Google interprets the internal link structure as a signal of topical authority, which helps every page in the cluster rank higher than it would in isolation.",
  },
  {
    q: "Does AI-generated content hurt SEO?",
    a: "Google has stated it does not penalise AI-generated content - it penalises low-quality, unhelpful content regardless of how it was produced. AI-assisted content that is accurate, original, expert-reviewed and genuinely helpful to the reader performs well. The risk is mass-producing thin content at scale without editorial review, which Google can detect and downrank.",
  },
  {
    q: "What schema markup is most important for visibility?",
    a: "For most content sites: Article schema (for blog posts), FAQPage schema (increases People Also Ask eligibility), BreadcrumbList (adds navigation links to search results), and Organization/WebSite schema (establishes entity identity with Google). All four are implemented on this site.",
  },
  {
    q: "How do I measure content performance beyond keyword rankings?",
    a: "Track: (1) Organic clicks and impressions in Google Search Console by page - this shows real user demand. (2) Average position trends over time. (3) Click-through rate - low CTR despite good position means your title and meta description need work. (4) On-page engagement (time on page, scroll depth) to distinguish genuinely useful content from low-quality traffic.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Content and Visibility - DigiFusion Topic Hub",
      description: "A curated collection of SEO, content strategy and distribution guides for digital businesses.",
      url: "https://www.digitafusion.com/blog/topics/content-visibility",
      publisher: { "@type": "Organization", "@id": "https://www.digitafusion.com/#organization", name: "DigiFusion" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.digitafusion.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.digitafusion.com/blog" },
        { "@type": "ListItem", position: 3, name: "Content and Visibility", item: "https://www.digitafusion.com/blog/topics/content-visibility" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS_CV.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default async function ContentVisibilityTopicPage() {
  let posts: Awaited<ReturnType<typeof fetchBlogPosts>>['posts'] = [];
  try {
    const result = await fetchBlogPosts({ limit: 50 });
    posts = result.posts.slice(0, 9);
  } catch {
    // fallback to empty
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">Content &amp; Visibility</span>
        </div>
        <div className="max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Topic Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Content &amp; Visibility
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Organic traffic is the most cost-efficient acquisition channel available to a digital
            business  -  and the most frequently abandoned because results take time. This hub
            covers every layer of building lasting visibility: the architecture, the content,
            the signals and the measurement.
          </p>
        </div>
      </section>

      {/* Subtopics */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="font-serif text-2xl font-bold tracking-tight mb-8">What you&apos;ll find here</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBTOPICS.map((t) => (
            <div
              key={t.title}
              className="rounded-xl border border-border/40 bg-surface/50 p-6 hover:border-accent/30 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">{t.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillar framework */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-3">How it works</p>
            <h2 className="font-serif text-2xl font-bold mb-4">The topic cluster model</h2>
            <p className="text-muted leading-relaxed mb-6">
              Google ranks entities, not just pages. Building a topic cluster means creating
              a pillar page (like this one) that covers a broad subject area, then linking it
              to a collection of specific, deeper cluster posts. The internal link structure
              signals topical authority and helps every page in the cluster rank higher.
            </p>
            <div className="space-y-4">
              {[
                { step: '1. Pick your pillar topics', desc: 'Choose 3-5 broad subject areas that overlap your audience\'s intent and your genuine expertise.' },
                { step: '2. Build pillar pages', desc: 'Comprehensive, 1,500-3,000 word overview pages that answer the broad question and link to everything.' },
                { step: '3. Create cluster content', desc: 'Specific, targeted posts (600-1,500 words) that answer precise questions and link back to the pillar.' },
                { step: '4. Audit and iterate', desc: 'Review performance quarterly. Update top performers, consolidate underperformers, find gaps.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 text-sm">
                  <span className="shrink-0 text-accent font-semibold">{item.step}:</span>
                  <span className="text-muted">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">Technical checklist</p>
            <h2 className="font-serif text-2xl font-bold mb-6">Site foundations for visibility</h2>
            <div className="space-y-3">
              {[
                { item: 'Canonical URLs on every page', done: true },
                { item: 'XML sitemap submitted to Search Console', done: true },
                { item: 'robots.txt correctly configured', done: true },
                { item: 'Open Graph & Twitter card meta tags', done: true },
                { item: 'JSON-LD schema markup (Article, Organization, WebSite)', done: true },
                { item: 'Core Web Vitals passing on mobile', done: false },
                { item: 'Internal linking structure follows topic clusters', done: false },
                { item: 'Image alt text and lazy loading', done: true },
                { item: 'Breadcrumb navigation on inner pages', done: false },
              ].map((item) => (
                <div key={item.item} className="flex items-center gap-3 text-sm">
                  <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${item.done ? 'bg-accent/20' : 'bg-surface-lighter'}`}>
                    {item.done ? (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="hsl(168,100%,42%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-dim" />
                    )}
                  </span>
                  <span className={item.done ? 'text-foreground' : 'text-muted'}>{item.item}</span>
                  {item.done && <span className="ml-auto text-xs text-accent">Done</span>}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-dim">Items marked Done are implemented on this site.</p>
          </div>
        </div>
      </section>

      {/* Posts */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-2xl font-bold tracking-tight">Latest articles</h2>
            <Link href="/blog" className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1">
              All posts
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}


      {/* FAQ section */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold tracking-tight mb-8">Frequently asked questions</h2>
          <div className="space-y-0 divide-y divide-border/40">
            {FAQ_ITEMS_CV.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-medium text-foreground">{item.q}</span>
                  <span className="shrink-0 w-5 h-5 rounded-full border border-border/60 flex items-center justify-center text-muted group-open:rotate-45 transition-transform">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-muted leading-relaxed text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Want us to build your content architecture?</h2>
            <p className="text-muted mb-6 leading-relaxed">
              We design and implement topic cluster strategies for digital businesses  -  from
              pillar page architecture to cluster content briefs and technical SEO audits.
            </p>
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-colors"
            >
              Book a free strategy session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
