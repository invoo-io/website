import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";

/**
 * Ensures a path has a trailing slash (required for static export)
 * This matches the next.config.ts trailingSlash: true setting
 */
export function ensureTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export function generatePageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  // Ensure all URLs have trailing slashes to match next.config.ts trailingSlash: true
  const normalizedPath = ensureTrailingSlash(path);
  const url = `${BASE_URL}/${locale}${normalizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${normalizedPath}`,
        es: `${BASE_URL}/es${normalizedPath}`,
        "x-default": `${BASE_URL}/es${normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: "@invoo_es",
      creator: "@invoo_es",
      title,
      description,
    },
  };
}
