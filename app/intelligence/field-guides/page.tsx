import Link from 'next/link';
import { IntelligenceResourceCard } from '@/components/intelligence/resource-card';
import { getCategoryCatalog } from '@/lib/intelligence/products';

export const metadata = {
  title: 'Field Guides — Premium Executive Manuals',
  description:
    'Licensed field guides on advertising, AI automation, and business development — operational manuals, not motivation.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/field-guides' },
};

export default async function FieldGuidesPage() {
  const catalog = await getCategoryCatalog('field-guide');
  const available = catalog.filter((c) => c.sku.status === 'available');
  const upcoming = catalog.filter((c) => c.sku.status !== 'available');

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Field Guides</span>
        </nav>
      </div>

      <section className="relative overflow-hidden border-b border-border/40 bg-[#080c10]">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Licensed Manuals</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold max-w-3xl mb-4">Field Guides</h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed italic text-accent/80 mb-2">
            Operational manuals for executives who act on intelligence, not opinion.
          </p>
          <p className="text-base text-muted max-w-2xl">
            Premium books and reference libraries — the kind of insight that used to require a consultant.
            Purchase once, download immediately.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {available.map(({ sku, shopProduct }) => (
            <IntelligenceResourceCard key={sku.slug} sku={sku} shopProduct={shopProduct} />
          ))}
        </div>

        {upcoming.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-xl font-bold mb-6 text-muted">In Development</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-70">
              {upcoming.map(({ sku, shopProduct }) => (
                <IntelligenceResourceCard key={sku.slug} sku={sku} shopProduct={shopProduct} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
