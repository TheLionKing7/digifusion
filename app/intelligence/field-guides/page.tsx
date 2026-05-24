import Link from 'next/link';

export const metadata = {
  title: 'Field Guides — Premium Books on Advertising, AI & Business',
  description:
    'Operational manuals for executives and SMB owners. Premium books on advertising strategy, AI automation, and business development — written from the field.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/field-guides' },
  openGraph: {
    title: 'Field Guides — DigiFusion Intelligence',
    description:
      'Premium books and reference guides that function as operational manuals, not motivation. Real frameworks, real decisions.',
    url: 'https://www.digitafusion.com/intelligence/field-guides',
    type: 'website',
  },
};

const GUIDES = [
  {
    slug: 'advertising-playbook',
    title: 'The Advertising Playbook',
    subtitle: 'Vol. 1 — Strategic Advertising for the Modern Business',
    description:
      'A field-tested guide to advertising strategy for SMBs and growth-stage businesses. Covers media selection, message architecture, campaign budgeting, and measuring what actually matters. Used as a reference manual by marketing leads across three sectors.',
    tag: 'Advertising',
    type: 'Premium Book',
    pages: '180+',
    available: true,
    price: 'Coming Soon',
  },
  {
    slug: 'advertising-playbook-vol2',
    title: 'The Advertising Playbook',
    subtitle: 'Vol. 2 — Digital-First Advertising Systems',
    description:
      'The second volume goes deeper on digital channels — programmatic, social, content-led, and performance marketing. Includes attribution models, retargeting logic, and a complete creative brief framework.',
    tag: 'Advertising',
    type: 'Premium Book',
    pages: '200+',
    available: false,
    price: 'Coming Soon',
    badge: 'In Development',
  },
  {
    slug: 'advertising-playbook-vol3',
    title: 'The Advertising Playbook',
    subtitle: 'Vol. 3 — Brand Building in a Distracted Age',
    description:
      'The third volume addresses long-term brand equity for businesses that want to be remembered, not just clicked. Covers brand architecture, positioning, voice systems, and the full-funnel integration of brand and performance.',
    tag: 'Advertising',
    type: 'Premium Book',
    pages: '160+',
    available: false,
    price: 'Coming Soon',
    badge: 'In Development',
  },
  {
    slug: 'ai-automation-masterclass',
    title: 'AI Automation Masterclass',
    subtitle: 'The Complete Guide to Building AI-Powered Business Systems',
    description:
      'A comprehensive guide for business owners and operators who want to build real automation systems — not toy demos. Covers workflow design, tool selection, AI agent architecture, prompt engineering fundamentals, and implementation roadmaps by business type.',
    tag: 'AI & Automation',
    type: 'Ebook',
    pages: '220+',
    available: false,
    price: 'Coming Soon',
    badge: 'Coming Soon',
  },
  {
    slug: 'prompt-library',
    title: 'The Executive Prompt Library',
    subtitle: 'Battle-Tested Prompts for Strategy, Operations & Content',
    description:
      'A curated reference library of 300+ categorised prompts for business use. Each prompt includes a rationale, customisation variables, and example outputs. Organised by function: strategy, operations, marketing, sales, content, and leadership.',
    tag: 'Prompts',
    type: 'Reference Library',
    pages: '300+ prompts',
    available: false,
    price: 'Coming Soon',
    badge: 'Coming Soon',
  },
];

export default function FieldGuidesPage() {
  const available = GUIDES.filter((g) => g.available);
  const upcoming = GUIDES.filter((g) => !g.available);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Field Guides</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Intelligence / Field Guides</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">
            Field Guides
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-2 italic font-medium text-accent/80">
            Operational manuals for executives who act on intelligence, not opinion.
          </p>
          <p className="text-base text-muted max-w-2xl leading-relaxed">
            These are not motivational reads. They are decision-making instruments — compressed
            expertise from real implementations, structured for busy operators who need answers
            and frameworks they can act on immediately.
          </p>
        </div>
      </section>

      {/* ── Available Guides ── */}
      {available.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-8">Available Now</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {available.map((guide) => (
              <div
                key={guide.slug}
                className="group rounded-2xl bg-surface-lighter border border-border/50 hover:border-accent/40 transition-all p-7 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
                    {guide.tag}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted">
                    {guide.type}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted font-medium mb-3">{guide.subtitle}</p>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{guide.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="text-xs text-muted">{guide.pages} pages</span>
                  <span className="text-sm font-semibold text-accent">{guide.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Coming Soon ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-8">Coming Soon</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((guide) => (
              <div
                key={guide.slug}
                className="rounded-2xl bg-surface border border-border/40 p-7 flex flex-col opacity-80"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/5 text-accent/70 border border-accent/10 font-semibold">
                    {guide.tag}
                  </span>
                  {guide.badge && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface-lighter border border-border/40 text-muted">
                      {guide.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">{guide.title}</h3>
                <p className="text-xs text-muted font-medium mb-3">{guide.subtitle}</p>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{guide.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="text-xs text-muted">{guide.pages}</span>
                  <span className="text-xs font-medium text-muted">{guide.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agency CTA ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Need Custom Implementation?</p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Turn a Field Guide into a Live System
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-6 text-sm leading-relaxed">
            Our agency team can take any framework from these guides and implement it inside your
            business — custom-built, fully deployed, and handed over with documentation.
          </p>
          <Link
            href="/agency/booking"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            Book a Strategy Session
          </Link>
        </div>
      </section>
    </>
  );
}
