import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroImageSection from "@/components/HeroImageSection";
import { ProblemSection } from "@/components/ProblemSection";
import { DifferenceSection } from "@/components/DifferenceSection";
import { ProcessSection } from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import { AudienceSegmentationSection } from "@/components/AudienceSegmentationSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { JsonLd } from "@/components/JsonLd";
import { generateWebApplicationSchema, generateHowToSchema } from "@/lib/schema";

const BASE_URL = "https://invoo.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const url = `${BASE_URL}/${locale}/`;

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/`,
        es: `${BASE_URL}/es/`,
        "x-default": `${BASE_URL}/es/`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url,
      title: t("metadata.title"),
      description: t("metadata.description"),
      siteName: "Invoo",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Hero title with gradient highlight
  const heroTitle = t("home.hero.title");
  const heroHighlight = t("home.hero.titleHighlight");

  // Get highlights array from translations
  const highlights = t.raw("home.hero.highlights") as string[];

  // Generate HowTo schema for ProcessSection
  const howToSchema = generateHowToSchema({
    locale,
    name: locale === "es" ? "Cómo facturar con Invoo" : "How to invoice with Invoo",
    description: locale === "es"
      ? "Aprende cómo crear y enviar facturas conformes con Verifactu en solo 3 pasos simples con Invoo"
      : "Learn how to create and send compliant Verifactu invoices in just 3 simple steps with Invoo",
    steps: [
      {
        name: t("home.process.step1.title"),
        text: t("home.process.step1.description"),
      },
      {
        name: t("home.process.step2.title"),
        text: t("home.process.step2.description"),
      },
      {
        name: t("home.process.step3.title"),
        text: t("home.process.step3.description"),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={generateWebApplicationSchema(locale)} />
      <JsonLd data={howToSchema} id="howto-invoicing" />
      <Navigation locale={locale} />

      {/* Section 1: Hero */}
      <HeroSection
        title={
          <>
            <span className="text-primary">{heroTitle} </span>
            <GradientText>{heroHighlight}</GradientText>
          </>
        }
        paragraph={t("home.hero.description")}
        buttonText={t("home.hero.cta")}
        buttonHref="#waitlist"
        highlights={highlights}
      />

      {/* Section 2: Screenshot */}
      <HeroImageSection />

      {/* Section 3: Problem Agitation */}
      <ProblemSection />

      {/* Section 4: The Invoo Difference */}
      <DifferenceSection />

      {/* Section 5: Choose Your Path */}
      <AudienceSegmentationSection locale={locale} />

      {/* Section 6: How It Works */}
      <ProcessSection />

      {/* Section 7: Pricing */}
      <PricingSection />

      {/* Section 8: Final CTA */}
      <FinalCTASection />

      <Footer locale={locale} />
    </div>
  );
}
