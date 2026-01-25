import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/utils";

export default async function FreelancersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMessages = await getMessages();

  // Send freelancers + core translations
  const freelancersMessages = pickMessages(allMessages as Record<string, unknown>, [
    'freelancersPage',
    'nav',
    'cookieBanner',
    'waitlist',
    'pricingPage',
    'pricing',
  ]);

  return (
    <NextIntlClientProvider messages={freelancersMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
