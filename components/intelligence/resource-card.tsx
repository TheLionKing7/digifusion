import Link from 'next/link';
import type { IntelligenceSku } from '@/lib/constants/intelligence-catalog';
import type { Product } from '@/types/shop';
import { formatMoney } from '@/lib/utils/money';

type Props = {
  sku: IntelligenceSku;
  shopProduct?: Product | null;
  currency?: 'USD' | 'NGN' | 'GBP';
};

const TIER_STYLES: Record<string, string> = {
  licensed: 'border-border/60 bg-[#0d1117]/80',
  pass:     'border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent',
  firm:     'border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-transparent',
  free:     'border-border/40 bg-surface-lighter/50',
};

export function IntelligenceResourceCard({ sku, shopProduct, currency = 'USD' }: Props) {
  const isAvailable = sku.status === 'available' && (shopProduct || sku.shopReady);
  const priceMinor = shopProduct?.prices?.[currency] ?? sku.prices[currency] ?? sku.prices.USD;
  const shopHref = shopProduct ? `/shop/${shopProduct.slug}` : `/shop/${sku.slug}`;
  const primaryHref = sku.experienceHref || shopHref;
  const primaryLabel = sku.experienceHref ? 'Open case study' : 'Get Access';
  const cardStyle = TIER_STYLES[sku.tier] || TIER_STYLES.licensed;

  return (
    <article
      className={`group relative rounded-2xl border p-7 flex flex-col h-full transition-all duration-300 hover:border-accent/25 hover:-translate-y-0.5 ${cardStyle}`}
    >
      {/* Paywall accent */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold uppercase tracking-wider">
            {sku.tag}
          </span>
          {sku.framework && (
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted font-medium">
              {sku.framework}
            </span>
          )}
        </div>
        {!isAvailable ? (
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted shrink-0">
            {sku.status === 'waitlist' ? 'Waitlist' : 'Coming Soon'}
          </span>
        ) : (
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold shrink-0 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Licensed
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl font-bold text-foreground leading-snug mb-1 group-hover:text-accent transition-colors">
        {sku.name}
      </h3>
      {sku.subtitle && (
        <p className="text-sm text-accent/80 italic mb-3">{sku.subtitle}</p>
      )}
      <p className="text-sm text-muted leading-relaxed flex-1 mb-5">{sku.description}</p>

      {sku.includes && sku.includes.length > 0 && (
        <ul className="space-y-1.5 mb-5 border-t border-border/30 pt-4">
          {sku.includes.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted">
              <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
          {sku.includes.length > 4 && (
            <li className="text-[10px] text-muted-dim pl-3">+{sku.includes.length - 4} more</li>
          )}
        </ul>
      )}

      <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between gap-4">
        <div>
          {isAvailable && priceMinor != null ? (
            <p className="font-serif text-2xl font-bold text-foreground">
              {formatMoney(priceMinor, currency, { compact: true })}
              {sku.tier === 'pass' && (
                <span className="text-xs text-muted font-sans font-normal ml-1">/yr</span>
              )}
            </p>
          ) : (
            <p className="text-sm text-muted">Notify when available</p>
          )}
          {sku.pages && <p className="text-[10px] text-muted-dim mt-0.5">{sku.pages}</p>}
        </div>

        {isAvailable ? (
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-background text-xs font-semibold hover:opacity-90 transition-opacity shrink-0"
          >
            {primaryLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`mailto:enquiries@digitafusion.com?subject=Waitlist: ${encodeURIComponent(sku.name)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline shrink-0"
          >
            Join Waitlist
          </Link>
        )}
      </div>
    </article>
  );
}
