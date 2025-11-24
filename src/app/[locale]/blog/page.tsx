import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { getAllBlogPostsMetadata, getBlogPostsMetadataByCategory } from "@/lib/blog";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
import { EditorPicksSection } from "@/components/blog/EditorPicksSection";
import NewsletterSection from "@/components/blog/NewsletterSection";
import { CategoryBlock } from "@/components/blog/CategoryBlock";
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
  const featuredPosts = allPosts.filter((post) => post.featured === true);
  const editorPickPosts = allPosts.filter((post) => post.editorPick === true);

  // Get all unique categories from posts
  const allCategories = Array.from(new Set(allPosts.map(post => post.category)));

  // Get posts by category for category blocks
  const categoryPostsMap: Record<string, typeof allPosts> = {};

  allCategories.forEach((categorySlug) => {
    const posts = getBlogPostsMetadataByCategory(categorySlug);
    if (posts.length > 0) {
      categoryPostsMap[categorySlug] = posts;
    }
  });

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

      {/* Category Blocks Section */}
      <section className="container mx-auto px-4 py-16 max-w-7xl">
        {allCategories.map((categorySlug) => {
          const posts = categoryPostsMap[categorySlug];
          if (!posts || posts.length === 0) return null;

          return (
            <CategoryBlock
              key={categorySlug}
              categoryName={t(`categories.${categorySlug}`)}
              posts={posts}
              locale={locale}
            />
          );
        })}

        {/* No posts message */}
        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-label-secondary text-lg">
              {t("noPosts")}
            </p>
          </div>
        )}
      </section>

      <Footer locale={locale} />
    </div>
  );
}
