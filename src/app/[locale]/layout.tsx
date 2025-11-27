import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { locales } from "@/i18n";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BASE_URL } from "@/lib/constants";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s | Invoo`,
    },
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        es: `${BASE_URL}/es`,
        "x-default": `${BASE_URL}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `${BASE_URL}/${locale}`,
      siteName: "Invoo",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <NextIntlClientProvider messages={messages}>
            {children}
            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
