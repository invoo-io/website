import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FAQContent from "@/components/FAQContent";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateFAQPageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return generatePageMetadata({
    locale,
    path: "/faq",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });

  // Split title for gradient
  const titleParts = t("hero.title").split(" ");
  const firstPart = titleParts.slice(0, -1).join(" ");
  const lastPart = titleParts[titleParts.length - 1];

  const faqSchema = await generateFAQPageSchema(locale);

  return (
    <div className="min-h-screen bg-bg-primary">
      <JsonLd data={faqSchema} />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-text-primary">{firstPart} </span>
            <GradientText>{lastPart}</GradientText>
          </>
        }
        paragraph={t("hero.description")}
        buttonText={t("hero.cta")}
        buttonHref="#waitlist"
      />
      <FAQContent />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}