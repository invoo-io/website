'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorRadioGroup } from './CalculatorRadioGroup';
import { CalculatorResult, ResultRow } from './CalculatorResult';
import { calculateFacturaByDirection } from '@/lib/calculators/factura';
import { IVA_RATES, formatPercentage, parseLocalizedAmount, validateAmount } from '@/lib/calculators/constants';
import { IRPF_RATES } from '@/lib/calculators/factura';

type CalculationDirection = 'fromBase' | 'fromTotal' | 'fromNeto';

/**
 * FacturaCalculator - Complete Invoice Calculator component
 * Calculates IVA and IRPF for Spanish invoices
 */
export function FacturaCalculator() {
  const t = useTranslations('calculators.factura');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State
  const [amount, setAmount] = useState<string>('');
  const [ivaRate, setIvaRate] = useState<string>('21');
  const [irpfRate, setIrpfRate] = useState<string>('15');
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
    return calculateFacturaByDirection(
      numericAmount,
      parseFloat(ivaRate),
      parseFloat(irpfRate),
      direction
    );
  }, [numericAmount, ivaRate, irpfRate, direction]);

  // IVA rate options
  const ivaRateOptions = [
    { value: String(IVA_RATES.general), label: t('rates.ivaGeneral') },
    { value: String(IVA_RATES.reducido), label: t('rates.ivaReducido') },
    { value: String(IVA_RATES.superreducido), label: t('rates.ivaSuperreducido') },
    { value: String(IVA_RATES.exento), label: t('rates.ivaExento') },
  ];

  // IRPF rate options
  const irpfRateOptions = [
    { value: String(IRPF_RATES.standard), label: t('rates.irpfStandard') },
    { value: String(IRPF_RATES.nuevo), label: t('rates.irpfNuevo') },
    { value: String(IRPF_RATES.sin), label: t('rates.irpfSin') },
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
    {
      value: 'fromNeto',
      label: t('direction.fromNeto'),
      description: t('direction.fromNetoDesc'),
    },
  ];

  // Get the appropriate input label based on direction
  const getInputLabel = () => {
    switch (direction) {
      case 'fromBase':
        return t('inputs.baseAmount');
      case 'fromTotal':
        return t('inputs.totalAmount');
      case 'fromNeto':
        return t('inputs.netoAmount');
    }
  };

  const getInputHelper = () => {
    switch (direction) {
      case 'fromBase':
        return t('inputs.baseAmountHelper');
      case 'fromTotal':
        return t('inputs.totalAmountHelper');
      case 'fromNeto':
        return t('inputs.netoAmountHelper');
    }
  };

  // Build results data based on direction
  const buildResultsData = (): ResultRow[] => {
    const showIrpf = parseFloat(irpfRate) > 0;

    if (direction === 'fromBase') {
      // Show: Base -> +IVA -> Total -> -IRPF -> Neto
      const results: ResultRow[] = [
        { label: t('results.base'), value: result.base },
        { label: `${t('results.iva')} (${formatPercentage(result.ivaRate, locale)})`, value: result.ivaAmount, prefix: '+' },
        { label: t('results.total'), value: result.totalFactura },
      ];

      if (showIrpf) {
        results.push({ label: `${t('results.irpf')} (${formatPercentage(result.irpfRate, locale)})`, value: result.irpfAmount, prefix: '-' });
      }

      results.push({ label: t('results.neto'), value: result.netoACobrar, isHighlighted: true });

      return results;
    } else if (direction === 'fromTotal') {
      // Show: Total -> extract Base and IVA -> -IRPF -> Neto
      const results: ResultRow[] = [
        { label: t('results.total'), value: result.totalFactura },
        { label: `${t('results.iva')} (${formatPercentage(result.ivaRate, locale)})`, value: result.ivaAmount, prefix: '-' },
        { label: t('results.base'), value: result.base },
      ];

      if (showIrpf) {
        results.push({ label: `${t('results.irpf')} (${formatPercentage(result.irpfRate, locale)})`, value: result.irpfAmount, prefix: '-' });
      }

      results.push({ label: t('results.neto'), value: result.netoACobrar, isHighlighted: true });

      return results;
    } else {
      // fromNeto: Show: Neto -> calculate backwards to Base
      const results: ResultRow[] = [
        { label: t('results.neto'), value: result.netoACobrar },
      ];

      if (showIrpf) {
        results.push({ label: `${t('results.irpf')} (${formatPercentage(result.irpfRate, locale)})`, value: result.irpfAmount, prefix: '+' });
      }

      results.push(
        { label: t('results.total'), value: result.totalFactura },
        { label: `${t('results.iva')} (${formatPercentage(result.ivaRate, locale)})`, value: result.ivaAmount, prefix: '-' },
        { label: t('results.base'), value: result.base, isHighlighted: true }
      );

      return results;
    }
  };

  const resultsData = buildResultsData();

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
            label={getInputLabel()}
            value={amount}
            onChange={handleAmountChange}
            type="text"
            placeholder={placeholder}
            suffix="€"
            helperText={getInputHelper()}
            error={inputError}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorSelect
              label={t('inputs.ivaRate')}
              value={ivaRate}
              onChange={setIvaRate}
              options={ivaRateOptions}
              helperText={t('inputs.ivaRateHelper')}
            />

            <CalculatorSelect
              label={t('inputs.irpfRate')}
              value={irpfRate}
              onChange={setIrpfRate}
              options={irpfRateOptions}
              helperText={t('inputs.irpfRateHelper')}
            />
          </div>
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
