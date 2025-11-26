import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import LegalNoticeContent from "@/components/LegalNoticeContent";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalNotice" });

  return generatePageMetadata({
    locale,
    path: "/legal-notice",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />
      <LegalNoticeContent />
      <Footer locale={locale} />
    </div>
  );
}
