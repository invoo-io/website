import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import HeroImageSection from "@/components/sections/HeroImageSection";
import BuildForGestoriasSection from "@/components/sections/BuildForGestoriasSection";
import IntroSection from "@/components/sections/IntroSection";
import FAQSection from "@/components/sections/FAQSection";
import FocusSection from "@/components/sections/FocusSection";
import Footer from "@/components/layout/Footer";
import GradientText from "@/components/ui/GradientText";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/utilities/JsonLd";
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

  // Split title for gradient: "Less paperwork, " + "more advising" (or ES equivalent)
  const titleParts = t("gestoriasPage.header.title").split(", ");

  // Generate WebApplication schema with gestoría audience targeting
  const webAppSchema = generateWebApplicationSchema(locale);

  // Generate FAQ schema for gestoría-specific questions
  const faqQuestions = [
    {
      question: t("gestoriasPage.faq.q1.question"),
      answer: t("gestoriasPage.faq.q1.answer"),
    },
    {
      question: t("gestoriasPage.faq.q2.question"),
      answer: t("gestoriasPage.faq.q2.answer"),
    },
    {
      question: t("gestoriasPage.faq.q3.question"),
      answer: t("gestoriasPage.faq.q3.answer"),
    },
    {
      question: t("gestoriasPage.faq.q4.question"),
      answer: t("gestoriasPage.faq.q4.answer"),
    },
    {
      question: t("gestoriasPage.faq.q5.question"),
      answer: t("gestoriasPage.faq.q5.answer"),
    },
  ];

  const faqSchema = generateFAQPageSchemaStandalone({
    locale,
    questions: faqQuestions,
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webAppSchema} id="webapp-schema" />
      <JsonLd data={faqSchema} id="faq-schema-gestorias" />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{titleParts[0]}, </span>

            <GradientText>{titleParts[1]}</GradientText>
          </>
        }
        paragraph={t("gestoriasPage.header.description")}
        buttonText={t("gestoriasPage.header.cta")}
        buttonHref="#waitlist"
      />
      <HeroImageSection imageBaseName="gestoria" dashboardAlt="Gestorías Dashboard" />
      <IntroSection
        titleKey="gestoriasPage.introTitle"
        paragraphKey="gestoriasPage.introParagraph"
      />
      <BuildForGestoriasSection
        imageSrc="/Calendar.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("gestoriasPage.block1.title")}
        paragraph={t("gestoriasPage.block1.description")}
        features={t.raw("gestoriasPage.block1.features")}
        buttonText={t("gestoriasPage.block1.cta")}
        buttonHref="#waitlist"
      />
      <BuildForGestoriasSection
        imageSrc="/Down.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("gestoriasPage.block2.title")}
        paragraph={t("gestoriasPage.block2.description")}
        features={t.raw("gestoriasPage.block2.features")}
        buttonText={t("gestoriasPage.block2.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <BuildForGestoriasSection
        imageSrc="/clock.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("gestoriasPage.block3.title")}
        paragraph={t("gestoriasPage.block3.description")}
        features={t.raw("gestoriasPage.block3.features")}
        buttonText={t("gestoriasPage.block3.cta")}
        buttonHref="#waitlist"
        imagePosition="right"
        showImagePlaceholder={true}
      />
      <BuildForGestoriasSection
        imageSrc="/Note.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("gestoriasPage.block4.title")}
        paragraph={t("gestoriasPage.block4.description")}
        features={t.raw("gestoriasPage.block4.features")}
        buttonText={t("gestoriasPage.block4.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <IntroSection
        titleKey="gestoriasPage.recommendTitle"
        paragraphKey="gestoriasPage.recommendIntro"
      />
      <BuildForGestoriasSection
        imageSrc="/personbook.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("gestoriasPage.recommendBenefit1Title")}
        paragraph={t("gestoriasPage.recommendBenefit1Text")}
        features={[]}
        buttonText={t("gestoriasPage.block1.cta")}
        buttonHref="#waitlist"
        imagePosition="right"
        showImagePlaceholder={true}
      />
      <BuildForGestoriasSection
        imageSrc="/Note.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("gestoriasPage.recommendBenefit2Title")}
        paragraph={t("gestoriasPage.recommendBenefit2Text")}
        features={[]}
        buttonText={t("gestoriasPage.block1.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <FAQSection
        titleKey="gestoriasPage.faqTitle"
        questionsKey="gestoriasPage.faq"
      />
      <FocusSection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}