'use client';

import { useState } from 'react';
import { CurrencyProvider } from '@/lib/shop/currency-context';
import { CurrencyPicker } from '@/components/shop/currency-picker';
import { CartButton } from '@/components/shop/cart-button';
import { ProductCard } from '@/components/shop/product-card';
import { RevealOnScroll } from '@/components/animations/reveal-on-scroll';
import type { Product, ProductType } from '@/types/shop';

const TYPES: { value: ProductType | ''; label: string }[] = [
  { value: '',             label: 'All' },
  { value: 'download',     label: 'Downloads' },
  { value: 'service',      label: 'Services' },
  { value: 'subscription', label: 'Subscriptions' },
];

export function ShopGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<ProductType | ''>('');

  const counts: Record<string, number> = { '': products.length };
  for (const p of products) counts[p.type] = (counts[p.type] || 0) + 1;

  const filtered = filter ? products.filter((p) => p.type === filter) : products;

  return (
    <CurrencyProvider>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-16">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Shop</p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Tools for the intelligence layer
                </h1>
                <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
                  Downloads, services, and subscriptions that move the needle — paid in your currency,
                  delivered as soon as the payment clears.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Filters bar */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 flex-1">
              {TYPES.map((t) => {
                const active = t.value === filter;
                const count = counts[t.value] || 0;
                return (
                  <button
                    key={t.value || 'all'}
                    type="button"
                    onClick={() => setFilter(t.value)}
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                        : 'bg-surface text-muted hover:text-foreground hover:bg-surface-lighter border border-border/40'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-accent-foreground/15 text-accent-foreground' : 'bg-background/60 text-muted/80'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <CurrencyPicker />
              <CartButton />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          {filtered.length === 0 ? (
            <div className="text-center py-24 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold mb-2">
                {filter ? 'No products in this category yet' : 'No products yet'}
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                {filter
                  ? 'Try a different filter, or come back soon — new tools land regularly.'
                  : 'We&rsquo;re just getting set up. Check back in a few days.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <RevealOnScroll key={p.id} delay={i * 50}>
                  <ProductCard product={p} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </div>
    </CurrencyProvider>
  );
}
