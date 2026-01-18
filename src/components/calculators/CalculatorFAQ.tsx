'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorFAQProps {
  title: string;
  items: FAQItem[];
  className?: string;
}

/**
 * CalculatorFAQ - FAQ section for calculator pages
 * Uses accordion UI with proper heading structure
 */
export function CalculatorFAQ({ title, items, className }: CalculatorFAQProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        marginBottom="lg"
      />

      <Accordion type="single" collapsible className="w-full space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border-0 rounded-2xl overflow-hidden bg-background-secondary hover:bg-background-tertiary data-[state=open]:bg-background-tertiary transition-colors"
          >
            <AccordionTrigger className="text-headline text-primary hover:no-underline text-left px-6 py-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-body text-secondary px-6 pb-5 pt-0">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
