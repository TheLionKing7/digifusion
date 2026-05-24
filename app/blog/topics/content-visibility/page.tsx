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

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: "Content & Visibility  -  DigiFusion Topic Hub",
  description:
    'A curated collection of SEO, content strategy and distribution guides for digital businesses.',
  url: "https://www.digitafusion.com/blog/topics/content-visibility",
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.digitafusion.com/#organization',
    name: "DigiFusion",
  },
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
