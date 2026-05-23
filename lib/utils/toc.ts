import type { TocItem } from '@/types/blog';

/**
 * Walk an HTML string, find every h2 and h3, generate stable slug-style
 * IDs from their text content, inject `id` attributes if missing, and
 * return both the rewritten HTML and a flat list of TOC entries.
 */
export function extractToc(html: string): { html: string; items: TocItem[] } {
  if (!html) return { html: '', items: [] };

  // Strip <style> and <script> blocks that could leak into the global page layout
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');

  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  const rewritten = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = tag.toLowerCase() === 'h2' ? 2 : 3;
      const label = stripTags(inner).trim();
      if (!label) return _match;

      const existingId = /id\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1];
      const baseSlug = existingId || slugify(label);
      const count = seen.get(baseSlug) || 0;
      seen.set(baseSlug, count + 1);
      const id = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

      items.push({ id, label, level });

      const cleanedAttrs = attrs.replace(/\s*id\s*=\s*["'][^"']*["']/i, '').trim();
      return `<${tag} id="${id}"${cleanedAttrs ? ' ' + cleanedAttrs : ''}>${inner}</${tag}>`;
    }
  );

  return { html: rewritten, items };
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) || 'section';
}
