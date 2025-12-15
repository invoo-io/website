import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import FocusSection from "@/components/FocusSection";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateContactPageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    locale,
    path: "/contact",
    title: t("contact.metadata.title"),
    description: t("contact.metadata.description"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Generate ContactPage schema
  const contactSchema = generateContactPageSchema(locale);

  return (
    <div className="min-h-screen bg-background-primary">
      <JsonLd data={contactSchema} id="contact-schema" />
      <Navigation locale={locale} />
      <ContactForm />
      <FocusSection />
      <Footer locale={locale} />
    </div>
  );
}