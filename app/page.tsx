import { Hero } from '@/components/home/hero';
import { SystemMonitor } from '@/components/home/system-monitor';
import { PillarsGrid } from '@/components/home/pillars-grid';
import { LatestPosts } from '@/components/home/latest-posts';
import { CtaSection } from '@/components/home/cta-section';
import { fetchBlogPosts, fetchAgentStatus } from '@/lib/api/pathguru';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'AI Agency · Automation · Digital Media · Intelligence',
  description:
    'DigiFusion builds the operating system for your business — AI automation, business development, digital media, and a knowledge base powered by proprietary frameworks.',
  alternates: { canonical: 'https://www.digitafusion.com' },
  openGraph: {
    title: 'DigiFusion — We Build the Operating System for Your Business',
    description:
      'Enterprise AI consultancy, digital media, products, and intelligence — diagnosis before prescription.',
    url: 'https://www.digitafusion.com',
    type: 'website',
  },
};

export default async function Homepage() {
  // Parallel data fetching with ISR
  const [posts, agentStatus] = await Promise.all([
    fetchBlogPosts({ limit: 5 }),
    fetchAgentStatus(10),
  ]);

  return (
    <>
      {/* Hero - Full viewport, animated entrance */}
      <Hero />

      {/* System Monitor - "The Agency Statement" - Live AI agent status */}
      <SystemMonitor agents={agentStatus.agents} />

      {/* Four Pillars - Agency | Digital Media | Products | Knowledge Base */}
      <PillarsGrid />

      {/* CTA - Booking consultation */}
      <CtaSection />

      {/* Latest Blog Posts - ISR powered from PathGuru engine */}
      <LatestPosts posts={posts.posts} />
    </>
  );
}
