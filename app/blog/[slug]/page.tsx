import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
  const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.digitafusion.com').replace(/\/$/, '');
  const postUrl = `${BASE}/blog/${slug}`;
  const defaultOg = `${BASE}/og-default.png`;
  try {
    const post = await fetchBlogPost(slug);
    const ogImage = post.featuredImageUrl
      ? { url: post.featuredImageUrl, width: 1200, height: 630, alt: post.title }
      : { url: defaultOg, width: 1200, height: 630, alt: 'DigiFusion' };
    return {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      alternates: { canonical: postUrl },
      openGraph: {
        title: post.title,
        description: post.metaDescription || post.excerpt,
        type: 'article',
        url: postUrl,
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.metaDescription || post.excerpt,
        images: [post.featuredImageUrl ?? defaultOg],
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

  const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.digitafusion.com').replace(/\/$/, '');
  const postUrl = `${BASE}/blog/${post.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.metaDescription || post.excerpt,
            url: postUrl,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author.name,
              url: `${BASE}/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'DigiFusion',
              '@id': `${BASE}/#organization`,
              logo: { '@type': 'ImageObject', url: `${BASE}/assets/digilogo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
            ...(post.featuredImageUrl && {
              image: { '@type': 'ImageObject', url: post.featuredImageUrl },
            }),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
            ],
          }),
        }}
      />
      <ReadingProgress targetId="post-body" />

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

      <div className="mx-auto max-w-7xl px-6 pt-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
          <article id="post-body" className="min-w-0">
            <div className="bg-white rounded-2xl shadow-sm px-8 py-10 lg:px-14 lg:py-12">
              <div className="max-w-3xl mx-auto">
                {/* Post header — badge · title · excerpt · meta row */}
                <header className="mb-8 pb-8 border-b border-gray-100">
                  {post.postType && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
                      {post.postType.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    </span>
                  )}
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="text-gray-500 text-base leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm text-gray-400">
                    {/* Left — date · author */}
                    <div className="flex items-center gap-x-3">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.author.name}</span>
                    </div>
                    {/* Right — category · reading time */}
                    <div className="flex items-center gap-x-3">
                      {post.categories.length > 0 && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs font-medium">
                          {post.categories[0]}
                        </span>
                      )}
                      {post.readingTimeMinutes > 0 && (
                        <span className="text-gray-400">{post.readingTimeMinutes} min read</span>
                      )}
                    </div>
                  </div>
                </header>

                {/* Post body */}
                <div
                  className="prose-blog-light"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>
            </div>
          </article>

          <TableOfContents items={tocItems} />
        </div>
      </div>

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
              {(() => {
                const initials = post.author.name
                  .split(' ')
                  .map((w: string) => w[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();
                return (
                  <div className="glass-strong rounded-xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-accent/20"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full shrink-0 ring-2 ring-accent/20 bg-accent/10 flex items-center justify-center">
                        <span className="font-serif text-xl font-bold text-accent">
                          {initials}
                        </span>
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
                        {post.author.name.includes('Boroji')
                          ? 'Founder of DigiFusion and Digital Fusion Labs — writing on procurement intelligence, automation, and growth strategy for operators who need answers, not fluff.'
                          : `${post.author.name} is a contributor at DigiFusion — writing about AI, automation, and digital strategy for growing businesses.`}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

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
