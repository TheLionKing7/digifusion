'use client';

import { useState } from 'react';
import { resolveFeaturedImageUrl } from '@/lib/utils/blog-images';
import type { BlogPostSummary } from '@/types/blog';

interface PostCardImageProps {
  post: BlogPostSummary;
  className?: string;
  priority?: boolean;
}

export function PostCardImage({ post, className = '', priority }: PostCardImageProps) {
  const primary = resolveFeaturedImageUrl(post);
  const fallback = resolveFeaturedImageUrl({ ...post, featuredImageUrl: null });
  const [src, setSrc] = useState(primary);

  return (
    // Native img required for onError fallback when CMS/R2 URLs 404.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={post.title}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
