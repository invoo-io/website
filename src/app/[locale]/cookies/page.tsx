import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import CookiePolicyContent from "@/components/CookiePolicyContent";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiePolicy" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />
      <CookiePolicyContent />
      <Footer locale={locale} />
    </div>
  );
}
