import Link from 'next/link';
import { IntelligencePricingTiers } from '@/components/intelligence/pricing-tiers';
import { IntelligenceResourceCard } from '@/components/intelligence/resource-card';
import { INTELLIGENCE_SKUS } from '@/lib/constants/intelligence-catalog';
import { listProductsByCategory } from '@/lib/shop/products';
import { mergeSkuWithShop } from '@/lib/intelligence/products';

export const metadata = {
  title: 'Intelligence — Licensed IP & Executive Resources',
  description:
    'McKinsey-grade operational intelligence for executives. License AVE, Deal Engine, C2C, and Engagement Model playbooks — or start free with research briefs.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence' },
  openGraph: {
    title: 'DigiFusion Intelligence — Licensed Frameworks',
    description: 'Paywalled playbooks, field guides, and research packs built to deploy — not just read.',
    url: 'https://www.digitafusion.com/intelligence',
    type: 'website',
  },
};

const SECTIONS = [
  { id: 'field-guides', label: '01 — Field Guides', title: 'Field Guides', href: '/intelligence/field-guides', tagline: 'Operational manuals for executives who act on intelligence, not opinion.' },
  { id: 'playbooks', label: '02 — Playbooks', title: 'Automation Playbooks', href: '/intelligence/playbooks', tagline: 'Industry workflow systems you deploy, not just read.' },
  { id: 'research', label: '03 — Research', title: 'Research & Case Studies', href: '/intelligence/research', tagline: 'Evidence, not anecdote. Free briefs; premium data packs.' },
  { id: 'tools', label: '04 — Tools', title: 'Tools & Extensions', href: '/intelligence/tools', tagline: 'Precision instruments for operators.' },
];

export default async function IntelligencePage() {
  const products = await listProductsByCategory();
  const featured = INTELLIGENCE_SKUS.filter((s) => s.featured && s.status === 'available').slice(0, 4);

  return (
    <>
      {/* Hero — McKinsey restraint */}
      <section className="relative overflow-hidden border-b border-border/40 bg-[#080c10]">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(168,100%,42%) 1px, transparent 1px), linear-gradient(90deg, hsl(168,100%,42%) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20 relative">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-4">
            DigiFusion Intelligence Library
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mb-6">
            Licensed IP for{' '}
            <span className="text-gradient">Operators Who Execute</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
            Proprietary frameworks from our agency practice — AVE, Deal Engine, Content-to-Capital,
            and Engagement Model OS. Purchase once. Download immediately. Deploy this week.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/intelligence/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              View Pricing &amp; Access
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
            >
              Free Executive Briefs
            </Link>
          </div>
          <p className="mt-8 text-xs text-muted-dim">
            Trusted by SMB operators and agency clients · Instant secure download · 72h access window
          </p>
        </div>
      </section>

      {/* Featured licensed IP */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">Featured IP</p>
            <h2 className="font-serif text-3xl font-bold">Core Frameworks — Ready to License</h2>
          </div>
          <Link href="/intelligence/pricing" className="text-sm font-semibold text-accent hover:underline shrink-0">
            Full catalog →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((sku) => (
            <IntelligenceResourceCard
              key={sku.slug}
              sku={sku}
              shopProduct={mergeSkuWithShop(sku, products)}
            />
          ))}
        </div>
      </section>

      <IntelligencePricingTiers />

      {/* Four sections */}
      <div className="mx-auto max-w-7xl px-6 py-20 space-y-16">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="border-t border-border/30 pt-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">{section.label}</p>
            <h2 className="font-serif text-2xl font-bold mb-2">{section.title}</h2>
            <p className="text-sm text-accent/80 italic mb-4">{section.tagline}</p>
            <Link href={section.href} className="text-sm font-semibold text-accent hover:underline">
              Explore {section.title} →
            </Link>
          </section>
        ))}
      </div>

      {/* Free layer CTA */}
      <section className="border-t border-border/40 bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Tier 01 — Free</p>
            <h2 className="font-serif text-3xl font-bold mb-4">Executive Briefs on the Blog</h2>
            <p className="text-muted leading-relaxed">
              Compressed insight from our larger body of work. Enough to diagnose whether you need the licensed IP.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'AI & Automation', href: '/blog/topics/ai-automation' },
              { label: 'Digital Business', href: '/blog/topics/digital-business' },
              { label: 'Content & Visibility', href: '/blog/topics/content-visibility' },
              { label: 'All Articles', href: '/blog' },
            ].map((t) => (
              <Link key={t.label} href={t.href} className="glass-light rounded-xl p-4 hover:border-accent/30 transition-all">
                <p className="font-semibold text-sm text-foreground">{t.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
