import type { Metadata } from 'next';
import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { fetchBlogPosts } from '@/lib/api/pathguru';

export const metadata: Metadata = {
  title: "AI & Automation  -  Topic Hub",
  description:
    'Every DigiFusion guide, tutorial and deep-dive on AI automation for small and mid-sized businesses. Learn how to replace manual workflows, build AI agents and measure real ROI.',
  alternates: { canonical: 'https://www.digitafusion.com/blog/topics/ai-automation' },
  openGraph: {
    title: "AI & Automation | DigiFusion Knowledge Base",
    description:
      'Practical guides on deploying AI automation inside real SMB operations  -  from workflow mapping to agent deployment and ROI measurement.',
    type: "website",
    url: "https://www.digitafusion.com/blog/topics/ai-automation",
  },
};

const SUBTOPICS = [
  {
    title: "Workflow Automation",
    desc: "Identify and eliminate the manual steps draining your team's time  -  email triage, data entry, status updates and report generation.",
  },
  {
    title: "AI Agents & Orchestration",
    desc: "How to design, deploy and govern multi-step AI agents that take action across your existing tools without constant supervision.",
  },
  {
    title: "LLM Integration",
    desc: "Connecting large language models to your data sources, APIs and internal knowledge bases so they produce useful, accurate outputs.",
  },
  {
    title: "ROI & Measurement",
    desc: "Frameworks for quantifying automation value  -  time saved, error rates, capacity freed and revenue impact  -  so you can justify and scale.",
  },
  {
    title: "Prompt Engineering",
    desc: "Practical techniques for writing prompts that consistently produce the outputs your business needs across support, content and operations.",
  },
  {
    title: "No-Code & Low-Code Tools",
    desc: "When to reach for n8n, Make, Zapier or a custom build  -  and how to choose the right automation layer for your team\'s technical level.",
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: "AI & Automation  -  DigiFusion Topic Hub",
  description:
    'A curated collection of guides, tutorials and case studies on AI automation for SMBs.',
  url: "https://www.digitafusion.com/blog/topics/ai-automation",
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.digitafusion.com/#organization',
    name: "DigiFusion",
  },
};

export default async function AiAutomationTopicPage() {
  let posts: Awaited<ReturnType<typeof fetchBlogPosts>>['posts'] = [];
  try {
    const result = await fetchBlogPosts({ limit: 50 });
    posts = result.posts.filter(
      (p) => p.postType === 'how-to' || p.postType === 'guide' || p.postType === 'article'
    ).slice(0, 9);
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
          <span className="text-foreground">AI &amp; Automation</span>
        </div>
        <div className="max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Topic Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            AI &amp; Automation
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            The intelligence layer for your business. Every article here is about one thing:
            turning the hours your team spends on repetitive, manual work into capacity for
            the things that actually grow your business.
          </p>
        </div>
      </section>

      {/* What you will find */}
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

      {/* Pillar content */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-3">Start here</p>
            <h2 className="font-serif text-2xl font-bold mb-4">The SMB Automation Playbook</h2>
            <p className="text-muted leading-relaxed mb-6">
              A step-by-step framework for identifying, prioritising and deploying your first three
              automation workflows. Covers process mapping, tool selection, prompt design and measuring
              outcomes  -  without requiring a dedicated engineering team.
            </p>
            <div className="space-y-3 mb-6">
              {[
                'Map your highest-cost manual processes',
                'Choose the right automation tier (no-code / low-code / custom)',
                'Design prompts and logic that hold up under real load',
                'Measure time savings and error reduction from day one',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-accent/15 text-accent text-xs flex items-center justify-center font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
            <Link href="/blog?type=guide" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
              Browse all guides
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          <div className="rounded-2xl border border-border/40 p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">Key concepts</p>
            <h2 className="font-serif text-2xl font-bold mb-6">The automation stack</h2>
            <div className="space-y-4">
              {[
                { layer: 'Trigger layer', desc: 'Events that kick off a workflow  -  an email arrives, a form is submitted, a time window is reached.' },
                { layer: 'Logic layer', desc: 'Rules, conditions and AI inference that decide what should happen with each input.' },
                { layer: 'Action layer', desc: 'The tools that actually do the work  -  write to a CRM, send an email, update a record, generate a document.' },
                { layer: 'Human-in-the-loop', desc: 'Checkpoints where complex or high-stakes outputs pause for a human before continuing.' },
              ].map((item) => (
                <div key={item.layer} className="border-b border-border/30 pb-4 last:border-0 last:pb-0">
                  <p className="font-semibold text-sm text-foreground mb-1">{item.layer}</p>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
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
            <h2 className="font-serif text-2xl font-bold mb-4">Need help implementing this?</h2>
            <p className="text-muted mb-6 leading-relaxed">
              Reading about automation is one thing. Having someone map your specific processes
              and build the workflows is another. That&apos;s what we do.
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
