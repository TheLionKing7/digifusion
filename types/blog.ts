/* ── Blog Post Types ──────────────────────────────────── */

export type BlogPostType =
  | 'listicle'      // "10 Tips for..." - Highly scannable, numbered points
  | 'how-to'        // Step-by-step tutorials solving pain points
  | 'case-study'    // Data-driven client success stories
  | 'review'        // Product/tool pros, cons, and comparisons
  | 'roundup'       // Expert interviews and industry insights
  | 'guide'         // Long-form comprehensive hub content
  | 'opinion'       // Thought leadership and hot takes
  | 'article';      // General editorial / long-form articles

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  postType: BlogPostType;
  featuredImageUrl: string | null;
  categories: string[];
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  metaDescription: string;
  focusKeyword: string;
  socialCaption?: string;
  linkedinCaption?: string;
  featuredImageCredit?: string;
  previousPost?: BlogPostSummary | null;
  nextPost?: BlogPostSummary | null;
  // Type-specific fields
  listItems?: string[];
  steps?: HowToStep[];
  clientName?: string;
  clientResults?: { metric: string; value: string }[];
  rating?: number;
  prosCons?: { pros: string[]; cons: string[] };
  experts?: ExpertQuote[];
  tableOfContents?: TocItem[];
}

export interface BlogPostCollection {
  posts: BlogPostSummary[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  categories: string[];
  postTypes: BlogPostType[];
}

export interface HowToStep {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface ExpertQuote {
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  quote: string;
}

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

/* ── Post Type Configuration ─────────────────────────── */
export const POST_TYPE_CONFIG: Record<BlogPostType, {
  label: string;
  description: string;
  color: string;
  icon: string;
}> = {
  listicle: {
    label: 'Listicle',
    description: 'Scannable, numbered breakdowns',
    color: '#3b82f6',
    icon: 'list',
  },
  'how-to': {
    label: 'How-To Guide',
    description: 'Step-by-step practical tutorials',
    color: '#3ecf8e',
    icon: 'compass',
  },
  'case-study': {
    label: 'Case Study',
    description: 'Data-driven client success stories',
    color: '#f59e0b',
    icon: 'bar-chart',
  },
  review: {
    label: 'Review',
    description: 'Product pros, cons & comparisons',
    color: '#ef4444',
    icon: 'star',
  },
  roundup: {
    label: 'Expert Roundup',
    description: 'Industry leader insights & quotes',
    color: '#7c3aed',
    icon: 'users',
  },
  guide: {
    label: 'Ultimate Guide',
    description: 'Comprehensive hub content',
    color: '#00d4aa',
    icon: 'book',
  },
  opinion: {
    label: 'Opinion',
    description: 'Thought leadership & hot takes',
    color: '#f472b6',
    icon: 'message-circle',
  },
  article: {
    label: 'Article',
    description: 'General editorial & long-form content',
    color: '#a78bfa',
    icon: 'file-text',
  },
};
