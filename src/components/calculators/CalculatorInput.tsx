'use client';

import { cn } from '@/lib/utils';
import { useId, useCallback } from 'react';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputClassName?: string;
  'aria-describedby'?: string;
}

/**
 * Sanitize input to prevent XSS attacks
 * Only allows numbers, decimal points, and minus signs for numeric inputs
 */
function sanitizeInput(value: string, type: 'text' | 'number'): string {
  if (type === 'number') {
    // Only allow digits, decimal point, and minus sign
    return value.replace(/[^0-9.-]/g, '');
  }
  // For text, remove potentially dangerous characters
  return value.replace(/[<>'"&]/g, '');
}

/**
 * CalculatorInput - Styled input component for calculators
 * Supports numeric input with optional prefix/suffix
 */
export function CalculatorInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  prefix,
  suffix,
  helperText,
  error,
  min,
  max,
  step,
  className,
  inputClassName,
  'aria-describedby': ariaDescribedBy,
}: CalculatorInputProps) {
  const id = useId();
  const helperId = useId();
  const errorId = useId();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = sanitizeInput(e.target.value, type);
      onChange(sanitizedValue);
    },
    [onChange, type]
  );

  // Build aria-describedby from helper text and error
  const describedByIds = [
    ariaDescribedBy,
    helperText && !error ? helperId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className="text-callout-emphasized text-primary"
      >
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body text-secondary pointer-events-none">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type={type}
          inputMode={type === 'number' ? 'decimal' : undefined}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          aria-invalid={!!error}
          aria-describedby={describedByIds || undefined}
          className={cn(
            'w-full h-14 rounded-xl',
            'bg-background-primary',
            'border border-strokes-primary',
            'text-body text-primary',
            'placeholder:text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-accent-blue-main focus:border-transparent',
            'transition-all duration-200',
            prefix ? 'pl-10' : 'pl-4',
            suffix ? 'pr-10' : 'pr-4',
            error && 'border-accent-red-main focus:ring-accent-red-main',
            inputClassName
          )}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-body text-secondary pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {helperText && !error && (
        <p id={helperId} className="text-footnote text-tertiary">{helperText}</p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-footnote text-accent-red-main">{error}</p>
      )}
    </div>
  );
}
