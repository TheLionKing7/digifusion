import Link from 'next/link';

export const metadata = {
  title: 'Services & Pricing',
  description:
    'Transparent pricing for AI automation, digital media, and business development. Packages built for SMBs in the US, Canada, and Africa.',
  alternates: { canonical: 'https://www.digitafusion.com/agency/services' },
};

/* ── Service track data ─────────────────────────────────────────────────── */

const TRACKS = [
  {
    id: 'ai-automation',
    label: 'AI Automation',
    tagline: 'Replace manual bottlenecks with intelligent, always-on systems.',
    color: '#00d4aa',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h6"/>
      </svg>
    ),
    plans: [
      {
        name: 'Pilot Sprint',
        type: 'One-time project',
        priceUS: '$2,500',
        priceAfrica: 'From $450',
        badge: null,
        deliverables: [
          '1 core workflow fully automated',
          '14-day delivery commitment',
          '30-day post-launch support',
          'Live workflow map (Miro)',
          'Handover documentation',
        ],
        ideal: 'First automation for a team ready to test AI without a long commitment.',
        cta: 'Start a Pilot',
      },
      {
        name: 'Growth',
        type: 'Monthly retainer',
        priceUS: '$1,500/mo',
        priceAfrica: 'From $280/mo',
        badge: 'Most Popular',
        deliverables: [
          'Up to 5 active automations',
          'Monthly workflow optimisation',
          'Live performance dashboard',
          'Priority support (48h response)',
          'Quarterly strategy review',
        ],
        ideal: 'SMBs replacing 10+ hours of manual work per week across sales, ops, or support.',
        cta: 'Book a Session',
      },
      {
        name: 'Scale',
        type: 'Monthly retainer',
        priceUS: '$4,000/mo',
        priceAfrica: 'From $750/mo',
        badge: null,
        deliverables: [
          'Custom AI agents built for your stack',
          'Unlimited workflow scope',
          'Full process transformation audit',
          'Dedicated account lead',
          'Weekly reporting + real-time alerts',
        ],
        ideal: 'Growth-stage companies requiring end-to-end AI infrastructure across departments.',
        cta: 'Book a Session',
      },
    ],
  },
  {
    id: 'digital-media',
    label: 'Digital Media',
    tagline: 'Content and visibility systems that compound over time.',
    color: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    plans: [
      {
        name: 'Starter',
        type: 'Monthly retainer',
        priceUS: '$1,200/mo',
        priceAfrica: 'From $220/mo',
        badge: null,
        deliverables: [
          'SEO strategy + keyword roadmap',
          '4 long-form blog posts per month',
          'On-page optimisation',
          'Monthly traffic report',
          'Editorial calendar',
        ],
        ideal: 'Founders wanting to build organic visibility without hiring an in-house writer.',
        cta: 'Book a Session',
      },
      {
        name: 'Growth',
        type: 'Monthly retainer',
        priceUS: '$2,500/mo',
        priceAfrica: 'From $450/mo',
        badge: 'Most Popular',
        deliverables: [
          'Everything in Starter',
          'Social media management (2 platforms)',
          '8 blog posts per month',
          'Email newsletter (2× monthly)',
          'Competitor content analysis',
        ],
        ideal: 'Businesses building a multi-channel audience and consistent brand presence.',
        cta: 'Book a Session',
      },
      {
        name: 'Authority',
        type: 'Monthly retainer',
        priceUS: '$5,000/mo',
        priceAfrica: 'From $900/mo',
        badge: null,
        deliverables: [
          'Full content engine management',
          'Thought leadership + PR strategy',
          'Paid ads management (Meta/Google)',
          'Weekly performance reviews',
          'Dedicated content strategist',
        ],
        ideal: 'Established brands scaling to market authority through owned and paid media.',
        cta: 'Book a Session',
      },
    ],
  },
  {
    id: 'business-development',
    label: 'Business Development',
    tagline: 'High-end strategy and revenue systems for discerning operators.',
    color: '#7c3aed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    plans: [
      {
        name: 'Strategy Sprint',
        type: 'One-time project',
        priceUS: '$3,000',
        priceAfrica: 'From $550',
        badge: null,
        deliverables: [
          '4-week focused engagement',
          'Market & competitor analysis',
          'Revenue model audit',
          'Go-to-market roadmap',
          'Prioritised 90-day action plan',
        ],
        ideal: 'Founders needing a clear strategic direction before making major investments.',
        cta: 'Start a Sprint',
      },
      {
        name: 'BD Retainer',
        type: 'Monthly retainer',
        priceUS: '$2,000/mo',
        priceAfrica: 'From $380/mo',
        badge: 'Most Popular',
        deliverables: [
          'Ongoing pipeline development',
          'Partnership identification & outreach',
          'Monthly growth strategy sessions',
          'Proposal & pitch deck support',
          'Revenue opportunity reporting',
        ],
        ideal: 'SMBs that need a fractional business development lead without a full-time hire.',
        cta: 'Book a Session',
      },
      {
        name: 'Growth Partner',
        type: 'Monthly retainer',
        priceUS: '$5,500/mo',
        priceAfrica: 'From $1,000/mo',
        badge: null,
        deliverables: [
          'Full BD execution — done for you',
          'Custom AI-powered sales workflows',
          'International expansion strategy',
          'Investor readiness preparation',
          'Dedicated senior strategist',
        ],
        ideal: 'Growth-stage companies expanding into new markets or preparing for scale capital.',
        cta: 'Book a Session',
      },
    ],
  },
];

/* ── Pricing notes ──────────────────────────────────────────────────────── */

const PRICING_NOTES = [
  'All prices shown in USD. Africa pricing reflects local market conditions for Nigeria, Ghana, Kenya, and South Africa.',
  'Retainers are billed monthly with a 3-month minimum. No hidden fees — scope changes are agreed in writing.',
  "Projects begin with a free 30-minute strategy session. No commitment until you've seen the roadmap.",
  'Combination packages available when engaging two or more service tracks simultaneously.',
];

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            Transparent Pricing · No Surprises
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl mb-6">
            What We Do &amp;{' '}
            <span className="text-accent">What It Costs</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-8">
            Three expert tracks. Clear deliverables. Pricing built for the US, Canada, and Africa
            markets — so you know what to expect before we ever get on a call.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Book Free Strategy Session
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-border/40 text-xs font-mono text-muted">
              🇺🇸 US · 🇨🇦 CA · 🌍 Africa pricing shown
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Tracks ── */}
      {TRACKS.map((track, ti) => (
        <section
          key={track.id}
          id={track.id}
          className={`py-20 ${ti % 2 === 1 ? 'bg-surface/30 border-y border-border/40' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-6">
            {/* Track header */}
            <div className="flex items-start gap-4 mb-12">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${track.color}15`, color: track.color }}
              >
                {track.icon}
              </div>
              <div>
                <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: track.color }}>
                  Service Track
                </p>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">{track.label}</h2>
                <p className="text-muted max-w-xl">{track.tagline}</p>
              </div>
            </div>

            {/* Plan cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {track.plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    plan.badge
                      ? 'border-accent/40 bg-surface-lighter'
                      : 'border-border/50 bg-surface'
                  }`}
                >
                  {plan.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                      style={{ background: track.color, color: '#000' }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan name & type */}
                  <div className="mb-5">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-muted mb-1">{plan.type}</p>
                    <h3 className="font-serif text-2xl font-bold text-foreground">{plan.name}</h3>
                  </div>

                  {/* Pricing */}
                  <div className="mb-5 pb-5 border-b border-border/40">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-serif text-3xl font-bold text-foreground">{plan.priceUS}</span>
                      <span className="text-xs font-mono text-muted">US / Canada</span>
                    </div>
                    <div className="mt-1 text-sm text-muted">
                      <span style={{ color: track.color }}>{plan.priceAfrica}</span>
                      <span className="text-muted"> · Africa market</span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-0.5 shrink-0" style={{ color: track.color }}>✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Ideal for */}
                  <div className="mb-5 p-3 rounded-lg bg-surface-lighter border border-border/30">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Ideal for</p>
                    <p className="text-xs text-muted leading-relaxed">{plan.ideal}</p>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/agency/booking"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all active:scale-[0.98]"
                    style={
                      plan.badge
                        ? { background: track.color, color: '#000' }
                        : { border: `1px solid ${track.color}40`, color: track.color }
                    }
                  >
                    {plan.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Pricing Notes ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-6">Pricing notes</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {PRICING_NOTES.map((note, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                <span className="text-accent font-mono shrink-0 mt-0.5">0{i + 1}</span>
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Not sure which fits?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Session Tells Us Both
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            In 30 minutes we&apos;ll diagnose your biggest operational constraint and recommend
            exactly which track and tier makes sense. You leave with a roadmap — no commitment required.
          </p>
          <Link
            href="/agency/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
            Book Your Free Strategy Session
          </Link>
        </div>
      </section>
    </>
  );
}
