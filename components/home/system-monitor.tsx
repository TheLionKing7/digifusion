'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Agent } from '@/types/agent';

interface SystemMonitorProps {
  agents: Agent[];
}

// ── Proprietary Methodology Stack ────────────────────────────────────────────
// Framed as client-facing IP, not internal agent infrastructure.

const FRAMEWORKS = [
  {
    id: 'deal-engine',
    name: 'The Deal Engine',
    track: 'Business Development',
    tagline: 'Predictable revenue, by design.',
    hook: 'Most BD efforts are reactive — we run a documented 5-phase system that maps your Dream 50, qualifies at executive level, and closes with a measurable ROI case. Clients move from ad-hoc prospecting to a growth engine that compounds.',
    proof: 'Converts qualified leads into signed engagements with a structured decision-maker entry strategy.',
    pill: 'BD Framework',
    color: '#7c3aed',
    stat: { value: '5-Phase', label: 'Systematic Pipeline' },
    href: '/agency/methodology',
  },
  {
    id: 'ave',
    name: 'Automation Velocity Engine',
    track: 'AI & SaaS Automation',
    tagline: 'Turn your biggest bottleneck into your fastest return.',
    hook: 'We invented a diagnostic-first methodology that maps your manual processes against an Automation Opportunity Matrix, calculates the real cost of inaction, and deploys in 14-day build sprints — so ROI is visible before the project ends.',
    proof: 'Clients typically recover the engagement cost within 90 days, moving from manual operations to intelligent systems.',
    pill: 'Automation Framework',
    color: '#00d4aa',
    stat: { value: '14-Day', label: 'Sprint-to-Deploy' },
    href: '/agency/methodology',
  },
  {
    id: 'c2c',
    name: 'Content-to-Capital Pipeline',
    track: 'Digital Media',
    tagline: 'Authority that converts, not content that fills space.',
    hook: 'Built on pillar-cluster architecture and an ICP Search Journey Map, our C2C Pipeline turns content into a compounding asset — each piece engineered to rank, attract decision-makers, and move them toward a commercial conversation.',
    proof: 'Every strategy begins with a Topic Authority Index and ends with an Attribution Dashboard showing which content drove revenue.',
    pill: 'Content Framework',
    color: '#f59e0b',
    stat: { value: 'Full-Funnel', label: 'Attribution Model' },
    href: '/agency/methodology',
  },
  {
    id: 'engagement-model',
    name: 'DigiFusion Engagement Model',
    track: 'Every client engagement',
    tagline: 'Diagnosis before prescription — on every track.',
    hook: 'Our proprietary 4-phase delivery architecture: Discovery Audit → Gap Analysis → Solution Design → Build, Deploy & Measure. Every engagement runs on this documented system — not improvised consulting.',
    proof: 'Phases 01–02 delivered in the strategy session; ROI calculated before build begins.',
    pill: 'Engagement Model',
    color: '#06b6d4',
    stat: { value: '4-Phase', label: 'Delivery Architecture' },
    href: '/agency/methodology',
  },
  {
    id: 'enterprise-velocity',
    name: 'Enterprise Velocity Architecture',
    track: 'Enterprise segment',
    tagline: 'Revenue intelligence at enterprise scale.',
    hook: 'Six Velocity Drivers, KAM Engine, and C-suite engagement architecture — built for large corporations that need systematic BD intelligence, not ad-hoc account management.',
    proof: 'Documented in the Enterprise Velocity Architecture Blueprint — firm IP for corporate operators.',
    pill: 'Enterprise Velocity',
    color: '#3b82f6',
    stat: { value: '6 Drivers', label: 'Velocity Architecture' },
    href: '/intelligence/playbooks',
  },
  {
    id: 'sme-scale-engine',
    name: 'SME Scale Engine (5-Pillar)',
    track: 'SME growth architecture',
    tagline: 'One integrated system for SMEs ready to scale revenue.',
    hook: 'Weaves AVE, Deal Engine, and C2C into a 5-Pillar activation plan with a 90-day execution rhythm — built for owner-led businesses that have outgrown ad-hoc growth.',
    proof: 'Documented in the SME Scale Engine Blueprint — firm IP for small and mid-market operators.',
    pill: 'SME Scale Engine',
    color: '#ec4899',
    stat: { value: '5-Pillar', label: 'SME Architecture' },
    href: '/intelligence/playbooks',
  },
];

export function SystemMonitor({ agents }: SystemMonitorProps) {
  const allHealthy =
    agents.length === 0 ||
    agents.every((a) => a.status === 'active' || a.status === 'idle');

  return (
    <section className="relative pt-10 pb-24 border-y border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  allHealthy ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                Proprietary Frameworks · Active
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              The Methodologies{' '}
              <span className="text-gradient-accent">We Built and Run</span>
            </h2>
            <p className="mt-3 text-sm text-muted max-w-xl leading-relaxed">
              Four operating frameworks plus the Intelligence Library — each invented in-house, each anchoring how we run technology, BD, and digital marketing.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted shrink-0 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Deployed across active client engagements
          </div>
        </div>

        {/* Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FRAMEWORKS.map((fw, i) => (
            <motion.div
              key={fw.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="group relative flex flex-col rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-0.5 w-full" style={{ background: fw.color }} />

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative flex flex-col flex-1 p-6">
                {/* Pill + stat row */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border"
                    style={{
                      color: fw.color,
                      borderColor: `${fw.color}40`,
                      background: `${fw.color}10`,
                    }}
                  >
                    {fw.pill}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono" style={{ color: fw.color }}>
                      {fw.stat.value}
                    </div>
                    <div className="text-[10px] text-muted">{fw.stat.label}</div>
                  </div>
                </div>

                {/* Track */}
                <p className="text-[10px] font-mono text-muted tracking-widest uppercase mb-2">
                  {fw.track}
                </p>

                {/* Name */}
                <h3 className="text-lg font-serif font-bold text-foreground mb-2 leading-tight">
                  {fw.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm font-medium text-foreground/80 mb-4 italic">
                  &ldquo;{fw.tagline}&rdquo;
                </p>

                {/* Hook */}
                <p className="text-xs text-muted leading-relaxed mb-4 flex-1">{fw.hook}</p>

                {/* Proof callout */}
                <div
                  className="flex items-start gap-2 text-xs rounded-lg p-3 mb-5"
                  style={{
                    background: `${fw.color}08`,
                    borderLeft: `2px solid ${fw.color}60`,
                  }}
                >
                  <span style={{ color: fw.color }} className="shrink-0 mt-0.5">
                    →
                  </span>
                  <span className="text-muted leading-relaxed">{fw.proof}</span>
                </div>

                {/* CTA */}
                <Link
                  href={fw.href}
                  className="flex items-center justify-between text-xs font-mono tracking-wide group/link"
                  style={{ color: fw.color }}
                >
                  <span className="uppercase tracking-widest">See the methodology</span>
                  <svg
                    className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer credibility bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All three frameworks currently deployed
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Proprietary to DigiFusion — not available elsewhere
          </div>
          <Link
            href="/agency/methodology"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors underline underline-offset-4"
          >
            Read the full methodology
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
