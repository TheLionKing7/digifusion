import { resolveBlogAuthor } from '@/lib/constants/blog-authors';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ${hours % 24}h`;
  return `${hours}h ${Math.floor((seconds % 3600) / 60)}m`;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/** Resolve header (first name) and footer (full name) from CMS author_name. */
export function parseAuthorByline(authorName: string): {
  headerName: string;
  footerByline: string;
  title?: string;
} {
  const profile = resolveBlogAuthor(authorName);
  return {
    headerName: profile.headerName,
    footerByline: profile.fullName,
    title: profile.title,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
