import Link from 'next/link';
import { ACCESS_TIERS } from '@/lib/constants/intelligence-catalog';

export function IntelligencePricingTiers() {
  return (
    <section className="border-t border-border/40 bg-[#080c10]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Access Model
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Paywalled Intelligence,{' '}
            <span className="text-gradient">Not Generic Content</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto leading-relaxed">
            Start free with executive briefs. License the frameworks your team will actually deploy.
            Upgrade to the Intelligence Pass when you want the full library without agency fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACCESS_TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-6 flex flex-col ${
                tier.id === 'pass'
                  ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20'
                  : 'border-border/50 bg-surface-lighter/30'
              }`}
            >
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">
                Tier {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">{tier.label}</h3>
              <p className="font-serif text-2xl font-bold text-accent mb-3">{tier.priceLabel}</p>
              <p className="text-xs text-muted leading-relaxed mb-5 flex-1">{tier.description}</p>
              <ul className="space-y-2 mb-6">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted">
                    <span className="text-accent mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              {tier.id === 'free' ? (
                <Link href="/blog" className="text-xs font-semibold text-accent hover:underline">
                  Start with the blog →
                </Link>
              ) : tier.id === 'firm' ? (
                <Link href="/agency/booking" className="text-xs font-semibold text-accent hover:underline">
                  Book firm license call →
                </Link>
              ) : (
                <Link href="/intelligence/pricing" className="text-xs font-semibold text-accent hover:underline">
                  View catalog →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
