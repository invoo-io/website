/**
 * Schema.org JSON-LD generators for calculator pages
 */

import { BASE_URL } from '@/lib/constants';

interface SchemaOrg {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

// Calculator path mappings for localized URLs
export const CALCULATOR_PATHS: Record<string, { es: string; en: string }> = {
  iva: {
    es: '/es/herramientas/calculadoras/iva',
    en: '/en/tools/calculators/vat',
  },
  vat: {
    es: '/es/herramientas/calculadoras/iva',
    en: '/en/tools/calculators/vat',
  },
  // Add more calculators here as they are implemented
  'cuota-autonomos': {
    es: '/es/herramientas/calculadoras/cuota-autonomos',
    en: '/en/tools/calculators/self-employed-quota',
  },
  'self-employed-quota': {
    es: '/es/herramientas/calculadoras/cuota-autonomos',
    en: '/en/tools/calculators/self-employed-quota',
  },
  factura: {
    es: '/es/herramientas/calculadoras/factura',
    en: '/en/tools/calculators/invoice',
  },
};

/**
 * Get the localized path for a calculator
 */
export function getCalculatorPath(slug: string, locale: string): string {
  const paths = CALCULATOR_PATHS[slug];
  if (!paths) {
    // Fallback for unknown calculators
    return locale === 'es'
      ? `/es/herramientas/calculadoras/${slug}`
      : `/en/tools/calculators/${slug}`;
  }
  return paths[locale as 'es' | 'en'] || paths.es;
}

/**
 * Generates SoftwareApplication schema for calculator pages
 */
export function generateCalculatorSchema({
  locale,
  name,
  description,
  slug,
  features,
}: {
  locale: string;
  name: string;
  description: string;
  slug: string;
  features: string[];
}): SchemaOrg {
  const isSpanish = locale === 'es';
  const path = getCalculatorPath(slug, locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${BASE_URL}${path}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    inLanguage: isSpanish ? 'es' : 'en',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: features,
    provider: {
      '@type': 'Organization',
      name: 'Invoo',
      url: BASE_URL,
    },
  };
}

/**
 * Generates FAQPage schema for calculator FAQ sections
 */
export function generateCalculatorFAQSchema(
  locale: string,
  questions: Array<{ question: string; answer: string }>
): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: questions.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  };
}

/**
 * Generates HowTo schema for calculator how-to sections
 */
export function generateCalculatorHowToSchema({
  locale,
  name,
  description,
  steps,
}: {
  locale: string;
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}): SchemaOrg {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    inLanguage: locale,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generates BreadcrumbList schema for calculator pages
 */
export function generateCalculatorBreadcrumbSchema({
  locale,
  calculatorName,
  calculatorSlug,
}: {
  locale: string;
  calculatorName: string;
  calculatorSlug: string;
}): SchemaOrg {
  const isSpanish = locale === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isSpanish ? 'Inicio' : 'Home',
        item: `${BASE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isSpanish ? 'Herramientas' : 'Tools',
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas' : 'tools'}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isSpanish ? 'Calculadoras' : 'Calculators',
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas/calculadoras' : 'tools/calculators'}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: calculatorName,
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas/calculadoras' : 'tools/calculators'}/${calculatorSlug}`,
      },
    ],
  };
}
