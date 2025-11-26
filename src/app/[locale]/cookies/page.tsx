import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import CookiePolicyContent from "@/components/CookiePolicyContent";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

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

  return (
    <div className="min-h-screen bg-background-primary">
      <Navigation locale={locale} />
      <CookiePolicyContent />
      <Footer locale={locale} />
    </div>
  );
}
