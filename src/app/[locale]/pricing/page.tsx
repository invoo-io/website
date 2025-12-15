import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateWebApplicationSchema, generateProductSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/pricing",
    title: t("pricingPage.title"),
    description: t("pricingPage.description"),
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
    <>
      <JsonLd data={generateWebApplicationSchema(locale)} id="webapp-schema" />
      <JsonLd data={generateProductSchema(locale)} id="product-schema" />
      <div className="min-h-screen bg-background-primary">
        <Navigation locale={locale} />
        <PricingSection />
        <Footer locale={locale} />
      </div>
    </>
  );
}