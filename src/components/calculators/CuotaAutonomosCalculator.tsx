'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorRadioGroup } from './CalculatorRadioGroup';
import { CalculatorResult } from './CalculatorResult';
import { calculateCuotaAutonomos, COMUNIDADES_AUTONOMAS } from '@/lib/calculators/cuota-autonomos';
import {
  MAX_CALCULATOR_AMOUNT,
  formatCurrency,
  parseLocalizedAmount,
  filterAmountInput
} from '@/lib/calculators/constants';
// Comunidades Autónomas with 24-month Cuota Cero (others have 12 months)
// Note: Only Madrid currently has 24-month program open (January 2026)
const CUOTA_CERO_24_MONTHS = ['madrid'] as const;

/**
 * Validate amount and return error message key if invalid
 */
function validateAmount(value: string, numericValue: number): string | null {
  if (!value || !value.trim()) return null; // Empty is valid (shows placeholder)

  // Check if the string has valid characters
  const validChars = /^[\d.,\s]+$/;

  if (!validChars.test(value)) {
    return 'errors.invalidNumber';
  }

  if (numericValue < 0) {
    return 'errors.negativeNotAllowed';
  }

  if (numericValue > MAX_CALCULATOR_AMOUNT) {
    return 'errors.amountTooLarge';
  }

  return null;
}

/**
 * CuotaAutonomosCalculator - Complete cuota autónomos calculator component
 * Calculates social security quota for Spanish self-employed
 * Uses split input pattern: monthly revenue + monthly expenses
 */
export function CuotaAutonomosCalculator() {
  const t = useTranslations('calculators.cuotaAutonomos');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State - Annual input pattern
  const [ingresosAnuales, setIngresosAnuales] = useState<string>('');
  const [gastosAnuales, setGastosAnuales] = useState<string>('');
  const [year, setYear] = useState<string>('2026');
  const [esPrimeraAlta, setEsPrimeraAlta] = useState<string>('no');
  const [comunidadAutonoma, setComunidadAutonoma] = useState<string>('');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts for calculation
  const numericIngresos = useMemo(() => {
    return parseLocalizedAmount(ingresosAnuales, locale);
  }, [ingresosAnuales, locale]);

  const numericGastos = useMemo(() => {
    return parseLocalizedAmount(gastosAnuales, locale);
  }, [gastosAnuales, locale]);

  // Calculate rendimiento (net income) - already annual
  const rendimientoAnual = useMemo(() => {
    return Math.max(0, numericIngresos - numericGastos);
  }, [numericIngresos, numericGastos]);

  // Validate inputs
  const ingresosError = useMemo(() => {
    const errorKey = validateAmount(ingresosAnuales, numericIngresos);
    return errorKey ? t(errorKey) : undefined;
  }, [ingresosAnuales, numericIngresos, t]);

  const gastosError = useMemo(() => {
    const errorKey = validateAmount(gastosAnuales, numericGastos);
    return errorKey ? t(errorKey) : undefined;
  }, [gastosAnuales, numericGastos, t]);

  const hasError = ingresosError || gastosError;

  // Warning when expenses exceed income
  const expensesExceedIncome = numericGastos > numericIngresos && numericIngresos > 0;

  // Handle amount change - allow locale-appropriate characters
  const handleAmountChange = useCallback((setter: (value: string) => void) => (value: string) => {
    setter(filterAmountInput(value));
  }, []);

  // Calculate results
  const result = useMemo(() => {
    return calculateCuotaAutonomos(
      rendimientoAnual,
      parseInt(year, 10),
      esPrimeraAlta === 'yes',
      comunidadAutonoma || null
    );
  }, [rendimientoAnual, year, esPrimeraAlta, comunidadAutonoma]);

  // Year options
  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
  ];

  // Primera alta options
  const primeraAltaOptions = [
    {
      value: 'no',
      label: t('inputs.primeraAlta.no'),
      description: t('inputs.primeraAlta.noDesc'),
    },
    {
      value: 'yes',
      label: t('inputs.primeraAlta.yes'),
      description: t('inputs.primeraAlta.yesDesc'),
    },
  ];

  // Comunidad Autónoma options
  const ccaaOptions = [
    { value: '', label: t('inputs.ccaa.placeholder') },
    ...COMUNIDADES_AUTONOMAS.map(ccaa => ({
      value: ccaa.value,
      label: ccaa.label,
    })),
  ];

  // Determine Cuota Cero duration for the selected community
  const cuotaCeroDuration = comunidadAutonoma && CUOTA_CERO_24_MONTHS.includes(comunidadAutonoma as typeof CUOTA_CERO_24_MONTHS[number])
    ? 24
    : 12;

  // Calculate annual savings for tarifa plana
  const tarifaPlanaSavings = result.esPrimeraAlta && !result.tieneCuotaCero && result.bonificacion > 0
    ? Math.round(result.bonificacion * 12)
    : 0;

  // Check if we have valid input to show results
  const hasValidInput = ingresosAnuales.trim() && !hasError && numericIngresos > 0;

  // Results for display - annual focus, most important value at the end (highlighted)
  const resultsData = result.esPrimeraAlta
    ? [
        // Primera alta: Build up to annual quota with bonus
        { label: `${t('results.baseCotizacion')} (${t('results.tramo')} ${result.tramo} ${t('results.tramoContext')})`, value: result.baseCotizacion },
        { label: t('results.cuotaAnualDespuesBonificacion'), value: result.cuotaAnual },
        {
          label: result.tieneCuotaCero
            ? t('results.cuotaAnualCuotaCero')
            : t('results.cuotaAnualTarifaPlana'),
          value: result.cuotaFinal * 12,
          isHighlighted: true,
        },
      ]
    : [
        // Ya estoy de alta: Build up to annual quota
        { label: `${t('results.baseCotizacion')} (${t('results.tramo')} ${result.tramo} ${t('results.tramoContext')})`, value: result.baseCotizacion },
        { label: t('results.cuotaAnual'), value: result.cuotaAnual, isHighlighted: true },
      ];

  return (
    <CalculatorCard className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          {/* Annual Revenue */}
          <CalculatorInput
            label={t('inputs.ingresosAnuales')}
            value={ingresosAnuales}
            onChange={handleAmountChange(setIngresosAnuales)}
            type="text"
            placeholder={placeholder}
            suffix="€"
            helperText={t('inputs.ingresosAnualesHelper')}
            error={ingresosError}
          />

          {/* Annual Expenses */}
          <CalculatorInput
            label={t('inputs.gastosAnuales')}
            value={gastosAnuales}
            onChange={handleAmountChange(setGastosAnuales)}
            type="text"
            placeholder={placeholder}
            suffix="€"
            helperText={t('inputs.gastosAnualesHelper')}
            error={gastosError}
          />

          {/* Warning when expenses exceed income */}
          {expensesExceedIncome && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg" role="alert">
              <p className="text-footnote text-amber-600 dark:text-amber-400">
                {t('warnings.expensesExceedIncome')}
              </p>
            </div>
          )}

          <CalculatorSelect
            label={t('inputs.year')}
            value={year}
            onChange={setYear}
            options={yearOptions}
            helperText={t('inputs.yearHelper')}
          />

          <CalculatorRadioGroup
            label={t('inputs.primeraAlta.label')}
            value={esPrimeraAlta}
            onChange={setEsPrimeraAlta}
            options={primeraAltaOptions}
          />

          {esPrimeraAlta === 'yes' && (
            <CalculatorSelect
              label={t('inputs.ccaa.label')}
              value={comunidadAutonoma}
              onChange={setComunidadAutonoma}
              options={ccaaOptions}
              helperText={t('inputs.ccaa.helper')}
            />
          )}
        </div>

        {/* Right side - Results */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
            <h3 className="text-callout-emphasized text-primary">
              {t('results.title')}
            </h3>
          </div>

          <div
            className="flex-1 flex flex-col justify-center bg-background-primary rounded-2xl p-6 border border-strokes-primary min-h-[200px]"
            aria-live="polite"
            aria-atomic="true"
          >
            {!hasValidInput ? (
              // Empty state placeholder
              <div
                className="flex flex-col items-center justify-center text-center py-8"
                role="status"
                aria-label={t('results.placeholder')}
              >
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
              <>
                {/* Net Income Summary - Annual focus */}
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-strokes-secondary">
                  <span className="text-body text-secondary">
                    {t('results.rendimientoAnual')}
                  </span>
                  <span className="text-body-emphasized text-primary">
                    {formatCurrency(rendimientoAnual, locale)}
                  </span>
                </div>

                <CalculatorResult
                  results={resultsData}
                  locale={locale}
                />
                {result.tieneCuotaCero && (
                  <div className="mt-4 p-3 bg-accent-green-soft/10 border border-accent-green-soft rounded-lg" role="alert">
                    <p className="text-footnote text-accent-green-main">
                      {t('results.cuotaCeroNotice', { months: cuotaCeroDuration })}
                    </p>
                  </div>
                )}
                {tarifaPlanaSavings > 0 && !result.tieneCuotaCero && (
                  <div className="mt-4 p-3 bg-accent-blue-soft/10 border border-accent-blue-soft rounded-lg" role="alert">
                    <p className="text-footnote text-accent-blue-main">
                      {t('results.tarifaPlanaNotice', { savings: tarifaPlanaSavings.toLocaleString(locale) })}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-strokes-secondary">
        <p className="text-footnote text-secondary">
          {t('disclaimer')}
        </p>
      </div>
    </CalculatorCard>
  );
}
