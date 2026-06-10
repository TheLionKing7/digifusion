import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Media Strategy Session',
  description:
    'Book a free 30-minute digital media strategy session. We audit your brand presence, identify content gaps, and build a growth roadmap — tailored to where your audience lives.',
};

export default function DigitalMediaBookingPage() {
  return (
    <main className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        {/* Purple-toned glow for Digital Media (distinct from automation's teal) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#7c3aed]/6 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#ec4899]/4 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pt-40 pb-28 w-full">

        {/* Back link */}
        <Link
          href="/agency/booking"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-colors mb-10 group"
        >
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Automation Strategy
        </Link>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#7c3aed' }}>
            Digital Media Session · 30 Minutes · Free
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight mb-6">
          Building Brands That{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            }}
          >
            Own the Narrative.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mb-4">
          Most brands post content. Few build audiences.{' '}
          <span className="text-foreground font-medium">We build audiences that convert.</span>
        </p>

        <p className="text-lg text-muted leading-relaxed max-w-2xl mb-16">
          Let&apos;s audit your digital presence, identify the content gaps your
          competitors are ignoring, and map out a media strategy that turns attention
          into revenue.
        </p>

        {/* What You Get */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest uppercase mb-8" style={{ color: '#7c3aed' }}>
            What you get in 30 minutes
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                number: '01',
                title: 'Brand Audit',
                description:
                  'We review your current digital presence and identify the exact gaps that are costing you audience share.',
                color: '#7c3aed',
              },
              {
                number: '02',
                title: 'Platform Strategy',
                description:
                  'A channel-specific plan — which platforms to own first, what content formats drive traction for your niche.',
                color: '#ec4899',
              },
              {
                number: '03',
                title: 'Growth Roadmap',
                description:
                  'A 90-day media blueprint showing how we turn your story into a compounding content engine.',
                color: '#3b82f6',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative p-6 rounded-xl bg-surface border border-border overflow-hidden"
              >
                {/* Subtle colour wash */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}0d, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <span
                    className="text-xs font-mono tracking-widest mb-4 block"
                    style={{ color: item.color }}
                  >
                    {item.number}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who this is for */}
        <div className="mb-16 p-6 rounded-xl bg-surface border border-border">
          <p className="text-xs font-mono tracking-widest uppercase mb-5 text-muted">
            Who this session is for
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              'Founders wanting to build a personal brand that generates leads',
              'Businesses with no clear content strategy or inconsistent posting',
              'Brands losing audience to competitors with stronger social presence',
              'Creators ready to turn their content into a monetised media brand',
              'Organisations launching a product and needing launch-day content',
              'Companies that tried agencies before and got generic output',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-muted">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: '#7c3aed' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Block */}
        <div className="flex flex-col items-start gap-4">
          <a
            href="https://tally.so/r/EkN0xr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-lg text-white transition-all active:scale-[0.98] hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #9d4edd)' }}
          >
            <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            Book Your Digital Media Session
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="text-xs font-mono text-muted tracking-widest uppercase">
            Strictly for Founders, Brand Leads &amp; Content Decision Makers.
          </p>
        </div>

        {/* Cross-sell nudge */}
        <div className="mt-20 pt-10 border-t border-border">
          <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">
            Also looking at AI &amp; Automation?
          </p>
          <Link
            href="/agency/booking"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors group"
          >
            View the SaaS &amp; Automation strategy session
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </main>
  );
}
