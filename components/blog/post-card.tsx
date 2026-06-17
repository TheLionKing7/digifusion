import Link from 'next/link';
import { PostCardImage } from '@/components/blog/post-card-image';
import { PostTypeBadge } from '@/components/ui/badge';
import { formatDate, formatReadingTime } from '@/lib/utils/formatters';
import type { BlogPostSummary } from '@/types/blog';

interface PostCardProps {
  post: BlogPostSummary;
  featured?: boolean;
  /** Compact horizontal layout used in the secondary slots beside the featured card */
  compact?: boolean;
  /** Optional stagger delay, used by callers that don't wrap in RevealOnScroll */
  delay?: number;
}

export function PostCard({ post, featured, compact, delay }: PostCardProps) {
  const wrapperStyle = delay ? { animationDelay: `${delay}ms` } : undefined;

  if (compact) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        style={wrapperStyle}
        className="group flex gap-4 rounded-xl bg-surface border border-border hover:border-accent/30 hover:bg-surface-lighter/40 transition-all duration-300 overflow-hidden p-3"
      >
        <div className="relative shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-surface">
          <PostCardImage
            post={post}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1 py-1">
          <div className="flex items-center gap-2 mb-1.5">
            <PostTypeBadge type={post.postType} />
          </div>
          <h3 className="font-serif font-bold text-base leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-auto pt-2 flex items-center gap-2 text-[11px] text-muted">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{formatReadingTime(post.readingTimeMinutes)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={wrapperStyle}
      className="group flex flex-col h-full rounded-2xl bg-surface-lighter border border-border/50 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 overflow-hidden"
    >
      {/* Featured Image — rounded top corners via parent overflow-hidden */}
      <div className={`relative overflow-hidden bg-surface ${featured ? 'h-72 md:h-80' : 'h-52'}`}>
        <PostCardImage
          post={post}
          priority={featured}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <PostTypeBadge type={post.postType} />
        </div>
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-accent/30 text-[10px] font-semibold tracking-wider uppercase text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${featured ? 'p-7' : 'p-5'}`}>
        {/* Meta */}
        <div className="flex items-center gap-2 text-[11px] text-muted mb-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="w-1 h-1 rounded-full bg-border/80" />
          <span>{formatReadingTime(post.readingTimeMinutes)}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-serif font-bold text-foreground group-hover:text-accent transition-colors leading-snug ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={`mt-2 text-sm text-muted leading-relaxed ${
            featured ? 'line-clamp-3 md:text-base' : 'line-clamp-2'
          }`}
        >
          {post.excerpt}
        </p>

        {/* Read More CTA */}
        <div className="mt-auto pt-5">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300">
            Read More
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
