import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import digiLogo from '@/assets/digilogo.png';
import { PostCard } from '@/components/blog/post-card';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { extractToc } from '@/lib/utils/toc';
import { fetchBlogPost, fetchBlogPosts } from '@/lib/api/pathguru';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

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

  const { html: contentHtml, items: tocItems } = extractToc(post.content);

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

  return (
    <>
      <ReadingProgress targetId="post-body" />

      {/* Back link: pt-24 (96px) = 64px fixed header + 32px breathing room.
          Same mx-auto max-w-7xl px-6 pattern used by every homepage section. */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-2">
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

      {/* Article body + sidebar TOC */}
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
          <article id="post-body" className="min-w-0">
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>

          <TableOfContents items={tocItems} />
        </div>
      </div>

      {/* Tags + Author: mirrors the same grid as the article body so the left
          edge of both sections lines up perfectly at every viewport width. */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
          <div>
            {post.tags.length > 0 && (
              <div className="pt-8 border-t border-border/40">
                <p className="text-sm font-semibold text-muted mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border/40 text-muted hover:text-foreground transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border/40">
              <div className="glass-strong rounded-xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-accent/15 flex items-center justify-center shrink-0 ring-2 ring-accent/20">
                    <Image
                      src={digiLogo}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold mb-1">
                    Written by
                  </p>
                  <p className="font-serif text-xl font-bold text-foreground">
                    {post.author.name}
                  </p>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Founder of DigiFusion and PathGuru Publishers. Writes about the
                    intelligence layer for SMBs — where AI replaces, augments, or
                    quietly automates the work that drains your week.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Empty sidebar column: keeps author/tags flush with prose above */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* More from the Blog */}
      {related.length > 0 && (
        <section className="border-t border-border/40 bg-surface/30">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
