import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SueldoNetoAutonomoCalculatorPageContent } from '@/components/calculators/pages/SueldoNetoAutonomoCalculatorPage';
import {
  generateCalculatorSchema,
  generateCalculatorFAQSchema,
  generateCalculatorBreadcrumbSchema,
  generateCalculatorHowToSchema,
} from '@/lib/calculators/schema';
import { BASE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

// Only generate for Spanish locale
export async function generateStaticParams() {
  return [{ locale: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculators.sueldoNetoAutonomo' });

  const esPath = '/es/herramientas/calculadoras/sueldo-neto-autonomo';
  const enPath = '/en/tools/calculators/net-salary-freelancer';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}${esPath}`,
      languages: {
        es: `${BASE_URL}${esPath}`,
        en: `${BASE_URL}${enPath}`,
        'x-default': `${BASE_URL}${esPath}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: `${BASE_URL}${esPath}`,
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{
        url: `${BASE_URL}/og/calculators/sueldo-neto-autonomo.png`,
        width: 1200,
        height: 630,
        alt: t('meta.title'),
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function SueldoNetoAutonomoCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect English users to the English URL
  if (locale === 'en') {
    redirect('/en/tools/calculators/net-salary-freelancer');
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calculators.sueldoNetoAutonomo' });

  // FAQ data for schema
  const faqItems = [
    { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
    { question: t('faq.q4.question'), answer: t('faq.q4.answer') },
    { question: t('faq.q5.question'), answer: t('faq.q5.answer') },
    { question: t('faq.q6.question'), answer: t('faq.q6.answer') },
  ];

  // Schema data
  const calculatorSchema = generateCalculatorSchema({
    locale,
    name: t('meta.title'),
    description: t('meta.description'),
    slug: 'sueldo-neto-autonomo',
    features: [
      'Cálculo completo de sueldo neto para autónomos',
      'Incluye cuota de autónomos y IRPF',
      'Tarifa plana y Cuota Cero automáticos',
      'Tramos fiscales 2024, 2025 y 2026',
      'Gastos deducibles y mínimo personal',
      'Resultados instantáneos y desglose detallado',
    ],
  });

  const faqSchema = generateCalculatorFAQSchema(locale, faqItems);

  const breadcrumbSchema = generateCalculatorBreadcrumbSchema({
    locale,
    calculatorName: t('meta.title'),
    calculatorSlug: 'sueldo-neto-autonomo',
  });

  const howToSchema = generateCalculatorHowToSchema({
    locale,
    name: t('howTo.schemaName'),
    description: t('howTo.description'),
    steps: [
      { name: t('howTo.step1.title'), text: t('howTo.step1.description') },
      { name: t('howTo.step2.title'), text: t('howTo.step2.description') },
      { name: t('howTo.step3.title'), text: t('howTo.step3.description') },
      { name: t('howTo.step4.title'), text: t('howTo.step4.description') },
    ],
  });

  return (
    <>
      <JsonLd data={calculatorSchema} id="calculator-schema" />
      <JsonLd data={faqSchema} id="faq-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd data={howToSchema} id="howto-schema" />

      <div className="min-h-screen bg-background-primary">
        <Navigation locale={locale} />
        <SueldoNetoAutonomoCalculatorPageContent />
        <Footer locale={locale} />
      </div>
    </>
  );
}
