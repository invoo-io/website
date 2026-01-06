import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import KeyTakeaways from "@/components/blog/KeyTakeaways";
import ExploreWithAI from "@/components/blog/ExploreWithAI";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import { JsonLd } from "@/components/JsonLd";
import { generateArticleSchema, generateBreadcrumbListSchema, generateFAQPageSchemaStandalone } from "@/lib/schema";
import { getAllBlogPosts, getBlogPost, getAllCategories } from "@/lib/blog";
import { BASE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  // Blog is Spanish-only - don't generate EN pages to avoid redirect chains
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

  const canonicalUrl = `https://invoo.es/es/blog/${category}/${slug}/`;

  const ogImage = post.coverImage
    ? `${BASE_URL}${post.coverImage}`
    : `${BASE_URL}/Logo.png`;

  return {
    title: `${post.title} | Blog de Invoo`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      siteName: "Invoo",
      locale: "es_ES",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: "@invoo_es",
      site: "@invoo_es",
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

  // Generate Article schema for LLM discoverability
  const articleSchema = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    coverImage: post.coverImage,
    tags: post.tags,
    category: categorySlug,
    slug,
    readingTime: post.readingTime,
  });

  // Generate BreadcrumbList schema
  const breadcrumbSchema = generateBreadcrumbListSchema(
    locale,
    `/blog/${categorySlug}/${slug}`,
    post.title
  );

  // Generate FAQ schema if post has FAQ data
  const faqSchema = post.faq && post.faq.length > 0
    ? generateFAQPageSchemaStandalone({
        locale,
        questions: post.faq,
      })
    : null;

  return (
    <>
      <JsonLd data={articleSchema} id="article-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
      {faqSchema && <JsonLd data={faqSchema} id="faq-schema" />}
      <div className="min-h-screen bg-background-primary">
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
                        className="px-3 py-1 bg-background-secondary rounded-full text-sm text-secondary"
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
    </>
  );
}
