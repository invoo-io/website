import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroImageSection from "@/components/HeroImageSection";
import BuildForGestoriasSection from "@/components/BuildForGestoriasSection";
import IntroSection from "@/components/IntroSection";
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

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webAppSchema} id="webapp-schema" />
      <JsonLd data={faqSchema} id="faq-schema-freelancers" />
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
      />
      <HeroImageSection imageBaseName="freelancer" dashboardAlt="Freelancer Dashboard" />
      <IntroSection
        titleKey="freelancersPage.introTitle"
        paragraphKey="freelancersPage.introParagraph"
      />
      <BuildForGestoriasSection
        imageSrc="/clock.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("freelancersPage.block1.title")}
        paragraph={t("freelancersPage.block1.description")}
        features={t.raw("freelancersPage.block1.features")}
        buttonText={t("freelancersPage.block1.cta")}
        buttonHref="#waitlist"
      />
      <BuildForGestoriasSection
        imageSrc="/Doc.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("freelancersPage.block2.title")}
        paragraph={t("freelancersPage.block2.description")}
        features={t.raw("freelancersPage.block2.features")}
        buttonText={t("freelancersPage.block2.cta")}
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
        title={t("freelancersPage.block3.title")}
        paragraph={t("freelancersPage.block3.description")}
        features={t.raw("freelancersPage.block3.features")}
        buttonText={t("freelancersPage.block3.cta")}
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
        title={t("freelancersPage.block4.title")}
        paragraph={t("freelancersPage.block4.description")}
        features={t.raw("freelancersPage.block4.features")}
        buttonText={t("freelancersPage.block4.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <FAQSection
        titleKey="freelancersPage.faqTitle"
        questionsKey="freelancersPage.faq"
      />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}