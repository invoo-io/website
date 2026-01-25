"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

interface FAQSectionProps {
  titleKey: string;
  titleHighlightKey?: string;
  questionsKey: string;
  background?: 'primary' | 'secondary';
}

export default function FAQSection({ titleKey, titleHighlightKey, questionsKey, background = 'secondary' }: FAQSectionProps) {
  const t = useTranslations();

  // Get the FAQ object from translations
  const faqData = t.raw(questionsKey) as Record<string, { question: string; answer: string }>;
  const faqEntries = Object.entries(faqData);

  // Build title with optional gradient highlight
  const title = titleHighlightKey ? (
    <>
      {t(titleKey)} <GradientText>{t(titleHighlightKey)}</GradientText>
    </>
  ) : (
    t(titleKey)
  );

  // Card background follows the rule: secondary on primary, tertiary on secondary
  const cardBg = background === 'primary' ? 'bg-background-secondary' : 'bg-background-tertiary';

  return (
    <section className={`py-[120px] max-md:py-16 px-4 md:px-6 ${background === 'primary' ? 'bg-background-primary' : 'bg-background-secondary'}`}>
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          size="section"
          align="center"
          title={title}
          marginBottom="xl"
        />

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqEntries.map(([key, faq], index) => (
            <AccordionItem
              key={key}
              value={`item-${index}`}
              className={`${cardBg} hover:bg-background-tertiary data-[state=open]:bg-background-tertiary rounded-2xl border-none px-6 transition-colors`}
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-title3-emphasized text-primary pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-body text-secondary pb-6 leading-loose">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
