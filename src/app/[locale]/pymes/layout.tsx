import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/utils";

export default async function PymesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMessages = await getMessages();

  // Send pymes + core translations
  const pymesMessages = pickMessages(allMessages as Record<string, unknown>, [
    'pymesPage',
    'nav',
    'cookieBanner',
    'waitlist',
    'pricingPage',
    'pricing',
  ]);

  return (
    <NextIntlClientProvider messages={pymesMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
