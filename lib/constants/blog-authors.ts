/**
 * Canonical DigiFusion blog author profiles.
 *
 * Rules (non-negotiable):
 * - Page <h1> is the only post title — never repeat it in body HTML.
 * - Header meta shows first name only (or team short label).
 * - Footer shows full name + bio only.
 */

export type BlogAuthorId = 'boroji' | 'kayode' | 'team';

export interface BlogAuthorProfile {
  id: BlogAuthorId;
  /** Shown next to date in post header */
  headerName: string;
  /** Shown in footer "Written by" block */
  fullName: string;
  bio: string;
  /** Optional role line under full name */
  title?: string;
  /** Strings that match CMS author_name values */
  aliases: string[];
}

export const BLOG_AUTHORS: Record<BlogAuthorId, BlogAuthorProfile> = {
  boroji: {
    id: 'boroji',
    headerName: 'Boroji',
    fullName: 'Boroji Adebayo-Hopewell',
    title: 'Founder and Lead Architect, Digital Fusion Labs',
    bio: 'Founder and Lead Architect of Digital Fusion Labs — writing on System thinking, AI automation, business development, and digital media strategy for operators who need answers.',
    aliases: [
      'boroji',
      'boroji adebayo-hopewell',
      'boroji adebayo-hopewell, founder',
      'boroji adebayo-hopewell, founder and lead architect',
    ],
  },
  kayode: {
    id: 'kayode',
    headerName: 'Kayode',
    fullName: 'Kayode',
    title: 'Head of Digital Media, DigiFusion',
    bio: 'Writing on Digital Media, IP Law, and Branding for operators building durable audience and brand equity.',
    aliases: ['kayode', 'kayode, head of digital media'],
  },
  team: {
    id: 'team',
    headerName: 'Digital Fusion Team',
    fullName: 'Digital Fusion Team',
    bio: 'Insights from the DigiFusion practice — automation, business development, and digital media for African operators.',
    aliases: ['digital fusion team', 'digifusion team', 'digifusion', 'digital fusion labs team'],
  },
};

const DEFAULT_AUTHOR = BLOG_AUTHORS.boroji;

export function resolveBlogAuthor(authorName: string): BlogAuthorProfile {
  const key = (authorName || '').trim().toLowerCase();
  if (!key) return DEFAULT_AUTHOR;

  for (const profile of Object.values(BLOG_AUTHORS)) {
    if (profile.aliases.some((a) => key === a || key.startsWith(`${a},`))) {
      return profile;
    }
  }

  // Fallback: first token as header, full string as footer
  const comma = authorName.indexOf(',');
  const bare = comma === -1 ? authorName.trim() : authorName.slice(0, comma).trim();
  const first = bare.split(/\s+/)[0] || bare;
  return {
    id: 'team',
    headerName: first,
    fullName: bare,
    bio: BLOG_AUTHORS.team.bio,
    aliases: [],
  };
}
