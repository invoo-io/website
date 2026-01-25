'use client';

import { Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RelatedContentCard, RelatedContentGrid } from '@/components/ui/RelatedContentCard';

interface RelatedCalculator {
  name: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

interface CalculatorRelatedToolsProps {
  title: string;
  calculators: RelatedCalculator[];
  className?: string;
}

/**
 * CalculatorRelatedTools - Related calculators section for internal linking
 * Uses same styling as RelatedArticles for consistency
 */
export function CalculatorRelatedTools({
  title,
  calculators,
  className,
}: CalculatorRelatedToolsProps) {
  return (
    <RelatedContentGrid title={title} className={className}>
      {calculators.map((calc, index) => (
        <RelatedContentCard
          key={index}
          variant="calculator"
          title={calc.name}
          description={calc.description}
          href={calc.href}
          icon={calc.icon || <Calculator className="w-full h-full" />}
        />
      ))}
    </RelatedContentGrid>
  );
}
