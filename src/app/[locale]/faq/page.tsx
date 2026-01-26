import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import FAQContent from "@/components/content/FAQContent";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import Footer from "@/components/layout/Footer";
import GradientText from "@/components/ui/GradientText";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/utilities/JsonLd";
import { generateFAQPageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/faq",
    title: t("faq.metadata.title"),
    description: t("faq.metadata.description"),
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Split title for gradient
  const titleParts = t("faq.hero.title").split(" ");
  const firstPart = titleParts.slice(0, -1).join(" ");
  const lastPart = titleParts[titleParts.length - 1];

  const faqSchema = await generateFAQPageSchema(locale);

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={faqSchema} />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{firstPart} </span>
            <GradientText>{lastPart}</GradientText>
          </>
        }
        paragraph={t("faq.hero.description")}
        buttonText={t("faq.hero.cta")}
        buttonHref="#waitlist"
      />
      <FAQContent />
      <FinalCTASection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}