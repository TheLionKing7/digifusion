import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies — SMB AI Automation',
  description:
    'Real-world DigiFusion engagements: how we helped small and mid-sized businesses cut manual work, reduce errors and reclaim hours every week using AI automation.',
  alternates: { canonical: 'https://www.digitafusion.com/agency/case-studies' },
  openGraph: {
    title: 'Case Studies — SMB AI Automation | DigiFusion',
    description:
      'See how DigiFusion replaced manual busywork with AI-driven workflows for three real SMB clients — a logistics broker, a legal firm and an e-commerce brand.',
    type: 'website',
    url: 'https://www.digitafusion.com/agency/case-studies',
  },
};

const CASE_STUDIES = [
  {
    id: 'freight-broker',
    label: 'Logistics & Freight',
    badge: 'Operations Automation',
    client: 'A mid-sized freight brokerage (12 employees)',
    headline: 'From 4 Hours of Daily Admin to a 15-Minute Morning Review',
    challenge: `Every morning the operations team spent 3–4 hours copy-pasting load confirmations from carrier emails into their TMS, updating a shared Google Sheet, and manually emailing status updates to shippers. Errors were common — the wrong load number on a confirmation caused a $4,200 invoice dispute that took two weeks to resolve. The team knew the process was broken but assumed fixing it required an expensive TMS upgrade.`,
    solution: `We built a three-stage AI pipeline that runs on their existing email inbox — no TMS change required. First, a document-parsing agent reads every inbound carrier confirmation PDF and email, extracts load number, pickup/delivery addresses, driver name and ETA with 98% accuracy. Second, a rules engine matches each confirmation to the correct load record in their TMS via API and pushes the update automatically. Third, a summarisation agent composes and sends a plain-English status email to the shipper the moment a milestone is hit — pickup, in-transit, delivered.`,
    results: [
      'Daily admin time reduced from ~3.5 hours to under 15 minutes (a 93% reduction)',
      'Confirmation-to-TMS update lag dropped from 2–6 hours to under 3 minutes',
      'Invoice disputes caused by data-entry errors fell to zero in the 6 months post-launch',
      'The team redirected saved time to prospecting, adding 2 new carrier relationships in Q1',
    ],
    stack: ['n8n workflow automation', 'OpenAI GPT-4o (document parsing)', 'Custom TMS REST API connector', 'Gmail + Resend for email delivery'],
    duration: '6 weeks from discovery to go-live',
    quote: {
      text: 'I was convinced we needed to replace our whole TMS. Turns out the problem was never the software — it was the manual bridge between our inbox and the software. That bridge is gone now.',
      attribution: 'Operations Manager',
    },
  },
  {
    id: 'boutique-law',
    label: 'Professional Services',
    badge: 'Document & Client Workflow',
    client: 'A boutique employment law firm (3 solicitors, 2 paralegals)',
    headline: 'Cutting Client Intake from 3 Days to 90 Minutes — Without Hiring',
    challenge: `New client intake was a bottleneck. A potential client would email or call, the paralegal would schedule a conflict check, manually prepare an engagement letter from a template, chase the client for a signed copy, then re-enter the same information into the case management system. The firm was losing prospective clients who needed fast turnaround: two confirmed losses in six months totalling roughly £18,000 in fees. Senior solicitors were also getting pulled into admin to keep things moving.`,
    solution: `We redesigned intake as a fully automated sequence. A Typeform collects the prospective client's details and matter type. That submission triggers an AI agent that runs a conflict check against the firm's existing client database, generates a bespoke engagement letter using matter-specific clause blocks, sends it via DocuSign for e-signature, and — on receipt of the signed letter — creates and populates the case record in Clio automatically. The solicitor receives a single Slack notification with a summary. If the conflict check flags a potential issue, the case is routed to a human for review before the letter is sent.`,
    results: [
      'Average intake cycle shortened from 3 working days to under 90 minutes',
      'Paralegal time per new matter reduced from ~4.5 hours to ~20 minutes (admin only)',
      'Zero missed conflict checks in 8 months post-launch (previously 1–2 near-misses per quarter)',
      'Firm onboarded 23% more new matters in the 6 months following launch with the same headcount',
    ],
    stack: ['Typeform (client intake)', 'OpenAI GPT-4o (letter generation)', 'DocuSign API (e-signature)', 'Clio API (case management)', 'Slack notifications'],
    duration: '8 weeks including compliance review',
    quote: {
      text: 'The bit that surprised me most was the conflict check. I assumed that had to be manual. Turns out it just needed to be structured correctly — and now it is.',
      attribution: 'Managing Solicitor',
    },
  },
  {
    id: 'ecommerce-brand',
    label: 'E-Commerce & Retail',
    badge: 'Customer Operations & Content',
    client: 'A DTC skincare brand (7-person team, ~$1.4M ARR)',
    headline: 'Automating Customer Support and Product Descriptions — Saving 22 Hours a Week',
    challenge: `The founder was personally handling ~60 customer service emails per day alongside supplier coordination, paid ads management and new product development. Response times averaged 14 hours, and three one-star reviews in a month all cited slow replies. Meanwhile, the brand had 140 SKUs but only 40% had SEO-optimised product descriptions — the rest were manufacturer copy-pastes. A freelance copywriter quoted $3,200 to fix the catalogue; the budget wasn't there.`,
    solution: `We deployed two parallel systems. For customer support: a GPT-4o-powered triage agent connected to their Gorgias helpdesk reads every inbound ticket, classifies it (order status / returns / product advice / complaints), drafts a response using brand-voice guidelines we co-wrote, and auto-sends for the three lowest-risk categories. Complex or negative-sentiment tickets are flagged and drafted but held for human review. For content: a batch pipeline ingests each product's ingredient list, claimed benefits and existing user reviews, then generates a structured, SEO-optimised product description with a meta title and meta description, reviewed and published in Shopify via API.`,
    results: [
      'Average first-response time dropped from 14 hours to 38 minutes',
      'Customer support time reduced from ~3.5 hours/day to 45 minutes (human review of flagged tickets only)',
      'All 140 SKUs received unique, SEO-optimised descriptions within 11 days',
      'Organic product page traffic increased 34% in the 90 days after description rollout',
      'The founder reclaimed approximately 22 hours per week, redirected to partnerships and new product R&D',
    ],
    stack: ['Gorgias API (helpdesk)', 'OpenAI GPT-4o (triage + drafting)', 'Shopify Admin API (product publishing)', 'Custom brand-voice prompt library', 'Slack (human escalation alerts)'],
    duration: '5 weeks (support system: week 1–3; content pipeline: week 3–5)',
    quote: {
      text: "I used to start every day drowning in emails. Now I open Gorgias once in the morning and once in the afternoon. The AI handles the rest — and it sounds exactly like me.",
      attribution: 'Founder & CEO',
    },
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">
            Agency — Case Studies
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Automation that pays for itself
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Three engagements. Three industries. One consistent result: small teams doing significantly
            more — without adding headcount or replacing the tools they already use.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="mx-auto max-w-7xl px-6 pb-24 space-y-24">
        {CASE_STUDIES.map((cs, index) => (
          <article key={cs.id} id={cs.id} className="scroll-mt-28">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                {cs.badge}
              </span>
              <span className="text-sm text-muted">{cs.label}</span>
              <span className="hidden sm:block text-muted-dim">·</span>
              <span className="text-sm text-muted">{cs.client}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
              {/* Main content */}
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-8">
                  {cs.headline}
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">
                      The Challenge
                    </h3>
                    <p className="text-muted leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-3">
                      What We Built
                    </h3>
                    <p className="text-muted leading-relaxed">{cs.solution}</p>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-accent/40 pl-6 py-2">
                    <p className="text-foreground italic leading-relaxed mb-2">
                      &ldquo;{cs.quote.text}&rdquo;
                    </p>
                    <footer className="text-sm text-muted">{cs.quote.attribution}</footer>
                  </blockquote>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Results */}
                <div className="glass-strong rounded-xl p-6">
                  <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-4">
                    Results
                  </h3>
                  <ul className="space-y-3">
                    {cs.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                        <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-accent/15 flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="hsl(168,100%,42%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div className="rounded-xl border border-border/40 p-6">
                  <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-muted mb-4">
                    Stack Used
                  </h3>
                  <ul className="space-y-2">
                    {cs.stack.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted">
                        <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-dim">
                    Timeline: {cs.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider — except after last item */}
            {index < CASE_STUDIES.length - 1 && (
              <div className="mt-24 border-t border-border/40" />
            )}
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-4">
              Work with us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Ready to build yours?
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Every engagement starts with a free 45-minute strategy session. We map your highest-value
              automation opportunities, estimate time savings and give you a clear picture of what
              a build looks like — before you commit to anything.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agency/booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent-dim transition-colors"
              >
                Book a strategy session
              </Link>
              <Link
                href="/agency/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border/60 text-foreground hover:border-accent/50 transition-colors text-sm"
              >
                See all services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
