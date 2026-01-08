'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/calculators/constants';

interface ResultRow {
  label: string;
  value: number;
  isHighlighted?: boolean;
  prefix?: string;
}

interface CalculatorResultProps {
  results: ResultRow[];
  locale?: string;
  className?: string;
}

/**
 * Copy icon component
 */
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/**
 * Check icon component
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * CalculatorResult - Display component for calculation results
 * Shows formatted currency values with optional highlighting
 * Uses aria-live to announce changes to screen readers
 * Includes copy-to-clipboard functionality
 */
export function CalculatorResult({
  results,
  locale = 'es',
  className,
}: CalculatorResultProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = useCallback(async (value: number, index: number) => {
    try {
      // Copy the raw number value for easy pasting into spreadsheets
      const textToCopy = value.toFixed(2);
      await navigator.clipboard.writeText(textToCopy);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const copyLabel = locale === 'es' ? 'Copiar' : 'Copy';
  const copiedLabel = locale === 'es' ? 'Copiado' : 'Copied';

  return (
    <div
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-label={locale === 'es' ? 'Resultados del cálculo' : 'Calculation results'}
      className={cn('flex flex-col', className)}
    >
      {results.map((row, index) => (
        <div
          key={index}
          className={cn(
            'group flex justify-between items-center py-4 gap-2',
            index !== results.length - 1 && 'border-b border-strokes-primary',
            row.isHighlighted && 'pt-6'
          )}
        >
          <span
            className={cn(
              'flex-shrink-0',
              row.isHighlighted
                ? 'text-headline text-primary'
                : 'text-body text-secondary'
            )}
          >
            {row.prefix && <span className="text-tertiary">{row.prefix} </span>}
            {row.label}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'break-all',
                row.isHighlighted
                  ? 'text-title1-emphasized text-primary'
                  : 'text-body-emphasized text-primary'
              )}
            >
              {formatCurrency(row.value, locale)}
            </span>
            <button
              onClick={() => handleCopy(row.value, index)}
              className={cn(
                'flex-shrink-0 p-1.5 rounded-lg transition-all duration-200',
                'opacity-0 group-hover:opacity-100 focus:opacity-100',
                'hover:bg-background-secondary focus:bg-background-secondary',
                'focus:outline-none focus:ring-2 focus:ring-accent-blue-main',
                copiedIndex === index && 'opacity-100 text-accent-green-main'
              )}
              aria-label={`${copiedIndex === index ? copiedLabel : copyLabel} ${row.label}`}
              title={copiedIndex === index ? copiedLabel : copyLabel}
            >
              {copiedIndex === index ? (
                <CheckIcon className="text-accent-green-main" />
              ) : (
                <CopyIcon className="text-tertiary" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SingleResultProps {
  label: string;
  value: number;
  locale?: string;
  className?: string;
}

/**
 * SingleResult - Large display for a single primary result
 * Uses aria-live to announce changes to screen readers
 */
export function SingleResult({
  label,
  value,
  locale = 'es',
  className,
}: SingleResultProps) {
  return (
    <div
      role="region"
      aria-live="polite"
      aria-atomic="true"
      className={cn('flex flex-col items-center text-center gap-2', className)}
    >
      <span className="text-footnote text-secondary uppercase tracking-wider">
        {label}
      </span>
      <span className="text-large-title-emphasized text-primary" style={{ fontSize: '48px' }}>
        {formatCurrency(value, locale)}
      </span>
    </div>
  );
}
