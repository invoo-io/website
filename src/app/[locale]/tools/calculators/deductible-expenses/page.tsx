import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
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
import { ThreeCardSection } from '@/components/sections/templates/ThreeCardSection';
import { FourPillarSection } from '@/components/sections/templates/FourPillarSection';
import FAQSection from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { CalculatorRelatedTools } from '@/components/calculators/CalculatorSEOContent';
import { getBasePath } from '@/lib/utils';
import { calculatorIcons } from '@/lib/calculator-icons';

const DynamicGastosDeduciblesCalculator = dynamicImport(
  () => import('@/components/calculators/pages/GastosDeduciblesCalculatorPage').then(mod => mod.GastosDeduciblesCalculatorPageContent),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-accent-blue-main border-t-transparent rounded-full" />
      </div>
    )
  }
);

export const dynamic = 'force-static';

// Only generate for English locale
export async function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculators.gastosDeducibles' });

  const esPath = '/es/herramientas/calculadoras/gastos-deducibles';
  const enPath = '/en/tools/calculators/deductible-expenses';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: ['deductible expenses', 'tax deductions Spain', 'freelancer expenses', 'gastos deducibles', 'business expenses Spain', 'tax savings calculator', 'VAT recovery'],
    alternates: {
      canonical: `${BASE_URL}${enPath}`,
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
      locale: 'en_US',
      url: `${BASE_URL}${enPath}`,
      title: t('meta.title'),
      description: t('meta.description'),
      siteName: 'Invoo',
      images: [{
        url: `${BASE_URL}/calculators.webp`,
        width: 1200,
        height: 630,
        alt: 'Invoo - Free Spanish Tax Calculators for Freelancers',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@invoo_es',
      creator: '@invoo_es',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [`${BASE_URL}/calculators.webp`],
    },
  };
}

export default async function DeductibleExpensesCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect Spanish users to the Spanish URL
  if (locale === 'es') {
    redirect('/es/herramientas/calculadoras/gastos-deducibles');
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calculators.gastosDeducibles' });
  const tc = await getTranslations({ locale, namespace: 'calculators.common' });

  // Related calculators data
  const relatedCalculators = [
    {
      name: tc('related.irpfAutonomos.name'),
      description: tc('related.irpfAutonomos.description'),
      href: getBasePath(`/${locale}/tools/calculators/income-tax-freelancer`),
      icon: calculatorIcons.irpfAutonomos,
    },
    {
      name: tc('related.modelo303.name'),
      description: tc('related.modelo303.description'),
      href: getBasePath(`/${locale}/tools/calculators/vat-form-303`),
      icon: calculatorIcons.modelo303,
    },
    {
      name: tc('related.sueldoNetoAutonomo.name'),
      description: tc('related.sueldoNetoAutonomo.description'),
      href: getBasePath(`/${locale}/tools/calculators/freelancer-net-salary`),
      icon: calculatorIcons.sueldoNetoAutonomo,
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
    slug: 'deductible-expenses',
    features: [
      'VAT recovery calculation by category',
      'Income tax deductible expenses',
      'Automatic 5% GDJ deduction (max €2000)',
      'Estimated total tax savings',
    ],
  });

  const faqSchema = generateCalculatorFAQSchema(locale, faqItems);

  const breadcrumbSchema = generateCalculatorBreadcrumbSchema({
    locale,
    calculatorName: t('meta.title'),
    calculatorSlug: 'deductible-expenses',
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
        <DynamicGastosDeduciblesCalculator />

        {/* 2. How To Use - bg-secondary */}
        <div className="bg-background-secondary">
          <FourPillarSection
            locale={locale}
            translationKey="calculators.gastosDeducibles.howTo"
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
                icon: 'DollarSign',
                gradient: 'linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))',
                iconColor: 'var(--accent-orange-main)',
              },
              {
                key: 'pillar4',
                icon: 'BarChart3',
                gradient: 'linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))',
                iconColor: 'var(--accent-green-main)',
              },
            ]}
          />
        </div>

        {/* 3. Key Concepts - bg-primary */}
        <FourPillarSection
          locale={locale}
          translationKey="calculators.gastosDeducibles.concepts"
          pillars={[
            {
              key: 'pillar1',
              icon: 'Receipt',
              gradient: 'linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))',
              iconColor: 'var(--accent-green-main)',
            },
            {
              key: 'pillar2',
              icon: 'FileCheck',
              gradient: 'linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))',
              iconColor: 'var(--accent-blue-main)',
            },
            {
              key: 'pillar3',
              icon: 'Percent',
              gradient: 'linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))',
              iconColor: 'var(--accent-orange-main)',
            },
            {
              key: 'pillar4',
              icon: 'Scale',
              gradient: 'linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))',
              iconColor: 'var(--accent-purple-main)',
            },
          ]}
        />

        {/* 4. Benefits - bg-secondary */}
        <ThreeCardSection
          locale={locale}
          translationKey="calculators.gastosDeducibles.benefits"
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
          titleKey="calculators.gastosDeducibles.faqTitle"
          titleHighlightKey="calculators.gastosDeducibles.faqTitleHighlight"
          questionsKey="calculators.gastosDeducibles.faq"
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
          translationKey="calculators.gastosDeducibles.finalCta"
        />

        <Footer locale={locale} />
      </div>
    </>
  );
}
