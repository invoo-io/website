'use client';

import { cn } from '@/lib/utils';
import { ContentCardGrid, NumberIndicator } from '@/components/ui/ContentCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface HowToStep {
  title: string;
  description: string;
}

interface CalculatorHowToProps {
  title: string;
  description: string;
  steps: HowToStep[];
  className?: string;
}

/**
 * CalculatorHowTo - How to use section for calculator pages
 */
export function CalculatorHowTo({
  title,
  description,
  steps,
  className,
}: CalculatorHowToProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        description={description}
        marginBottom="lg"
      />

      <ContentCardGrid items={steps} columns={3} autoNumber />
    </section>
  );
}

interface InfoItem {
  title: string;
  description: string;
}

interface CalculatorInfoGridProps {
  title: string;
  description?: string;
  items: InfoItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * CalculatorInfoGrid - Grid of information cards (max 3 columns for readability)
 */
export function CalculatorInfoGrid({
  title,
  description,
  items,
  columns = 3,
  className,
}: CalculatorInfoGridProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        description={description}
        marginBottom="lg"
      />

      <ContentCardGrid items={items} columns={columns} />
    </section>
  );
}

/**
 * CalculatorInfoAccordion - Accordion-based info section for key concepts
 * Reuses the same accordion styling as FAQ sections
 */
export function CalculatorInfoAccordion({
  title,
  description,
  items,
  className,
}: CalculatorInfoGridProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        description={description}
        marginBottom="lg"
      />

      <Accordion type="single" collapsible className="w-full space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`info-${index}`}
            className="border-0 rounded-2xl overflow-hidden bg-background-secondary hover:bg-background-tertiary data-[state=open]:bg-background-tertiary transition-colors"
          >
            <AccordionTrigger className="text-headline text-primary hover:no-underline text-left px-6 py-5">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-body text-secondary px-6 pb-5 pt-0">
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

interface CalculatorWhyUseProps {
  title: string;
  benefits: string[];
  columns?: 1 | 2;
  className?: string;
}

/**
 * CalculatorWhyUse - Benefits/reasons to use the calculator
 */
export function CalculatorWhyUse({
  title,
  benefits,
  columns = 1,
  className,
}: CalculatorWhyUseProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        marginBottom="md"
      />

      <ContentCardGrid
        items={benefits.map(benefit => ({
          indicator: 'checkmark' as const,
          title: benefit,
          layout: 'horizontal' as const,
        }))}
        columns={columns}
      />
    </section>
  );
}

interface RelatedCalculator {
  name: string;
  description: string;
  href: string;
}

interface CalculatorRelatedToolsProps {
  title: string;
  calculators: RelatedCalculator[];
  ctaText?: string;
  className?: string;
}

interface BenchmarkSector {
  name: string;
  junior: string;
  mid: string;
  senior: string;
  note: string;
}

interface CalculatorBenchmarksProps {
  title: string;
  description: string;
  sectors: BenchmarkSector[];
  footnote?: string;
  className?: string;
}

/**
 * CalculatorBenchmarks - Sector benchmarks table for hourly rate calculator
 */
export function CalculatorBenchmarks({
  title,
  description,
  sectors,
  footnote,
  className,
}: CalculatorBenchmarksProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        description={description}
        marginBottom="lg"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-strokes-primary">
              <th className="text-left py-3 px-4 text-callout-emphasized text-primary">Sector</th>
              <th className="text-left py-3 px-4 text-callout-emphasized text-primary">Junior</th>
              <th className="text-left py-3 px-4 text-callout-emphasized text-primary">Mid</th>
              <th className="text-left py-3 px-4 text-callout-emphasized text-primary">Senior</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector, index) => (
              <tr
                key={index}
                className="border-b border-strokes-primary hover:bg-background-secondary/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="text-body-emphasized text-primary">{sector.name}</div>
                  <div className="text-caption1 text-tertiary mt-1">{sector.note}</div>
                </td>
                <td className="py-4 px-4 text-body text-secondary">{sector.junior}</td>
                <td className="py-4 px-4 text-body text-secondary">{sector.mid}</td>
                <td className="py-4 px-4 text-body-emphasized text-accent-blue-main">{sector.senior}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && (
        <p className="text-caption1 text-tertiary mt-4 italic">
          {footnote}
        </p>
      )}
    </section>
  );
}

interface CalculatorMethodologyProps {
  title: string;
  description: string;
  steps: string[];
  sources?: string;
  className?: string;
}

/**
 * CalculatorMethodology - Methodology explanation section
 */
export function CalculatorMethodology({
  title,
  description,
  steps,
  sources,
  className,
}: CalculatorMethodologyProps) {
  return (
    <section className={cn('w-full', className)}>
      <div className="p-6 rounded-2xl bg-background-secondary border border-strokes-primary">
        <SectionHeader
          size="card"
          title={title}
          description={description}
          marginBottom="md"
        />

        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <NumberIndicator number={index + 1} size="sm" variant="outline" />
              <span className="text-footnote text-secondary">{step}</span>
            </li>
          ))}
        </ol>

        {sources && (
          <p className="text-caption2 text-tertiary mt-6 pt-4 border-t border-strokes-primary">
            {sources}
          </p>
        )}
      </div>
    </section>
  );
}

/**
 * CalculatorRelatedTools - Related calculators section for internal linking
 */
export function CalculatorRelatedTools({
  title,
  calculators,
  ctaText = 'Usar calculadora',
  className,
}: CalculatorRelatedToolsProps) {
  return (
    <section className={cn('w-full', className)}>
      <SectionHeader
        size="subsection"
        title={title}
        marginBottom="md"
      />

      <ContentCardGrid
        items={calculators.map(calc => ({
          indicator: 'icon' as const,
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          ),
          title: calc.name,
          description: calc.description,
          href: calc.href,
          ctaText,
        }))}
        columns={3}
      />
    </section>
  );
}
