import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroImageSection from "@/components/HeroImageSection";
import BuildForGestoriasSection from "@/components/BuildForGestoriasSection";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";

export default async function GestoriasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "gestoriasPage" });

  // Split title for gradient: "Less paperwork, " + "more advising" (or ES equivalent)
  const titleParts = t("header.title").split(", ");

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span style={{color: 'text-text-primary'}}>{titleParts[0]}, </span>

            <GradientText>{titleParts[1]}</GradientText>
          </>
        }
        paragraph={t("header.description")}
        buttonText={t("header.cta")}
        buttonHref="#waitlist"
      />
      <HeroImageSection imageBaseName="gestoria" dashboardAlt="Gestorías Dashboard" />
      <BuildForGestoriasSection
        imageSrc="/Calendar.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("block1.title")}
        paragraph={t("block1.description")}
        features={t.raw("block1.features")}
        buttonText={t("block1.cta")}
        buttonHref="#waitlist"
      />
      <BuildForGestoriasSection
        imageSrc="/Down.png"
        imageWidth={350}
        imageHeight={350}
        offsetImage={false}
        maxImageWidth={160}
        title={t("block2.title")}
        paragraph={t("block2.description")}
        features={t.raw("block2.features")}
        buttonText={t("block2.cta")}
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
        title={t("block3.title")}
        paragraph={t("block3.description")}
        features={t.raw("block3.features")}
        buttonText={t("block3.cta")}
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
        title={t("block4.title")}
        paragraph={t("block4.description")}
        features={t.raw("block4.features")}
        buttonText={t("block4.cta")}
        buttonHref="#waitlist"
        imagePosition="left"
        showImagePlaceholder={true}
      />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}