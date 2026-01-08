'use client';

import { cn } from '@/lib/utils';

interface CalculatorCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CalculatorCard - Container component for calculator content
 * Provides consistent card styling matching the design system
 */
export function CalculatorCard({ children, className }: CalculatorCardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 md:p-8 lg:p-10',
        'border border-strokes-primary',
        'bg-background-secondary',
        className
      )}
    >
      {children}
    </div>
  );
}
