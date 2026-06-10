import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Agency Services',
  description:
    'Three proprietary practice areas — AI Automation & SaaS (Automation Velocity Engine), Business Development (Deal Engine), and Digital Media — built to turn operational chaos into measurable growth.',
  alternates: { canonical: 'https://www.digitafusion.com/agency' },
  openGraph: {
    title: 'DigiFusion Agency — AI Automation · Business Development · Digital Media',
    description:
      'Three expert service tracks, each powered by a proprietary framework. Diagnosis before prescription. ROI calculated, not assumed.',
    type: 'website',
  },
};

/* ────────────────────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────────────────────── */

const TRACKS = [
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    agent: 'Nova',
    agentRole: 'Automation Architect',
    label: 'AI Automation & SaaS',
    framework: 'Automation Velocity Engine (AVE)',
    color: '#00d4aa',
    bgClass: 'from-[#00d4aa]/8 via-transparent',
    tagline: 'Replace manual operations with intelligent, scalable automated systems.',
    description:
      'Most organisations do not have an automation problem — they have a clarity problem. They buy tools before they define outcomes. The Automation Velocity Engine is Nova\'s 5-phase operating system that takes any organisation from fragmented, manual processes to intelligent, autonomous operations.',
    phases: [
      { num: '01', name: 'DIAGNOSE', tool: 'Process Intelligence Audit', color: '#00d4aa' },
      { num: '02', name: 'ARCHITECT', tool: 'Technical Blueprint', color: '#00b89e' },
      { num: '03', name: 'BUILD', tool: '14-Day Sprint', color: '#009d88' },
      { num: '04', name: 'DEPLOY', tool: 'ADKAR Change Management', color: '#008271' },
      { num: '05', name: 'SCALE', tool: 'AI Transformation Roadmap', color: '#006759' },
    ],
    tools: [
      {
        name: 'Automation Opportunity Matrix',
        desc: 'Every process scored on ROI × Complexity. Plots Quick Wins, Strategic Bets, Batch Jobs, and the ones to avoid entirely.',
      },
      {
        name: 'Automation Velocity Scorecard',
        desc: '20 diagnostic questions across 5 dimensions: Process Readiness, Data Infrastructure, Technical Capability, Change Readiness, ROI Clarity.',
      },
      {
        name: '12-Factor App Compliance Check',
        desc: 'Architecture standard for every SaaS and automation build. Systems violating more than 2 factors are classified as technical debt traps.',
      },
      {
        name: 'Adoption Index',
        desc: '4 deployment health metrics — DAUR, Error Rate, Time-to-Completion, User Satisfaction — measured at 30, 60, and 90 days post go-live.',
      },
    ],
    maturity: [
      { tier: 'MANUAL', range: '0–39', hook: 'Spending 40–60% of operational payroll on work that should be automated.' },
      { tier: 'CONNECTED', range: '40–69', hook: 'Paying an integration tax — 8 tools doing the work of 3 well-designed systems.' },
      { tier: 'INTELLIGENT', range: '70–100', hook: 'Ready for autonomous operations — systems that learn, adapt, and optimise.' },
    ],
    rule: '"Think big. Start small. Scale fast." — IBM Garage',
    cta: 'Run My Automation Audit',
    href: '/agency/booking',
    serviceHref: '/agency/services#ai-automation',
    stat: { value: '70%', label: 'of automation projects fail due to people, not technology — our ADKAR deployment model prevents this.' },
  },
  {
    id: 'business-development',
    slug: 'business-development',
    agent: 'Atlas',
    agentRole: 'BD Strategist',
    label: 'Business Development',
    framework: 'Deal Engine',
    color: '#7c3aed',
    bgClass: 'from-[#7c3aed]/8 via-transparent',
    tagline: 'A revenue system, not a sales tactic. Built to win complex, multi-stakeholder deals.',
    description:
      'The Atlas Deal Engine fuses five gold-standard BD frameworks into one proprietary system — ABM\'s targeting precision, SPIN\'s diagnostic discipline, the Challenger\'s insight pivot, Miller Heiman\'s multi-stakeholder orchestration, and Value Proposition Design\'s product-market alignment.',
    phases: [
      { num: '00', name: 'DREAM 50', tool: 'Account Qualification', color: '#7c3aed' },
      { num: '01', name: 'INTELLIGENCE', tool: 'Decision Unit Mapping', color: '#6d2ce0' },
      { num: '02', name: 'DIAGNOSTIC', tool: 'SPIN Discovery Call', color: '#5e22cc' },
      { num: '03', name: 'INSIGHT', tool: 'Challenger Pivot', color: '#4f18b8' },
      { num: '04', name: 'CONSENSUS', tool: 'Multi-Stakeholder Close', color: '#400ea4' },
    ],
    tools: [
      {
        name: 'Dream 50 Targeting Protocol',
        desc: '50 accounts qualifying on Pain Fit, Deal Size Fit, Access Fit, and Timing Fit. Built before a single outreach message is sent.',
      },
      {
        name: 'Deal Strategy Worksheet (Blue Sheet)',
        desc: 'Atlas\'s proprietary Blue Sheet — 4 sections: Buying Influence Map, Win-Results Matrix, Red Flags Register, and Insight Hook.',
      },
      {
        name: 'Win-Results Framework',
        desc: 'Captures both the organisational win and the personal win for every stakeholder. Stakeholders act on personal wins — most BD teams never identify them.',
      },
      {
        name: 'BD Maturity Scorecard',
        desc: '20-question assessment that classifies every client into Ad-Hoc/Reactive, Managed Pipeline, or Predictable Growth Engine — with a revenue leakage argument for each.',
      },
    ],
    maturity: [
      { tier: 'AD-HOC / REACTIVE', range: '0–39', hook: 'Revenue depends on relationships and luck — not a repeatable system.' },
      { tier: 'MANAGED PIPELINE', range: '40–69', hook: 'CRM exists but Win-Results are never mapped. Deals stall at the committee stage.' },
      { tier: 'PREDICTABLE GROWTH ENGINE', range: '70–100', hook: 'Ready for the Insight pitch and Dream 50 expansion into new markets.' },
    ],
    rule: '"The System of Record is not the deliverable — it is the product."',
    cta: 'Map My BD Pipeline',
    href: '/agency/booking',
    serviceHref: '/agency/services#business-development',
    stat: { value: '28%', label: 'more revenue generated by companies with a formal, stage-gated sales process vs. those without (Pipedrive).' },
  },
  {
    id: 'digital-media',
    slug: 'digital-media',
    agent: 'Nexus',
    agentRole: 'Content Strategist',
    label: 'Digital Media',
    framework: 'C2C Pipeline',
    color: '#f59e0b',
    bgClass: 'from-[#f59e0b]/8 via-transparent',
    tagline: 'Content that compounds. Visibility that converts. Systems that outlast any campaign.',
    description:
      'The DigiFusion C2C (Content-to-Capital) Pipeline is a pillar-cluster authority architecture built on four compounding layers: keyword intelligence, editorial architecture, multi-channel distribution, and attribution — all tied to one measurable outcome: qualified traffic that converts.',
    phases: [
      { num: '01', name: 'AUDIT', tool: 'Content Gap Analysis', color: '#f59e0b' },
      { num: '02', name: 'ARCHITECTURE', tool: 'Pillar-Cluster Design', color: '#e08e0a' },
      { num: '03', name: 'PRODUCTION', tool: 'Editorial Engine', color: '#c97d09' },
      { num: '04', name: 'DISTRIBUTION', tool: 'Multi-Channel Amplification', color: '#b26b08' },
      { num: '05', name: 'ATTRIBUTION', tool: 'Conversion Analytics', color: '#9b5a07' },
    ],
    tools: [
      {
        name: 'ICP Search Journey Map',
        desc: 'Maps your Ideal Customer Profile\'s search behaviour from awareness through buying intent — every cluster article targets a specific journey stage.',
      },
      {
        name: 'Topic Authority Index',
        desc: 'Ranks your content clusters by ranking potential, search volume, and conversion proximity. Determines which cluster to build first.',
      },
      {
        name: 'Editorial Production System',
        desc: 'A structured briefing and QA process for every piece of content — calibrated for search intent, brand voice, and internal linking architecture.',
      },
      {
        name: 'Attribution Dashboard',
        desc: 'Tracks rankings, organic sessions, and leads attributed to each cluster — not vanity metrics. Closed-loop reporting from content to conversion.',
      },
    ],
    maturity: [
      { tier: 'INVISIBLE', range: 'DA < 20', hook: 'Publishing without a pillar-cluster architecture. Google cannot determine topical authority.' },
      { tier: 'INDEXED', range: 'DA 20–40', hook: 'Ranking for long-tail keywords but missing the pillar pages that consolidate authority.' },
      { tier: 'AUTHORITATIVE', range: 'DA 40+', hook: 'Ready for content-led demand generation and paid amplification.' },
    ],
    rule: '"Content without architecture is noise. Architecture without measurement is a hobby."',
    cta: 'Audit My Content Strategy',
    href: '/agency/booking',
    serviceHref: '/agency/services#digital-media',
    stat: { value: '43%', label: 'average organic traffic increase for sites adopting a pillar-cluster framework (HubSpot 2025).' },
  },
];

const WHY_ITEMS = [
  {
    num: '01',
    title: 'Proprietary frameworks, not recycled decks',
    body: 'Each service track runs on a purpose-built operating framework — AVE, Deal Engine, and C2C — unified by the Engagement Model on every delivery. Segment blueprints (SME Scale, Enterprise Velocity, GovTech, FIRA, and more) live in the paywalled Intelligence Library.',
  },
  {
    num: '02',
    title: 'Diagnosis before prescription',
    body: 'Every engagement starts with a structured audit. We map your current state, quantify the cost of inaction, and calculate a payback timeline before recommending anything.',
  },
  {
    num: '03',
    title: 'Strategy and execution are the same team',
    body: '88% of AI projects fail at the strategy-execution gap, where consultants hand over a deck and disappear. The team that designs your system builds it.',
  },
  {
    num: '04',
    title: 'The System of Record is always the product',
    body: 'Every engagement produces a living workspace — a pre-configured Notion or Airtable base — that the client owns. The knowledge does not leave when the engagement ends.',
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────────────────────── */

export default function AgencyPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-5">
            DigiFusion Agency · Three Practice Areas
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl mb-6">
            The Intelligence Layer{' '}
            <span className="text-accent">Your Business Is Missing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
            Three proprietary practice areas — each powered by a framework built from the world&apos;s
            best methodologies. Not consulting theatre. Measurable operational change.
          </p>

          {/* Track nav pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {TRACKS.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:scale-[1.02]"
                style={{ borderColor: `${t.color}40`, color: t.color, background: `${t.color}0d` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                {t.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Book Free Strategy Session
            </Link>
            <Link
              href="/agency/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/40 text-muted text-sm hover:border-accent/40 hover:text-foreground transition-all"
            >
              View Pricing &amp; Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust anchor ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-3xl border-l-2 border-accent/40 pl-6">
            Every track runs on a documented, proprietary framework — not improvised consulting.
            Before a single deliverable is commissioned, you know the method, the rationale,
            and the projected return. That{'’'}s the standard we hold ourselves to from day one.
          </p>
        </div>
      </section>

      {/* ── Why DigiFusion ───────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-10">
            The principles behind every engagement
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {WHY_ITEMS.map((item) => (
              <div key={item.num} className="p-6 rounded-2xl bg-surface border border-border/50">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-accent shrink-0 mt-0.5">{item.num}</span>
                  <div>
                    <h3 className="font-serif text-base font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Tracks ──────────────────────────────────────────────────── */}
      {TRACKS.map((track, ti) => (
        <section
          key={track.id}
          id={track.id}
          className={`py-24 border-b border-border/40 ${ti % 2 === 1 ? 'bg-surface/20' : ''}`}
        >
          <div className="mx-auto max-w-7xl px-6">

            {/* ── Track header ── */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-16">
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold"
                    style={{ background: `${track.color}15`, color: track.color }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: track.color }} />
                    {track.label}
                  </span>
                  <span className="text-[10px] font-mono text-muted tracking-wide">
                    Powered by {track.agent} · {track.agentRole}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
                  {track.framework}
                </h2>
                <p className="text-base text-muted leading-relaxed mb-4">{track.description}</p>
                <p className="text-sm italic text-muted/70 mb-6 pl-4 border-l-2" style={{ borderColor: `${track.color}60` }}>
                  {track.rule}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={track.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.98]"
                    style={{ background: track.color, color: '#000' }}
                  >
                    {track.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                  <Link
                    href={track.serviceHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all hover:text-foreground"
                    style={{ borderColor: `${track.color}40`, color: track.color }}
                  >
                    See Pricing
                  </Link>
                </div>
              </div>

              {/* Stat callout */}
              <div
                className="lg:w-72 p-6 rounded-2xl border shrink-0"
                style={{ borderColor: `${track.color}30`, background: `${track.color}07` }}
              >
                <p className="font-serif text-5xl font-bold mb-2" style={{ color: track.color }}>
                  {track.stat.value}
                </p>
                <p className="text-sm text-muted leading-relaxed">{track.stat.label}</p>
              </div>
            </div>

            {/* ── 5-Phase pipeline ── */}
            <div className="mb-14">
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted mb-5">
                The {track.framework} — 5 phases
              </p>
              <div className="flex flex-wrap gap-2">
                {track.phases.map((phase, pi) => (
                  <div key={phase.num} className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm"
                      style={{ borderColor: `${phase.color}35`, background: `${phase.color}0d` }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ background: phase.color, color: '#000' }}
                      >
                        {phase.num}
                      </span>
                      <div>
                        <p className="text-[10px] font-mono tracking-wider" style={{ color: phase.color }}>
                          {phase.name}
                        </p>
                        <p className="text-xs text-muted">{phase.tool}</p>
                      </div>
                    </div>
                    {pi < track.phases.length - 1 && (
                      <svg className="shrink-0 text-border" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Proprietary tools ── */}
            <div className="mb-14">
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted mb-5">
                Proprietary tools &amp; deliverables
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {track.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-5 rounded-xl border bg-surface"
                    style={{ borderColor: `${track.color}25` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 shrink-0" style={{ color: track.color }}>◆</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">{tool.name}</p>
                        <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Maturity tiers ── */}
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-muted mb-5">
                Client maturity model — where do you fall?
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {track.maturity.map((tier, mi) => (
                  <div
                    key={tier.tier}
                    className="p-5 rounded-xl border"
                    style={{
                      borderColor: `${track.color}${mi === 0 ? '25' : mi === 1 ? '40' : '70'}`,
                      background: `${track.color}${mi === 0 ? '06' : mi === 1 ? '0b' : '12'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: mi === 2 ? track.color : `${track.color}60` }}
                      />
                      <p className="text-[10px] font-mono tracking-wider font-bold" style={{ color: track.color }}>
                        {tier.tier}
                      </p>
                    </div>
                    <p className="text-xs font-mono text-muted mb-2">{tier.range}</p>
                    <p className="text-xs text-muted leading-relaxed italic">{tier.hook}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Methodology link ────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
                How every engagement runs
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                The 4-Phase{' '}
                <span className="text-accent">Engagement Model</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Every DigiFusion engagement — regardless of service track — follows the same
                structured 4-phase model: Discovery &amp; Diagnostic Audit → Gap Analysis →
                Solution Design &amp; Roadmapping → Build, Deploy &amp; Measure.
                Phases 01 and 02 are completed as part of the free strategy session.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/agency/methodology"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
                >
                  Read the Full Methodology
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link
                  href="/agency/case-studies"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/40 text-muted text-sm hover:text-foreground hover:border-accent/40 transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            {/* Phase timeline */}
            <div className="space-y-3">
              {[
                { num: '01', name: 'Discovery & Diagnostic Audit', duration: 'Week 1', color: '#00d4aa', note: 'Free — part of strategy session' },
                { num: '02', name: 'Gap Analysis & Opportunity Mapping', duration: 'Week 1–2', color: '#7c3aed', note: 'Free — part of strategy session' },
                { num: '03', name: 'Solution Design & Roadmapping', duration: 'Week 2', color: '#3b82f6', note: 'Paid — begins on roadmap approval' },
                { num: '04', name: 'Build, Deploy & Measure', duration: 'Weeks 3–6+', color: '#f59e0b', note: 'Paid — sprint-based delivery' },
              ].map((phase) => (
                <div
                  key={phase.num}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-surface"
                  style={{ borderColor: `${phase.color}30` }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: phase.color, color: '#000' }}
                  >
                    {phase.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">{phase.name}</p>
                    <p className="text-xs text-muted">{phase.duration}</p>
                  </div>
                  <span
                    className="text-[10px] font-mono shrink-0 px-2 py-1 rounded-full"
                    style={{ background: `${phase.color}15`, color: phase.color }}
                  >
                    {phase.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-5">
            The first session is free. No commitment required.
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 max-w-2xl mx-auto">
            30 Minutes. A Roadmap. A Payback Projection.
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            The strategy session covers the full diagnostic audit and gap analysis — the first two
            phases of our engagement model — at no cost. You leave with a concrete roadmap and an
            ROI projection before any commitment is required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Book Your Free Strategy Session
            </Link>
            <Link
              href="/agency/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all"
            >
              See All Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
