import Link from 'next/link';
import { IntelligenceResourceCard } from '@/components/intelligence/resource-card';
import { RESEARCH_BLOG_LINKS } from '@/lib/constants/intelligence-catalog';
import { getCategoryCatalog } from '@/lib/intelligence/products';

export const metadata = {
  title: 'Research & Case Studies — Evidence-Based Intelligence',
  description:
    'Free executive briefs on the blog. Premium research packs with full methodology, data, and implementation models.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/research' },
};

const FREE_BRIEFS = [
  {
    slug: 'smb-automation-roi-2025',
    title: 'Why Most AI Automation Projects Fail Before Go-Live',
    type: 'Executive Brief',
    tag: 'Automation',
    summary: 'The AVE diagnostic framework applied to the 70% failure rate — diagnose first, architect second, build third.',
    highlights: ['Automation Opportunity Matrix', 'Process readiness scoring', 'One-week diagnostic plan'],
  },
  {
    slug: 'ai-adoption-african-smbs',
    title: 'Rewiring the African C-Suite: AI-First Playbook',
    type: 'Executive Brief',
    tag: 'Africa · C-Suite',
    summary: 'Africa\'s AI challenge is execution, not adoption. A playbook for Nigeria, Ghana, Kenya, and South Africa.',
    highlights: ['C-suite restructuring lever', 'One-number KPI discipline', 'AVE-aligned implementation'],
  },
  {
    slug: 'content-systems-that-compound',
    title: 'Pillar Pages Without Clusters Burn Budget',
    type: 'Case Study',
    tag: 'Content Strategy',
    summary: 'Topical authority requires architecture, not volume. The C2C pillar-cluster model in practice.',
    highlights: ['ICP search journey map', 'Cluster minimum viable set', 'Content ROI attribution'],
  },
  {
    slug: 'affiliateos-infrastructure-teaser',
    title: 'Your Followers Are Ready to Buy. Your Infrastructure Is Killing the Sale.',
    type: 'Executive Brief',
    tag: 'AffiliateOS · Creator Commerce',
    summary: 'Why browser redirects destroy 82% of buyer intent on African mobile — and the headless settlement architecture that closes the gap.',
    highlights: ['Intent decay model C(t)=C₀·e^(−λt)', '4.9× settlement yield vs link-in-bio', 'WhatsApp-native checkout rail'],
  },
];

const UPCOMING = [
  { title: 'The True Cost of Manual Operations', tag: 'Operations', teaser: 'Cost model by function, team size, and sector.' },
];

export default async function ResearchPage() {
  const catalog = await getCategoryCatalog('research');
  const premium = catalog.filter((c) => c.sku.status === 'available');

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Research &amp; Case Studies</span>
        </nav>
      </div>

      <section className="border-b border-border/40 bg-[#080c10]">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Research &amp; Case Studies</h1>
          <p className="text-accent/80 italic mb-2">Evidence, not anecdote.</p>
          <p className="text-muted max-w-2xl">
            Free executive briefs on the blog. Premium data packs with full methodology for operators who need the complete picture.
          </p>
        </div>
      </section>

      {/* Free briefs */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-surface border border-border/40 text-muted">Tier 01 — Free</span>
          <div className="flex-1 h-px bg-border/30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FREE_BRIEFS.map((item) => {
            const blogSlug = RESEARCH_BLOG_LINKS[item.slug];
            return (
              <article key={item.slug} className="rounded-2xl border border-border/50 bg-surface-lighter/40 p-6 flex flex-col">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold w-fit mb-4">{item.tag}</span>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-xs text-muted-dim mb-2">{item.type}</p>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{item.summary}</p>
                <ul className="space-y-1 mb-5">
                  {item.highlights.map((h) => (
                    <li key={h} className="text-xs text-muted flex gap-2"><span className="text-accent">→</span>{h}</li>
                  ))}
                </ul>
                {blogSlug ? (
                  <Link href={`/blog/${blogSlug}`} className="text-xs font-semibold text-accent hover:underline">
                    Read executive brief →
                  </Link>
                ) : (
                  <span className="text-xs text-muted">Coming soon</span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Premium packs */}
      {premium.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-border/40">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Tier 02 — Licensed
            </span>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {premium.map(({ sku, shopProduct }) => (
              <IntelligenceResourceCard key={sku.slug} sku={sku} shopProduct={shopProduct} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-t border-border/40">
        <h2 className="font-serif text-xl font-bold text-muted mb-6">In Research</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {UPCOMING.map((u) => (
            <div key={u.title} className="rounded-xl border border-border/40 p-5 opacity-75">
              <span className="text-[10px] text-muted">{u.tag}</span>
              <p className="font-semibold text-foreground mt-1">{u.title}</p>
              <p className="text-xs text-muted mt-2">{u.teaser}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
