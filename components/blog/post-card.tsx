import Link from 'next/link';
import { PostTypeBadge } from '@/components/ui/badge';
import { formatDate, formatReadingTime } from '@/lib/utils/formatters';
import type { BlogPostSummary } from '@/types/blog';

interface PostCardProps {
  post: BlogPostSummary;
  featured?: boolean;
}

export function PostCard({ post, featured }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block relative rounded-xl bg-surface border border-border hover:border-accent/20 transition-all duration-300 overflow-hidden ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Featured Image Placeholder */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        {post.featuredImageUrl ? (
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-lighter to-surface flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted/20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
        )}
        {/* Post Type Badge */}
        <div className="absolute top-3 left-3">
          <PostTypeBadge type={post.postType} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{formatReadingTime(post.readingTimeMinutes)}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-serif font-bold text-foreground group-hover:text-accent transition-colors ${
            featured ? 'text-2xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author & Categories */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted">{post.author.name}</span>
          {post.categories.length > 0 && (
            <span className="text-xs text-muted/60">{post.categories[0]}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
