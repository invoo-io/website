import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";

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
  const url = `${BASE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${path}`,
        es: `${BASE_URL}/es${path}`,
        "x-default": `${BASE_URL}/es${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url,
      title,
      description,
    },
  };
}
