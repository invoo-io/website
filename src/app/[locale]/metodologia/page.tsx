import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import { FourPillarSection } from "@/components/sections/templates/FourPillarSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import Footer from "@/components/layout/Footer";
import GradientText from "@/components/ui/GradientText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/utilities/JsonLd";
import { generatePageMetadata } from "@/lib/seo";
import { generateWebPageSchema, generateBreadcrumbListSchema } from "@/lib/schema";
import { AlertCircle } from "lucide-react";

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

  // Generate schema for SEO
  const pageTitle = t("methodology.metadata.title");
  const pageDescription = t("methodology.metadata.description");

  const webPageSchema = generateWebPageSchema({
    locale,
    path: "/metodologia",
    title: pageTitle,
    description: pageDescription,
  });

  const breadcrumbSchema = generateBreadcrumbListSchema(
    locale,
    "/metodologia",
    pageTitle
  );

  return (
    <div className="min-h-screen bg-background-primary relative overflow-hidden">
      <JsonLd data={webPageSchema} id="webpage-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
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

        {/* Section 1: Process (Research, Writing, Verification, Update) */}
        <FourPillarSection
          locale={locale}
          translationKey="methodology.process"
          pillars={[
            {
              key: "pillar1",
              icon: "BookOpen",
              gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
              iconColor: "var(--accent-blue-main)",
            },
            {
              key: "pillar2",
              icon: "FileText",
              gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
              iconColor: "var(--accent-purple-main)",
            },
            {
              key: "pillar3",
              icon: "CheckCircle",
              gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
              iconColor: "var(--accent-green-main)",
            },
            {
              key: "pillar4",
              icon: "History",
              gradient: "linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))",
              iconColor: "var(--accent-orange-main)",
            },
          ]}
          cardBackground="secondary"
        />

        {/* Section 2: Sources (AEAT, BOE, Seguridad Social, Regional) */}
        <FourPillarSection
          locale={locale}
          translationKey="methodology.sources"
          sectionBackground="secondary"
          pillars={[
            {
              key: "pillar1",
              icon: "FileText",
              gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
              iconColor: "var(--accent-blue-main)",
            },
            {
              key: "pillar2",
              icon: "BookOpen",
              gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
              iconColor: "var(--accent-blue-main)",
            },
            {
              key: "pillar3",
              icon: "Scale",
              gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
              iconColor: "var(--accent-blue-main)",
            },
            {
              key: "pillar4",
              icon: "MapPin",
              gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
              iconColor: "var(--accent-blue-main)",
            },
          ]}
          cardBackground="tertiary"
        />

        {/* Section 3: Commitment */}
        <FourPillarSection
          locale={locale}
          translationKey="methodology.commitment"
          pillars={[
            {
              key: "pillar1",
              icon: "Target",
              gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
              iconColor: "var(--accent-green-main)",
            },
            {
              key: "pillar2",
              icon: "FileCheck",
              gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
              iconColor: "var(--accent-green-main)",
            },
            {
              key: "pillar3",
              icon: "Calendar",
              gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
              iconColor: "var(--accent-green-main)",
            },
            {
              key: "pillar4",
              icon: "ShieldCheck",
              gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
              iconColor: "var(--accent-green-main)",
            },
          ]}
          cardBackground="secondary"
        />

        {/* Section 4: Limitations (custom warning section) */}
        <section className="py-[120px] max-md:py-16 px-4 md:px-6 bg-background-secondary">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              size="subsection"
              align="left"
              title={t("methodology.limitations.title")}
              marginBottom="lg"
            />
            <div className="bg-accent-orange-subtle/10 rounded-[16px] p-8 border border-accent-orange-main/20">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-accent-orange-main flex-shrink-0 mt-1" />
                <div className="text-body text-secondary">
                  {t("methodology.limitations.description").split('\n\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCTASection locale={locale} translationKey="methodology.finalCta" />
        <Footer locale={locale} />
      </div>
    </div>
  );
}
