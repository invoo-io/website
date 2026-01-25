import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import HeroImageSection from "@/components/sections/HeroImageSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { ThreeCardSection } from "@/components/sections/templates/ThreeCardSection";
import { FourPillarSection } from "@/components/sections/templates/FourPillarSection";
import { SpeedDemoSection } from "@/components/sections/SpeedDemoSection";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import Footer from "@/components/layout/Footer";
import GradientText from "@/components/ui/GradientText";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/utilities/JsonLd";
import { generateWebApplicationSchema, generateFAQPageSchemaStandalone, generateHowToSchema, generateBreadcrumbListSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/gestorias",
    title: t("gestoriasPage.metadata.title"),
    description: t("gestoriasPage.metadata.description"),
  });
}

export default async function GestoriasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Split title for gradient: "Tus clientes facturan, " + "tú lo ves todo"
  const titleParts = t("gestoriasPage.header.title").split(", ");
  const firstPart = titleParts[0]; // "Tus clientes facturan" or "Your clients invoice"
  const secondPart = titleParts.slice(1).join(", "); // "tú lo ves todo" or "you see everything"

  // Get highlights for hero section
  const highlights = t.raw("gestoriasPage.highlights") as string[];

  // Generate WebApplication schema with gestoría audience targeting
  const webAppSchema = generateWebApplicationSchema(locale);

  // Generate FAQ schema for gestoría-specific questions
  const faqData = t.raw("gestoriasPage.faq") as Record<string, { question: string; answer: string }>;
  const faqQuestions = Object.values(faqData).map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  const faqSchema = generateFAQPageSchemaStandalone({
    locale,
    questions: faqQuestions,
  });

  // Generate HowTo schema for speed demo section
  const howToSchema = generateHowToSchema({
    locale,
    name: `${t("gestoriasPage.speedDemo.title")} ${t("gestoriasPage.speedDemo.titleHighlight")}`,
    description: t("gestoriasPage.speedDemo.description"),
    steps: [
      { name: t("gestoriasPage.speedDemo.step1.title"), text: t("gestoriasPage.speedDemo.step1.description") },
      { name: t("gestoriasPage.speedDemo.step2.title"), text: t("gestoriasPage.speedDemo.step2.description") },
      { name: t("gestoriasPage.speedDemo.step3.title"), text: t("gestoriasPage.speedDemo.step3.description") },
      { name: t("gestoriasPage.speedDemo.step4.title"), text: t("gestoriasPage.speedDemo.step4.description") },
    ],
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbListSchema(
    locale,
    "/gestorias",
    t("gestoriasPage.metadata.title")
  );

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webAppSchema} id="webapp-schema" />
      <JsonLd data={faqSchema} id="faq-schema-gestorias" />
      <JsonLd data={howToSchema} id="howto-schema-gestorias" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema-gestorias" />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{firstPart}, </span>
            <GradientText>{secondPart}</GradientText>
          </>
        }
        paragraph={t("gestoriasPage.header.description")}
        buttonText={t("gestoriasPage.header.cta")}
        buttonHref="#waitlist"
        highlights={highlights}
      />
      <HeroImageSection imageBaseName="gestoria" dashboardAlt="Dashboard gestoría multi-cliente - Panel de control Invoo" />
      <TrustBarSection locale={locale} translationKey="gestoriasPage.trustBar" />
      <ThreeCardSection
        locale={locale}
        translationKey="gestoriasPage.pains"
        cards={[
          { key: "card1", icon: "MessageSquare" },
          { key: "card2", icon: "Users" },
          { key: "card3", icon: "FileX" },
        ]}
      />
      <FourPillarSection
        locale={locale}
        translationKey="gestoriasPage.solution"
        pillars={[
          {
            key: "pillar1",
            icon: "Eye",
            gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
            iconColor: "var(--accent-blue-main)",
          },
          {
            key: "pillar2",
            icon: "Building2",
            gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
            iconColor: "var(--accent-purple-main)",
          },
          {
            key: "pillar3",
            icon: "ShieldCheck",
            gradient: "linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))",
            iconColor: "var(--accent-orange-main)",
          },
          {
            key: "pillar4",
            icon: "FileCheck",
            gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
            iconColor: "var(--accent-green-main)",
          },
        ]}
      />
      <SpeedDemoSection locale={locale} translationKey="gestoriasPage.speedDemo" />
      <PricingSection variant="section" defaultTab="gestoria" />
      <FAQSection
        titleKey="gestoriasPage.faqTitle"
        titleHighlightKey="gestoriasPage.faqTitleHighlight"
        questionsKey="gestoriasPage.faq"
      />
      <FinalCTASection locale={locale} translationKey="gestoriasPage.finalCta" />
      <Footer locale={locale} />
    </div>
  );
}
