import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  getBlogPostsMetadataByCategory,
  getAllCategories,
} from "@/lib/blog";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const categories = getAllCategories();

  // Only generate Spanish paths
  return categories.map((category) => ({
    locale: "es",
    category: category.slug,
  }));
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

  return {
    title: `${category.name} | Blog de Invoo`,
    description: category.description,
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

  // Redirect or 404 if not Spanish
  if (locale !== "es") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getBlogPostsMetadataByCategory(categorySlug);
  const category = getAllCategories().find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Category Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-bg-secondary rounded-full text-label-primary mb-4">
            {category.name}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-label-inverted mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-label-secondary max-w-2xl">
            {category.description}
          </p>
        </div>

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
