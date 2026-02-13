import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { JsonLd } from '@/components/utilities/JsonLd';
import {
  generateCalculatorSchema,
  generateCalculatorFAQSchema,
  generateCalculatorBreadcrumbSchema,
  generateCalculatorHowToSchema,
} from '@/lib/calculators/schema';
import { BASE_URL } from '@/lib/constants';
import { ensureTrailingSlash } from '@/lib/seo';
import { ThreeCardSection } from '@/components/sections/templates/ThreeCardSection';
import { FourPillarSection } from '@/components/sections/templates/FourPillarSection';
import FAQSection from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { CalculatorRelatedTools } from '@/components/calculators/CalculatorSEOContent';
import { getBasePath } from '@/lib/utils';
import { calculatorIcons } from '@/lib/calculator-icons';

const DynamicCuotaAutonomosCalculator = dynamicImport(
  () => import('@/components/calculators/pages/CuotaAutonomosCalculatorPage').then(mod => mod.CuotaAutonomosCalculatorPageContent),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-accent-blue-main border-t-transparent rounded-full" />
      </div>
    )
  }
);

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
  const t = await getTranslations({ locale, namespace: 'calculators.cuotaAutonomos' });

  const esPath = ensureTrailingSlash('/es/herramientas/calculadoras/cuota-autonomos');
  const enPath = ensureTrailingSlash('/en/tools/calculators/self-employed-quota');

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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
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
      'cuota autónomos 2026',
      'calculadora cuota autónomos',
      'tarifa plana autónomos',
      'cuota cero',
      'tramos autónomos',
      'cotización autónomos',
    ],
  };
}

export default async function CuotaAutonomosCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect English users to the English URL
  if (locale === 'en') {
    redirect('/en/tools/calculators/self-employed-quota');
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calculators.cuotaAutonomos' });

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
    slug: 'cuota-autonomos',
    features: [
      'Cálculo de cuota de autónomos en tiempo real',
      'Tramos 2024, 2025 y 2026',
      'Tarifa plana y cuota cero',
      'Resultados instantáneos',
    ],
  });

  const faqSchema = generateCalculatorFAQSchema(locale, faqItems);

  const breadcrumbSchema = generateCalculatorBreadcrumbSchema({
    locale,
    calculatorName: t('meta.title'),
    calculatorSlug: 'cuota-autonomos',
  });

  const howToSchema = generateCalculatorHowToSchema({
    locale,
    name: t('howTo.schemaName'),
    description: t('howTo.description'),
    steps: [
      { name: t('howTo.pillar1.title'), text: t('howTo.pillar1.description') },
      { name: t('howTo.pillar2.title'), text: t('howTo.pillar2.description') },
      { name: t('howTo.pillar3.title'), text: t('howTo.pillar3.description') },
      { name: t('howTo.pillar4.title'), text: t('howTo.pillar4.description') },
    ],
  });

  const tc = await getTranslations({ locale, namespace: 'calculators.common' });

  // Related calculators data
  const relatedCalculators = [
    {
      name: tc('related.irpfAutonomos.name'),
      description: tc('related.irpfAutonomos.description'),
      href: getBasePath(`/${locale}/herramientas/calculadoras/irpf-autonomos`),
      icon: calculatorIcons.irpfAutonomos,
    },
    {
      name: tc('related.sueldoNetoAutonomo.name'),
      description: tc('related.sueldoNetoAutonomo.description'),
      href: getBasePath(`/${locale}/herramientas/calculadoras/sueldo-neto-autonomo`),
      icon: calculatorIcons.sueldoNetoAutonomo,
    },
    {
      name: tc('related.factura.name'),
      description: tc('related.factura.description'),
      href: getBasePath(`/${locale}/herramientas/calculadoras/factura`),
      icon: calculatorIcons.factura,
    },
  ];

  return (
    <>
      <JsonLd data={calculatorSchema} id="calculator-schema" />
      <JsonLd data={faqSchema} id="faq-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
      <JsonLd data={howToSchema} id="howto-schema" />

      <div className="min-h-screen bg-background-primary">
        <Navigation locale={locale} />

        {/* 1. Hero + Calculator */}
        <DynamicCuotaAutonomosCalculator />

        {/* 2. How To Use - bg-secondary */}
        <div className="bg-background-secondary">
          <FourPillarSection
            locale={locale}
            translationKey="calculators.cuotaAutonomos.howTo"
            cardBackground="tertiary"
            pillars={[
              {
                key: 'pillar1',
                icon: 'Calculator',
                gradient: 'linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))',
                iconColor: 'var(--accent-blue-main)',
              },
              {
                key: 'pillar2',
                icon: 'CalendarCheck',
                gradient: 'linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))',
                iconColor: 'var(--accent-purple-main)',
              },
              {
                key: 'pillar3',
                icon: 'Users',
                gradient: 'linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))',
                iconColor: 'var(--accent-orange-main)',
              },
              {
                key: 'pillar4',
                icon: 'FileText',
                gradient: 'linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))',
                iconColor: 'var(--accent-green-main)',
              },
            ]}
          />
        </div>

        {/* 3. Benefits - bg-primary */}
        <ThreeCardSection
          locale={locale}
          translationKey="calculators.cuotaAutonomos.benefits"
          cards={[
            {
              key: 'card1',
              icon: 'Zap',
              gradient: 'linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))',
            },
            {
              key: 'card2',
              icon: 'CheckCircle',
              gradient: 'linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))',
            },
            {
              key: 'card3',
              icon: 'Gift',
              gradient: 'linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))',
            },
          ]}
        />

        {/* 4. FAQ - bg-secondary */}
        <FAQSection
          titleKey="calculators.cuotaAutonomos.faqTitle"
          titleHighlightKey="calculators.cuotaAutonomos.faqTitleHighlight"
          questionsKey="calculators.cuotaAutonomos.faq"
          background="primary"
        />

        {/* 5. Related Calculators */}
        <CalculatorRelatedTools
          title={tc('relatedTitle')}
          calculators={relatedCalculators}
        />

        {/* 6. Final CTA */}
        <FinalCTASection
          locale={locale}
          translationKey="calculators.cuotaAutonomos.finalCta"
        />

        <Footer locale={locale} />
      </div>
    </>
  );
}
