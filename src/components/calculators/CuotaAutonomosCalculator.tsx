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
import { MAX_CALCULATOR_AMOUNT } from '@/lib/calculators/constants';

// Comunidades Autónomas with 24-month Cuota Cero (others have 12 months)
const CUOTA_CERO_24_MONTHS = ['madrid', 'castilla-la-mancha'] as const;

/**
 * Parse amount string handling both Spanish (1.234,56) and English (1,234.56) formats
 */
function parseLocalizedAmount(value: string, locale: string): number {
  if (!value || !value.trim()) return 0;

  let normalized = value.trim();

  if (locale === 'es') {
    // Spanish: remove thousand separators (.) and convert decimal comma to period
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else {
    // English: remove thousand separators (,) and keep decimal period
    normalized = normalized.replace(/,/g, '');
  }

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validate amount and return error message key if invalid
 */
function validateAmount(value: string, numericValue: number, locale: string): string | null {
  if (!value || !value.trim()) return null; // Empty is valid (shows placeholder)

  // Check if the string has valid characters
  // Both locales allow same chars (digits, dots, commas, spaces) - parsing handles format differences
  // Spanish uses: 1.234,56 (dot=thousand, comma=decimal)
  // English uses: 1,234.56 (comma=thousand, dot=decimal)
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
 */
export function CuotaAutonomosCalculator() {
  const t = useTranslations('calculators.cuotaAutonomos');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State
  const [rendimientoAnual, setRendimientoAnual] = useState<string>('');
  const [year, setYear] = useState<string>('2025');
  const [esPrimeraAlta, setEsPrimeraAlta] = useState<string>('no');
  const [comunidadAutonoma, setComunidadAutonoma] = useState<string>('');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amount for calculation (handles both locale formats)
  const numericRendimiento = useMemo(() => {
    return parseLocalizedAmount(rendimientoAnual, locale);
  }, [rendimientoAnual, locale]);

  // Validate input
  const inputError = useMemo(() => {
    const errorKey = validateAmount(rendimientoAnual, numericRendimiento, locale);
    return errorKey ? t(errorKey) : undefined;
  }, [rendimientoAnual, numericRendimiento, locale, t]);

  // Handle amount change - allow locale-appropriate characters
  const handleAmountChange = useCallback((value: string) => {
    // Allow digits, commas, periods, and spaces (for thousand separators)
    const filtered = value.replace(/[^\d.,\s]/g, '');
    setRendimientoAnual(filtered);
  }, []);

  // Calculate results
  const result = useMemo(() => {
    return calculateCuotaAutonomos(
      numericRendimiento,
      parseInt(year),
      esPrimeraAlta === 'yes',
      comunidadAutonoma || null
    );
  }, [numericRendimiento, year, esPrimeraAlta, comunidadAutonoma]);

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

  // Results for display - separate tramo info from base cotización for clarity
  const resultsData = [
    { label: t('results.rendimientoMensual'), value: result.rendimientoMensual },
    { label: `${t('results.baseCotizacion')} (${t('results.tramo')} ${result.tramo})`, value: result.baseCotizacion },
    { label: t('results.cuotaMensual'), value: result.cuotaMensual },
    { label: t('results.cuotaAnual'), value: result.cuotaAnual },
    ...(result.bonificacion > 0
      ? [
          { label: t('results.bonificacion'), value: result.bonificacion, prefix: '-' as const },
          { label: t('results.cuotaFinal'), value: result.cuotaFinal, isHighlighted: true },
        ]
      : []),
  ];

  return (
    <CalculatorCard className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          <CalculatorInput
            label={t('inputs.rendimientoAnual')}
            value={rendimientoAnual}
            onChange={handleAmountChange}
            type="text"
            placeholder={placeholder}
            suffix="€"
            helperText={t('inputs.rendimientoAnualHelper')}
            error={inputError}
          />

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
            {!rendimientoAnual.trim() || inputError ? (
              // Empty state placeholder with accessible description
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
              </>
            )}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
