import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllBlogPosts, getBlogPost, getAllCategories } from "@/lib/blog";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  // Only generate Spanish paths
  return posts.map((post) => ({
    locale: "es",
    category: post.category,
    slug: post.slug,
  }));
}

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;

  if (locale !== "es") {
    return {};
  }

  const post = getBlogPost(category, slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog de Invoo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, category: categorySlug, slug } = await params;
  setRequestLocale(locale);

  // Redirect or 404 if not Spanish
  if (locale !== "es") {
    notFound();
  }

  const post = getBlogPost(categorySlug, slug);
  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!post || !category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          {/* Category Badge */}
          <div className="inline-block px-4 py-2 bg-bg-secondary rounded-full text-label-primary text-sm mb-6">
            {category.name}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-label-inverted mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-label-secondary mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-label-tertiary">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min de lectura</span>
              </>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mt-8 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}
        </header>

        {/* Article Content - MDX Rendering */}
        <div className="blog-content max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border-primary">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-bg-secondary rounded-full text-sm text-label-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer locale={locale} />
    </div>
  );
}
