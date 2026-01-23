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
    path: "/freelancers",
    title: t("freelancersPage.metadata.title"),
    description: t("freelancersPage.metadata.description"),
  });
}

export default async function FreelancersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Split title for gradient: "Invoicing " + "without stress" (or ES: "Facturación " + "sin estrés")
  const titleParts = t("freelancersPage.header.title").split(" ");
  const firstPart = titleParts[0]; // "Invoicing" or "Facturación"
  const secondPart = titleParts.slice(1).join(" "); // "without stress" or "sin estrés"

  // Get highlights for hero section
  const highlights = t.raw("freelancersPage.highlights") as string[];

  // Generate WebApplication schema with freelancer audience targeting
  const webAppSchema = generateWebApplicationSchema(locale);

  // Generate FAQ schema for SEO
  const faqData = t.raw("freelancersPage.faq") as Record<string, { question: string; answer: string }>;
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
    name: `${t("freelancersPage.speedDemo.title")} ${t("freelancersPage.speedDemo.titleHighlight")}`,
    description: t("freelancersPage.speedDemo.description"),
    steps: [
      { name: t("freelancersPage.speedDemo.step1.title"), text: t("freelancersPage.speedDemo.step1.description") },
      { name: t("freelancersPage.speedDemo.step2.title"), text: t("freelancersPage.speedDemo.step2.description") },
      { name: t("freelancersPage.speedDemo.step3.title"), text: t("freelancersPage.speedDemo.step3.description") },
      { name: t("freelancersPage.speedDemo.step4.title"), text: t("freelancersPage.speedDemo.step4.description") },
    ],
  });

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbListSchema(
    locale,
    "/freelancers",
    t("freelancersPage.metadata.title")
  );

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webAppSchema} id="webapp-schema" />
      <JsonLd data={faqSchema} id="faq-schema-freelancers" />
      <JsonLd data={howToSchema} id="howto-schema-freelancers" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema-freelancers" />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{firstPart} </span>

            <GradientText>{secondPart}</GradientText>
          </>
        }
        paragraph={t("freelancersPage.header.description")}
        buttonText={t("freelancersPage.header.cta")}
        buttonHref="#waitlist"
        highlights={highlights}
      />
      <HeroImageSection imageBaseName="freelancer" dashboardAlt="Freelancer Dashboard" />
      <TrustBarSection />
      <ThreeCardSection
        locale={locale}
        translationKey="freelancersPage.pains"
        cards={[
          { key: "card1", icon: "Package" },
          { key: "card2", icon: "CalendarClock" },
          { key: "card3", icon: "MessageSquare" },
        ]}
      />
      <FourPillarSection
        locale={locale}
        translationKey="freelancersPage.solution"
        pillars={[
          {
            key: "pillar1",
            icon: "Users",
            gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
            iconColor: "var(--accent-blue-main)",
          },
          {
            key: "pillar2",
            icon: "Zap",
            gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
            iconColor: "var(--accent-purple-main)",
          },
          {
            key: "pillar3",
            icon: "Package",
            gradient: "linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))",
            iconColor: "var(--accent-orange-main)",
          },
          {
            key: "pillar4",
            icon: "ShieldCheck",
            gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
            iconColor: "var(--accent-green-main)",
          },
        ]}
      />
      <SpeedDemoSection />
      <PricingSection variant="section" />
      <FAQSection
        titleKey="freelancersPage.faqTitle"
        titleHighlightKey="freelancersPage.faqTitleHighlight"
        questionsKey="freelancersPage.faq"
      />
      <FinalCTASection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}