'use client';

import Link from 'next/link';
import { useCurrency } from '@/lib/shop/currency-context';
import { formatMoney, priceIn, availableCurrencies } from '@/lib/utils/money';
import type { Product } from '@/types/shop';

const TYPE_LABEL: Record<Product['type'], string> = {
  download:     'Download',
  subscription: 'Subscription',
  service:      'Service',
  saas:         'SaaS',
};

export function ProductCard({ product }: { product: Product }) {
  const { currency } = useCurrency();
  const price = priceIn(product.prices, currency);
  const fallbackCurrency = availableCurrencies(product.prices)[0];
  const displayPrice = price ?? (fallbackCurrency ? product.prices[fallbackCurrency] : undefined);
  const displayCurrency = price ? currency : fallbackCurrency;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col h-full rounded-xl bg-surface border border-border hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-surface-lighter via-surface to-surface">
        {product.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- dynamic product cover URLs from CMS
          <img
            src={product.cover_image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-accent/15">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-background/70 backdrop-blur-sm border border-accent/30 text-accent">
          {TYPE_LABEL[product.type]}
          {product.recurring && ` · ${product.recurring}`}
        </span>
        {product.featured && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-accent/15 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif font-bold text-lg leading-snug text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">{product.description}</p>
        )}

        <div className="mt-auto pt-4 flex items-end justify-between gap-3">
          <div>
            {displayPrice != null && displayCurrency ? (
              <p className="font-serif text-2xl font-bold text-foreground">
                {formatMoney(displayPrice, displayCurrency, { compact: true })}
                {product.recurring && (
                  <span className="text-xs text-muted ml-1 font-sans font-normal">/{product.recurring === 'monthly' ? 'mo' : 'yr'}</span>
                )}
              </p>
            ) : (
              <p className="text-sm text-muted">Contact for pricing</p>
            )}
            {!price && displayCurrency && displayCurrency !== currency && (
              <p className="text-[11px] text-muted/70 mt-0.5">
                Not available in {currency} — shown in {displayCurrency}
              </p>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
            View
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
