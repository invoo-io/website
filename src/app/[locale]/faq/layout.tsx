import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/utils";

export default async function FAQLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMessages = await getMessages();

  // Send faq + core translations
  const faqMessages = pickMessages(allMessages as Record<string, unknown>, [
    'faq',
    'nav',
    'cookieBanner',
    'waitlist',
    'pricingPage',
    'pricing',
  ]);

  return (
    <NextIntlClientProvider messages={faqMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
