import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { JsonLd } from '@/components/utilities/JsonLd';
import {
  generateCalculatorHubSchema,
  generateCalculatorItemListSchema,
  generateCalculatorHubBreadcrumbSchema,
} from '@/lib/calculators/schema';
import { BASE_URL } from '@/lib/constants';
import { ensureTrailingSlash } from '@/lib/seo';
import { Calculator, TrendingUp, FileText, Receipt, Banknote, Clock, PiggyBank, Scale } from 'lucide-react';

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
  const t = await getTranslations({ locale, namespace: 'calculators.hub' });

  const esPath = ensureTrailingSlash('/es/herramientas/calculadoras');
  const enPath = ensureTrailingSlash('/en/tools/calculators');

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
      images: [
        {
          url: `${BASE_URL}/calculators.webp`,
          width: 1200,
          height: 630,
          alt: t('meta.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

const calculatorIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  iva: Calculator,
  'cuota-autonomos': TrendingUp,
  factura: FileText,
  'irpf-autonomos': Receipt,
  'sueldo-neto-autonomo': Banknote,
  'precio-hora': Clock,
  'modelo-303': FileText,
  'modelo-130': Receipt,
  'gastos-deducibles': PiggyBank,
  'autonomo-vs-empresa': Scale,
};

export default async function CalculadorasHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect English users to the English URL
  if (locale === 'en') {
    redirect('/en/tools/calculators');
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'calculators.hub' });
  const tCommon = await getTranslations({ locale, namespace: 'calculators.common' });

  // Build calculator list from translations
  const calculatorSlugs = [
    'iva',
    'cuota-autonomos',
    'factura',
    'irpf-autonomos',
    'sueldo-neto-autonomo',
    'precio-hora',
    'modelo-303',
    'modelo-130',
    'gastos-deducibles',
    'autonomo-vs-empresa',
  ];

  const calculators = calculatorSlugs.map((slug) => {
    // Map slugs to their translation keys
    const slugToKeyMap: Record<string, string> = {
      'iva': 'iva',
      'cuota-autonomos': 'cuotaAutonomos',
      'factura': 'factura',
      'irpf-autonomos': 'irpfAutonomos',
      'sueldo-neto-autonomo': 'sueldoNetoAutonomo',
      'precio-hora': 'precioHora',
      'modelo-303': 'modelo303',
      'modelo-130': 'modelo130',
      'gastos-deducibles': 'gastosDeducibles',
      'autonomo-vs-empresa': 'autonomoVsEmpresa',
    };
    const translationKey = slugToKeyMap[slug] || slug.replace(/-/g, '');

    return {
      name: tCommon(`related.${translationKey}.name`),
      description: tCommon(`related.${translationKey}.description`),
      slug,
      href: `/es/herramientas/calculadoras/${slug}`,
    };
  });

  // Schema data
  const calculatorListForSchema = calculators.map(calc => ({
    name: calc.name,
    description: calc.description,
    slug: calc.slug,
  }));

  const hubSchema = generateCalculatorHubSchema({
    locale,
    name: t('meta.title'),
    description: t('meta.description'),
  });

  const itemListSchema = generateCalculatorItemListSchema({
    locale,
    calculators: calculatorListForSchema,
  });

  const breadcrumbSchema = generateCalculatorHubBreadcrumbSchema({ locale });

  return (
    <>
      <JsonLd data={hubSchema} id="hub-schema" />
      <JsonLd data={itemListSchema} id="itemlist-schema" />
      <JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />

      <div className="min-h-screen bg-background-primary">
        <Navigation locale={locale} />

        <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('hero.description')}
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {calculators.map((calculator) => {
                const Icon = calculatorIcons[calculator.slug] || Calculator;

                return (
                  <Link
                    key={calculator.slug}
                    href={calculator.href}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-brand-primary hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-brand-primary">
                      {calculator.name}
                    </h2>
                    <p className="mt-3 flex-1 text-sm text-gray-600">
                      {calculator.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-brand-primary">
                      {tCommon('useCalculator')}
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mx-auto mt-24 max-w-4xl">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              {t('benefits.title')}
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {t('benefits.free.title')}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t('benefits.free.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {t('benefits.instant.title')}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t('benefits.instant.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {t('benefits.updated.title')}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t('benefits.updated.description')}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mx-auto mt-24 max-w-2xl rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary p-8 text-center text-white shadow-xl sm:p-12">
            <h2 className="text-3xl font-bold">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-lg opacity-90">
              {t('cta.description')}
            </p>
            <Link
              href="/es#waitlist"
              className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              {t('cta.button')}
            </Link>
          </div>
        </main>

        <Footer locale={locale} />
      </div>
    </>
  );
}
