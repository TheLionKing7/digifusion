/**
 * Normalize blog HTML from PathGuru — legacy posts stored full <!doctype> documents.
 */
export function sanitizeBlogContent(raw: string): string {
  if (!raw?.trim()) return '';

  let html = raw.trim();

  // Legacy PathGuru publisher wrapped body in a full HTML document
  const postBodyMatch = html.match(
    /<div[^>]*class=["'][^"']*post-body[^"']*["'][^>]*>([\s\S]*?)<\/div>/i
  );
  if (postBodyMatch?.[1]) {
    html = postBodyMatch[1].trim();
  } else if (/^<!doctype/i.test(html) || /<html[\s>]/i.test(html)) {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch?.[1]) {
      html = bodyMatch[1]
        .replace(/<article[^>]*class=["'][^"']*post-wrap[^"']*["'][^>]*>/i, '')
        .replace(/<\/article>/i, '')
        .replace(/<h1[^>]*class=["'][^"']*post-title[^"']*["'][^>]*>[\s\S]*?<\/h1>/i, '')
        .replace(/<p[^>]*class=["'][^"']*post-excerpt[^"']*["'][^>]*>[\s\S]*?<\/p>/i, '')
        .replace(/<p[^>]*class=["'][^"']*post-meta[^"']*["'][^>]*>[\s\S]*?<\/p>/i, '')
        .replace(/<img[^>]*class=["'][^"']*post-image[^"']*["'][^>]*>/i, '')
        .trim();
    }
  }

  return html;
}
