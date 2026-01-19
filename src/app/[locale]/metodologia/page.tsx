import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MethodologyContent from "@/components/MethodologyContent";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/metodologia",
    title: t("methodology.metadata.title"),
    description: t("methodology.metadata.description"),
  });
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-background-primary relative overflow-hidden">
      <div className="relative z-10">
        <Navigation locale={locale} />
        <HeroSection
          title={
            <>
              <span className="text-primary">
                {t("methodology.header.titleStart")}
              </span>
              <GradientText>{t("methodology.header.titleGradient")}</GradientText>
            </>
          }
          paragraph={t("methodology.header.description")}
        />
        <MethodologyContent />
        <FocusSection />
        <Footer locale={locale} />
      </div>
    </div>
  );
}
