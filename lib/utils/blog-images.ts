import { BLOG_FALLBACK_IMAGES } from '@/lib/constants/blog-images';
import type { BlogPostType } from '@/types/blog';

const SITE =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitafusion.com').replace(/\/$/, '');

interface PostImageInput {
  slug?: string;
  title?: string;
  postType?: BlogPostType | string;
  categories?: string[];
  tags?: string[];
  featuredImageUrl?: string | null;
}

/** Normalize stored URL (relative /assets → absolute production URL). */
export function normalizeFeaturedImageUrl(raw: string | null | undefined): string | null {
  const url = (raw || '').trim();
  if (!url) return null;
  if (url.startsWith('/')) return `${SITE}${url}`;
  return url;
}

function pickThematicFallback(post: PostImageInput): string {
  const hay = [
    post.slug || '',
    post.title || '',
    ...(post.categories || []),
    ...(post.tags || []),
  ]
    .join(' ')
    .toLowerCase();

  if (/openmarket|informal trade|e-commerce-clone|coordination/.test(hay)) {
    return BLOG_FALLBACK_IMAGES.openmarket;
  }
  if (/affiliateos|creator commerce|followers are ready/.test(hay)) {
    return BLOG_FALLBACK_IMAGES.affiliateos;
  }
  if (/africa|c-suite|afcfta|nigeria|naira/.test(hay)) {
    return BLOG_FALLBACK_IMAGES.africa;
  }
  if (/cash flow|invoice|finance|mobile money/.test(hay)) {
    return BLOG_FALLBACK_IMAGES.finance;
  }
  if (/automation|ai-first|workflow/.test(hay)) {
    return BLOG_FALLBACK_IMAGES.automation;
  }

  const type = (post.postType || 'article') as BlogPostType;
  return BLOG_FALLBACK_IMAGES[type as keyof typeof BLOG_FALLBACK_IMAGES] || BLOG_FALLBACK_IMAGES.default;
}

/** Always returns a displayable hero URL for cards and OG fallbacks. */
export function resolveFeaturedImageUrl(post: PostImageInput): string {
  return normalizeFeaturedImageUrl(post.featuredImageUrl) || pickThematicFallback(post);
}
