import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { getAllBlogPostsMetadata, getAllCategories, getFeaturedBlogPostsMetadata, getEditorPickBlogPostsMetadata } from "@/lib/blog";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
import { EditorPicksSection } from "@/components/blog/EditorPicksSection";
import NewsletterSection from "@/components/blog/NewsletterSection";
import type { Metadata } from "next";

export async function generateStaticParams() {
  // Only generate Spanish blog paths
  return [{ locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "es") {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Redirect or 404 if not Spanish
  if (locale !== "es") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const allPosts = getAllBlogPostsMetadata();
  const categories = getAllCategories();
  const featuredPosts = allPosts.filter((post) => post.featured === true);
  const editorPickPosts = allPosts.filter((post) => post.editorPick === true);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />

      {/* Hero Section */}
      <section className="flex items-center justify-center px-6 pt-40 max-md:pt-20 pb-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-heading mb-8">
            <span style={{color: '#EFEFF5'}}>Blog de </span>
            <GradientText>Invoo</GradientText>
          </h1>

          <p className="text-body mb-0 max-w-3xl mx-auto text-label-inverted">
            {t("description")}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-12 max-w-7xl">

        {/* Featured Articles Carousel */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <BlogCarousel posts={featuredPosts} locale={locale} />
          </div>
        )}

        {/* Editor Picks Section */}
        {editorPickPosts.length >= 4 && (
          <div className="mb-12">
            <EditorPicksSection
              posts={editorPickPosts}
              locale={locale}
              title={t("editorPicks")}
            />
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <NewsletterSection />

      <main className="container mx-auto px-4 pb-12 max-w-7xl">
        {/* Categories Filter - Placeholder for future component */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${locale}/blog/${category.slug}`}
                  className="px-4 py-2 bg-bg-secondary rounded-full text-label-primary hover:bg-opacity-80 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid - Placeholder for future ArticleCard component */}
        {allPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-label-secondary text-lg">
              {t("noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <Link
                key={`${post.category}-${post.slug}`}
                href={`/${locale}/blog/${post.category}/${post.slug}`}
                className="block bg-bg-secondary rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <article>
                  <div className="text-sm text-label-tertiary mb-2">
                    {post.category}
                  </div>
                  <h2 className="text-xl font-semibold text-label-inverted mb-2">
                    {post.title}
                  </h2>
                  <p className="text-label-secondary mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-label-tertiary">
                    <span>{post.author}</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
