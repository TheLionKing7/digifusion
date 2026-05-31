import { Hero } from '@/components/home/hero';
import { SystemMonitor } from '@/components/home/system-monitor';
import { PillarsGrid } from '@/components/home/pillars-grid';
import { LatestPosts } from '@/components/home/latest-posts';
import { CtaSection } from '@/components/home/cta-section';
import { fetchMockBlogPosts, fetchAgentStatus } from '@/lib/api/pathguru';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function Homepage() {
  // Parallel data fetching with ISR
  const [posts, agentStatus] = await Promise.all([
    fetchMockBlogPosts({ limit: 5 }),
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
