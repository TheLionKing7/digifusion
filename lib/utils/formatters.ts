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

/** Header: name only. Footer: full byline including title after comma. */
export function parseAuthorByline(authorName: string): {
  headerName: string;
  footerByline: string;
  title?: string;
} {
  const full = (authorName || 'DigiFusion').trim();
  const comma = full.indexOf(',');
  if (comma === -1) {
    return { headerName: full, footerByline: full };
  }
  const headerName = full.slice(0, comma).trim();
  const title = full.slice(comma + 1).trim();
  return { headerName, footerByline: full, title };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
