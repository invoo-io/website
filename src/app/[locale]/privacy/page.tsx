import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/layout/Navigation";
import PrivacyContent from "@/components/content/legal/PrivacyContent";
import Footer from "@/components/layout/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/utilities/JsonLd";
import { generateWebPageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/privacy",
    title: t("privacy.metadata.title"),
    description: t("privacy.metadata.description"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  // Generate WebPage schema
  const webPageSchema = generateWebPageSchema({
    locale,
    path: "/privacy",
    title: t("privacy.metadata.title"),
    description: t("privacy.metadata.description"),
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={webPageSchema} id="webpage-schema" />
      <Navigation locale={locale} />
      <PrivacyContent locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}