import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostTypeBadge } from '@/components/ui/badge';
import { formatDate, formatReadingTime } from '@/lib/utils/formatters';
import { fetchBlogPost, fetchBlogPosts } from '@/lib/api/pathguru';
import type { BlogPost } from '@/types/blog';

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

  return (
    <article className="min-h-screen">
      {/* ── Back Link ── */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
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
      <header className="max-w-3xl mx-auto px-6 pt-8 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <PostTypeBadge type={post.postType} />
          <span className="text-sm text-muted">{formatDate(post.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-sm text-muted">{formatReadingTime(post.readingTimeMinutes)}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>
        )}

        <div className="mt-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-sm font-semibold text-accent">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            {post.categories.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border/40 text-muted"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Featured Image ── */}
      {post.featuredImageUrl && (
        <div className="max-w-5xl mx-auto px-6 mb-12">
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

      {/* ── Content ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight
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
          dangerouslySetInnerHTML={{ __html: post.content }}
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

        {/* ── Social Captions ── */}
        {(post.socialCaption || post.linkedinCaption) && (
          <div className="mt-12 pt-8 border-t border-border/40">
            <p className="text-sm font-semibold text-muted mb-4">Share this post</p>
            <div className="space-y-4">
              {post.socialCaption && (
                <div className="bg-surface border border-border/40 rounded-lg p-4">
                  <p className="text-xs font-semibold tracking-wider uppercase text-accent mb-2">
                    Twitter / X
                  </p>
                  <p className="text-sm text-muted whitespace-pre-wrap">{post.socialCaption}</p>
                </div>
              )}
              {post.linkedinCaption && (
                <div className="bg-surface border border-border/40 rounded-lg p-4">
                  <p className="text-xs font-semibold tracking-wider uppercase text-accent mb-2">
                    LinkedIn
                  </p>
                  <p className="text-sm text-muted whitespace-pre-wrap">{post.linkedinCaption}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
