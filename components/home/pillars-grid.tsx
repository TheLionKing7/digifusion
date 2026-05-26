'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/animations/reveal-on-scroll';

const PILLARS = [
  {
    title: 'Agency',
    tagline: 'Enterprise Development & AI Consultancy',
    description:
      'Business development with high-end strategy, custom AI agent solution, and automation workflows for discerning businesses that demand results.',
    href: '/agency/services',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    color: '#00d4aa',
    stats: ['50+ Clients', '200+ Agents', '99.7% Uptime'],
  },
  {
    title: 'Digital Media',
    tagline: 'Content, Visibility & Publishing',
    description:
      'SEO-driven content strategy, social media growth, and audience-building systems that compound your reach over time.',
    href: '/media',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    color: '#f59e0b',
    stats: ['SEO & Blogs', 'Social Growth', 'Audience Building'],
  },
  {
    title: 'Products',
    tagline: 'Digital Tools & SaaS',
    description:
      'A library of software, browser extensions, and templates engineered to give you a competitive edge.',
    href: '/products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    color: '#7c3aed',
    stats: ['Software', 'Extensions', 'Templates'],
  },
  {
    title: 'Knowledge Base',
    tagline: 'AI-Powered Publishing',
    description:
      'A living library of insights, guides, and case studies — generated and published by our proprietary AI engine.',
    href: '/blog',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    color: '#3b82f6',
    stats: ['Listicles', 'Guides', 'Case Studies'],
  },
];

export function PillarsGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
              Four Pillars · One Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Everything You Need to{' '}
              <span className="text-gradient">Scale with AI</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                href={pillar.href}
                className="group block relative p-8 rounded-xl bg-surface border border-border hover:border-accent/20 transition-all duration-300 h-full"
              >
                {/* Hover effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${pillar.color}08, transparent)`,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                    style={{
                      backgroundColor: `${pillar.color}15`,
                      color: pillar.color,
                    }}
                  >
                    {pillar.icon}
                  </div>

                  {/* Content */}
                  <p className="text-xs font-mono mb-2" style={{ color: pillar.color }}>
                    {pillar.tagline}
                  </p>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3">
                    {pillar.stats.map((stat) => (
                      <span
                        key={stat}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${pillar.color}20`,
                          color: pillar.color,
                          backgroundColor: `${pillar.color}08`,
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2"
                    style={{ color: pillar.color }}
                  >
                    Explore {pillar.title}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
