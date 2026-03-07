import Image from "next/image";
import Link from "next/link";
import { Calculator, Receipt, Percent } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";
import { getCalculatorPath } from "@/lib/calculators/schema";

// Top 3 articles by GSC performance data
const TOP_ARTICLES = [
  { category: "guias", slug: "tramos-cuota-autonomos-2026-tabla-completa" },
  { category: "guias", slug: "tarifa-plana-autonomos-2026-guia-completa" },
  { category: "guias", slug: "modelo-347-guia-completa-autonomos-2026" },
] as const;

const CALCULATORS = [
  {
    slug: "cuota-autonomos",
    key: "calc1",
    icon: Calculator,
    gradient:
      "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
    iconColor: "var(--accent-blue-main)",
  },
  {
    slug: "irpf-autonomos",
    key: "calc2",
    icon: Receipt,
    gradient:
      "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
    iconColor: "var(--accent-purple-main)",
  },
  {
    slug: "iva",
    key: "calc3",
    icon: Percent,
    gradient:
      "linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))",
    iconColor: "var(--accent-orange-main)",
  },
] as const;

export async function ResourcesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.resources" });

  const articles = TOP_ARTICLES.map(({ category, slug }) =>
    getBlogPost(category, slug)
  ).filter(Boolean);

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6 bg-background-secondary">
      <SectionHeader
        size="section"
        align="center"
        title={
          <>
            {t("title")} <GradientText>{t("titleHighlight")}</GradientText>
          </>
        }
        description={t("description")}
        marginBottom="xl"
      />

      <div className="max-w-6xl mx-auto">
        {/* Row 1: Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((post) => {
            if (!post) return null;
            return (
              <Link
                key={`${post.category}-${post.slug}`}
                href={`/${locale}/blog/${post.category}/${post.slug}/`}
                className="group block rounded-3xl bg-background-tertiary border border-strokes-primary hover:border-accent-blue-main/30 transition-colors overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2"
                aria-label={post.title}
              >
                <article>
                  <div className="relative w-full aspect-[16/9] bg-background-primary overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="text-6xl font-bold text-secondary/30">
                          {post.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-title2-emphasized text-primary mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-body text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Row 2: Calculators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {CALCULATORS.map(({ slug, key, icon: Icon, gradient, iconColor }) => (
            <Link
              key={slug}
              href={getCalculatorPath(slug, locale)}
              className="group block rounded-3xl p-8 bg-background-tertiary border border-strokes-primary hover:border-accent-blue-main/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2"
              aria-label={t(`${key}.title`)}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: gradient }}
                aria-hidden="true"
              >
                <Icon className="w-7 h-7" style={{ color: iconColor }} />
              </div>
              <h3 className="text-title2-emphasized text-primary mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-body text-secondary">
                {t(`${key}.description`)}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button
            variant="gradient"
            href={`/${locale}/blog/`}
            showArrow
          >
            {t("viewAllArticles")}
          </Button>
          <Button
            variant="outline"
            href={
              locale === "es"
                ? `/${locale}/herramientas/calculadoras/`
                : `/${locale}/tools/calculators/`
            }
            showArrow
          >
            {t("viewAllCalculators")}
          </Button>
        </div>
      </div>
    </section>
  );
}
