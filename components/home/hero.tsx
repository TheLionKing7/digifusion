'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookingDropdown } from '@/components/ui/booking-dropdown';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        {/* Scan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-scan-line" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-accent tracking-widest uppercase">
              AI Agency · Business Development · Digital Media
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6"
          >
            We Build the{' '}
            <span className="text-gradient">Operating System</span>
            {' '}for Your Business
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-10"
          >
            We help growing businesses automate operations, win more clients, and build a content presence that compounds — using proven frameworks, AI tools, and hands-on specialists who do the work with you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <BookingDropdown size="lg" label="Book a Free Strategy Session" />
            <Link
              href="/agency/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border-light text-foreground hover:bg-surface-light transition-all"
            >
              See What We Do
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border"
          >
            {[
              { value: '3', label: 'Proprietary Frameworks' },
              { value: '7', label: 'Specialist AI Agents' },
              { value: 'SMB', label: 'Focused · Africa, US, UK, CA, AU' },
              { value: 'Free', label: 'Strategy Session to Start' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-foreground font-mono">{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
