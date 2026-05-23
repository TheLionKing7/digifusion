import Link from 'next/link';
import Image from 'next/image';
import digiLogo from '@/assets/digilogo.png';
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
        <div className="relative shrink-0 w-28 h-28 rounded-lg overflow-hidden">
          {post.featuredImageUrl ? (
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <PlaceholderImage />
          )}
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
      className="group flex flex-col h-full rounded-xl bg-surface border border-border hover:border-accent/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 overflow-hidden"
    >
      {/* Featured Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-72 md:h-96' : 'h-48'}`}>
        {post.featuredImageUrl ? (
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute top-3 left-3">
          <PostTypeBadge type={post.postType} />
        </div>
        {featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-accent/30 text-[10px] font-semibold tracking-wider uppercase text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${featured ? 'p-7' : 'p-5'}`}>
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="w-1 h-1 rounded-full bg-border" />
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

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <span className="w-6 h-6 rounded-full overflow-hidden bg-accent/10 flex items-center justify-center shrink-0">
                <Image src={digiLogo} alt={post.author.name} width={24} height={24} className="object-contain" />
              </span>
            )}
            <span>{post.author.name}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
            Read
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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

function PlaceholderImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-surface-lighter via-surface to-surface flex items-center justify-center">
      <svg
        className="w-12 h-12 text-muted/15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    </div>
  );
}
