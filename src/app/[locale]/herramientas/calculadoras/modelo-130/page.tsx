import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { Modelo130CalculatorPageContent } from '@/components/calculators/pages/Modelo130CalculatorPage';
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
  const t = await getTranslations({ locale, namespace: 'calculators.modelo130' });

  const esPath = '/es/herramientas/calculadoras/modelo-130';
  const enPath = '/en/tools/calculators/form-130';

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
      siteName: 'Invoo',
      images: [{
        url: `${BASE_URL}/calculators.webp`,
        width: 1200,
        height: 630,
        alt: t('meta.title'),
        type: 'image/webp',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [`${BASE_URL}/calculators.webp`],
      creator: '@invoo_es',
      site: '@invoo_es',
    },
    keywords: [
      'modelo 130',
      'pago fraccionado IRPF',
      'calculadora modelo 130',
      'declaración trimestral IRPF',
      'autónomos IRPF',
      'hacienda modelo 130',
    ],
  };
}

export default async function Modelo130CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect English users to the English URL
  if (locale === 'en') {
    redirect('/en/tools/calculators/form-130');
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calculators.modelo130' });

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
    slug: 'modelo-130',
    features: [
      'Cálculo de pago fraccionado de IRPF',
      'Rendimiento neto acumulado',
      'Deducciones por pagos anteriores',
      'Retenciones de facturas',
      'Detección de posible exención',
    ],
  });

  const faqSchema = generateCalculatorFAQSchema(locale, faqItems);

  const breadcrumbSchema = generateCalculatorBreadcrumbSchema({
    locale,
    calculatorName: t('meta.title'),
    calculatorSlug: 'modelo-130',
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
        <Modelo130CalculatorPageContent />
        <Footer locale={locale} />
      </div>
    </>
  );
}
