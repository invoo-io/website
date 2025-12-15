import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { getAllBlogPostsMetadata, getBlogPostsMetadataByCategory } from "@/lib/blog";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
import { EditorPicksSection } from "@/components/blog/EditorPicksSection";
import NewsletterSection from "@/components/blog/NewsletterSection";
import { CategoryBlock } from "@/components/blog/CategoryBlock";
import { JsonLd } from "@/components/JsonLd";
import { generateCollectionPageSchema } from "@/lib/schema";
import type { Metadata } from "next";

export async function generateStaticParams() {
  // Generate both locales - English will redirect to Spanish
  return [{ locale: "es" }, { locale: "en" }];
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

  const t = await getTranslations({ locale });

  return {
    title: t("blog.meta.title"),
    description: t("blog.meta.description"),
    alternates: {
      canonical: "https://invoo.es/es/blog/",
      languages: {
        es: "https://invoo.es/es/blog/",
        "x-default": "https://invoo.es/es/blog/",
      },
    },
    openGraph: {
      title: t("blog.meta.title"),
      description: t("blog.meta.description"),
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

  // Redirect to Spanish blog if not Spanish
  if (locale !== "es") {
    redirect("/es/blog");
  }

  const t = await getTranslations({ locale });
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

  // Split title for gradient: "Blog de " + "Invoo"
  const titleParts = t("blog.title").split(" ");
  const firstPart = titleParts.slice(0, -1).join(" "); // "Blog de"
  const lastPart = titleParts[titleParts.length - 1]; // "Invoo"

  // Generate CollectionPage schema
  const collectionSchema = generateCollectionPageSchema({
    locale,
    path: "/blog",
    title: t("blog.title"),
    description: t("blog.description"),
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={collectionSchema} id="collection-schema" />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{firstPart} </span>
            <GradientText>{lastPart}</GradientText>
          </>
        }
        paragraph={t("blog.description")}
        buttonText={t("blog.cta")}
        buttonHref="#newsletter"
      />

      <main className="container mx-auto px-4 pb-12 pt-32 max-w-7xl">

        {/* Featured Articles Carousel */}
        {featuredPosts.length > 0 && (
          <div className="mb-24">
            <BlogCarousel posts={featuredPosts} locale={locale} />
          </div>
        )}

        {/* Editor Picks Section */}
        {editorPickPosts.length >= 4 && (
          <div className="mb-24">
            <EditorPicksSection
              posts={editorPickPosts}
              locale={locale}
              title={t("blog.editorPicks")}
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
              categoryName={t(`blog.categories.${categorySlug}`)}
              categorySlug={categorySlug}
              posts={posts}
              locale={locale}
            />
          );
        })}

        {/* No posts message */}
        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">
              {t("blog.noPosts")}
            </p>
          </div>
        )}
      </section>

      <Footer locale={locale} />
    </div>
  );
}
