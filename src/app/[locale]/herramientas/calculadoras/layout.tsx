import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/utils";

export default async function CalculadorasLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMessages = await getMessages();

  // Send calculator + core translations (nav, cookieBanner, waitlist for Navigation, CookieBanner, WaitlistDrawer)
  const calculatorMessages = pickMessages(allMessages as Record<string, unknown>, [
    'calculators',
    'nav',
    'cookieBanner',
    'waitlist',
    'pricingPage',
    'pricing',
  ]);

  return (
    <NextIntlClientProvider messages={calculatorMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
