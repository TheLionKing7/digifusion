import Link from 'next/link';

const BASE = 'https://www.digitafusion.com';

export const metadata = {
  title: 'SabiWork — AI Cost Estimator for Artisans & Contractors',
  description:
    'SabiWork is an AI-powered cost-estimation tool built for artisans, contractors, and field service businesses. Turn a job description into an accurate quote in seconds.',
  alternates: { canonical: `${BASE}/products/sabiwork` },
  openGraph: {
    title: 'SabiWork — Know Your Numbers Before the Job Begins',
    description:
      'AI-powered quoting for artisans, contractors, and field service operators. Instant estimates, accurate margins, no spreadsheet required.',
    url: `${BASE}/products/sabiwork`,
    type: 'website',
  },
};

const FEATURES = [
  {
    title: 'Instant Job Quotes',
    desc: 'Describe the job in plain language. SabiWork breaks it into materials, labour hours, and a margin-inclusive price — in seconds.',
    icon: '⚡',
  },
  {
    title: 'Materials Breakdown',
    desc: 'Automatically itemises required materials with estimated quantities and current market prices. Update prices once, recalculate across all jobs.',
    icon: '🔩',
  },
  {
    title: 'Labour Costing',
    desc: 'Set your hourly rate and skill levels. SabiWork calculates realistic labour time based on job complexity and allocates cost accurately.',
    icon: '👷',
  },
  {
    title: 'Quote-to-Invoice',
    desc: 'Turn an approved quote into a professional invoice in one click. Send via WhatsApp or email directly from the platform.',
    icon: '📄',
  },
  {
    title: 'Job History & Reporting',
    desc: 'Track every job, its cost, and your actual margin. Know which job types are most profitable and which are costing you money.',
    icon: '📊',
  },
  {
    title: 'WhatsApp Integration',
    desc: 'Receive job requests, send quotes, and collect confirmations all within WhatsApp — where your customers already are.',
    icon: '💬',
  },
];

const AUDIENCES = [
  { type: 'Plumbers & Electricians', pain: 'Underquoting jobs and losing margin without realising it' },
  { type: 'Builders & Contractors', pain: 'Spending hours pricing jobs that should take minutes' },
  { type: 'HVAC & Maintenance', pain: 'Inconsistent pricing across different technicians' },
  { type: 'Painters & Decorators', pain: 'No system for tracking material costs against job revenue' },
  { type: 'Landscaping & Garden Services', pain: 'Quotes that win jobs at a loss' },
  { type: 'General Field Services', pain: 'Manual pricing that creates errors and disputes' },
];

export default function SabiWorkPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SabiWork',
    applicationCategory: 'BusinessApplication',
    description:
      'AI-powered cost-estimation engine for artisans, contractors, and field service businesses.',
    url: `${BASE}/products/sabiwork`,
    operatingSystem: 'Web, WhatsApp',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'DigiFusion',
        url: BASE,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'DigiFusion',
      url: BASE,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">SabiWork</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(168,100%,42%)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <span className="text-[10px] px-3 py-1 rounded-full bg-warning/10 text-warning border border-warning/20 font-medium text-xs">
                  In Development
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                SabiWork
              </h1>
              <p className="text-xl text-muted font-medium italic mb-4">
                Know your numbers before the job begins.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                An AI-powered cost-estimation engine built for artisans, contractors, and field
                service operators in Africa and beyond. SabiWork turns a plain-language job
                description into an accurate, margin-inclusive quote in seconds — so you stop
                undercharging, stop guessing, and start running a properly priced business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/agency/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                  Request Early Access
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-lighter border border-border/50 p-8">
              <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-4">How It Works</p>
              <ol className="space-y-5">
                {[
                  { step: '01', label: 'Describe the job', detail: 'Type or speak the job details in plain language — "Paint 3 rooms, two coats" is enough.' },
                  { step: '02', label: 'SabiWork prices it', detail: 'AI breaks it into materials, labour, and overhead with current market rates applied.' },
                  { step: '03', label: 'Review and adjust', detail: 'Tweak quantities, swap materials, or change your margin before sending.' },
                  { step: '04', label: 'Send the quote', detail: 'One-tap to share via WhatsApp or email. Convert to invoice when the job is confirmed.' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="text-xs font-mono text-accent shrink-0 mt-1">{item.step}</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">{item.label}</p>
                      <p className="text-xs text-muted leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="border-b border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">The Problem It Solves</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
              Most Artisans Are Paid Less Than They Should Be
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Manual pricing — whether in your head, on WhatsApp, or in a notebook — is imprecise.
              You forget to include materials. You underestimate labour. You quote before you know
              the full scope. The result: jobs that pay less than minimum wage by the time you
              account for actual time and materials.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { stat: '60%', label: 'of artisans undercharge on at least half their jobs (estimated)', accent: true },
                { stat: '3–5hr', label: 'wasted per week on manual quoting that could be automated', accent: false },
                { stat: '₦0', label: 'extra cost to price correctly — you just need the right tool', accent: false },
              ].map((item) => (
                <div key={item.stat} className="rounded-xl bg-surface border border-border/40 p-6 text-center">
                  <p className={`font-serif text-4xl font-bold mb-2 ${item.accent ? 'text-accent' : 'text-foreground'}`}>
                    {item.stat}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">What SabiWork Does</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl bg-surface-lighter border border-border/40 p-6">
              <p className="text-2xl mb-3">{f.icon}</p>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">Built For</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIENCES.map((a) => (
              <div key={a.type} className="rounded-xl bg-surface border border-border/40 p-5">
                <p className="font-semibold text-foreground text-sm mb-1">{a.type}</p>
                <p className="text-xs text-muted leading-relaxed">{a.pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Be First in Line</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
            SabiWork Is Coming
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            We&apos;re building SabiWork for launch. Join the early access list and be the first to
            use it — plus get a discounted founder rate when we go live.
          </p>
          <Link
            href="/agency/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
            Request Early Access
          </Link>
          <p className="mt-4 text-xs text-muted">No commitment. No credit card. Just early access.</p>
        </div>
      </section>
    </>
  );
}
