import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/utilities/JsonLd";
import { generateBreadcrumbListSchema, generateAboutPageSchema } from "@/lib/schema";
import {
  AboutHeroSection,
  ProblemSection,
  TrustTriangleSection,
  BeliefsSection,
  AISection,
} from "@/components/sections/about";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/about",
    title: t("about.metadata.title"),
    description: t("about.metadata.description"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbListSchema(
    locale,
    "/about",
    t("about.metadata.title")
  );
  const aboutPageSchema = generateAboutPageSchema(locale);

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema-about" />
      <JsonLd data={aboutPageSchema} id="about-page-schema" />
      <Navigation locale={locale} />
      <main>
        <AboutHeroSection locale={locale} />
        <ProblemSection locale={locale} />
        <TrustTriangleSection locale={locale} />
        <BeliefsSection locale={locale} />
        <AISection locale={locale} />
        <FinalCTASection locale={locale} translationKey="about.finalCta" />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
