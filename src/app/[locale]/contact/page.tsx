import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return generatePageMetadata({
    locale,
    path: "/contact",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background-primary">
      <Navigation locale={locale} />
      <ContactForm />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}