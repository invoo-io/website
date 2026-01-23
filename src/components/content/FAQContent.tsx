"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function FAQContent() {
  const t = useTranslations("faq");

  const categoryKeys = ["compliance", "scope", "pricing", "privacy", "operations"];

  const faqData = categoryKeys.map((categoryKey) => {
    const categoryT = t.raw(`categories.${categoryKey}`);
    const questions = Object.keys(categoryT.questions).map((qKey) => ({
      question: categoryT.questions[qKey].question,
      answer: categoryT.questions[qKey].answer,
    }));

    return {
      category: categoryT.title,
      questions,
    };
  });

  return (
    <section className="flex flex-col items-center justify-center bg-background-primary">
      <div className="w-full max-w-3xl px-6 pb-24">

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <SectionHeader
                size="card"
                align="left"
                title={category.category}
                marginBottom="md"
                className="mt-16"
              />
              {category.questions.map((item, index) => (
                <AccordionItem
                  key={`${categoryIndex}-${index}`}
                  value={`item-${categoryIndex}-${index}`}
                  className="border-0 rounded-2xl overflow-hidden bg-background-secondary hover:bg-background-tertiary data-[state=open]:bg-background-tertiary transition-colors"
                >
                  <AccordionTrigger className="text-headline text-primary hover:no-underline text-left px-6 py-5">
                    <h3 className="text-headline text-primary">
                      {item.question}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-secondary px-6 pb-5 pt-0">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}