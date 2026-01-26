'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useId } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface CalculatorSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  helperText?: string;
  className?: string;
}

/**
 * CalculatorSelect - Styled select dropdown for calculators
 */
export function CalculatorSelect({
  label,
  value,
  onChange,
  options,
  helperText,
  className,
}: CalculatorSelectProps) {
  const id = useId();

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className="text-callout-emphasized text-primary"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full h-14 rounded-xl appearance-none',
            'bg-background-primary',
            'border border-strokes-primary',
            'text-body text-primary',
            'pl-4 pr-10',
            'focus:outline-none focus:ring-2 focus:ring-accent-blue-main focus:border-transparent',
            'transition-all duration-200',
            'cursor-pointer'
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none"
        />
      </div>

      {helperText && (
        <p className="text-footnote text-secondary">{helperText}</p>
      )}
    </div>
  );
}
