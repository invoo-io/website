'use client';

import { cn } from '@/lib/utils';

/**
 * @deprecated This component is deprecated. Use ContentCard from @/components/ui/ContentCard instead.
 * - StepCard → ContentCard with indicator="number" and autoNumber
 * - InfoCard → ContentCard with indicator="none"
 * - StepCardGrid → ContentCardGrid with autoNumber prop
 * - InfoCardGrid → ContentCardGrid
 *
 * See: src/components/ui/ContentCard.tsx
 */

interface StepIndicatorProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  className?: string;
}

/**
 * StepIndicator - Circular numbered indicator for steps
 */
export function StepIndicator({
  number,
  size = 'md',
  variant = 'filled',
  className,
}: StepIndicatorProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 min-w-6 min-h-6 text-caption1-emphasized',
    md: 'w-8 h-8 min-w-8 min-h-8 text-callout-emphasized',
    lg: 'w-10 h-10 min-w-10 min-h-10 text-body-emphasized',
  };

  const variantClasses = {
    filled: 'bg-accent-blue-main text-white',
    outline: 'bg-accent-blue-main/10 text-accent-blue-main',
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {number}
    </div>
  );
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  indicatorSize?: 'sm' | 'md' | 'lg';
  indicatorVariant?: 'filled' | 'outline';
  className?: string;
}

/**
 * StepCard - Card component for displaying numbered steps
 * Used across calculator how-to sections and guides
 */
export function StepCard({
  number,
  title,
  description,
  indicatorSize = 'md',
  indicatorVariant = 'filled',
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-6 rounded-2xl bg-background-secondary border border-strokes-primary',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <StepIndicator
          number={number}
          size={indicatorSize}
          variant={indicatorVariant}
        />
        <h3 className="text-headline text-primary">
          {title}
        </h3>
      </div>
      <p className="text-footnote text-secondary">
        {description}
      </p>
    </div>
  );
}

interface StepCardGridProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
  columns?: 1 | 2 | 3;
  indicatorSize?: 'sm' | 'md' | 'lg';
  indicatorVariant?: 'filled' | 'outline';
  className?: string;
}

/**
 * StepCardGrid - Grid of step cards with automatic numbering
 */
export function StepCardGrid({
  steps,
  columns = 3,
  indicatorSize = 'md',
  indicatorVariant = 'filled',
  className,
}: StepCardGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-6', columnClasses[columns], className)}>
      {steps.map((step, index) => (
        <StepCard
          key={index}
          number={index + 1}
          title={step.title}
          description={step.description}
          indicatorSize={indicatorSize}
          indicatorVariant={indicatorVariant}
        />
      ))}
    </div>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
}

/**
 * InfoCard - Card component for displaying info without a number
 * Used for types, categories, or any non-sequential information
 */
export function InfoCard({
  title,
  description,
  className,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-6 rounded-2xl bg-background-secondary border border-strokes-primary',
        className
      )}
    >
      <h3 className="text-headline text-primary">
        {title}
      </h3>
      <p className="text-footnote text-secondary">
        {description}
      </p>
    </div>
  );
}

interface InfoCardGridProps {
  items: Array<{
    title: string;
    description: string;
  }>;
  columns?: 1 | 2 | 3;
  className?: string;
}

/**
 * InfoCardGrid - Grid of info cards (max 3 columns for readability)
 */
export function InfoCardGrid({
  items,
  columns = 3,
  className,
}: InfoCardGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {items.map((item, index) => (
        <InfoCard
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
