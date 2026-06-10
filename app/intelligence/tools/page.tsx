import Link from 'next/link';
import { IntelligenceResourceCard } from '@/components/intelligence/resource-card';
import { getCategoryCatalog } from '@/lib/intelligence/products';

export const metadata = {
  title: 'Tools & Extensions — Operator Utilities',
  description:
    'Lightweight precision tools for SEO, workflow mapping, and prompt optimisation. Licensed utilities from $19.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/tools' },
};

export default async function ToolsPage() {
  const catalog = await getCategoryCatalog('tool');

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Tools &amp; Extensions</span>
        </nav>
      </div>

      <section className="border-b border-border/40 bg-[#080c10]">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Tools &amp; Extensions</h1>
          <p className="text-muted max-w-2xl">
            Small enough to expense. Powerful enough to replace a hire. Priced $19–$49 — licensed, not subscription-bloated.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalog.map(({ sku, shopProduct }) => (
            <IntelligenceResourceCard key={sku.slug} sku={sku} shopProduct={shopProduct} />
          ))}
        </div>
      </section>
    </>
  );
}
