import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import CookiePolicyContent from "@/components/CookiePolicyContent";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateWebPageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiePolicy" });

  return generatePageMetadata({
    locale,
    path: "/cookies",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "cookiePolicy" });

  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    locale,
    path: "/cookies",
    title: t("title"),
    description: t("metaDescription"),
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webPageSchema} id="webpage-schema" />
      <Navigation locale={locale} />
      <CookiePolicyContent />
      <Footer locale={locale} />
    </div>
  );
}
