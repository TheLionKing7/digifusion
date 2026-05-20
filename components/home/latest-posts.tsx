import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { RevealOnScroll } from '@/components/animations/reveal-on-scroll';
import type { BlogPostSummary } from '@/types/blog';

interface LatestPostsProps {
  posts: BlogPostSummary[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
                Knowledge Base
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Latest from the{' '}
                <span className="text-gradient">Publishing Engine</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
            >
              View all posts
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>

        {/* Featured + Grid */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
          {/* Featured Post */}
          <RevealOnScroll delay={0.1}>
            <PostCard post={featured} featured />
          </RevealOnScroll>

          {/* Remaining Posts */}
          {rest.slice(0, 4).map((post, i) => (
            <RevealOnScroll key={post.id} delay={0.1 + (i + 1) * 0.05}>
              <PostCard post={post} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border-light text-foreground hover:bg-surface-light transition-all"
          >
            View all posts
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
