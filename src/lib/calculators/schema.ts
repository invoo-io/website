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
  invoice: {
    es: '/es/herramientas/calculadoras/factura',
    en: '/en/tools/calculators/invoice',
  },
  'irpf-autonomos': {
    es: '/es/herramientas/calculadoras/irpf-autonomos',
    en: '/en/tools/calculators/income-tax-freelancer',
  },
  'income-tax-freelancer': {
    es: '/es/herramientas/calculadoras/irpf-autonomos',
    en: '/en/tools/calculators/income-tax-freelancer',
  },
  'sueldo-neto-autonomo': {
    es: '/es/herramientas/calculadoras/sueldo-neto-autonomo',
    en: '/en/tools/calculators/net-salary-freelancer',
  },
  'net-salary-freelancer': {
    es: '/es/herramientas/calculadoras/sueldo-neto-autonomo',
    en: '/en/tools/calculators/net-salary-freelancer',
  },
  'precio-hora': {
    es: '/es/herramientas/calculadoras/precio-hora',
    en: '/en/tools/calculators/hourly-rate',
  },
  'hourly-rate': {
    es: '/es/herramientas/calculadoras/precio-hora',
    en: '/en/tools/calculators/hourly-rate',
  },
  'modelo-303': {
    es: '/es/herramientas/calculadoras/modelo-303',
    en: '/en/tools/calculators/vat-return',
  },
  'vat-return': {
    es: '/es/herramientas/calculadoras/modelo-303',
    en: '/en/tools/calculators/vat-return',
  },
  'modelo-130': {
    es: '/es/herramientas/calculadoras/modelo-130',
    en: '/en/tools/calculators/form-130',
  },
  'form-130': {
    es: '/es/herramientas/calculadoras/modelo-130',
    en: '/en/tools/calculators/form-130',
  },
  'gastos-deducibles': {
    es: '/es/herramientas/calculadoras/gastos-deducibles',
    en: '/en/tools/calculators/deductible-expenses',
  },
  'deductible-expenses': {
    es: '/es/herramientas/calculadoras/gastos-deducibles',
    en: '/en/tools/calculators/deductible-expenses',
  },
  'autonomo-vs-empresa': {
    es: '/es/herramientas/calculadoras/autonomo-vs-empresa',
    en: '/en/tools/calculators/freelancer-vs-company',
  },
  'freelancer-vs-company': {
    es: '/es/herramientas/calculadoras/autonomo-vs-empresa',
    en: '/en/tools/calculators/freelancer-vs-company',
  },
};

/**
 * Get the localized path for a calculator
 */
export function getCalculatorPath(slug: string, locale: string): string {
  const paths = CALCULATOR_PATHS[slug];
  let path: string;
  if (!paths) {
    // Fallback for unknown calculators
    path = locale === 'es'
      ? `/es/herramientas/calculadoras/${slug}`
      : `/en/tools/calculators/${slug}`;
  } else {
    path = paths[locale as 'es' | 'en'] || paths.es;
  }
  // Ensure trailing slash to match next.config.ts trailingSlash: true
  return path.endsWith('/') ? path : `${path}/`;
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
    inLanguage: isSpanish ? 'es-ES' : 'en-US',
    countriesSupported: 'ES',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    featureList: features,
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    provider: {
      '@type': 'Organization',
      name: 'Invoo',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
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
  const path = getCalculatorPath(calculatorSlug, locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isSpanish ? 'Inicio' : 'Home',
        item: `${BASE_URL}/${locale}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isSpanish ? 'Herramientas' : 'Tools',
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas' : 'tools'}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isSpanish ? 'Calculadoras' : 'Calculators',
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas/calculadoras' : 'tools/calculators'}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: calculatorName,
        item: `${BASE_URL}${path}`,
      },
    ],
  };
}

/**
 * Generates WebPage schema for calculator pages
 */
export function generateCalculatorWebPageSchema({
  locale,
  name,
  description,
  slug,
}: {
  locale: string;
  name: string;
  description: string;
  slug: string;
}): SchemaOrg {
  const isSpanish = locale === 'es';
  const path = getCalculatorPath(slug, locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${BASE_URL}${path}`,
    inLanguage: isSpanish ? 'es-ES' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Invoo',
      url: BASE_URL,
    },
    about: {
      '@type': 'Thing',
      name: isSpanish
        ? 'Gestión fiscal para autónomos en España'
        : 'Tax management for freelancers in Spain',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isSpanish ? 'Inicio' : 'Home',
          item: `${BASE_URL}/${locale}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isSpanish ? 'Calculadoras' : 'Calculators',
          item: `${BASE_URL}${path}`,
        },
      ],
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/calculators.webp`,
      width: 1200,
      height: 630,
    },
  };
}

/**
 * Generates BreadcrumbList schema for calculator hub page
 */
export function generateCalculatorHubBreadcrumbSchema({
  locale,
}: {
  locale: string;
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
        item: `${BASE_URL}/${locale}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isSpanish ? 'Herramientas' : 'Tools',
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas' : 'tools'}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isSpanish ? 'Calculadoras' : 'Calculators',
        item: `${BASE_URL}/${locale}/${isSpanish ? 'herramientas/calculadoras' : 'tools/calculators'}/`,
      },
    ],
  };
}

/**
 * Generates ItemList schema for calculator hub page
 */
export function generateCalculatorItemListSchema({
  locale,
  calculators,
}: {
  locale: string;
  calculators: Array<{ name: string; description: string; slug: string }>;
}): SchemaOrg {
  const isSpanish = locale === 'es';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isSpanish
      ? 'Calculadoras para Autónomos'
      : 'Calculators for Freelancers',
    description: isSpanish
      ? 'Calculadoras gratuitas para autónomos y pymes en España: IVA, IRPF, cuota de autónomos, facturas y más.'
      : 'Free calculators for freelancers and SMBs in Spain: VAT, income tax, self-employed quota, invoices and more.',
    itemListElement: calculators.map((calc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: calc.name,
        description: calc.description,
        url: `${BASE_URL}${getCalculatorPath(calc.slug, locale)}`,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'FinanceApplication',
        operatingSystem: 'Web Browser',
        inLanguage: isSpanish ? 'es' : 'en',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        provider: {
          '@type': 'Organization',
          name: 'Invoo',
          url: BASE_URL,
        },
      },
    })),
  };
}

/**
 * Generates CollectionPage schema for calculator hub
 */
export function generateCalculatorHubSchema({
  locale,
  name,
  description,
}: {
  locale: string;
  name: string;
  description: string;
}): SchemaOrg {
  const isSpanish = locale === 'es';
  const path = isSpanish
    ? '/es/herramientas/calculadoras/'
    : '/en/tools/calculators/';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${BASE_URL}${path}`,
    inLanguage: isSpanish ? 'es' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Invoo',
      url: BASE_URL,
    },
    about: {
      '@type': 'Thing',
      name: isSpanish ? 'Herramientas para Autónomos' : 'Tools for Freelancers',
      description: isSpanish
        ? 'Calculadoras y herramientas gratuitas para la gestión fiscal de autónomos y pymes en España'
        : 'Free calculators and tools for tax management of freelancers and SMBs in Spain',
    },
  };
}
