import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import PrivacyContent from "@/components/PrivacyContent";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return generatePageMetadata({
    locale,
    path: "/privacy",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background-primary">
      <Navigation locale={locale} />
      <PrivacyContent />
      <Footer locale={locale} />
    </div>
  );
}