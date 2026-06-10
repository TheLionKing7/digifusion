import Link from 'next/link';

export const metadata = {
  title: 'Research & Case Studies — AI Automation Findings',
  description:
    'In-depth research, industry analysis, and real implementation case studies from DigiFusion. Evidence-based intelligence for SMB decision-makers.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/research' },
  openGraph: {
    title: 'Research & Case Studies — DigiFusion Intelligence',
    description:
      'Real numbers from real implementations. Research that earns decision-maker trust before the conversation begins.',
    url: 'https://www.digitafusion.com/intelligence/research',
    type: 'website',
  },
};

const FEATURED = [
  {
    slug: 'smb-automation-roi-2025',
    title: 'SMB Automation ROI Report 2025',
    type: 'Research Paper',
    tag: 'Automation',
    summary:
      'An analysis of automation ROI across 40 SMB implementations in service, retail, and professional sectors. Covers average time savings, cost reduction, and the top 5 workflow categories delivering the fastest payback.',
    highlights: ['Average 12hr/week saved per business', '3.2x average ROI at 6 months', 'Top category: customer intake automation'],
    access: 'Free',
    available: true,
    publishedAt: '2025',
  },
  {
    slug: 'ai-adoption-african-smbs',
    title: 'AI Adoption in African SMBs: Barriers & Opportunities',
    type: 'Industry Study',
    tag: 'Africa',
    summary:
      'A landscape study of AI adoption across small and medium businesses in Nigeria, Ghana, Kenya, and South Africa. Identifies the infrastructure, cost, and skill barriers, and surfaces the highest-leverage entry points for SMBs in each market.',
    highlights: ['Surveyed 150+ SMB owners', 'WhatsApp automation leads adoption', 'Cost remains the #1 barrier'],
    access: 'Free',
    available: true,
    publishedAt: '2025',
  },
  {
    slug: 'content-systems-that-compound',
    title: 'Content Systems That Compound: A 12-Month Study',
    type: 'Case Study',
    tag: 'Content Strategy',
    summary:
      'A longitudinal study tracking three businesses through a 12-month content system build. Documents traffic growth, lead attribution, and the compounding effect of SEO-led content versus paid acquisition over the same period.',
    highlights: ['3 businesses, 12 months each', '4.1x organic traffic growth (average)', 'Content ROI exceeded paid at month 7'],
    access: 'Free',
    available: true,
    publishedAt: '2025',
  },
];

const UPCOMING = [
  {
    title: 'The True Cost of Manual Operations',
    type: 'Cost Analysis',
    tag: 'Operations',
    teaser: 'A cost model for calculating what unautomated operations are actually costing your business — broken down by function, team size, and sector.',
  },
  {
    title: 'WhatsApp as a Business Layer: ROI Analysis',
    type: 'Channel Study',
    tag: 'WhatsApp',
    teaser: 'How businesses using WhatsApp as a core communication and automation layer compare against those relying on email alone. Conversion, retention, and operational data.',
  },
  {
    title: 'Prompt Engineering for Business Leaders',
    type: 'Applied Research',
    tag: 'AI Prompts',
    teaser: 'A controlled study measuring the difference in output quality between business professionals who use structured prompt frameworks vs. ad hoc prompting.',
  },
];

export default function ResearchPage() {
  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Research & Case Studies</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Intelligence / Research & Case Studies</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">
            Research & Case Studies
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-2 italic font-medium text-accent/80">
            Evidence, not anecdote. Real numbers from real implementations.
          </p>
          <p className="text-base text-muted max-w-2xl leading-relaxed">
            Our research exists to help decision-makers justify the investment in automation,
            understand the competitive landscape, and benchmark their own operations. Free access
            to all published findings. Premium data packs available separately.
          </p>
        </div>
      </section>

      {/* ── Research Cards ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">Published Research</p>
        <div className="space-y-6">
          {FEATURED.map((paper) => (
            <div
              key={paper.slug}
              className="rounded-2xl bg-surface-lighter border border-border/50 hover:border-accent/30 transition-all p-8"
            >
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
                  {paper.tag}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted">
                  {paper.type}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20 font-semibold ml-auto">
                  {paper.access} Access
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{paper.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-5 max-w-3xl">{paper.summary}</p>
              <div className="flex flex-wrap gap-3 mb-5">
                {paper.highlights.map((h) => (
                  <span key={h} className="flex items-center gap-1.5 text-xs text-foreground bg-surface border border-border/40 px-3 py-1.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {h}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <span className="text-xs text-muted">Published {paper.publishedAt}</span>
                <Link
                  href={`/blog?postType=case-study`}
                  className="inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline"
                >
                  Read on the Blog
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Upcoming ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">In the Pipeline</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING.map((item) => (
              <div key={item.title} className="rounded-xl bg-surface border border-border/40 p-6 opacity-80">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/5 text-accent/70 border border-accent/10 font-semibold">
                    {item.tag}
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-surface-lighter border border-border/40 text-muted">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.teaser}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology note ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Our Research Standard</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Built on Real Implementations
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              All DigiFusion research is derived from live client work, observed industry data,
              and structured analysis — not survey speculation or recycled blog aggregation.
              Where we cite external sources, we link directly. Where we present original
              findings, we show the methodology.
            </p>
            <Link
              href="/agency/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              View Agency Case Studies
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
