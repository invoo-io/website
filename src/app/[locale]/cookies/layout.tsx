import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/utils";

export default async function CookiesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMessages = await getMessages();

  // Send cookie policy + core translations
  const cookieMessages = pickMessages(allMessages as Record<string, unknown>, [
    'cookiePolicy',
    'nav',
    'cookieBanner',
    'waitlist',
    'pricingPage',
    'pricing',
  ]);

  return (
    <NextIntlClientProvider messages={cookieMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
