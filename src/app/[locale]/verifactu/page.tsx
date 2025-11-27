import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import VerifactuContent from "@/components/VerifactuContent";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "verifactu" });

  return generatePageMetadata({
    locale,
    path: "/verifactu",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function VerifactuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation locale={locale} />
      <VerifactuContent />
      <Footer locale={locale} />
    </div>
  );
}