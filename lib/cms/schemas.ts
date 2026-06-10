/**
 * lib/cms/schemas.ts
 *
 * Zod schemas shared across /api/cms/* routes.
 * Mirrors the posts table columns from 0002_posts_and_settings.sql
 * and the BlogPost types in types/blog.ts.
 */

import { z } from 'zod';

// ── Posts ──────────────────────────────────────────────────────────────────

export const PostTypeEnum = z.enum([
  'listicle', 'how-to', 'case-study', 'review', 'roundup', 'guide', 'opinion', 'article',
]);

export const PostStatusEnum = z.enum(['draft', 'published', 'archived']);

/** Full post write schema — used by POST (create/update) from PathGuru. */
export const PostWriteSchema = z.object({
  slug:                   z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'slug must be lowercase, numbers, hyphens only'),
  title:                  z.string().min(1).max(400),
  excerpt:                z.string().max(1000).default(''),
  content:                z.string().default(''),
  post_type:              PostTypeEnum.default('guide'),
  status:                 PostStatusEnum.default('draft'),

  // SEO
  meta_description:       z.string().max(300).default(''),
  focus_keyword:          z.string().max(100).default(''),

  // Media
  featured_image_url:     z.string().url().nullable().optional(),
  featured_image_credit:  z.string().max(200).optional().default(''),

  // Social
  social_caption:         z.string().max(500).optional().default(''),
  linkedin_caption:       z.string().max(700).optional().default(''),

  // Taxonomy
  categories:             z.array(z.string()).default([]),
  tags:                   z.array(z.string()).default([]),

  // Metrics
  reading_time_minutes:   z.number().int().min(1).max(120).default(5),
  word_count:             z.number().int().min(0).default(0),

  // Author
  author_name:            z.string().max(100).default('Boroji Adebayo-Hopewell, Founder'),
  author_avatar:          z.string().url().nullable().optional(),

  // Post-type specific (all optional — only sent when relevant)
  list_items:             z.array(z.string()).optional().default([]),
  steps:                  z.array(z.object({
                            title:    z.string(),
                            content:  z.string(),
                            imageUrl: z.string().url().optional(),
                          })).optional().default([]),
  client_name:            z.string().max(200).nullable().optional(),
  client_results:         z.array(z.object({
                            metric: z.string(),
                            value:  z.string(),
                          })).optional().default([]),
  rating:                 z.number().min(0).max(10).nullable().optional(),
  pros_cons:              z.object({
                            pros: z.array(z.string()),
                            cons: z.array(z.string()),
                          }).optional().default({ pros: [], cons: [] }),
  experts:                z.array(z.object({
                            name:    z.string(),
                            role:    z.string(),
                            company: z.string().optional(),
                            avatar:  z.string().url().optional(),
                            quote:   z.string(),
                          })).optional().default([]),

  // Allow explicit published_at override (PathGuru may backdate posts)
  published_at:           z.string().datetime().nullable().optional(),
});

export type PostWrite = z.infer<typeof PostWriteSchema>;

/** List query params */
export const PostListQuerySchema = z.object({
  page:      z.coerce.number().int().min(1).default(1),
  per_page:  z.coerce.number().int().min(1).max(100).default(20),
  status:    PostStatusEnum.optional(),
  post_type: PostTypeEnum.optional(),
});

// ── Products ───────────────────────────────────────────────────────────────

// Intelligence Library + Products hub classification
export const ProductCategoryEnum = z.enum([
  'field-guide',   // /intelligence/field-guides — books, reference manuals
  'playbook',      // /intelligence/playbooks    — workflow packs, SOPs
  'research',      // /intelligence/research     — papers, case studies
  'tool',          // /intelligence/tools        — extensions, utilities
  'saas',          // /products/*                — SabiWork, Receptra, AdPilot
  'service',       // /agency                   — done-for-you consultancy
  'bundle',        // any section               — multi-item packs
]);

export const ProductTypeEnum = z.enum(['download', 'subscription', 'service', 'saas']);

export const ProductWriteSchema = z.object({
  slug:             z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, 'slug must be lowercase, numbers, hyphens only'),
  name:             z.string().min(1).max(200),
  description:      z.string().max(8000).default(''),
  type:             ProductTypeEnum,
  category:         ProductCategoryEnum.nullable().optional(),
  recurring:        z.enum(['monthly', 'yearly']).nullable().optional(),
  active:           z.boolean().default(true),
  featured:         z.boolean().default(false),
  cover_image_url:  z.string().url().nullable().optional(),
  prices:           z.record(z.string(), z.number().int().min(0)).default({}),
  fulfillment:      z.record(z.string(), z.unknown()).default({}),
});

/** Partial update — every field optional except nothing required */
export const ProductPatchSchema = ProductWriteSchema.partial();

export const ProductListQuerySchema = z.object({
  page:     z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(100).default(50),
  type:     ProductTypeEnum.optional(),
  category: ProductCategoryEnum.optional(),
  active:   z.enum(['true', 'false', 'all']).default('all'),
});

// ── Orders ─────────────────────────────────────────────────────────────────

export const OrderListQuerySchema = z.object({
  page:     z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(100).default(25),
  status:   z.enum(['pending', 'paid', 'failed', 'refunded', 'canceled']).optional(),
  gateway:  z.enum(['stripe', 'flutterwave', 'opay', 'paystack', 'manual']).optional(),
  from:     z.string().datetime().optional(),   // ISO — filter by created_at
  to:       z.string().datetime().optional(),
});

// ── Analytics ──────────────────────────────────────────────────────────────

export const AnalyticsQuerySchema = z.object({
  range: z.enum(['7d', '30d', '90d']).default('30d'),
});
