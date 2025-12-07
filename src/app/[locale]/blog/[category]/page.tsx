import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Button from "@/components/ui/button";
import { ArticleCard } from "@/components/blog/ArticleCard";
import {
  getBlogPostsMetadataByCategory,
  getAllCategories,
} from "@/lib/blog";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const categories = getAllCategories();

  // Only generate categories that have published content
  const categoriesWithContent = categories.filter((category) => {
    const posts = getBlogPostsMetadataByCategory(category.slug);
    return posts.length > 0;
  });

  // Generate both locales - English will redirect to Spanish
  return categoriesWithContent.flatMap((category) => [
    { locale: "es", category: category.slug },
    { locale: "en", category: category.slug },
  ]);
}

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;

  if (locale !== "es") {
    return {};
  }

  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!category) {
    return {};
  }

  const canonicalUrl = `https://invoo.es/es/blog/${categorySlug}/`;

  return {
    title: `${category.name} | Blog de Invoo`,
    description: category.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: `${category.name} | Blog de Invoo`,
      description: category.description,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);

  // Redirect to Spanish blog if not Spanish
  if (locale !== "es") {
    redirect(`/es/blog/${categorySlug}`);
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const articleT = await getTranslations({ locale, namespace: "blog.article" });
  const posts = getBlogPostsMetadataByCategory(categorySlug);
  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-primary">
      <Navigation locale={locale} />

      {/* Category Header - Hero Style */}
      <section className="flex items-center justify-center px-6 pt-40 max-md:pt-20 pb-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <Button
              href={`/${locale}/blog`}
              variant="tertiary"
              size="none"
              showBackIcon
              disableHoverScale
              aria-label={t("backToBlog")}
            >
              {t("backToBlog")}
            </Button>
          </div>
          <h1 className="text-header-title-emphasized mb-8 text-primary">
            {category.name}
          </h1>
          <p className="text-body mb-8 max-w-3xl mx-auto text-secondary">
            {category.description}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-12 max-w-7xl">

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">
              {t("noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const translations = {
                readArticle: articleT("readArticle", { title: post.title }),
                coverImageAlt: articleT("coverImageAlt", { title: post.title }),
                publishedOn: articleT("publishedOn"),
              };

              return (
                <ArticleCard
                  key={`${post.category}-${post.slug}`}
                  post={post}
                  locale={locale}
                  categoryDisplayName={category.name}
                  translations={translations}
                />
              );
            })}
          </div>
        )}
      </main>

      <Footer locale={locale} />
    </div>
  );
}
