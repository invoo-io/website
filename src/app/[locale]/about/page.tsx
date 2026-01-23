import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutContent from "@/components/content/AboutContent";
import FocusSection from "@/components/sections/FocusSection";
import Footer from "@/components/layout/Footer";
import GradientText from "@/components/ui/GradientText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getImagePath, getBasePath } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";
import { FileText, CheckCircle, BookOpen } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/about",
    title: t("about.metadata.title"),
    description: t("about.metadata.description"),
  });
}

export default async function AboutPage({
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
        <Image
          src={getImagePath("/aboutusimage2.png")}
          alt="Decorative gradient shape"
          width={964}
          height={1349}
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            maxHeight: "1000px",
            width: "auto",
            opacity: 1,
            zIndex: 20,
          }}
        />
        <HeroSection
          title={
            <>
              <span className="text-primary">
                {locale === "en" ? "Helping freelancers and gestorías " : "Ayudando a autónomos y gestorías a "}
              </span>
              <GradientText>{locale === "en" ? "work better together" : "trabajar mejor juntos"}</GradientText>
            </>
          }
          paragraph={t("about.header.description")}
        />
        <AboutContent />
        <FocusSection />

        {/* Editorial Team Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              size="section"
              align="left"
              title={t("about.editorial.title")}
              marginBottom="md"
            />

            <div className="mb-8">
              <p className="text-body text-secondary">
                {t("about.editorial.description")}
              </p>
            </div>

            {/* Editorial highlights */}
            <div className="bg-background-secondary rounded-[16px] p-6 border border-border-primary mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-accent-blue-main flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-body-emphasized text-primary mb-1">
                      {t("about.editorial.sources.title")}
                    </p>
                    <p className="text-callout text-secondary">
                      {t("about.editorial.sources.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-green-main flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-body-emphasized text-primary mb-1">
                      {t("about.editorial.verification.title")}
                    </p>
                    <p className="text-callout text-secondary">
                      {t("about.editorial.verification.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-accent-purple-main flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-body-emphasized text-primary mb-1">
                      {t("about.editorial.updates.title")}
                    </p>
                    <p className="text-callout text-secondary">
                      {t("about.editorial.updates.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Link to full methodology */}
            <Link
              href={getBasePath(`/${locale}/metodologia`)}
              className="inline-flex items-center gap-2 text-accent-blue-main hover:text-accent-blue-hover transition-colors text-body-emphasized"
            >
              {t("about.editorial.cta")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <Footer locale={locale} />
      </div>
    </div>
  );
}
