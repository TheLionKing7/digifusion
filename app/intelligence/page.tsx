import Link from 'next/link';

export const metadata = {
  title: 'Intelligence — Premium Knowledge & Tools',
  description:
    'Premium field guides, automation playbooks, research, and tools for business executives and SMB owners who move with intelligence.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence' },
  openGraph: {
    title: 'Intelligence — DigiFusion',
    description:
      'Operational manuals, automation playbooks, and precision tools built for decision-makers who need answers, not theory.',
    url: 'https://www.digitafusion.com/intelligence',
    type: 'website',
  },
};

const SECTIONS = [
  {
    id: 'field-guides',
    label: '01 — Field Guides',
    title: 'Field Guides',
    tagline: 'Operational manuals for executives who act on intelligence, not opinion.',
    description:
      'Premium books on advertising strategy, business development, and AI-driven growth. Written from the field, not the classroom. Each guide is a concentrated decision-making toolkit — the kind of insight that used to cost a consultant.',
    href: '/intelligence/field-guides',
    cta: 'Browse Field Guides',
    items: [
      { name: 'The Advertising Playbook', type: 'Book', tag: 'Advertising' },
      { name: 'AI Automation Masterclass', type: 'Ebook', tag: 'AI & Automation', badge: 'Coming Soon' },
      { name: 'The Prompt Library', type: 'Reference', tag: 'Prompts', badge: 'Coming Soon' },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 'playbooks',
    label: '02 — Automation Playbooks',
    title: 'Automation Playbooks',
    tagline: 'Industry-specific workflow systems you deploy, not just read.',
    description:
      'Structured automation packages by industry — from hospitality to law, logistics to creative agencies. Includes n8n/Make workflows, AI agent blueprints, prompt templates, and SOPs. Buy a playbook, implement it this week.',
    href: '/intelligence/playbooks',
    cta: 'Explore Playbooks',
    items: [
      { name: 'Hospitality Automation Suite', type: 'Workflow Pack', tag: 'Hospitality', badge: 'Coming Soon' },
      { name: 'Agency Operations Playbook', type: 'SOP + Workflows', tag: 'Agencies', badge: 'Coming Soon' },
      { name: 'SMB Lead Machine', type: 'Automation Bundle', tag: 'Sales', badge: 'Coming Soon' },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 'research',
    label: '03 — Research & Case Studies',
    title: 'Research & Case Studies',
    tagline: 'Evidence, not anecdote. Real numbers from real implementations.',
    description:
      'In-depth research papers, industry analysis, and implementation case studies. Understand the ROI of automation before you invest. Free access to selected reports; premium tier for full data packs and methodology breakdowns.',
    href: '/intelligence/research',
    cta: 'Read the Research',
    items: [
      { name: 'SMB Automation ROI Report 2025', type: 'Research Paper', tag: 'Automation' },
      { name: 'AI Adoption in African SMBs', type: 'Industry Study', tag: 'Africa' },
      { name: 'Content Systems That Compound', type: 'Case Study', tag: 'Content' },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 'tools',
    label: '04 — Tools & Extensions',
    title: 'Tools & Extensions',
    tagline: 'Lightweight precision instruments. Install once, compound forever.',
    description:
      'Browser extensions, Chrome tools, API utilities, and standalone micro-apps that solve one specific expensive problem. Priced between $9 and $29 — small enough to expense, powerful enough to replace a hire.',
    href: '/intelligence/tools',
    cta: 'See All Tools',
    items: [
      { name: 'SEO Audit Extension', type: 'Chrome Extension', tag: 'SEO', badge: 'Coming Soon' },
      { name: 'Prompt Optimizer', type: 'Web Tool', tag: 'AI', badge: 'Coming Soon' },
      { name: 'Workflow Mapper', type: 'Utility', tag: 'Automation', badge: 'Coming Soon' },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export default function IntelligencePage() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Intelligence — DigiFusion',
    description:
      'Premium field guides, automation playbooks, research, and tools for business executives and SMB owners.',
    url: 'https://www.digitafusion.com/intelligence',
    publisher: {
      '@type': 'Organization',
      name: 'DigiFusion',
      url: 'https://www.digitafusion.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(168,100%,42%) 1px, transparent 1px), linear-gradient(90deg, hsl(168,100%,42%) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            DigiFusion Intelligence
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mb-6">
            Knowledge That{' '}
            <span className="text-gradient">Moves Markets</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
            Premium operational intelligence for executives and SMB owners. Field guides written
            from the field. Automation playbooks built to deploy, not just read. Research backed
            by real implementations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/intelligence/field-guides"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Browse Field Guides
            </Link>
            <Link
              href="/intelligence/playbooks"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
            >
              Explore Playbooks
            </Link>
          </div>

          {/* Category pills */}
          <div className="mt-12 flex flex-wrap gap-3">
            {['Field Guides', 'Automation Playbooks', 'Research', 'Tools & Extensions'].map((c) => (
              <span
                key={c}
                className="text-xs px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Four Sections ── */}
      <div className="mx-auto max-w-7xl px-6 py-20 space-y-24">
        {SECTIONS.map((section, idx) => (
          <section key={section.id} id={section.id}>
            {/* Section header */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start gap-6 mb-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                  {section.label}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {section.title}
                </h2>
                <p className="text-accent font-medium text-sm mb-3 italic">{section.tagline}</p>
                <p className="text-muted leading-relaxed max-w-2xl">{section.description}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  {section.icon}
                </div>
              </div>
            </div>

            {/* Preview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl bg-surface-lighter border border-border/50 p-5 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
                      {item.tag}
                    </span>
                    {'badge' in item && item.badge && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-snug">{item.name}</p>
                  <p className="text-xs text-muted-dim">{item.type}</p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-4">
              <Link
                href={section.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                {section.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              {idx < SECTIONS.length - 1 && (
                <div className="flex-1 h-px bg-border/30 hidden sm:block" />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* ── Blog CTA ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                Free Intelligence
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Start with the Blog
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Before you invest in a Field Guide, explore the blog. Every article is a
                compressed excerpt from our larger body of work — written to give decision-makers
                a genuine edge, not just engagement.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
              >
                Explore the Blog
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'AI & Automation', href: '/blog/topics/ai-automation', desc: 'Workflows, agents, and what actually works' },
                { label: 'Digital Business', href: '/blog/topics/digital-business', desc: 'Products, monetisation, and growth' },
                { label: 'Content & Visibility', href: '/blog/topics/content-visibility', desc: 'SEO and content systems that compound' },
                { label: 'Field Guide Excerpts', href: '/blog?type=guide', desc: 'Sample chapters and methodology previews' },
              ].map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="glass-light rounded-xl p-4 hover:border-accent/30 hover:-translate-y-0.5 transition-all"
                >
                  <p className="font-semibold text-foreground text-sm mb-1">{t.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{t.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products CTA ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Beyond the Knowledge</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
            We Also Build the Tools
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Intelligence that stays in a book is worth less than intelligence deployed in a
            system. Our SaaS products are the applied layer of everything in this library.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            Explore Our Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
