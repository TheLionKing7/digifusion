'use client';

import Link from 'next/link';
import { RevealOnScroll } from '@/components/animations/reveal-on-scroll';
import { BookingDropdown } from '@/components/ui/booking-dropdown';

const SESSION_PHASES = [
  {
    num: '01',
    name: 'The Diagnostic',
    label: 'First 10 min',
    desc: 'We dig into your operations to uncover the root bottleneck costing you the most time or revenue — and identify which metric will move fastest if we fix it.',
    color: '#00d4aa',
  },
  {
    num: '02',
    name: 'The Gap Analysis',
    label: 'Middle 10 min',
    desc: 'We map your current workflow against the automated future and calculate the real cost of inaction — so the ROI of moving forward is concrete, not theoretical.',
    color: '#7c3aed',
  },
  {
    num: '03',
    name: 'The Prescription',
    label: 'Final 10 min',
    desc: 'You leave with a prioritised roadmap, a recommended first automation, and a clear payback timeline. No upsell pressure — just a logical next step if it makes sense.',
    color: '#3b82f6',
  },
];

export function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
              Free · 30 Minutes · No Sales Pressure
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Here's Exactly What Happens{' '}
              <span className="text-gradient">In the Session</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
              We don't do vague discovery calls. Every session follows a proven 3-phase diagnostic
              that gives you a real output — regardless of whether you hire us.
            </p>
          </div>

          {/* 3-Phase breakdown */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {SESSION_PHASES.map((phase) => (
              <div
                key={phase.num}
                className="group relative p-7 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${phase.color}08, transparent)` }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono tracking-widest" style={{ color: phase.color }}>
                      PHASE {phase.num}
                    </span>
                    <span className="text-[10px] font-mono text-muted bg-surface-lighter px-2 py-1 rounded-full border border-border/50">
                      {phase.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">{phase.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What you leave with */}
          <div className="max-w-3xl mx-auto mb-14">
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 flex flex-col sm:flex-row items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2 text-sm">You leave the session with:</p>
                <div className="grid sm:grid-cols-3 gap-x-8 gap-y-1">
                  {[
                    'The exact bottleneck costing you most',
                    'A cost-of-inaction calculation',
                    'A prioritised automation roadmap',
                    'A recommended first tool or workflow',
                    'A payback timeline for the fix',
                    'A post-session summary within 2 hours',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-muted">
                      <span className="text-accent mt-0.5 shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              <BookingDropdown size="md" label="Book Your Free Session" />
              <Link
                href="/agency/services"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-lg border border-border text-foreground hover:border-accent/40 hover:text-accent transition-all"
              >
                View Pricing & Services
              </Link>
            </div>
            <p className="text-xs font-mono text-muted tracking-widest uppercase">
              Strictly for founders &amp; decision-makers · No commitment required
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
