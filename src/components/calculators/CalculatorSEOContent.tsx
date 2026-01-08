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
