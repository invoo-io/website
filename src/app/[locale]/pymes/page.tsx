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
    path: "/pymes",
    title: t("pymesPage.metadata.title"),
    description: t("pymesPage.metadata.description"),
  });
}

export default async function PymesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Split title for gradient: "Facturación " + "en equipo" (or EN: "Team " + "invoicing")
  const titleParts = t("pymesPage.header.title").split(" ");
  const firstPart = titleParts[0]; // "Facturación" or "Team"
  const secondPart = titleParts.slice(1).join(" "); // "en equipo" or "invoicing"

  // Get highlights for hero section
  const highlights = t.raw("pymesPage.highlights") as string[];

  // Generate WebApplication schema with pymes audience targeting
  const webAppSchema = generateWebApplicationSchema(locale);

  // Generate FAQ schema for PYMEs page
  const faqData = t.raw("pymesPage.faq") as Record<string, { question: string; answer: string }>;
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
    name: `${t("pymesPage.speedDemo.title")} ${t("pymesPage.speedDemo.titleHighlight")}`,
    description: t("pymesPage.speedDemo.description"),
    steps: [
      { name: t("pymesPage.speedDemo.step1.title"), text: t("pymesPage.speedDemo.step1.description") },
      { name: t("pymesPage.speedDemo.step2.title"), text: t("pymesPage.speedDemo.step2.description") },
      { name: t("pymesPage.speedDemo.step3.title"), text: t("pymesPage.speedDemo.step3.description") },
      { name: t("pymesPage.speedDemo.step4.title"), text: t("pymesPage.speedDemo.step4.description") },
    ],
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbListSchema(
    locale,
    "/pymes",
    t("pymesPage.metadata.title")
  );

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webAppSchema} id="webapp-schema" />
      <JsonLd data={faqSchema} id="faq-schema-pymes" />
      <JsonLd data={howToSchema} id="howto-schema-pymes" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema-pymes" />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{firstPart} </span>
            <GradientText>{secondPart}</GradientText>
          </>
        }
        paragraph={t("pymesPage.header.description")}
        buttonText={t("pymesPage.header.cta")}
        buttonHref="#waitlist"
        highlights={highlights}
      />
      <HeroImageSection imageBaseName="freelancer" dashboardAlt="Software facturación multi-usuario para PYMEs - Panel de control Invoo" />
      <TrustBarSection translationKey="pymesPage.trustBar" />
      <ThreeCardSection
        translationKey="pymesPage.pains"
        cards={[
          { key: "card1", icon: "Mail" },
          { key: "card2", icon: "EyeOff" },
          { key: "card3", icon: "FileX" },
        ]}
      />
      <FourPillarSection
        translationKey="pymesPage.solution"
        pillars={[
          {
            key: "pillar1",
            icon: "Users",
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
            icon: "History",
            gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
            iconColor: "var(--accent-green-main)",
          },
        ]}
      />
      <SpeedDemoSection translationKey="pymesPage.speedDemo" />
      <PricingSection variant="section" defaultTab="pymes" />
      <FAQSection
        titleKey="pymesPage.faqTitle"
        titleHighlightKey="pymesPage.faqTitleHighlight"
        questionsKey="pymesPage.faq"
      />
      <FinalCTASection translationKey="pymesPage.finalCta" />
      <Footer locale={locale} />
    </div>
  );
}
