import Link from 'next/link';

export const metadata = {
  title: 'Products — AI-Powered SaaS for Modern Businesses',
  description:
    'DigiFusion builds AI-powered SaaS products for SMBs. SabiWork, Receptra, and AdPilot — practical tools that automate the operational work draining your team.',
  alternates: { canonical: 'https://www.digitafusion.com/products' },
  openGraph: {
    title: 'Products — DigiFusion',
    description:
      'AI-powered SaaS built for operators who need systems, not experiments.',
    url: 'https://www.digitafusion.com/products',
    type: 'website',
  },
};

const LIVE_PRODUCTS = [
  {
    slug: 'vektor',
    name: 'Vektor',
    tagline: 'Find your next bestselling ebook before anyone else.',
    description:
      'A Chrome extension for KDP publishers that autonomously sweeps Amazon Kindle and Google for real buyer intent — then delivers a complete publishing brief in under 60 seconds. No seed keywords. No guesswork. Zero-input niche discovery powered by LLM pain-point synthesis.',
    category: 'Market Intelligence · Chrome Extension',
    audiences: ['KDP Publishers', 'Self-Publishers', 'Niche Researchers', 'Content Creators'],
    keyFeature: 'Autonomous niche discovery',
    status: 'Live',
    href: '/products/vektor',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const PRODUCTS = [
  {
    slug: 'sabiwork',
    name: 'SabiWork',
    tagline: 'Know your numbers before the job begins.',
    description:
      'An AI-powered cost-estimation engine for artisans, contractors, and field service businesses. SabiWork turns a job description into an accurate quote in seconds — materials, labour, margin, and all. Built for businesses whose owners are too busy to price jobs properly.',
    category: 'Estimation & Pricing',
    audiences: ['Artisans', 'Contractors', 'Field Services', 'Maintenance Businesses'],
    keyFeature: 'Instant job quoting',
    status: 'In Development',
    href: '/products/sabiwork',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    slug: 'receptra',
    name: 'Receptra',
    tagline: 'Your front desk, fully staffed — at a fraction of the cost.',
    description:
      'An AI-powered receptionist system designed for hospitality, law firms, medical practices, and professional service businesses. Receptra handles enquiries, qualifies leads, routes requests, books appointments, and sends confirmations — 24/7, without error.',
    category: 'Reception & Intake',
    audiences: ['Hotels & Guesthouses', 'Law Firms', 'Medical Practices', 'Professional Services'],
    keyFeature: '24/7 AI reception',
    status: 'In Development',
    href: '/products/receptra',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    slug: 'adpilot',
    name: 'AdPilot',
    tagline: 'Your AI marketing strategist — inside WhatsApp.',
    description:
      'An AI-powered marketing assistant that lives where Nigerian and African business owners already work: WhatsApp. AdPilot helps SMB owners plan campaigns, write ad copy, build content calendars, and analyse results — all through a conversational interface without dashboards or learning curves.',
    category: 'Marketing & Advertising',
    audiences: ['SMB Owners', 'Solopreneurs', 'Marketing Teams', 'E-Commerce Brands'],
    keyFeature: 'WhatsApp-native AI',
    status: 'In Development',
    href: '/products/adpilot',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function ProductsPage() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DigiFusion Products',
    description: 'AI-powered SaaS products built by DigiFusion for SMB operators.',
    url: 'https://www.digitafusion.com/products',
    numberOfItems: LIVE_PRODUCTS.length + PRODUCTS.length,
    itemListElement: [...LIVE_PRODUCTS, ...PRODUCTS].map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://www.digitafusion.com${p.href}`,
      description: p.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(168,100%,42%) 1px, transparent 1px), linear-gradient(90deg, hsl(168,100%,42%) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">DigiFusion Products</p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl mb-6">
            Built to Replace{' '}
            <span className="text-gradient">the Overhead</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
            AI-powered SaaS products for SMB operators who have outgrown manual processes
            but aren&apos;t ready to hire. Each product automates a specific, expensive
            function — precisely, reliably, without drama.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Get Early Access
            </Link>
            <Link
              href="/intelligence"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
            >
              Browse Intelligence
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 text-xs text-muted bg-surface border border-border/40 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Vektor is live — available now
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-muted bg-surface border border-border/40 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              SabiWork, Receptra, AdPilot in development — early access via strategy session
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Products ── */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400">Live Now</p>
        </div>
        <div className="space-y-12">
          {LIVE_PRODUCTS.map((product) => (
            <div key={product.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    {product.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold mb-0.5">{product.category}</p>
                    <h2 className="font-serif text-3xl font-bold text-foreground">{product.name}</h2>
                  </div>
                </div>
                <p className="text-xl text-muted font-medium italic mb-4">&ldquo;{product.tagline}&rdquo;</p>
                <p className="text-muted leading-relaxed mb-6">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.audiences.map((a) => (
                    <span key={a} className="text-[10px] px-2.5 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-medium">{a}</span>
                  ))}
                </div>
                <Link href={product.href} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
                  Explore {product.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
              <div>
                <div className="rounded-2xl bg-surface-lighter border border-border/50 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-mono text-accent uppercase tracking-widest">01 / 01</p>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {product.status}
                    </span>
                  </div>
                  <p className="font-serif text-5xl font-bold text-foreground mb-2">{product.name}</p>
                  <p className="text-sm text-muted mb-6">{product.keyFeature}</p>
                  <div className="h-px bg-border/40 mb-6" />
                  <div className="space-y-3 mb-6">
                    {product.audiences.map((a) => (
                      <div key={a} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-muted">{a}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={product.href} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-background text-sm font-semibold hover:bg-accent-dim transition-all">
                    Get Free API Key →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── In Development ── */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-warning">In Development</p>
        </div>
        <div className="space-y-12">
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    {product.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold mb-0.5">
                      {product.category}
                    </p>
                    <h2 className="font-serif text-3xl font-bold text-foreground">{product.name}</h2>
                  </div>
                </div>
                <p className="text-xl text-muted font-medium italic mb-4">&ldquo;{product.tagline}&rdquo;</p>
                <p className="text-muted leading-relaxed mb-6">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.audiences.map((a) => (
                    <span key={a} className="text-[10px] px-2.5 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent font-medium">
                      {a}
                    </span>
                  ))}
                </div>
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Learn more about {product.name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              {/* Feature card */}
              <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="rounded-2xl bg-surface-lighter border border-border/50 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-mono text-accent uppercase tracking-widest">0{idx + 1} / 03</p>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-warning/10 text-warning border border-warning/20 font-medium">
                      {product.status}
                    </span>
                  </div>
                  <p className="font-serif text-5xl font-bold text-foreground mb-2">{product.name}</p>
                  <p className="text-sm text-muted mb-6">{product.keyFeature}</p>
                  <div className="h-px bg-border/40 mb-6" />
                  <div className="space-y-3">
                    {product.audiences.map((a, i) => (
                      <div key={a} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-muted">{a}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <Link
                      href="/agency/booking"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-accent/30 text-accent text-sm font-semibold hover:bg-accent/5 transition-all"
                    >
                      Request Early Access
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Intelligence Bridge ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">The Knowledge Layer</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
            These Products Come with the Manual
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Every DigiFusion product is backed by published research, implementation guides, and
            automation playbooks. The Intelligence section is where we share the thinking behind
            the tools — for those who want to understand, not just use.
          </p>
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all text-sm font-medium"
          >
            Explore Intelligence
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
