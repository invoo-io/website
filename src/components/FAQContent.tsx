"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="flex flex-col items-center justify-center bg-bg-primary" style={{ margin: '40px 0' }}>
      <div className="w-full max-w-3xl px-6 pt-24 pb-24">

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              {categoryIndex > 0 && (
                <h2 className="text-title2-emphasized text-text-primary mt-16 mb-4">
                  {category.category}
                </h2>
              )}
              {category.questions.map((item, index) => (
                <AccordionItem
                  key={`${categoryIndex}-${index}`}
                  value={`item-${categoryIndex}-${index}`}
                  className="border-0 rounded-2xl overflow-hidden bg-bg-secondary data-[state=open]:bg-bg-tertiary transition-colors"
                >
                  <AccordionTrigger className="text-headline text-text-primary hover:no-underline text-left px-6 py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-text-secondary px-6 pb-5 pt-0">
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