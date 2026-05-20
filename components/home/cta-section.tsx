'use client';

import Link from 'next/link';
import { RevealOnScroll } from '@/components/animations/reveal-on-scroll';

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
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
              Ready to Scale?
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Let's Build Your{' '}
              <span className="text-gradient">Intelligence Layer</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl mx-auto">
              Book a free strategy session. We'll audit your current operations,
              identify automation opportunities, and build a roadmap — no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/agency/booking"
                className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-lg bg-accent text-background hover:bg-accent-dim transition-all active:scale-[0.98]"
              >
                Book Your Strategy Session
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-lg border border-border-light text-foreground hover:bg-surface-light transition-all"
              >
                Browse the Knowledge Base
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
