import Link from 'next/link';

const BASE = 'https://www.digitafusion.com';

export const metadata = {
  title: 'AdPilot — AI Marketing Assistant Inside WhatsApp',
  description:
    'AdPilot is an AI-powered marketing assistant built for SMB owners who run their business on WhatsApp. Campaign planning, ad copy, content calendars, and performance analysis — all conversational.',
  alternates: { canonical: `${BASE}/products/adpilot` },
  openGraph: {
    title: 'AdPilot — Your AI Marketing Strategist, Inside WhatsApp',
    description:
      'Marketing intelligence for SMB owners without a marketing team. Plan campaigns, write copy, and analyse results — through WhatsApp.',
    url: `${BASE}/products/adpilot`,
    type: 'website',
  },
};

const FEATURES = [
  {
    title: 'Campaign Planning',
    desc: 'Describe your product, audience, and budget. AdPilot generates a full campaign plan — channels, schedule, message sequence, and KPIs — in a conversational exchange.',
    icon: '🗺️',
  },
  {
    title: 'Ad Copy Generation',
    desc: 'Create high-converting ad copy for Facebook, Instagram, Google, and WhatsApp Broadcast in seconds. Multiple variants, different tones, all on-brand.',
    icon: '✍️',
  },
  {
    title: 'Content Calendar Builder',
    desc: 'Input your content goals and audience. AdPilot produces a structured 30-day content calendar with themes, formats, and ready-to-use post ideas.',
    icon: '📆',
  },
  {
    title: 'Performance Analysis',
    desc: 'Paste in your campaign numbers and AdPilot interprets them — what worked, what didn\'t, and what to change next round. No dashboard required.',
    icon: '📈',
  },
  {
    title: 'WhatsApp-Native',
    desc: 'No new platform to learn. No dashboard to log into. AdPilot lives inside WhatsApp — the tool most African business owners already use to run their business.',
    icon: '💬',
  },
  {
    title: 'Brand Voice Consistency',
    desc: 'Set your brand voice once. AdPilot applies it across every piece of copy it generates — so your marketing always sounds like you, not a generic AI.',
    icon: '🎨',
  },
];

const WHO_ITS_FOR = [
  {
    profile: 'The Solo Operator',
    desc: 'Running a business alone with no marketing team. AdPilot is the marketing assistant you can\'t afford to hire, but can now have.',
  },
  {
    profile: 'The SMB Owner',
    desc: 'Has a small team but no dedicated marketer. AdPilot gives your business the marketing intelligence of a senior strategist at a fraction of the cost.',
  },
  {
    profile: 'The E-Commerce Brand',
    desc: 'Selling on Instagram, Jumia, or your own website. AdPilot helps you plan promotions, write product copy, and build ad sequences that convert.',
  },
  {
    profile: 'The Agency Managing Clients',
    desc: 'Use AdPilot to accelerate campaign production for multiple clients without scaling your team. First drafts in seconds, not hours.',
  },
];

export default function AdPilotPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AdPilot',
    applicationCategory: 'MarketingApplication',
    description:
      'AI-powered marketing assistant for SMB owners — operates natively inside WhatsApp.',
    url: `${BASE}/products/adpilot`,
    operatingSystem: 'WhatsApp, Web',
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
          <span className="text-foreground">AdPilot</span>
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
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-warning/10 text-warning border border-warning/20 font-medium">
                  In Development
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
                AdPilot
              </h1>
              <p className="text-xl text-muted font-medium italic mb-4">
                Your AI marketing strategist — inside WhatsApp.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                An AI-powered marketing assistant that lives where African and Nigerian business
                owners already work: WhatsApp. AdPilot helps you plan campaigns, write copy,
                build content calendars, and analyse results — through a conversation, without
                learning a new platform or hiring a marketing team.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link
                  href="/agency/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                  Request Early Access
                </Link>
              </div>
              <p className="text-xs text-muted">
                WhatsApp-native · No new platform to learn · Built for African SMBs
              </p>
            </div>

            {/* WhatsApp conversation mockup */}
            <div className="rounded-2xl bg-surface-lighter border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/30">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="hsl(168,100%,42%)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">AdPilot</p>
                  <p className="text-[10px] text-accent">● Online</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-end">
                  <div className="bg-accent/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-foreground text-xs">I want to promote my catering service for weddings this month. Budget is ₦50k.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-surface border border-border/40 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]">
                    <p className="text-foreground text-xs leading-relaxed">
                      Perfect. For weddings with a ₦50k budget, here&apos;s your 4-week plan:
                      <br /><br />
                      <span className="text-accent font-semibold">Week 1–2:</span> Instagram + Facebook targeting engaged couples in your city. ₦20k on social ads.
                      <br /><br />
                      <span className="text-accent font-semibold">Week 3:</span> WhatsApp Broadcast to your existing contacts. Free, high-conversion.
                      <br /><br />
                      <span className="text-accent font-semibold">Week 4:</span> Retarget people who engaged with your ads. ₦15k.
                      <br /><br />
                      Want me to write the ad copy for week 1?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-accent/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                    <p className="text-foreground text-xs">Yes please</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why WhatsApp ── */}
      <section className="border-b border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Why WhatsApp-First</p>
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
              The Tool That Fits Where You Actually Work
            </h2>
            <p className="text-muted leading-relaxed mb-10">
              Most AI marketing tools assume you have a marketing team, a dashboard habit, and
              time to learn software. Most African SMB owners have a WhatsApp and 10 minutes
              between jobs. AdPilot was built for the second group.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { stat: '90%+', label: 'of Nigerian SMB owners already use WhatsApp for business communication', accent: true },
                { stat: '0 apps', label: 'to install — AdPilot works within existing WhatsApp', accent: false },
                { stat: '< 5min', label: 'from first message to a complete campaign plan ready to launch', accent: false },
              ].map((s) => (
                <div key={s.stat} className="rounded-xl bg-surface border border-border/40 p-6 text-center">
                  <p className={`font-serif text-4xl font-bold mb-2 ${s.accent ? 'text-accent' : 'text-foreground'}`}>{s.stat}</p>
                  <p className="text-xs text-muted leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">What AdPilot Does</p>
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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-10">Who AdPilot Is For</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHO_ITS_FOR.map((w) => (
              <div key={w.profile} className="rounded-xl bg-surface border border-border/40 p-7">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{w.profile}</h3>
                <p className="text-sm text-muted leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Join the Beta</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">
            AdPilot Is Coming to WhatsApp
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            We&apos;re building AdPilot for launch. Register early and get access to the beta,
            plus a founding member rate that locks in before public pricing is set.
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
