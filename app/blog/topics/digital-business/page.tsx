import type { Metadata } from 'next';
import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { fetchBlogPosts } from '@/lib/api/pathguru';

export const metadata: Metadata = {
  title: "Digital Business  -  Topic Hub",
  description:
    'Practical guides for running a smarter, leaner digital business. Strategy, operations, tools and decision-making for SMB founders and operators.',
  alternates: { canonical: 'https://www.digitafusion.com/blog/topics/digital-business' },
  openGraph: {
    title: "Digital Business | DigiFusion Knowledge Base",
    description:
      'Strategy, systems and tools for digital-first businesses  -  from tech stack decisions to operational efficiency and growth frameworks.',
    type: "website",
    url: "https://www.digitafusion.com/blog/topics/digital-business",
  },
};

const SUBTOPICS = [
  {
    title: "Business Systems",
    desc: "The tools, processes and integrations that form the operating backbone of a modern digital business  -  and how to connect them without chaos.",
  },
  {
    title: "Strategy & Positioning",
    desc: "How digital-first SMBs carve out defensible positions, communicate their value and make decisions that compound over time.",
  },
  {
    title: "Operations & Efficiency",
    desc: "Running a lean operation: documenting processes, reducing handoff errors, building reporting you can trust and scaling without proportional headcount growth.",
  },
  {
    title: "Tech Stack Decisions",
    desc: "Framework for evaluating, buying and retiring software  -  so your stack serves the business instead of the other way around.",
  },
  {
    title: "Remote & Async Work",
    desc: "Communication patterns, tools and culture practices for distributed teams that consistently deliver without synchronous overhead.",
  },
  {
    title: "Revenue & Monetisation",
    desc: "From pricing strategy to productising services  -  how digital businesses build recurring, scalable revenue.",
  },
];

const FAQ_ITEMS_DB = [
  {
    q: "What makes a business a digital business?",
    a: "A digital business is one where core operations, customer interactions and revenue generation happen primarily through digital channels and systems. This includes e-commerce, SaaS, digital services, and any traditional business that has moved its primary customer touchpoints and internal processes online.",
  },
  {
    q: "What tech stack does a modern SMB need?",
    a: "At minimum: a CRM for customer data, a project management tool, a cloud accounting package, email/communication tools, and a website. What matters more than any specific tool is how well they integrate. Disconnected tools create manual data-bridging work that is the single biggest productivity drain in most small businesses.",
  },
  {
    q: "How do I make my digital business more efficient without hiring?",
    a: "The highest-leverage moves are: document your core processes so they can be delegated or automated, consolidate duplicate tools, eliminate manual data re-entry between systems through integrations or automation, and build dashboards so decisions are based on data rather than gut feel.",
  },
  {
    q: "What is the Digital Operations Maturity Model?",
    a: "It is a four-level framework for assessing how systematised a digital business is. Level 1 is reactive (ad hoc, manual, knowledge in people heads). Level 2 is documented (processes written down, consistent but not scalable). Level 3 is systematised (workflows automated, reporting in place). Level 4 is intelligent (AI augments operations, capacity scales without proportional headcount growth).",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Digital Business - DigiFusion Topic Hub",
      description: "A curated collection of strategy, operations and technology guides for digital-first SMBs.",
      url: "https://www.digitafusion.com/blog/topics/digital-business",
      publisher: { "@type": "Organization", "@id": "https://www.digitafusion.com/#organization", name: "DigiFusion" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.digitafusion.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.digitafusion.com/blog" },
        { "@type": "ListItem", position: 3, name: "Digital Business", item: "https://www.digitafusion.com/blog/topics/digital-business" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS_DB.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default async function DigitalBusinessTopicPage() {
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
          <span className="text-foreground">Digital Business</span>
        </div>
        <div className="max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Topic Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Digital Business
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Running a digital business in 2025 means making fast decisions with incomplete
            information, managing tools that barely talk to each other and staying competitive
            against companies with ten times your budget. This is where we help you think through that.
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

      {/* Two-col framework section */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-3">Framework</p>
            <h2 className="font-serif text-2xl font-bold mb-4">The Digital Operations Maturity Model</h2>
            <p className="text-muted leading-relaxed mb-6">
              Most SMBs are stuck at level 1 or 2  -  reactive, tool-heavy and founder-dependent.
              Moving up the maturity ladder is less about buying new software and more about
              systematising what you already do well.
            </p>
            <div className="space-y-3">
              {[
                { level: 'Level 1  -  Reactive', desc: 'Ad hoc decisions, manual everything, knowledge lives in people\'s heads.' },
                { level: 'Level 2  -  Documented', desc: 'Core processes written down, basic tooling in place, consistent but not scalable.' },
                { level: 'Level 3  -  Systematised', desc: 'Workflows automated, data centralised, reporting that drives decisions.' },
                { level: 'Level 4  -  Intelligent', desc: 'AI augments operations, predictions replace assumptions, capacity scales without headcount.' },
              ].map((item) => (
                <div key={item.level} className="flex gap-3 text-sm">
                  <span className="shrink-0 text-accent font-semibold w-20">{item.level.split('  -  ')[0]}</span>
                  <span className="text-muted">{item.level.split('  -  ')[1]}: {item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">Principles</p>
            <h2 className="font-serif text-2xl font-bold mb-6">How we think about digital business</h2>
            <div className="space-y-5">
              {[
                { p: 'Systems before software', d: 'Understand the process first. The tool is the last decision, not the first.' },
                { p: 'Data you can act on', d: 'Dashboards that sit unread are a vanity. Build reporting tied to a specific decision or kill it.' },
                { p: 'Slow is smooth, smooth is fast', d: 'The fastest path to scale is systematising your current operations thoroughly before adding volume.' },
                { p: 'Defaults are decisions', d: 'Every default setting in every tool you use is a choice someone else made for a different business. Review them.' },
              ].map((item) => (
                <div key={item.p} className="border-b border-border/30 pb-5 last:border-0 last:pb-0">
                  <p className="font-semibold text-sm text-foreground mb-1">{item.p}</p>
                  <p className="text-sm text-muted leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
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
            {FAQ_ITEMS_DB.map((item) => (
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
        <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-xl font-bold mb-2">Want a second opinion on your operations?</h2>
            <p className="text-muted text-sm">A 45-minute strategy call covers your stack, your bottlenecks and what to fix first.</p>
          </div>
          <Link
            href="/agency/booking"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-colors whitespace-nowrap"
          >
            Book a session
          </Link>
        </div>
      </section>
    </>
  );
}
