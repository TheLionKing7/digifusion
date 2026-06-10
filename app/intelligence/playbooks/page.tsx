import Link from 'next/link';
import { getPlaybookShopSlug, getCategoryCatalog } from '@/lib/intelligence/products';
import { IntelligenceResourceCard } from '@/components/intelligence/resource-card';

export const revalidate = 60;

export const metadata = {
  title: 'Automation Playbooks — Industry Workflow Systems',
  description:
    'Industry-specific automation playbooks for SMBs and operators. n8n & Make workflows, AI agent blueprints, prompt templates, and SOPs — built to deploy this week.',
  alternates: { canonical: 'https://www.digitafusion.com/intelligence/playbooks' },
  openGraph: {
    title: 'Automation Playbooks — DigiFusion Intelligence',
    description:
      'Not theory. Deployable workflow systems by industry. Buy a playbook, implement it this week.',
    url: 'https://www.digitafusion.com/intelligence/playbooks',
    type: 'website',
  },
};

interface PlaybookEntry {
  slug:      string;
  title:     string;
  domain:    string;
  type:      string;
  sources?:  string[];
  tagline?:  string;
  access:    string;
  createdAt: string;
  isLive?:   boolean;
}

const TYPE_LABELS: Record<string, string> = {
  playbook:    'Playbook',
  framework:   'Framework',
  template:    'Template',
  methodology: 'Methodology',
};

const DOMAIN_LABELS: Record<string, string> = {
  business_development: 'Business Dev',
  automation:           'Automation',
  digital_media:        'Digital Media',
  general:              'General',
};

const STATIC_DESCRIPTIONS: Record<string, { industry: string; description: string; includes: string[] }> = {
  'hospitality-automation-suite': {
    industry: 'Hospitality',
    description:
      'A complete automation pack for hotels, guesthouses, and serviced apartments. Includes automated booking confirmation workflows, AI-powered guest enquiry handling, review collection sequences, and front-desk SOPs. Built on n8n + WhatsApp + email.',
    includes: ['n8n Workflow Files', 'WhatsApp Bot Templates', 'Guest Email Sequences', 'Front-Desk SOPs', 'Setup Guide'],
  },
  'agency-operations-playbook': {
    industry: 'Creative Agencies',
    description:
      'Designed for marketing, design, and content agencies managing multiple clients. Covers automated client onboarding, project status updates, invoice follow-up, and content pipeline management. Includes a complete AI brief generator prompt pack.',
    includes: ['Client Onboarding Workflow', 'Project Tracker Automation', 'Invoice Follow-Up Sequence', 'AI Brief Generator Prompts', 'Client Portal SOP'],
  },
  'smb-lead-machine': {
    industry: 'B2B Sales',
    description:
      'End-to-end lead capture, qualification, and nurture automation for SMBs operating without a CRM admin. Connects web forms, WhatsApp, email, and a lightweight CRM. Includes a follow-up sequence framework and a lead scoring SOP.',
    includes: ['Lead Capture Automation', 'Multi-Channel Follow-Up Sequences', 'Lead Scoring Framework', 'CRM Integration Guides', 'Cold Outreach Prompt Pack'],
  },
  'law-firm-intake-system': {
    industry: 'Legal & Law Firms',
    description:
      'A structured automation pack for small to mid-size law firms. Handles new enquiry qualification via WhatsApp or web form, auto-sends intake questionnaires, routes to the right practice area, and books consultations without assistant intervention.',
    includes: ['Enquiry Qualification Workflow', 'Intake Form Automation', 'Calendar Booking Integration', 'WhatsApp Response Templates', 'GDPR-Compliant Data Handling SOP'],
  },
};

async function getPlaybooks(): Promise<PlaybookEntry[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitafusion.com';
    const res = await fetch(`${baseUrl}/api/intelligence/playbooks`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.playbooks || [];
  } catch {
    return [];
  }
}

export default async function PlaybooksPage() {
  const playbooks = await getPlaybooks();
  const catalog = await getCategoryCatalog('playbook');
  const liveItems   = playbooks.filter(p => p.isLive);
  const staticItems = playbooks.filter(p => !p.isLive);
  const catalogPlaybooks = catalog.filter((c) => c.sku.status === 'available');

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link>
          <span>/</span>
          <span className="text-foreground">Automation Playbooks</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            Intelligence / Automation Playbooks
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-3xl mb-4">
            Automation Playbooks
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-2 italic font-medium text-accent/80">
            Industry-specific workflow systems you deploy, not just read.
          </p>
          <p className="text-base text-muted max-w-2xl leading-relaxed">
            Every playbook is a complete implementation kit — not a guide about automation, but
            the actual automation, ready to install. Workflow files, prompt packs, SOPs, and setup
            guides included. Built on the same systems we deploy for agency clients.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { icon: '⚡', label: 'Workflow Files', desc: 'n8n / Make ready' },
              { icon: '🤖', label: 'AI Prompts',    desc: 'Pre-engineered' },
              { icon: '📋', label: 'SOPs',          desc: 'Step-by-step ops' },
              { icon: '📖', label: 'Setup Guide',   desc: 'Deploy in days' },
            ].map(item => (
              <div key={item.label} className="rounded-xl bg-surface-lighter border border-border/40 p-4 text-center">
                <p className="text-lg mb-1">{item.icon}</p>
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Playbooks grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Licensed framework playbooks */}
        {catalogPlaybooks.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Licensed Framework IP
              </span>
              <div className="flex-1 h-px bg-border/30" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {catalogPlaybooks.map(({ sku, shopProduct }) => (
                <IntelligenceResourceCard key={sku.slug} sku={sku} shopProduct={shopProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Live generated IP from R2 */}
        {liveItems.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Proprietary DigiFusion IP
              </span>
              <div className="flex-1 h-px bg-border/30" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {liveItems.map(pb => (
                <div key={pb.slug} className="rounded-2xl bg-surface-lighter border border-accent/20 p-8 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
                        {DOMAIN_LABELS[pb.domain] || pb.domain}
                      </span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted font-medium capitalize">
                        {TYPE_LABELS[pb.type] || pb.type}
                      </span>
                    </div>
                    {pb.access === 'premium' && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold shrink-0">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{pb.title}</h3>
                  {pb.tagline && <p className="text-sm text-accent font-medium italic mb-3">{pb.tagline}</p>}
                  {pb.sources && pb.sources.length > 0 && (
                    <p className="text-xs text-muted mb-4">Synthesised from: {pb.sources.join(', ')}</p>
                  )}
                  <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
                    <span className="text-[10px] text-muted-dim">
                      {pb.createdAt ? new Date(pb.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                    </span>
                    <Link
                      href={getPlaybookShopSlug(pb.slug) ? `/shop/${getPlaybookShopSlug(pb.slug)}` : '/intelligence/pricing'}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                    >
                      Get Access
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Static / coming-soon */}
        {staticItems.length > 0 && (
          <div>
            {liveItems.length > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs font-semibold text-muted uppercase tracking-widest">Coming Soon</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {staticItems.map(pb => {
                const detail = STATIC_DESCRIPTIONS[pb.slug];
                return (
                  <div key={pb.slug} className="rounded-2xl bg-surface-lighter border border-border/50 p-8 flex flex-col opacity-85">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-semibold">
                        {detail?.industry || DOMAIN_LABELS[pb.domain] || pb.domain}
                      </span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border/40 text-muted">Coming Soon</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{pb.title}</h3>
                    {pb.tagline && <p className="text-sm text-accent font-medium italic mb-3">{pb.tagline}</p>}
                    {detail?.description && <p className="text-sm text-muted leading-relaxed flex-1 mb-5">{detail.description}</p>}
                    {detail?.includes && (
                      <div className="border-t border-border/30 pt-4">
                        <p className="text-[10px] uppercase tracking-widest text-muted font-semibold mb-3">Includes</p>
                        <ul className="space-y-1.5">
                          {detail.includes.map(item => (
                            <li key={item} className="flex items-center gap-2 text-xs text-muted">
                              <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Custom automation CTA */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Don&apos;t See Your Industry?</p>
              <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">We Build Custom Playbooks</h2>
              <p className="text-muted leading-relaxed mb-6">
                Our agency team builds bespoke automation systems for any industry. Book a strategy session and we&apos;ll map your highest-leverage automation opportunities, then build and deploy the entire system — no off-the-shelf compromise.
              </p>
              <Link href="/agency/booking" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-accent-dim transition-all active:scale-[0.98]">
                Book a Strategy Session
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Discovery Call',  desc: 'Map your current workflows and identify automation targets' },
                { label: 'System Design',   desc: 'Architecture your automation stack with the right tools' },
                { label: 'Build & Deploy',  desc: 'We build it, test it, and go live with you' },
                { label: 'Handover & SOPs', desc: 'Full documentation so your team can maintain it' },
              ].map((step, i) => (
                <div key={step.label} className="glass-light rounded-xl p-5">
                  <p className="text-xs font-mono text-accent mb-2">0{i + 1}</p>
                  <p className="font-semibold text-foreground text-sm mb-1">{step.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
