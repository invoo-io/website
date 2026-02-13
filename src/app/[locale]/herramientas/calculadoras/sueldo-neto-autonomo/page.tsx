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

const DynamicSueldoNetoAutonomoCalculator = dynamicImport(
  () => import('@/components/calculators/pages/SueldoNetoAutonomoCalculatorPage').then(mod => mod.SueldoNetoAutonomoCalculatorPageContent),
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
  const t = await getTranslations({ locale, namespace: 'calculators.sueldoNetoAutonomo' });

  const esPath = ensureTrailingSlash('/es/herramientas/calculadoras/sueldo-neto-autonomo');
  const enPath = ensureTrailingSlash('/en/tools/calculators/net-salary-freelancer');

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
      siteName: 'Invoo',
      title: t('meta.title'),
      description: t('meta.description'),
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
      'sueldo neto autónomo',
      'calculadora sueldo autónomo',
      'cuánto gana un autónomo',
      'IRPF autónomos',
      'impuestos autónomos',
      'beneficio neto autónomo',
    ],
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
      name: tc('related.cuotaAutonomos.name'),
      description: tc('related.cuotaAutonomos.description'),
      href: getBasePath(`/${locale}/herramientas/calculadoras/cuota-autonomos`),
      icon: calculatorIcons.cuotaAutonomos,
    },
    {
      name: tc('related.precioHora.name'),
      description: tc('related.precioHora.description'),
      href: getBasePath(`/${locale}/herramientas/calculadoras/precio-hora`),
      icon: calculatorIcons.precioHora,
    },
  ];

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
      { name: t('howTo.pillar1.title'), text: t('howTo.pillar1.description') },
      { name: t('howTo.pillar2.title'), text: t('howTo.pillar2.description') },
      { name: t('howTo.pillar3.title'), text: t('howTo.pillar3.description') },
      { name: t('howTo.pillar4.title'), text: t('howTo.pillar4.description') },
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

        {/* 1. Hero + Calculator */}
        <DynamicSueldoNetoAutonomoCalculator />

        {/* 2. How To Use - bg-secondary */}
        <div className="bg-background-secondary">
          <FourPillarSection
            locale={locale}
            translationKey="calculators.sueldoNetoAutonomo.howTo"
            cardBackground="tertiary"
            pillars={[
              {
                key: 'pillar1',
                icon: 'FileText',
                gradient: 'linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))',
                iconColor: 'var(--accent-blue-main)',
              },
              {
                key: 'pillar2',
                icon: 'Calculator',
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
                icon: 'CheckCircle',
                gradient: 'linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))',
                iconColor: 'var(--accent-green-main)',
              },
            ]}
          />
        </div>

        {/* 3. Deductions Info - bg-primary */}
        <FourPillarSection
          locale={locale}
          translationKey="calculators.sueldoNetoAutonomo.deducciones"
          pillars={[
            {
              key: 'item1',
              icon: 'Wallet',
              gradient: 'linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))',
              iconColor: 'var(--accent-blue-main)',
            },
            {
              key: 'item2',
              icon: 'TrendingUp',
              gradient: 'linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))',
              iconColor: 'var(--accent-purple-main)',
            },
            {
              key: 'item3',
              icon: 'Receipt',
              gradient: 'linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))',
              iconColor: 'var(--accent-orange-main)',
            },
            {
              key: 'item4',
              icon: 'Gift',
              gradient: 'linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))',
              iconColor: 'var(--accent-green-main)',
            },
          ]}
        />

        {/* 4. Benefits - bg-secondary */}
        <ThreeCardSection
          locale={locale}
          translationKey="calculators.sueldoNetoAutonomo.benefitsSection"
          cardBackground="tertiary"
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

        {/* 5. FAQ - bg-primary */}
        <FAQSection
          titleKey="calculators.sueldoNetoAutonomo.faqTitle"
          titleHighlightKey="calculators.sueldoNetoAutonomo.faqTitleHighlight"
          questionsKey="calculators.sueldoNetoAutonomo.faq"
          background="primary"
        />

        {/* 6. Related Calculators */}
        <CalculatorRelatedTools
          title={tc('relatedTitle')}
          calculators={relatedCalculators}
        />

        {/* 7. Final CTA */}
        <FinalCTASection
          locale={locale}
          translationKey="calculators.sueldoNetoAutonomo.finalCta"
        />

        <Footer locale={locale} />
      </div>
    </>
  );
}
