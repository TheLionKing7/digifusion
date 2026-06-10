import Link from 'next/link';
import { IntelligenceResourceCard } from '@/components/intelligence/resource-card';
import { IntelligencePricingTiers } from '@/components/intelligence/pricing-tiers';
import { INTELLIGENCE_SKUS } from '@/lib/constants/intelligence-catalog';
import { listProductsByCategory } from '@/lib/shop/products';
import { mergeSkuWithShop } from '@/lib/intelligence/products';

export const metadata = {
  title: 'Intelligence Pricing — Licensed IP & Access',
  description:
    'License DigiFusion proprietary frameworks: AVE, Deal Engine, C2C, and Engagement Model. Individual playbooks from $49 or Intelligence Pass at $497/year.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/pricing' },
};

export default async function IntelligencePricingPage() {
  const products = await listProductsByCategory();
  const available = INTELLIGENCE_SKUS.filter((s) => s.status === 'available');
  const bundles = available.filter((s) => s.category === 'bundle');
  const licensed = available.filter((s) => s.category !== 'bundle' && s.category !== 'tool');

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Pricing &amp; Access</span>
        </nav>
      </div>

      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            Licensed IP · Instant Access
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight max-w-3xl mb-4">
            Frameworks You Deploy —{' '}
            <span className="text-gradient">Not Slide Decks</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Each product is implementation-ready IP from our agency practice: workflow files,
            SOPs, scorecards, and setup guides. Purchase once, download immediately, deploy this week.
          </p>
        </div>
      </section>

      <IntelligencePricingTiers />

      {/* Bundles */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-serif text-2xl font-bold mb-2">Membership &amp; Firm Access</h2>
        <p className="text-sm text-muted mb-8 max-w-xl">
          For operators who want the full library or leadership teams standardising on DigiFusion frameworks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {bundles.map((sku) => (
            <IntelligenceResourceCard
              key={sku.slug}
              sku={sku}
              shopProduct={mergeSkuWithShop(sku, products)}
            />
          ))}
        </div>
      </section>

      {/* Licensed catalog */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-border/40">
        <h2 className="font-serif text-2xl font-bold mb-2">Licensed Playbooks &amp; Guides</h2>
        <p className="text-sm text-muted mb-8 max-w-xl">
          Core monetizable IP mapped to our four operating frameworks plus field guides and research packs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licensed.map((sku) => (
            <IntelligenceResourceCard
              key={sku.slug}
              sku={sku}
              shopProduct={mergeSkuWithShop(sku, products)}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Need Custom IP?</p>
          <h2 className="font-serif text-2xl font-bold mb-4">Agency Builds Bespoke Playbooks</h2>
          <p className="text-muted max-w-lg mx-auto mb-6">
            If your industry isn&apos;t covered, we map your workflows and build a custom automation system —
            then hand you the full playbook as part of the engagement.
          </p>
          <Link href="/agency/booking" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm">
            Book a Strategy Session
          </Link>
        </div>
      </section>
    </>
  );
}
