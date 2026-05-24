import Link from 'next/link';

const BASE = 'https://www.digitafusion.com';

export const metadata = {
  title: 'Receptra — AI-Powered Receptionist for Hospitality & Professional Services',
  description:
    'Receptra is an AI-powered receptionist system for hotels, law firms, medical practices, and professional services. 24/7 enquiry handling, lead qualification, and appointment booking — without headcount.',
  alternates: { canonical: `${BASE}/products/receptra` },
  openGraph: {
    title: 'Receptra — Your Front Desk, Fully Staffed at a Fraction of the Cost',
    description:
      '24/7 AI-powered reception for hospitality, law firms, and professional services. Never miss an enquiry again.',
    url: `${BASE}/products/receptra`,
    type: 'website',
  },
};

const FEATURES = [
  {
    title: '24/7 Enquiry Handling',
    desc: 'Receptra responds to every enquiry the moment it arrives — WhatsApp, email, or web form — at any hour, including weekends and holidays.',
    icon: '🕐',
  },
  {
    title: 'Intelligent Lead Qualification',
    desc: 'Asks the right questions to qualify leads before they reach your team. Filters out time-wasters and delivers pre-qualified, ready-to-convert enquiries.',
    icon: '🎯',
  },
  {
    title: 'Appointment Booking',
    desc: 'Integrates with your calendar and books consultations, viewings, or check-ins automatically — with confirmation messages sent to both parties.',
    icon: '📅',
  },
  {
    title: 'Multi-Channel Presence',
    desc: 'Operates across WhatsApp, email, and embedded web chat. One configuration, consistent experience across every channel.',
    icon: '📡',
  },
  {
    title: 'Practice Area Routing',
    desc: 'For law firms and multi-department businesses: routes enquiries to the right practice area or team member based on the nature of the request.',
    icon: '🔀',
  },
  {
    title: 'Handover Protocol',
    desc: 'When human intervention is needed, Receptra creates a full context summary — so your team picks up mid-conversation without asking the client to repeat themselves.',
    icon: '🤝',
  },
];

const USE_CASES = [
  {
    sector: 'Hotels & Guesthouses',
    scenario: 'Handles reservation enquiries, room availability checks, pricing questions, and check-in coordination automatically. Staff focuses on in-person guest experience.',
    benefit: 'No missed bookings outside office hours',
  },
  {
    sector: 'Law Firms',
    scenario: 'Qualifies new client enquiries by practice area, collects initial case details, and books consultation slots — all before a solicitor needs to get involved.',
    benefit: 'Pre-qualified leads arrive fully briefed',
  },
  {
    sector: 'Medical & Wellness Practices',
    scenario: 'Handles appointment requests, manages scheduling across multiple practitioners, sends reminders, and handles cancellations and reschedules automatically.',
    benefit: 'Reduced admin load on reception staff',
  },
  {
    sector: 'Professional Services',
    scenario: 'Consultants, accountants, architects, and agencies: Receptra manages new business enquiries and books discovery calls so your team is always meeting pre-qualified prospects.',
    benefit: 'Sales pipeline that works while you sleep',
  },
];

export default function ReceptraPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Receptra',
    applicationCategory: 'BusinessApplication',
    description:
      'AI-powered receptionist system for hospitality, law firms, medical practices, and professional services.',
    url: `${BASE}/products/receptra`,
    operatingSystem: 'Web, WhatsApp, Email',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      seller: { '@type': 'Organization', name: 'DigiFusion', url: BASE },
    },
    publisher: { '@type': 'Organization', name: 'DigiFusion', url: BASE },
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
          <span className="text-foreground">Receptra</span>
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-warning/10 text-warning border border-warning/20 font-medium">
                  In Development
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                Receptra
              </h1>
              <p className="text-xl text-muted font-medium italic mb-4">
                Your front desk, fully staffed — at a fraction of the cost.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                An AI-powered receptionist system for businesses where enquiry handling,
                lead qualification, and appointment scheduling consume staff time that should
                be spent elsewhere. Receptra runs 24/7, never misses an enquiry, and hands
                off to your team with full context — so no one has to start from scratch.
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

            {/* Stats panel */}
            <div className="rounded-2xl bg-surface-lighter border border-border/50 p-8">
              <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-6">What Receptra Handles</p>
              <div className="space-y-4">
                {[
                  { label: 'New enquiry response', time: 'Instant', note: 'vs. 4–8hr average for human' },
                  { label: 'Lead qualification', time: 'Automatic', note: 'Before human review required' },
                  { label: 'Appointment booking', time: 'Real-time', note: 'Calendar integration included' },
                  { label: 'After-hours coverage', time: '24/7', note: 'Including weekends & holidays' },
                  { label: 'Languages supported', time: 'Multilingual', note: 'English + local language config' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-border/30 last:border-0">
                    <span className="text-sm text-muted">{item.label}</span>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground">{item.time}</p>
                      <p className="text-[10px] text-muted">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="border-b border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">Industries</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((uc) => (
              <div key={uc.sector} className="rounded-xl bg-surface border border-border/40 p-7">
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{uc.sector}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{uc.scenario}</p>
                <div className="flex items-center gap-2 text-xs text-accent font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {uc.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">Features</p>
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

      {/* ── CTA ── */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Get Early Access</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
            Receptra Is Coming
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            We&apos;re in active development. Register your interest and we&apos;ll reach out when
            we open the beta — with a founder pricing option reserved for early registrants.
          </p>
          <Link
            href="/agency/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
            Request Early Access
          </Link>
        </div>
      </section>
    </>
  );
}
