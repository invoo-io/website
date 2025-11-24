import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllBlogPostsMetadata, getAllCategories } from "@/lib/blog";
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
  const posts = getAllBlogPostsMetadata();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-label-inverted mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-label-secondary max-w-2xl">
            {t("description")}
          </p>
        </div>

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
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-label-secondary text-lg">
              {t("noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
