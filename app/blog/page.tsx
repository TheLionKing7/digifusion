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

const PER_PAGE = 12;

const POST_TYPES: { value: BlogPostType | ''; label: string }[] = [
  { value: '', label: 'All' },
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

  // Fetch a large window so we can both derive per-type counts and paginate locally.
  // The backend already paginates, but a single fetch keeps counts honest in dev/mock mode.
  let allPosts: BlogPostSummary[] = [];
  try {
    const result = await fetchBlogPosts({ limit: 200, page: 1 });
    allPosts = result.posts;
  } catch {
    // empty list -> empty state
  }

  // Per-type counts
  const counts: Record<string, number> = { '': allPosts.length };
  for (const p of allPosts) {
    counts[p.postType] = (counts[p.postType] || 0) + 1;
  }

  // Filter by type, then paginate locally
  const filtered = postType ? allPosts.filter((p) => p.postType === postType) : allPosts;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pagePosts = filtered.slice(start, start + PER_PAGE);

  // Featured composition only on page 1 with no active filter
  const showFeaturedComposition = safePage === 1 && !postType && pagePosts.length >= 3;
  const featured = showFeaturedComposition ? pagePosts[0] : null;
  const secondary = showFeaturedComposition ? pagePosts.slice(1, 3) : [];
  const gridPosts = showFeaturedComposition ? pagePosts.slice(3) : pagePosts;

  // Pagination window (1, current-1, current, current+1, last with ellipses)
  const pageNumbers = buildPageWindow(safePage, totalPages);

  const startIdx = total === 0 ? 0 : start + 1;
  const endIdx = Math.min(start + PER_PAGE, total);

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
                Insights &amp; Intelligence
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

      {/* ── Filters (sticky) ── */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {POST_TYPES.map((type) => {
            const isActive =
              (!type.value && !postType) || type.value === postType;
            const href = type.value === '' ? '/blog' : `/blog?postType=${type.value}`;
            const count = counts[type.value] || 0;

            return (
              <Link
                key={type.value || 'all'}
                href={href}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                    : 'bg-surface text-muted hover:text-foreground hover:bg-surface-lighter border border-border/40'
                }`}
              >
                <span>{type.label}</span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-accent-foreground/15 text-accent-foreground'
                      : 'bg-background/60 text-muted/80'
                  }`}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Posts ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {total === 0 ? (
          <EmptyState filtered={Boolean(postType)} />
        ) : (
          <>
            {/* Featured composition: 1 large + 2 stacked side cards */}
            {featured && (
              <RevealOnScroll>
                <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <PostCard post={featured} featured />
                  </div>
                  <div className="flex flex-col gap-6">
                    {secondary.map((post, i) => (
                      <PostCard key={post.id} post={post} compact delay={i * 60} />
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* Standard grid */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post, i) => (
                  <RevealOnScroll key={post.id} delay={i * 50}>
                    <PostCard post={post} />
                  </RevealOnScroll>
                ))}
              </div>
            )}

            {/* Pagination footer */}
            <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border/40">
              <p className="text-sm text-muted">
                Showing <span className="text-foreground font-medium">{startIdx}–{endIdx}</span> of{' '}
                <span className="text-foreground font-medium">{total}</span>{' '}
                {postType ? POST_TYPES.find((t) => t.value === postType)?.label.toLowerCase() : 'posts'}
              </p>

              {totalPages > 1 && (
                <nav className="flex items-center gap-1.5" aria-label="Pagination">
                  <PageLink
                    href={pageHref(safePage - 1, postType)}
                    disabled={safePage <= 1}
                    aria-label="Previous page"
                  >
                    ←
                  </PageLink>
                  {pageNumbers.map((n, idx) =>
                    n === '…' ? (
                      <span key={`gap-${idx}`} className="px-2 text-muted/60 text-sm">
                        …
                      </span>
                    ) : (
                      <PageLink
                        key={n}
                        href={pageHref(n as number, postType)}
                        active={n === safePage}
                      >
                        {n}
                      </PageLink>
                    )
                  )}
                  <PageLink
                    href={pageHref(safePage + 1, postType)}
                    disabled={safePage >= totalPages}
                    aria-label="Next page"
                  >
                    →
                  </PageLink>
                </nav>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────── */

function pageHref(page: number, postType?: BlogPostType) {
  const query = new URLSearchParams();
  if (page > 1) query.set('page', String(page));
  if (postType) query.set('postType', postType);
  const qs = query.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

function buildPageWindow(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) pages.push('…');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('…');
  pages.push(total);
  return pages;
}

function PageLink({
  href,
  children,
  active,
  disabled,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
}) {
  const className = `inline-flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${
    active
      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
      : disabled
        ? 'text-muted/40 border border-border/30 cursor-not-allowed'
        : 'text-muted hover:text-foreground bg-surface border border-border/40 hover:border-accent/30'
  }`;

  if (disabled) {
    return (
      <span className={className} aria-disabled="true" {...rest}>
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="text-center py-24 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-surface border border-border/40 mx-auto mb-6 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-muted/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      </div>
      <h2 className="font-serif text-2xl font-bold mb-2">
        {filtered ? 'No posts in this category' : 'No posts yet'}
      </h2>
      <p className="text-muted text-sm leading-relaxed">
        {filtered
          ? 'Try a different filter, or jump back to the full archive to browse everything we’ve published.'
          : 'We’re working on it — check back soon for guides, case studies, and field notes from the intelligence layer.'}
      </p>
      {filtered && (
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          ← All posts
        </Link>
      )}
    </div>
  );
}
