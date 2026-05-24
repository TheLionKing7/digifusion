import Link from 'next/link';

export const metadata = {
  title: 'Tools & Extensions — Precision Utilities for SMB Operators',
  description:
    'Lightweight tools, browser extensions, and utilities for business owners and operators. Small enough to expense, powerful enough to replace a hire.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/tools' },
  openGraph: {
    title: 'Tools & Extensions — DigiFusion Intelligence',
    description:
      'Precision instruments for operators. Install once, compound forever.',
    url: 'https://www.digitafusion.com/intelligence/tools',
    type: 'website',
  },
};

const TOOLS = [
  {
    slug: 'seo-audit-extension',
    name: 'SEO Audit Extension',
    type: 'Chrome Extension',
    tag: 'SEO',
    tagline: 'On-page SEO analysis in one click, without leaving the page.',
    description:
      'Runs a full on-page SEO audit on any URL — title tags, meta descriptions, heading structure, image alt text, page speed signals, and keyword density. Outputs a prioritised fix list with severity ratings.',
    price: '$12',
    badge: 'Coming Soon',
  },
  {
    slug: 'prompt-optimizer',
    name: 'Prompt Optimizer',
    type: 'Web Tool',
    tag: 'AI Prompts',
    tagline: 'Turn a vague instruction into a precision prompt in 30 seconds.',
    description:
      'A structured prompt improvement tool that analyses your draft prompt across 6 dimensions — clarity, specificity, role framing, output format, constraints, and context — and rewrites it with annotations explaining each improvement.',
    price: '$9',
    badge: 'Coming Soon',
  },
  {
    slug: 'workflow-mapper',
    name: 'Workflow Mapper',
    type: 'Web Utility',
    tag: 'Automation',
    tagline: 'Map your business workflows before you automate them.',
    description:
      'A structured mapping tool that takes a business process description and generates a visual workflow diagram with automation touchpoints identified. Export as PNG or import directly into n8n/Make. Built for operations leads who need to document before they build.',
    price: '$19',
    badge: 'Coming Soon',
  },
  {
    slug: 'content-brief-generator',
    name: 'Content Brief Generator',
    type: 'Web Tool',
    tag: 'Content',
    tagline: 'Brief writers like a professional editor, not a guessing game.',
    description:
      'Enter a topic, target keyword, and audience. Receive a structured content brief with recommended headings, search intent analysis, competitor gap notes, and a word count target. Outputs a brief your writer can execute without a follow-up call.',
    price: '$9',
    badge: 'Coming Soon',
  },
  {
    slug: 'invoice-recovery-kit',
    name: 'Invoice Recovery Kit',
    type: 'Email Sequence + Template',
    tag: 'Operations',
    tagline: 'Recover unpaid invoices without the awkward phone call.',
    description:
      'A complete follow-up email sequence for overdue invoices. Five-email sequence template with variable fields, tone guides for each stage, and a WhatsApp follow-up script. Written by a business development specialist. Available as a downloadable template pack.',
    price: '$9',
    badge: 'Coming Soon',
  },
  {
    slug: 'competitor-audit-template',
    name: 'Competitor Audit Template',
    type: 'Spreadsheet + Guide',
    tag: 'Strategy',
    tagline: 'Analyse any competitor in under two hours using a structured framework.',
    description:
      'A Google Sheets template and 12-step audit guide for analysing competitors across digital presence, pricing, messaging, content strategy, and customer reviews. Includes an AI prompt pack for automating research steps.',
    price: '$12',
    badge: 'Coming Soon',
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Tools & Extensions</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Intelligence / Tools & Extensions</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">
            Tools & Extensions
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-2 italic font-medium text-accent/80">
            Lightweight precision instruments. Install once, compound forever.
          </p>
          <p className="text-base text-muted max-w-2xl leading-relaxed">
            Each tool solves exactly one expensive operational problem. Priced between $9 and
            $29 — small enough to expense immediately, specific enough to generate returns the
            week you deploy it.
          </p>

          {/* Pricing note */}
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-foreground bg-surface-lighter border border-border/40 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent" />
              All tools: $9 – $29
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground bg-surface-lighter border border-border/40 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              One-time purchase, no subscription
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools Grid ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <div
              key={tool.slug}
              className="rounded-2xl bg-surface-lighter border border-border/50 p-7 flex flex-col group opacity-85"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
                  {tool.tag}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted">
                  {tool.badge}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">{tool.name}</h3>
              <p className="text-[11px] text-muted font-medium mb-3 uppercase tracking-wide">{tool.type}</p>
              <p className="text-xs text-accent italic font-medium mb-3">{tool.tagline}</p>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-5">{tool.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <span className="text-lg font-bold text-foreground">{tool.price}</span>
                <span className="text-xs text-muted">One-time</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SaaS products bridge ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Beyond Utilities</p>
              <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
                Need a Full System?
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Tools solve specific problems. Our SaaS products replace entire operational
                functions. If you need more than a utility — a full AI-powered receptionist,
                a cost-estimation engine, or a marketing assistant that lives inside WhatsApp
                — the Products section is where to look.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
                >
                  Explore SaaS Products
                </Link>
                <Link
                  href="/agency/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
                >
                  Book a Strategy Session
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'SabiWork', desc: 'AI cost-estimator for artisans', href: '/products/sabiwork' },
                { name: 'Receptra', desc: 'AI receptionist for hospitality & law', href: '/products/receptra' },
                { name: 'AdPilot', desc: 'AI marketing inside WhatsApp', href: '/products/adpilot' },
              ].map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className="glass-light rounded-xl p-5 hover:border-accent/30 hover:-translate-y-0.5 transition-all text-center"
                >
                  <p className="font-semibold text-foreground text-sm mb-1">{p.name}</p>
                  <p className="text-[11px] text-muted leading-snug">{p.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
