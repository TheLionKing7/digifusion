import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Methodology',
  description:
    'The DigiFusion engagement model — a 4-phase diagnostic and delivery framework built on process intelligence, gap analysis, and measurable ROI. No guesswork. No generic playbooks.',
  alternates: { canonical: 'https://www.digitafusion.com/agency/methodology' },
};

/* ── Data ─────────────────────────────────────────────────────────────────── */

const PRINCIPLES = [
  {
    num: '01',
    title: 'Diagnosis before prescription',
    body: 'Every engagement starts with a structured audit — not a sales pitch. We map your processes, identify the primary bottleneck, and quantify the cost of inaction before recommending anything.',
  },
  {
    num: '02',
    title: 'ROI is calculated, not assumed',
    body: 'We calculate a payback timeline for every intervention we recommend. If we cannot show you a concrete return within a defensible timeframe, we do not propose the work.',
  },
  {
    num: '03',
    title: 'Strategy and execution are inseparable',
    body: 'According to a 2025 industry study, 88% of AI projects fail at the strategy-execution gap — where consultants hand over a deck and disappear. Our team designs and builds. No handoff problem.',
  },
  {
    num: '04',
    title: 'Measurement is built in from day one',
    body: 'We define success criteria, baselines, and KPIs before work begins — not after. Every project closes with a post-delivery audit comparing actual outcomes against projected ones.',
  },
];

const PHASES = [
  {
    num: '01',
    name: 'Discovery & Diagnostic Audit',
    duration: 'Week 1',
    color: '#00d4aa',
    summary:
      'We establish a factual baseline of your current operations — identifying the primary constraint that limits your revenue, throughput, or growth.',
    steps: [
      {
        title: 'Stakeholder mapping',
        desc: 'We identify the decision-makers, process owners, and key contributors whose workflows will be touched by the engagement.',
      },
      {
        title: 'Process documentation',
        desc: 'We capture your current-state workflows at a granular level — including average cycle times, error rates, and manual touchpoints — using live screen-sharing and Miro mapping.',
      },
      {
        title: 'Bottleneck scoring',
        desc: 'Each process is scored across four dimensions: time cost, revenue impact, frequency, and reversibility. The highest-scoring constraint becomes the primary target.',
      },
      {
        title: 'Cost-of-inaction calculation',
        desc: 'We calculate your real weekly loss: (hourly rate × hours wasted) + downstream revenue impact. This number anchors every subsequent recommendation.',
      },
    ],
    output: 'A Diagnostic Audit Report with your bottleneck ranked, cost-of-inaction quantified, and a validated current-state workflow map.',
  },
  {
    num: '02',
    name: 'Gap Analysis & Opportunity Mapping',
    duration: 'Week 1–2',
    color: '#7c3aed',
    summary:
      'We place your current state alongside the achievable future state — identifying the specific interventions that close the gap fastest.',
    steps: [
      {
        title: 'Current vs. future state mapping',
        desc: 'We visualise your existing workflow against an optimised version — showing exactly where automation, content systems, or pipeline architecture would eliminate the bottleneck.',
      },
      {
        title: 'Opportunity scoring matrix',
        desc: 'Potential solutions are scored on four axes: implementation time, cost, reversibility, and projected impact. We use this matrix to rank interventions and surface the highest-leverage one first.',
      },
      {
        title: 'Market and competitive context',
        desc: 'For digital media and business development engagements, we conduct a competitor audit and ICP analysis — establishing where you are versus where the market is moving.',
      },
      {
        title: 'Risk identification',
        desc: 'We surface the most common failure modes for engagements of your type (integration dependencies, data quality gaps, change management) and build mitigation into the roadmap.',
      },
    ],
    output: 'A Gap Analysis Document with a ranked opportunity matrix, a visualised future-state workflow, and identified risk factors with proposed mitigations.',
  },
  {
    num: '03',
    name: 'Solution Design & Roadmapping',
    duration: 'Week 2',
    color: '#3b82f6',
    summary:
      'We design the precise intervention, build the delivery roadmap, and calculate the projected return — so you know exactly what you are committing to before work begins.',
    steps: [
      {
        title: 'Solution architecture',
        desc: 'We design the solution at a system level — specifying integrations, tools, workflows, and content structures — with your existing stack as the starting point, not an afterthought.',
      },
      {
        title: 'Phased delivery roadmap',
        desc: 'Work is sequenced into 2-week sprints with clear deliverables and acceptance criteria for each. You approve the roadmap before a single hour of build time begins.',
      },
      {
        title: 'ROI projection and payback timeline',
        desc: 'We model the expected return using your own cost-of-inaction figure, projecting time-to-value against the investment. Most engagements show payback within 90 days of go-live.',
      },
      {
        title: 'Success criteria and KPI definition',
        desc: 'We lock in the exact metrics that define success — cycle time reduction, lead volume increase, revenue attributable to content — before work begins, so post-delivery reviews are objective.',
      },
    ],
    output: 'A Prioritised Roadmap Document with phased delivery schedule, ROI projection, defined KPIs, and a go/no-go decision point before build begins.',
  },
  {
    num: '04',
    name: 'Build, Deploy & Measure',
    duration: 'Weeks 3–6+',
    color: '#f59e0b',
    summary:
      'We build and deploy the solution, monitor performance against the agreed KPIs, and iterate based on real data — not assumptions.',
    steps: [
      {
        title: 'Sprint-based delivery',
        desc: 'Work is executed in 2-week sprints. You see working outputs at the end of every sprint — no black-box development cycles where you wait weeks to see anything.',
      },
      {
        title: 'Live performance monitoring',
        desc: 'For AI automation and digital media projects, we configure real-time dashboards (Looker Studio, custom reporting) during deployment so performance is visible from day one.',
      },
      {
        title: 'Post-launch optimisation window',
        desc: 'All retainer engagements include a 30-day post-launch window for iteration. We track performance against the agreed KPIs and adjust before the sprint clock restarts.',
      },
      {
        title: 'Quarterly strategy review',
        desc: 'At the end of every quarter, we run a formal review against your original KPIs and cost-of-inaction baseline — with a written report comparing projected vs. actual outcomes.',
      },
    ],
    output: 'Working deliverables at every sprint. A Post-Launch Performance Report at 30 days. Quarterly strategy reviews for ongoing retainer engagements.',
  },
];

const TRACK_METHODS = [
  {
    id: 'ai',
    label: 'AI Automation',
    color: '#00d4aa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M15 9h.01M9 15h6"/>
      </svg>
    ),
    framework: 'Process Intelligence Framework',
    description:
      'Our AI automation methodology is built around process intelligence — the discipline of mapping, scoring, and sequencing automation opportunities based on real operational data rather than intuition.',
    stages: [
      { label: 'Map', desc: 'Document every manual touchpoint in the target workflow with timestamps and handoff points.' },
      { label: 'Score', desc: 'Score each touchpoint on time cost, error rate, frequency, and downstream impact.' },
      { label: 'Select', desc: 'Identify the highest-scoring workflow for the first automation sprint using our Opportunity Matrix.' },
      { label: 'Build', desc: 'Design and deploy the automation — connected to your existing stack via API or native integrations.' },
      { label: 'Validate', desc: 'Run the automated workflow in parallel with the manual process for 5 business days to catch edge cases.' },
      { label: 'Measure', desc: 'Compare cycle time, error rate, and output volume against the pre-automation baseline.' },
    ],
    stat: { value: '42%', label: 'of companies abandon AI projects due to unclear ROI — our framework prevents this by calculating value before build begins.' },
  },
  {
    id: 'media',
    label: 'Digital Media',
    color: '#f59e0b',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    framework: 'Pillar-Cluster Authority Architecture',
    description:
      'Our content methodology is based on the pillar-cluster model — a proven SEO architecture that builds topical authority through a hub-and-spoke content structure. Websites adopting this framework see up to 43% more organic traffic than those publishing standalone posts.',
    stages: [
      { label: 'Audit', desc: 'Analyse your existing content, keyword gaps, and competitor authority footprints to find the highest-opportunity topic cluster.' },
      { label: 'ICP Mapping', desc: 'Define your Ideal Customer Profile and map their search behaviour from awareness through to buying intent.' },
      { label: 'Architecture', desc: 'Design the pillar page and cluster content structure — a hub topic + 8–12 cluster articles — with internal linking mapped before writing begins.' },
      { label: 'Production', desc: 'Produce pillar and cluster content to a defined editorial brief, calibrated for search intent at each stage of the funnel.' },
      { label: 'Distribution', desc: 'Amplify through owned channels (email newsletter, social) to accelerate initial indexing signals.' },
      { label: 'Attribution', desc: 'Track rankings, organic sessions, and leads attributed to each cluster — not just vanity metrics.' },
    ],
    stat: { value: '43%', label: 'average organic traffic increase reported by websites that adopt a topic cluster framework (HubSpot, 2025).' },
  },
  {
    id: 'bizdev',
    label: 'Business Development',
    color: '#7c3aed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    framework: '6-Stage Revenue Pipeline Model',
    description:
      'Our business development methodology is structured around a 6-stage pipeline that creates visibility into every step of your revenue system — from first contact to long-term retention. Research shows that companies with a formal sales process generate 28% more revenue than those without one.',
    stages: [
      { label: 'ICP Definition', desc: 'Define your Ideal Customer Profile with firmographic, behavioural, and pain-point criteria — the filter every lead must pass before entering the pipeline.' },
      { label: 'Prospecting', desc: 'Build a multi-channel outreach sequence (cold email, LinkedIn, content-led inbound) calibrated to your ICP and deal size.' },
      { label: 'Qualification', desc: 'Apply a structured qualification framework (BANT for deals under $25K, MEDDIC for enterprise) to score lead quality before a meeting is booked.' },
      { label: 'Proposal', desc: 'Design a proposal structure that leads with the prospect\'s cost-of-inaction figure — anchoring value before price is introduced.' },
      { label: 'Close', desc: 'Define entry and exit criteria for every stage so deals never stagnate. Implement a follow-up cadence: 80% of sales require 5+ touchpoints.' },
      { label: 'Retain & Expand', desc: 'Build a post-close onboarding sequence that converts new clients into case study contributors, referral sources, and upsell candidates.' },
    ],
    stat: { value: '28%', label: 'more revenue generated by companies with a formal, stage-gated sales process vs. those without one (Pipedrive research).' },
  },
];

const DELIVERABLES = [
  { phase: 'Session', item: 'Diagnostic Audit summary (2-hour turnaround)' },
  { phase: 'Phase 01', item: 'Full process workflow map (Miro)' },
  { phase: 'Phase 01', item: 'Bottleneck scorecard with cost-of-inaction figure' },
  { phase: 'Phase 02', item: 'Gap Analysis report with opportunity matrix' },
  { phase: 'Phase 02', item: 'Current vs. future state visualisation' },
  { phase: 'Phase 03', item: 'Prioritised roadmap document — yours to keep' },
  { phase: 'Phase 03', item: 'ROI projection with payback timeline' },
  { phase: 'Phase 03', item: 'Defined KPIs and success criteria' },
  { phase: 'Phase 04', item: 'Working sprint deliverables every 2 weeks' },
  { phase: 'Phase 04', item: '30-day post-launch performance report' },
  { phase: 'Ongoing', item: 'Quarterly strategy review vs. original baseline' },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function MethodologyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            How We Work · Built on Evidence
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl mb-6">
            The DigiFusion{' '}
            <span className="text-accent">Engagement Model</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 font-serif leading-snug max-w-3xl mb-5">
            We are the only agency that runs your engagement on a documented, proprietary framework —
            so you see exactly what we are doing, why we are doing it, and what it should return
            before the work begins.
          </p>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-8">
            A 4-phase diagnostic and delivery framework that starts with your real numbers
            — not a generic playbook. Every recommendation is tied to a payback timeline before a single hour of build time begins.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Start with a Diagnostic Session
            </Link>
            <Link
              href="/agency/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/40 text-muted text-sm hover:border-accent/40 hover:text-foreground transition-all"
            >
              View Pricing & Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className="py-20 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-10">
            The principles behind everything we do
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="p-6 rounded-2xl bg-surface border border-border/50">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-accent shrink-0 mt-1">{p.num}</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Phase Engagement Model ── */}
      <section className="py-20 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
            The 4-phase engagement model
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            From first call to measurable outcome
          </h2>
          <p className="text-muted max-w-2xl mb-14 leading-relaxed">
            Every DigiFusion engagement — regardless of service track — follows the same structured model.
            Phases 01–02 are completed as part of the free strategy session. Phases 03–04 begin only when
            you approve the roadmap and ROI projection.
          </p>

          <div className="space-y-6">
            {PHASES.map((phase) => (
              <div
                key={phase.num}
                className="relative rounded-2xl bg-surface border border-border/50 overflow-hidden"
              >
                {/* Left color bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-1"
                  style={{ background: phase.color }}
                />

                <div className="p-7 pl-9">
                  {/* Header */}
                  <div className="grid md:grid-cols-[260px_1fr] gap-6 mb-6">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest mb-1" style={{ color: phase.color }}>
                        PHASE {phase.num} · {phase.duration}
                      </p>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">{phase.name}</h3>
                      <p className="text-sm text-muted leading-relaxed">{phase.summary}</p>
                    </div>
                    {/* Output callout */}
                    <div
                      className="self-start p-4 rounded-xl border text-sm text-muted leading-relaxed"
                      style={{ borderColor: `${phase.color}30`, background: `${phase.color}08` }}
                    >
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-2" style={{ color: phase.color }}>
                        Phase output
                      </p>
                      {phase.output}
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {phase.steps.map((step) => (
                      <div key={step.title} className="flex items-start gap-3">
                        <span className="mt-1 shrink-0" style={{ color: phase.color }}>→</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-0.5">{step.title}</p>
                          <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Track-Specific Methodologies ── */}
      <section className="py-20 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
            Service-specific frameworks
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            One model. Three specialised frameworks.
          </h2>
          <p className="text-muted max-w-2xl mb-14 leading-relaxed">
            The 4-phase model governs every engagement. Inside it, each service track uses a purpose-built
            framework calibrated for its domain — not a recycled template.
          </p>

          <div className="space-y-8">
            {TRACK_METHODS.map((track) => (
              <div key={track.id} className="rounded-2xl border border-border/50 bg-surface overflow-hidden">
                {/* Track header */}
                <div
                  className="px-7 py-5 border-b border-border/40 flex items-center gap-4"
                  style={{ background: `${track.color}08` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${track.color}15`, color: track.color }}
                  >
                    {track.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: track.color }}>
                      {track.label}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-foreground">{track.framework}</h3>
                  </div>
                </div>

                <div className="p-7">
                  <p className="text-sm text-muted leading-relaxed mb-7 max-w-3xl">{track.description}</p>

                  {/* 6 stages */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {track.stages.map((stage, i) => (
                      <div key={stage.label} className="p-4 rounded-xl border border-border/40 bg-surface-lighter">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: `${track.color}20`, color: track.color }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-xs font-semibold text-foreground">{stage.label}</p>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">{stage.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stat */}
                  <div
                    className="inline-flex items-start gap-3 p-4 rounded-xl border text-sm"
                    style={{ borderColor: `${track.color}30`, background: `${track.color}05` }}
                  >
                    <span className="font-serif text-2xl font-bold shrink-0" style={{ color: track.color }}>
                      {track.stat.value}
                    </span>
                    <p className="text-xs text-muted leading-relaxed">{track.stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Everything You Receive ── */}
      <section className="py-20 border-b border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
            Deliverables across the engagement
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Every output, documented
          </h2>
          <p className="text-muted max-w-2xl mb-10 leading-relaxed">
            We do not produce slides that sit in a Dropbox folder. Every phase produces a concrete
            working document — yours to keep and act on, regardless of what you decide next.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
            {DELIVERABLES.map((d) => (
              <div key={d.item} className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-surface">
                <span className="text-accent mt-0.5 shrink-0">✓</span>
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">{d.phase}</p>
                  <p className="text-sm text-foreground leading-snug">{d.item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            Ready to start?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Phases 01 and 02 Are Free
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            The strategy session covers the full diagnostic audit and gap analysis — the first two phases
            of our engagement model — at no cost. You leave with a roadmap and a payback projection
            before any commitment is required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/agency/booking"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-all active:scale-[0.98]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
              Book a Free Strategy Session
            </Link>
            <Link
              href="/agency/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all"
            >
              See Pricing & Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
