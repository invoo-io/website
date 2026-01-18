"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./ui/SectionHeader";

interface FAQSectionProps {
  titleKey: string;
  questionsKey: string;
}

export default function FAQSection({ titleKey, questionsKey }: FAQSectionProps) {
  const t = useTranslations();

  // Get the FAQ object from translations
  const faqData = t.raw(questionsKey) as Record<string, { question: string; answer: string }>;
  const faqEntries = Object.entries(faqData);

  return (
    <section className="py-[156px] max-md:py-10 px-4 md:px-6 bg-background-secondary">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader
          size="section"
          align="center"
          title={t(titleKey)}
        />

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqEntries.map(([key, faq], index) => (
            <AccordionItem
              key={key}
              value={`item-${index}`}
              className="bg-background-primary hover:bg-background-tertiary data-[state=open]:bg-background-tertiary rounded-2xl border-none px-6 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <h3 className="text-title3-emphasized text-primary pr-4">
                  {faq.question}
                </h3>
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
