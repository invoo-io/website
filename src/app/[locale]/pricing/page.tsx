import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });

  return generatePageMetadata({
    locale,
    path: "/pricing",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />
      <PricingSection />
      <Footer locale={locale} />
    </div>
  );
}