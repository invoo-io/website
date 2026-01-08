'use client';

import { cn } from '@/lib/utils';
import { useId, useCallback } from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface CalculatorRadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
  name?: string;
}

/**
 * CalculatorRadioGroup - Styled radio button group for calculators
 * Fully accessible with proper ARIA attributes and keyboard navigation
 */
export function CalculatorRadioGroup({
  label,
  value,
  onChange,
  options,
  className,
  name,
}: CalculatorRadioGroupProps) {
  const groupId = useId();
  const labelId = useId();
  const groupName = name || groupId;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, currentIndex: number) => {
      let newIndex: number | null = null;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (currentIndex + 1) % options.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = (currentIndex - 1 + options.length) % options.length;
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          onChange(options[currentIndex].value);
          return;
      }

      if (newIndex !== null) {
        onChange(options[newIndex].value);
        // Focus the new radio button
        const radioElement = document.getElementById(`${groupId}-${options[newIndex].value}`);
        radioElement?.focus();
      }
    },
    [options, onChange, groupId]
  );

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <span id={labelId} className="text-callout-emphasized text-primary">
        {label}
      </span>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="flex flex-col gap-2"
      >
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const optionId = `${groupId}-${option.value}`;

          return (
            <div
              key={option.value}
              id={optionId}
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-xl cursor-pointer',
                'border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent-blue-main focus:ring-offset-2',
                isSelected
                  ? 'border-accent-blue-main bg-accent-blue-main/5'
                  : 'border-strokes-primary bg-background-primary hover:border-strokes-secondary'
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  'transition-all duration-200',
                  isSelected
                    ? 'border-accent-blue-main'
                    : 'border-strokes-secondary'
                )}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-blue-main" />
                )}
              </div>

              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="flex flex-col">
                <span className="text-callout text-primary">{option.label}</span>
                {option.description && (
                  <span className="text-footnote text-secondary">{option.description}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
