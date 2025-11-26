import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import KeyTakeaways from "@/components/blog/KeyTakeaways";
import ExploreWithAI from "@/components/blog/ExploreWithAI";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import { getAllBlogPosts, getBlogPost, getAllCategories } from "@/lib/blog";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
    keywords: post.tags,
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

  // Redirect to Spanish blog if not Spanish
  if (locale !== "es") {
    redirect(`/es/blog/${categorySlug}/${slug}`);
  }

  const post = getBlogPost(categorySlug, slug);
  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!post || !category) {
    notFound();
  }

  const t = await getTranslations('blog');

  // Custom MDX components to add IDs to headings for anchor linking
  const mdxComponents = {
    h2: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => {
      const id =
        typeof children === "string"
          ? children
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")
          : "";
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />

      {/* Article Header - Full Width */}
      <ArticleHeader
        post={post}
        category={category}
        locale={locale}
        backButtonLabel={t('article.backButton')}
        backButtonAriaLabel={t('article.backButtonAriaLabel')}
      />

      {/* Main Content Area - Two Column Layout */}
      <div className="container mx-auto px-4 pb-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <article className="min-w-0">
            {/* Explore with AI */}
            <ExploreWithAI
              articleUrl={`https://invoo.es/${locale}/blog/${categorySlug}/${slug}`}
              articleTitle={post.title}
              articleExcerpt={post.excerpt}
            />

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <KeyTakeaways takeaways={post.keyTakeaways} />
            )}

            {/* Article Content - MDX Rendering with Custom Components */}
            <div className="blog-content max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
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

          {/* Right Column - Sticky Sidebar (Desktop Only) */}
          <div className="hidden lg:block">
            <ArticleSidebar content={post.content} title={post.title} />
          </div>
        </div>
      </div>

      <Footer locale={locale} />
    </div>
  );
}
