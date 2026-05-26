import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book a Strategy Session | DigiFusion',
  description:
    'Book a free 30-minute strategy session. We run a 3-phase diagnostic — audit your bottlenecks, calculate the cost of inaction, and deliver a prioritised roadmap. No obligation.',
  alternates: { canonical: 'https://www.digitafusion.com/agency/booking' },
};

const SERVICE_TRACKS = [
  {
    id: 'ai',
    label: 'AI Automation',
    desc: 'Workflows, agents, and intelligent systems',
    color: '#00d4aa',
    questions: [
      'What manual process is draining the most hours from your team each week?',
      'Which business metric (revenue, support tickets, lead response time) would move fastest if we fixed it?',
      'Have you tried automating this before — and what stopped it from working?',
    ],
  },
  {
    id: 'media',
    label: 'Digital Media',
    desc: 'SEO, content, social, and visibility',
    color: '#f59e0b',
    questions: [
      'Where is your traffic currently coming from — and where is it falling short?',
      'What does your ideal customer search for before finding you (or your competitors)?',
      'How many leads per month are you losing to poor online visibility?',
    ],
  },
  {
    id: 'bizdev',
    label: 'Business Development',
    desc: 'Strategy, pipeline, and growth systems',
    color: '#7c3aed',
    questions: [
      'What is your primary revenue goal for the next 90 days?',
      'Where is your pipeline breaking down — awareness, conversion, or retention?',
      'What market or customer segment are you trying to unlock?',
    ],
  },
];

const PHASES = [
  {
    num: '01',
    name: 'The Diagnostic Audit',
    subtitle: 'First 10 minutes',
    color: '#00d4aa',
    goal: 'Uncover the root bottleneck costing you the most time or revenue.',
    actions: [
      'Identify the primary metric that would move if the bottleneck were fixed',
      'Understand why this problem has persisted — systems, people, or tools',
      'Map your current workflow at a high level (screen-shared live)',
    ],
  },
  {
    num: '02',
    name: 'The Gap Analysis',
    subtitle: 'Middle 10 minutes',
    color: '#7c3aed',
    goal: 'Illustrate the cost of inaction and the value of the fix.',
    actions: [
      'Calculate your real cost of inaction (hourly loss × hours wasted)',
      'Visualise current workflow vs. the automated future state',
      'Identify which solution category closes the gap fastest',
    ],
  },
  {
    num: '03',
    name: 'The Prescription',
    subtitle: 'Final 10 minutes',
    color: '#3b82f6',
    goal: 'Prescribe the logical, high-ROI next step with a clear payback timeline.',
    actions: [
      'Recommend the first automation or strategy to deploy',
      'Present ROI: "This project pays for itself in X months"',
      'Agree on a logical next step — no pressure, no upsell',
    ],
  },
];

const SESSION_CHECKLIST = [
  'Pre-session agenda sent 24 hours before your call',
  'Live workflow mapping shared on screen (Miro/Whimsical)',
  'Post-session summary email delivered within 2 hours',
  'Prioritised roadmap document — yours to keep regardless',
];

export default function BookingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-36 pb-28">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Free Strategy Session · 30 Minutes · No Commitment
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight mb-6">
          We Run a Diagnostic.{' '}
          <span className="text-gradient">You Get a Roadmap.</span>
        </h1>

        <p className="text-xl text-muted leading-relaxed max-w-2xl mb-16">
          This isn't a discovery call. It's a structured 3-phase session that ends
          with a concrete deliverable — regardless of whether you hire us.
        </p>

        {/* ── Service Track Selector ── */}
        <div className="mb-16">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-6">
            Which track applies to your challenge?
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {SERVICE_TRACKS.map((track) => (
              <div
                key={track.id}
                className="p-6 rounded-2xl bg-surface border border-border/50 hover:border-accent/20 transition-all"
              >
                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{ background: track.color }}
                />
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">{track.label}</h3>
                <p className="text-xs text-muted mb-5">{track.desc}</p>
                <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-3">
                  We'll ask you:
                </p>
                <ul className="space-y-2">
                  {track.questions.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                      <span className="shrink-0 mt-0.5" style={{ color: track.color }}>→</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── The 3 Phases ── */}
        <div className="mb-16">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-8">
            How every session is structured
          </p>
          <div className="space-y-4">
            {PHASES.map((phase, i) => (
              <div
                key={phase.num}
                className="relative rounded-2xl bg-surface border border-border/50 p-7 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: phase.color }}
                />
                <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">
                  <div>
                    <p className="text-xs font-mono tracking-widest mb-1" style={{ color: phase.color }}>
                      PHASE {phase.num}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">{phase.name}</h3>
                    <span className="text-[10px] font-mono text-muted bg-surface-lighter px-2 py-1 rounded-full border border-border/40">
                      {phase.subtitle}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-4">
                      <span className="text-muted font-normal">Goal: </span>{phase.goal}
                    </p>
                    <ul className="space-y-2">
                      {phase.actions.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-sm text-muted">
                          <span className="shrink-0 mt-0.5" style={{ color: phase.color }}>✓</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Session Checklist ── */}
        <div className="mb-16 rounded-2xl border border-accent/20 bg-accent/5 p-7">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-5">
            Every session includes
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SESSION_CHECKLIST.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-muted">
                <span className="text-accent shrink-0 mt-0.5">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Block ── */}
        <div className="flex flex-col items-start gap-5">
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">
              Ready? Pick your track and book below.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://tally.so/r/2ED80A"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-lg bg-accent text-background hover:bg-accent-dim transition-all active:scale-[0.98]"
              >
                <span className="w-2 h-2 rounded-full bg-background animate-pulse" />
                Book My Strategy Session
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/agency/services"
                className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/40 transition-all"
              >
                View pricing first
              </Link>
            </div>
          </div>
          <p className="text-xs font-mono text-muted tracking-widest uppercase">
            Strictly for founders &amp; decision-makers · Africa &amp; global bookings welcome
          </p>
        </div>

      </div>
    </main>
  );
}
