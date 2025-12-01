import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/constants";

// Type definitions for JSON-LD schemas
interface SchemaOrg {
  "@context": "https://schema.org";
  "@type": string;
  "@id"?: string;
  [key: string]: unknown;
}

// Organization IDs for linking schemas
const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const SOFTWARE_ID = `${BASE_URL}/#software`;
const PRODUCT_ID = `${BASE_URL}/#product`;

/**
 * Generates Organization schema for Roques OU (the provider company)
 * Used as the main organization entity for all other schemas
 */
export function generateOrganizationSchema(): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Invoo",
    legalName: "Roques OÜ",
    description:
      "Plataforma de facturación electrónica para autónomos y gestorías en España. Cumplimiento automático con Verifactu, envío a AEAT y colaboración gestor-cliente en tiempo real.",
    url: BASE_URL,
    logo: `${BASE_URL}/Logo.png`,
    image: `${BASE_URL}/Logo.png`,
    email: "legal@invoo.es",
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ahtri tn 12",
      postalCode: "15551",
      addressLocality: "Tallinn",
      addressCountry: "EE",
    },
    areaServed: {
      "@type": "Country",
      name: "Spain",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@invoo.es",
      contactType: "customer support",
      availableLanguage: ["Spanish", "English"],
    },
    knowsAbout: [
      "Facturación electrónica",
      "Verifactu",
      "AEAT",
      "Autónomos España",
      "Gestorías",
      "Modelo 130",
      "Modelo 303",
      "IVA España",
      "Software de facturación",
      "Cumplimiento fiscal España",
    ],
    sameAs: [
      "https://twitter.com/invoo_es",
      "https://x.com/InvooES",
      "https://www.linkedin.com/company/invooes",
      "https://www.facebook.com/profile.php?id=61578360993110",
    ],
  };
}

/**
 * Generates WebSite schema for the global website
 * Links to organization via @id pattern
 */
export function generateWebSiteSchema(): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Invoo",
    url: BASE_URL,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: ["es", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/es/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates SoftwareApplication schema for the Invoo SaaS platform
 * Uses WebApplication type with PreOrder availability
 */
export function generateSoftwareApplicationSchema(
  locale: string
): SchemaOrg {
  const isSpanish = locale === "es";

  const featureList = isSpanish
    ? [
        "Facturación electrónica con QR Verifactu",
        "Envío automático a AEAT",
        "Gestión de gastos y tickets",
        "Precálculo de Modelo 130 y 303",
        "Panel de gestoría en tiempo real",
        "Exportación CSV y XML",
        "Facturas recurrentes",
        "Multi-moneda e IVA internacional",
      ]
    : [
        "Electronic invoicing with Verifactu QR",
        "Automatic AEAT submission",
        "Expense and receipt management",
        "Pre-calculated Modelo 130 & 303",
        "Real-time gestoría dashboard",
        "CSV and XML export",
        "Recurring invoices",
        "Multi-currency and international VAT",
      ];

  const description = isSpanish
    ? "Plataforma de facturación electrónica para autónomos, pymes y gestorías en España. Cumplimiento Verifactu automático, envío a AEAT y panel de gestoría incluido."
    : "Electronic invoicing platform for freelancers, SMBs and accountants in Spain. Automatic Verifactu compliance, AEAT submission and gestoría dashboard included.";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "Invoo",
    description,
    url: BASE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    softwareVersion: "1.0",
    featureList,
    screenshot: `${BASE_URL}/images/invoo-screenshot.png`,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    offers: {
      "@type": "Offer",
      price: "10.90",
      priceCurrency: "EUR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/PreOrder",
      availabilityStarts: "2026-03-01",
      url: `${BASE_URL}/${locale}/pricing`,
      eligibleRegion: {
        "@type": "Country",
        name: "Spain",
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "10.90",
        priceCurrency: "EUR",
        billingDuration: "P1M",
        unitText: isSpanish ? "mes" : "month",
      },
    },
    audience: {
      "@type": "Audience",
      audienceType: isSpanish
        ? "Autónomos, pymes y gestorías en España"
        : "Freelancers, SMBs and accountants in Spain",
    },
    isAccessibleForFree: false,
  };
}

/**
 * Generates Product schema with multiple offers
 * Includes both paid (autonomos) and free (gestorias) tiers
 */
export function generateProductSchema(locale: string): SchemaOrg {
  const isSpanish = locale === "es";

  const description = isSpanish
    ? "Software de facturación electrónica con cumplimiento Verifactu para autónomos y gestorías en España"
    : "Electronic invoicing software with Verifactu compliance for freelancers and accountants in Spain";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": PRODUCT_ID,
    name: "Invoo",
    description,
    url: BASE_URL,
    brand: {
      "@type": "Brand",
      name: "Invoo",
    },
    image: `${BASE_URL}/Logo.png`,
    offers: [
      {
        "@type": "Offer",
        name: isSpanish ? "Plan Pro - Autónomos y Pymes" : "Pro Plan - Freelancers & SMBs",
        description: isSpanish
          ? "Plan completo para autónomos y pymes con facturación ilimitada, Verifactu y panel de gestoría"
          : "Complete plan for freelancers and SMBs with unlimited invoicing, Verifactu and gestoría dashboard",
        price: "10.90",
        priceCurrency: "EUR",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/PreOrder",
        availabilityStarts: "2026-03-01",
        url: `${BASE_URL}/${locale}/pricing`,
        eligibleRegion: {
          "@type": "Country",
          name: "Spain",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "10.90",
          priceCurrency: "EUR",
          billingDuration: "P1M",
          unitText: isSpanish ? "mes" : "month",
        },
      },
      {
        "@type": "Offer",
        name: isSpanish ? "Plan Gestoría - Gratis" : "Gestoría Plan - Free",
        description: isSpanish
          ? "Acceso gratuito para gestorías con panel de clientes, exportaciones CSV y notificaciones"
          : "Free access for accountants with client dashboard, CSV exports and notifications",
        price: "0",
        priceCurrency: "EUR",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/PreOrder",
        availabilityStarts: "2026-03-01",
        url: `${BASE_URL}/${locale}/pricing`,
        eligibleRegion: {
          "@type": "Country",
          name: "Spain",
        },
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "0",
          priceCurrency: "EUR",
          billingDuration: "P1M",
          unitText: isSpanish ? "mes" : "month",
        },
      },
    ],
    // aggregateRating will be added when real reviews are available
  };
}

/**
 * Generates FAQPage schema from translation keys
 * Async function that uses getTranslations() from next-intl/server
 */
export async function generateFAQPageSchema(
  locale: string
): Promise<SchemaOrg> {
  const t = await getTranslations({ locale, namespace: "faq" });

  // FAQ categories to extract
  const categories = ["compliance", "scope", "pricing", "privacy", "operations"] as const;

  // Build question/answer pairs from all categories
  const mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }> = [];

  for (const category of categories) {
    // Each category has numbered questions (q1, q2, q3, etc.)
    // We need to iterate through them dynamically
    const questionKeys = getQuestionKeysForCategory(category);

    for (const qKey of questionKeys) {
      try {
        const question = t(`categories.${category}.questions.${qKey}.question`);
        const answer = t(`categories.${category}.questions.${qKey}.answer`);

        if (question && answer) {
          mainEntity.push({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          });
        }
      } catch {
        // Question key doesn't exist, skip
        break;
      }
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
  };
}

/**
 * Helper function to get question keys for each FAQ category
 * Returns array of question key identifiers (q1, q2, q3, etc.)
 */
function getQuestionKeysForCategory(
  category: "compliance" | "scope" | "pricing" | "privacy" | "operations"
): string[] {
  // Based on the translation files structure
  const questionCounts: Record<typeof category, number> = {
    compliance: 7,
    scope: 6,
    pricing: 3,
    privacy: 3,
    operations: 3,
  };

  const count = questionCounts[category];
  return Array.from({ length: count }, (_, i) => `q${i + 1}`);
}

/**
 * Generates WebPage schema for individual pages
 * Utility function for per-page structured data
 */
export function generateWebPageSchema({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): SchemaOrg {
  const url = `${BASE_URL}/${locale}${path}`;
  const isSpanish = locale === "es";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: isSpanish ? "es" : "en",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": SOFTWARE_ID,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: generateBreadcrumbItems(locale, path, title),
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

/**
 * Helper function to generate breadcrumb items for a page
 */
function generateBreadcrumbItems(
  locale: string,
  path: string,
  pageTitle: string
): Array<{
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}> {
  const isSpanish = locale === "es";
  const items: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: isSpanish ? "Inicio" : "Home",
      item: `${BASE_URL}/${locale}`,
    },
  ];

  // Parse path segments and add breadcrumb items
  const segments = path.split("/").filter(Boolean);
  let currentPath = `${BASE_URL}/${locale}`;

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: isLast ? pageTitle : formatSegmentName(segment, isSpanish),
      item: currentPath,
    });
  });

  return items;
}

/**
 * Helper function to format URL segments into human-readable names
 */
function formatSegmentName(segment: string, isSpanish: boolean): string {
  const segmentNames: Record<string, { en: string; es: string }> = {
    blog: { en: "Blog", es: "Blog" },
    pricing: { en: "Pricing", es: "Precios" },
    faq: { en: "FAQ", es: "Preguntas Frecuentes" },
    about: { en: "About", es: "Sobre Nosotros" },
    contact: { en: "Contact", es: "Contacto" },
    freelancers: { en: "For Freelancers", es: "Para Autónomos" },
    gestorias: { en: "For Accountants", es: "Para Gestorías" },
    privacy: { en: "Privacy Policy", es: "Política de Privacidad" },
    terms: { en: "Terms", es: "Términos" },
    cookies: { en: "Cookie Policy", es: "Política de Cookies" },
    "legal-notice": { en: "Legal Notice", es: "Aviso Legal" },
    guias: { en: "Guides", es: "Guías" },
    analisis: { en: "Analysis", es: "Análisis" },
    comparaciones: { en: "Comparisons", es: "Comparaciones" },
    consejos: { en: "Tips", es: "Consejos" },
    formacion: { en: "Training", es: "Formación" },
    "casos-de-exito": { en: "Success Stories", es: "Casos de Éxito" },
    invoo: { en: "Invoo", es: "Invoo" },
  };

  const names = segmentNames[segment];
  if (names) {
    return isSpanish ? names.es : names.en;
  }

  // Default: capitalize first letter and replace hyphens with spaces
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generates a combined schema graph for the homepage
 * Includes Organization, WebSite, and SoftwareApplication schemas
 */
export function generateHomePageSchemaGraph(locale: string): {
  "@context": "https://schema.org";
  "@graph": unknown[];
} {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...generateOrganizationSchema(), "@context": undefined },
      { ...generateWebSiteSchema(), "@context": undefined },
      { ...generateSoftwareApplicationSchema(locale), "@context": undefined },
    ],
  };
}

/**
 * Generates BreadcrumbList schema standalone
 * Useful for pages that need breadcrumbs without full WebPage schema
 */
export function generateBreadcrumbListSchema(
  locale: string,
  path: string,
  pageTitle: string
): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: generateBreadcrumbItems(locale, path, pageTitle),
  };
}

/**
 * Generates Article schema for blog posts
 * Optimized for LLM discoverability with rich metadata
 */
export function generateArticleSchema({
  title,
  excerpt,
  publishedAt,
  updatedAt,
  author,
  coverImage,
  tags,
  category,
  slug,
  readingTime,
}: {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  category: string;
  slug: string;
  readingTime?: number;
}): SchemaOrg {
  const url = `${BASE_URL}/es/blog/${category}/${slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description: excerpt,
    image: coverImage ? `${BASE_URL}${coverImage}` : `${BASE_URL}/Logo.png`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author,
      url: `${BASE_URL}/es/about/`,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "es",
    keywords: tags?.join(", "),
    articleSection: category,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    wordCount: readingTime ? readingTime * 200 : undefined, // Approximate words based on reading time
    about: {
      "@type": "Thing",
      name: "Facturación electrónica en España",
      description: "Software y normativas de facturación para autónomos y pymes españolas",
    },
  };
}
