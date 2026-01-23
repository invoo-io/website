'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorRadioGroup } from './CalculatorRadioGroup';
import { CalculatorResult } from './CalculatorResult';
import { calculateIVA } from '@/lib/calculators/iva';
import { IVA_RATES, formatPercentage, parseLocalizedAmount, validateAmount } from '@/lib/calculators/constants';

type CalculationDirection = 'fromBase' | 'fromTotal';

/**
 * IVACalculator - Complete IVA calculator component
 * Calculates IVA from base amount or extracts from total
 */
export function IVACalculator() {
  const t = useTranslations('calculators.iva');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State
  const [amount, setAmount] = useState<string>('');
  const [ivaRate, setIvaRate] = useState<string>('21');
  const [direction, setDirection] = useState<CalculationDirection>('fromBase');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amount for calculation (handles both locale formats)
  const numericAmount = useMemo(() => {
    return parseLocalizedAmount(amount, locale);
  }, [amount, locale]);

  // Validate input
  const inputError = useMemo(() => {
    const errorKey = validateAmount(amount, numericAmount);
    return errorKey ? t(errorKey) : undefined;
  }, [amount, numericAmount, t]);

  // Handle amount change - allow locale-appropriate characters
  const handleAmountChange = useCallback((value: string) => {
    // Allow digits, commas, periods, and spaces (for thousand separators)
    const filtered = value.replace(/[^\d.,\s]/g, '');
    setAmount(filtered);
  }, []);

  // Calculate results
  const result = useMemo(() => {
    return calculateIVA(numericAmount, parseFloat(ivaRate), direction);
  }, [numericAmount, ivaRate, direction]);

  // IVA rate options
  const ivaRateOptions = [
    { value: String(IVA_RATES.general), label: `${IVA_RATES.general}% - ${t('rates.general')}` },
    { value: String(IVA_RATES.reducido), label: `${IVA_RATES.reducido}% - ${t('rates.reducido')}` },
    { value: String(IVA_RATES.superreducido), label: `${IVA_RATES.superreducido}% - ${t('rates.superreducido')}` },
    { value: String(IVA_RATES.exento), label: `${IVA_RATES.exento}% - ${t('rates.exento')}` },
  ];

  // Direction options
  const directionOptions = [
    {
      value: 'fromBase',
      label: t('direction.fromBase'),
      description: t('direction.fromBaseDesc'),
    },
    {
      value: 'fromTotal',
      label: t('direction.fromTotal'),
      description: t('direction.fromTotalDesc'),
    },
  ];

  // Results for display
  const resultsData = direction === 'fromBase'
    ? [
        { label: t('results.base'), value: result.base },
        { label: `${t('results.iva')} (${formatPercentage(result.ivaRate, locale)})`, value: result.ivaAmount },
        { label: t('results.total'), value: result.total, isHighlighted: true },
      ]
    : [
        { label: t('results.total'), value: result.total },
        { label: `${t('results.iva')} (${formatPercentage(result.ivaRate, locale)})`, value: result.ivaAmount, prefix: '-' },
        { label: t('results.base'), value: result.base, isHighlighted: true },
      ];

  return (
    <CalculatorCard className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          <CalculatorRadioGroup
            label={t('inputs.direction')}
            value={direction}
            onChange={(value) => setDirection(value as CalculationDirection)}
            options={directionOptions}
          />

          <CalculatorInput
            label={direction === 'fromBase' ? t('inputs.baseAmount') : t('inputs.totalAmount')}
            value={amount}
            onChange={handleAmountChange}
            type="text"
            placeholder={placeholder}
            suffix="€"
            helperText={direction === 'fromBase' ? t('inputs.baseAmountHelper') : t('inputs.totalAmountHelper')}
            error={inputError}
          />

          <CalculatorSelect
            label={t('inputs.ivaRate')}
            value={ivaRate}
            onChange={setIvaRate}
            options={ivaRateOptions}
            helperText={t('inputs.ivaRateHelper')}
          />
        </div>

        {/* Right side - Results */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
            <h3 className="text-callout-emphasized text-primary">
              {t('results.title')}
            </h3>
          </div>

          <div className="flex-1 flex flex-col justify-center bg-background-primary rounded-2xl p-6 border border-strokes-primary min-h-[200px]">
            {!amount.trim() || inputError ? (
              // Empty state placeholder
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 rounded-full bg-background-secondary flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-tertiary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-body text-tertiary">
                  {t('results.placeholder')}
                </p>
              </div>
            ) : (
              <CalculatorResult
                results={resultsData}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
