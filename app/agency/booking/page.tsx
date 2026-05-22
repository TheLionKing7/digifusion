import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Strategy Session | DigiFusion',
  description:
    'Book a free 15-minute AI strategy session. We audit your business for AI integration and identify the exact systems that will scale your output.',
};

export default function BookingPage() {
  return (
    <main className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pt-40 pb-28 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            Free Strategy Session · 15 Minutes
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-[1.1] tracking-tight mb-6">
          Engineering Your{' '}
          <span className="text-gradient">Intelligence Layer.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mb-4">
          Most businesses try to bolt AI onto broken processes.{' '}
          <span className="text-foreground font-medium">We re-engineer the foundation.</span>
        </p>

        <p className="text-lg text-muted leading-relaxed max-w-2xl mb-16">
          Let&apos;s audit your business for AI integration and identify the exact
          systems that will scale your output.
        </p>

        {/* What You Get */}
        <div className="mb-16">
          <p className="text-xs font-mono text-accent tracking-widest uppercase mb-8">
            What you get in 15 minutes
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                number: '01',
                title: 'Gap Analysis',
                description:
                  'Pinpoint the exact bottleneck costing you the most time.',
                color: '#00d4aa',
              },
              {
                number: '02',
                title: 'Tool Selection',
                description:
                  'A recommendation on which SaaS or Custom AI agent to deploy first.',
                color: '#7c3aed',
              },
              {
                number: '03',
                title: 'The Blueprint',
                description:
                  'A high-level view of how we automate your revenue engine.',
                color: '#3b82f6',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative p-6 rounded-xl bg-surface border border-border overflow-hidden"
              >
                {/* Subtle glow */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}0a, transparent 60%)`,
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

        {/* CTA Block */}
        <div className="flex flex-col items-start gap-4">
          <a
            href="https://tally.so/r/2ED80A"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium rounded-lg bg-accent text-background hover:bg-accent-dim transition-all active:scale-[0.98]"
          >
            <span className="w-2 h-2 rounded-full bg-background animate-pulse" />
            Book a Strategy Session
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
            Strictly for Founders &amp; Decision Makers.
          </p>
        </div>
      </div>
    </main>
  );
}
