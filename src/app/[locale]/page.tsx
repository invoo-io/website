import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroImageSection from "@/components/HeroImageSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import InvoicingSection from "@/components/InvoicingSection";
import MoreThanInvoiceSection from "@/components/MoreThanInvoiceSection";
import BuildForGestoriasSection from "@/components/BuildForGestoriasSection";
import PricingSection from "@/components/PricingSection";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import GradientText from "@/components/ui/GradientText";
import { FeaturedBlogSection } from "@/components/blog/FeaturedBlogSection";
import { getImagePath, getBasePath } from "@/lib/utils";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  // Split title for gradient: "Create " + "compliant invoices" + " in 30 seconds"
  // ES: "Crea " + "facturas conformes" + " en 30 segundos"
  const titleParts = t("hero.title").split(" ");
  const firstWord = titleParts[0]; // "Create" or "Crea"
  const middleWords = titleParts.slice(1, -3).join(" "); // "compliant invoices" or "facturas conformes"
  const lastThreeWords = titleParts.slice(-3).join(" "); // "in 30 seconds" or "en 30 segundos"

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-label-inverted">{firstWord} </span>
            <GradientText>{middleWords}</GradientText>
            <span className="text-label-inverted"> {lastThreeWords}</span>
          </>
        }
        paragraph={t("hero.description")}
        buttonText={t("hero.cta")}
        buttonHref="#waitlist"
      />
      <HeroImageSection dashboardImage="/Home.png" />
      <FeaturedBlogSection
        locale={locale}
        title={t("featuredBlog.title")}
        subtitle={t("featuredBlog.subtitle")}
      />
      <WhyChooseSection />
      <InvoicingSection />
      <MoreThanInvoiceSection />
      <BuildForGestoriasSection
        title={t("gestoriasBlock.title")}
        paragraph={t("gestoriasBlock.description")}
        features={t.raw("gestoriasBlock.features")}
        buttonText={t("gestoriasBlock.cta")}
        buttonHref={getBasePath(`/${locale}/gestorias`)}
        imageSrc={getImagePath("/Gestoria.png")}
        imageAlt="Gestorías Dashboard"
        imagePosition="right"
      />
      <PricingSection />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}
