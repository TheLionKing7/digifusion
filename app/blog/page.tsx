import Link from 'next/link';
import { PostCard } from '@/components/blog/post-card';
import { RevealOnScroll } from '@/components/animations/reveal-on-scroll';
import { fetchBlogPosts } from '@/lib/api/pathguru';
import type { BlogPostType, BlogPostSummary } from '@/types/blog';

export const metadata = {
  title: 'Blog',
  description:
    'Insights, guides, and thought leadership on AI automation, digital products, and the future of intelligent business.',
};

const POST_TYPES: { value: BlogPostType | ''; label: string }[] = [
  { value: '', label: 'All Posts' },
  { value: 'guide', label: 'Guides' },
  { value: 'listicle', label: 'Listicles' },
  { value: 'how-to', label: 'How-To' },
  { value: 'case-study', label: 'Case Studies' },
  { value: 'review', label: 'Reviews' },
  { value: 'roundup', label: 'Roundups' },
  { value: 'opinion', label: 'Opinion' },
];

interface BlogPageProps {
  searchParams: Promise<{ postType?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const postType = (params.postType as BlogPostType) || undefined;
  const page = parseInt(params.page || '1', 10);

  let posts: BlogPostSummary[] = [];
  let pagination = { page: 1, perPage: 12, total: 0, totalPages: 0 };

  try {
    const result = await fetchBlogPosts({ limit: 12, page, postType });
    posts = result.posts;
    pagination = result.pagination;
  } catch {
    // Use defaults
  }

  const featured = posts[0];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
          <RevealOnScroll>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                Knowledge Base
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Insights & Intelligence
              </h1>
              <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
                Guides, case studies, and thought leadership on AI automation,
                digital products, and building the intelligence layer for your
                business.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {POST_TYPES.map((type) => {
            const isActive =
              (!type.value && !postType) || type.value === postType;
            const href =
              type.value === ''
                ? '/blog'
                : `/blog?postType=${type.value}`;

            return (
              <Link
                key={type.value || 'all'}
                href={href}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                    : 'bg-surface text-muted hover:text-foreground hover:bg-surface-lighter border border-border/40'
                }`}
              >
                {type.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Posts Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No posts published yet.</p>
            <p className="text-muted text-sm mt-2">
              Check back soon for new content.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && page === 1 && !postType && (
              <RevealOnScroll>
                <div className="mb-12">
                  <PostCard post={featured} featured />
                </div>
              </RevealOnScroll>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(featured && page === 1 && !postType ? 1 : 0).map((post, i) => (
                <RevealOnScroll key={post.id} delay={i * 50}>
                  <PostCard post={post} />
                </RevealOnScroll>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}${postType ? `&postType=${postType}` : ''}`}
                    className="px-5 py-2.5 rounded-lg bg-surface border border-border/40 text-sm font-medium text-muted hover:text-foreground hover:border-accent/30 transition-all"
                  >
                    ← Previous
                  </Link>
                )}
                <span className="text-sm text-muted">
                  Page {page} of {pagination.totalPages}
                </span>
                {page < pagination.totalPages && (
                  <Link
                    href={`/blog?page=${page + 1}${postType ? `&postType=${postType}` : ''}`}
                    className="px-5 py-2.5 rounded-lg bg-surface border border-border/40 text-sm font-medium text-muted hover:text-foreground hover:border-accent/30 transition-all"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
