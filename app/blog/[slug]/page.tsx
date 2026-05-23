import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import digiLogo from '@/assets/digilogo.png';
import { PostTypeBadge } from '@/components/ui/badge';
import { PostCard } from '@/components/blog/post-card';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareButtons } from '@/components/blog/share-buttons';
import { formatDate, formatReadingTime } from '@/lib/utils/formatters';
import { extractToc } from '@/lib/utils/toc';
import { fetchBlogPost, fetchBlogPosts } from '@/lib/api/pathguru';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

export const dynamic = 'force-dynamic'; // serve fresh content; new posts appear without rebuild
export const revalidate = 0;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://digifusion.ai';

export async function generateStaticParams() {
  try {
    const { posts } = await fetchBlogPosts({ limit: 100 });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  try {
    const post = await fetchBlogPost(slug);
    return {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.metaDescription || post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.metaDescription || post.excerpt,
      },
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: BlogPost;
  try {
    post = await fetchBlogPost(slug);
  } catch {
    notFound();
  }

  // Derive TOC + heading IDs from the post HTML
  const { html: contentHtml, items: tocItems } = extractToc(post.content);

  // Fetch related posts (same type first, then fall back to recent)
  let related: BlogPostSummary[] = [];
  try {
    const result = await fetchBlogPosts({ limit: 12 });
    const sameType = result.posts.filter(
      (p) => p.slug !== post.slug && p.postType === post.postType
    );
    const others = result.posts.filter((p) => p.slug !== post.slug);
    related = (sameType.length >= 3 ? sameType : [...sameType, ...others])
      .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
      .slice(0, 3);
  } catch {
    // ignore
  }

  const canonicalUrl = `${SITE_URL.replace(/\/$/, '')}/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress targetId="post-body" />

      <article className="min-h-screen pt-16">
        {/* ── Back Link ── */}
        <div className="w-full max-w-7xl mx-auto px-6 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* ── Header ── */}
        <header className="w-full max-w-3xl mx-auto px-6 pt-8 pb-10">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <PostTypeBadge type={post.postType} />
            <time dateTime={post.publishedAt} className="text-sm text-muted">
              {formatDate(post.publishedAt)}
            </time>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-sm text-muted">
              {formatReadingTime(post.readingTimeMinutes)}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}

          <div className="mt-7 pt-6 border-t border-border/40 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-accent/10 flex items-center justify-center shrink-0">
                  <Image src={digiLogo} alt={post.author.name} width={40} height={40} className="object-contain" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium leading-tight">{post.author.name}</p>
                {post.categories.length > 0 && (
                  <p className="text-xs text-muted mt-0.5">{post.categories[0]}</p>
                )}
              </div>
            </div>
            <ShareButtons
              url={canonicalUrl}
              title={post.title}
              twitterCaption={post.socialCaption}
              linkedinCaption={post.linkedinCaption}
            />
          </div>
        </header>

        {/* ── Featured Image ── */}
        {post.featuredImageUrl && (
          <div className="w-full max-w-5xl mx-auto px-6 mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface">
              <img
                src={post.featuredImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            {post.featuredImageCredit && (
              <p className="mt-2 text-xs text-muted text-right">
                {post.featuredImageCredit}
              </p>
            )}
          </div>
        )}

        {/* ── Body + TOC ── */}
        <div className="w-full max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
            <div id="post-body" className="min-w-0">
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:leading-relaxed prose-p:text-muted
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-code:text-sm prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-surface prose-pre:border prose-pre:border-border/40
                  prose-blockquote:border-l-accent prose-blockquote:text-muted
                  prose-img:rounded-xl
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:marker:text-muted"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* ── Tags ── */}
              {post.tags.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border/40">
                  <p className="text-sm font-semibold text-muted mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border/40 text-muted hover:text-foreground transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Author Footer ── */}
              <div className="mt-12 pt-8 border-t border-border/40">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-surface border border-border/40">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-14 h-14 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-accent/10 flex items-center justify-center shrink-0">
                      <Image src={digiLogo} alt={post.author.name} width={56} height={56} className="object-contain" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted/70 font-semibold">
                      Written by
                    </p>
                    <p className="font-serif text-xl font-bold mt-1">{post.author.name}</p>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      Founder of DigiFusion and PathGuru Publishers. Writes about the
                      intelligence layer for SMBs — where AI replaces, augments, or
                      quietly automates the work that drains your week.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Share again at end ── */}
              <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm text-muted">
                  Enjoyed this post? Share it with someone who'd find it useful.
                </p>
                <ShareButtons
                  url={canonicalUrl}
                  title={post.title}
                  twitterCaption={post.socialCaption}
                  linkedinCaption={post.linkedinCaption}
                />
              </div>
            </div>

            <TableOfContents items={tocItems} />
          </div>
        </div>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <section className="border-t border-border/40 bg-surface/30">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-2">
                    Keep reading
                  </p>
                  <h2 className="font-serif text-3xl font-bold tracking-tight">
                    More from the blog
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  All posts
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
