import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroImageSection from "@/components/HeroImageSection";
import IntroSection from "@/components/IntroSection";
import BuildForGestoriasSection from "@/components/BuildForGestoriasSection";
import FAQSection from "@/components/FAQSection";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateWebApplicationSchema, generateFAQPageSchemaStandalone } from "@/lib/schema";

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

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webAppSchema} id="webapp-schema" />
      <JsonLd data={faqSchema} id="faq-schema-pymes" />
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
      />
      <HeroImageSection imageBaseName="freelancer" dashboardAlt="PYMES Dashboard" />
      <IntroSection
        titleKey="pymesPage.introTitle"
        paragraphKey="pymesPage.introParagraph"
      />
      <BuildForGestoriasSection
        imageSrc="/clock.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("pymesPage.block1.title")}
        paragraph={t("pymesPage.block1.description")}
        features={t.raw("pymesPage.block1.features")}
        buttonText={t("pymesPage.block1.cta")}
        buttonHref="#waitlist"
      />
      <BuildForGestoriasSection
        imageSrc="/Doc.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("pymesPage.block2.title")}
        paragraph={t("pymesPage.block2.description")}
        features={t.raw("pymesPage.block2.features")}
        buttonText={t("pymesPage.block2.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <BuildForGestoriasSection
        imageSrc="/Screen.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("pymesPage.block3.title")}
        paragraph={t("pymesPage.block3.description")}
        features={t.raw("pymesPage.block3.features")}
        buttonText={t("pymesPage.block3.cta")}
        buttonHref="#waitlist"
        imagePosition="right"
        showImagePlaceholder={true}
      />
      <BuildForGestoriasSection
        imageSrc="/Book.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("pymesPage.block4.title")}
        paragraph={t("pymesPage.block4.description")}
        features={t.raw("pymesPage.block4.features")}
        buttonText={t("pymesPage.block4.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <FAQSection
        titleKey="pymesPage.faqTitle"
        questionsKey="pymesPage.faq"
      />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}
