'use client';

import { cn } from '@/lib/utils';

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
      <h2 className="text-title1-emphasized text-primary mb-4">
        {title}
      </h2>
      <p className="text-body text-secondary mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-6 rounded-2xl bg-background-secondary border border-strokes-primary"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-blue-main flex items-center justify-center">
                <span className="text-callout-emphasized text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-headline text-primary">
                {step.title}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {step.description}
            </p>
          </div>
        ))}
      </div>
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
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * CalculatorInfoGrid - Grid of information cards
 */
export function CalculatorInfoGrid({
  title,
  description,
  items,
  columns = 3,
  className,
}: CalculatorInfoGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('w-full', className)}>
      <h2 className="text-title1-emphasized text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-body text-secondary mb-8">
          {description}
        </p>
      )}

      <div className={cn('grid grid-cols-1 gap-4', gridCols[columns])}>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-5 rounded-xl bg-background-secondary border border-strokes-primary"
          >
            <h3 className="text-callout-emphasized text-primary">
              {item.title}
            </h3>
            <p className="text-footnote text-secondary">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

interface CalculatorWhyUseProps {
  title: string;
  benefits: string[];
  className?: string;
}

/**
 * CalculatorWhyUse - Benefits/reasons to use the calculator
 */
export function CalculatorWhyUse({
  title,
  benefits,
  className,
}: CalculatorWhyUseProps) {
  return (
    <section className={cn('w-full', className)}>
      <h2 className="text-title1-emphasized text-primary mb-6">
        {title}
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-background-secondary border border-strokes-primary"
          >
            <div className="w-6 h-6 rounded-full bg-accent-green-main/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-4 h-4 text-accent-green-main"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-body text-primary">{benefit}</span>
          </li>
        ))}
      </ul>
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
      <h2 className="text-title1-emphasized text-primary mb-4">
        {title}
      </h2>
      <p className="text-body text-secondary mb-8">
        {description}
      </p>

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
        <h2 className="text-title2-emphasized text-primary mb-3">
          {title}
        </h2>
        <p className="text-body text-secondary mb-6">
          {description}
        </p>

        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-blue-main/20 flex items-center justify-center flex-shrink-0 text-caption1-emphasized text-accent-blue-main">
                {index + 1}
              </span>
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
      <h2 className="text-title1-emphasized text-primary mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calculators.map((calc) => (
          <a
            key={calc.href}
            href={calc.href}
            className="group flex flex-col gap-3 p-6 rounded-2xl bg-background-secondary border border-strokes-primary hover:border-accent-blue-main/50 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-blue-main/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-accent-blue-main"
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
              </div>
              <h3 className="text-headline text-primary group-hover:text-accent-blue-main transition-colors">
                {calc.name}
              </h3>
            </div>
            <p className="text-footnote text-secondary flex-1">
              {calc.description}
            </p>
            <div className="flex items-center gap-1.5 text-callout text-accent-blue-main pt-2">
              <span>{ctaText}</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
