import type { Metadata } from "next";
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
import { JsonLd } from "@/components/JsonLd";
import { getBasePath } from "@/lib/utils";
import { generateWebApplicationSchema, generateHowToSchema } from "@/lib/schema";

const BASE_URL = "https://invoo.es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const url = `${BASE_URL}/${locale}/`;

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/`,
        es: `${BASE_URL}/es/`,
        "x-default": `${BASE_URL}/es/`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url,
      title: t("metadata.title"),
      description: t("metadata.description"),
      siteName: "Invoo",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Split title for gradient: "Create " + "compliant invoices" + " in 30 seconds"
  // ES: "Crea " + "facturas conformes" + " en 30 segundos"
  const titleParts = t("home.hero.title").split(" ");
  const firstWord = titleParts[0]; // "Create" or "Crea"
  const middleWords = titleParts.slice(1, -3).join(" "); // "compliant invoices" or "facturas conformes"
  const lastThreeWords = titleParts.slice(-3).join(" "); // "in 30 seconds" or "en 30 segundos"

  // Generate HowTo schema for InvoicingSection
  const howToSchema = generateHowToSchema({
    locale,
    name: t("home.invoicing.title"),
    description: locale === "es"
      ? "Aprende cómo crear y enviar facturas conformes con Verifactu en solo 3 pasos simples con Invoo"
      : "Learn how to create and send compliant Verifactu invoices in just 3 simple steps with Invoo",
    steps: [
      {
        name: t("home.invoicing.step1.title"),
        text: t("home.invoicing.step1.description"),
      },
      {
        name: t("home.invoicing.step2.title"),
        text: t("home.invoicing.step2.description"),
      },
      {
        name: t("home.invoicing.step3.title"),
        text: t("home.invoicing.step3.description"),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={generateWebApplicationSchema(locale)} />
      <JsonLd data={howToSchema} id="howto-invoicing" />
      <Navigation locale={locale} />
      <HeroSection
        title={
          <>
            <span className="text-primary">{firstWord} </span>
            <GradientText>{middleWords}</GradientText>
            <span className="text-primary"> {lastThreeWords}</span>
          </>
        }
        paragraph={t("home.hero.description")}
        buttonText={t("home.hero.cta")}
        buttonHref="#waitlist"
        highlights={
          locale === "es"
            ? ["50% dto. primeros 100 usuarios", "7 días gratis", "Conforme con AEAT"]
            : ["50% off first 100 users", "7 day free trial", "AEAT compliant"]
        }
      />
      <HeroImageSection />
      <WhyChooseSection />
      <InvoicingSection />
      <MoreThanInvoiceSection />
      <BuildForGestoriasSection
        title={
          locale === "es" ? (
            <>Diseñado para <GradientText>gestorías</GradientText></>
          ) : (
            <>Built for <GradientText>gestorías</GradientText></>
          )
        }
        paragraph={t("home.gestoriasBlock.description")}
        features={t.raw("home.gestoriasBlock.features")}
        buttonText={t("home.gestoriasBlock.cta")}
        buttonHref={getBasePath(`/${locale}/gestorias`)}
        imageAlt="Gestorías Dashboard"
        imagePosition="right"
        applyHeroStyling={true}
      />
      <PricingSection />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}
