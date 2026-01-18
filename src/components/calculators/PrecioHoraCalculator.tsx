'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorResult } from './CalculatorResult';
import { calculatePrecioHora } from '@/lib/calculators/precio-hora';
import {
  parseLocalizedAmount,
  validateAmount,
  filterAmountInput,
} from '@/lib/calculators/constants';

/**
 * PrecioHoraCalculator - Complete hourly rate calculator component
 * Calculates required hourly rate for freelancers to achieve desired net income
 */
export function PrecioHoraCalculator() {
  const t = useTranslations('calculators.precioHora');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State
  const [ingresoNeto, setIngresoNeto] = useState<string>('');
  const [horasSemanales, setHorasSemanales] = useState<string>('40');
  const [semanasVacaciones, setSemanasVacaciones] = useState<string>('4');
  const [porcentajeGastos, setPorcentajeGastos] = useState<string>('20');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts for calculation
  const numericIngresoNeto = useMemo(() => {
    return parseLocalizedAmount(ingresoNeto, locale);
  }, [ingresoNeto, locale]);

  const numericHorasSemanales = useMemo(() => {
    return parseLocalizedAmount(horasSemanales, locale);
  }, [horasSemanales, locale]);

  const numericSemanasVacaciones = useMemo(() => {
    return parseLocalizedAmount(semanasVacaciones, locale);
  }, [semanasVacaciones, locale]);

  const numericPorcentajeGastos = useMemo(() => {
    return parseLocalizedAmount(porcentajeGastos, locale);
  }, [porcentajeGastos, locale]);

  // Validate inputs
  const ingresoNetoError = useMemo(() => {
    const errorKey = validateAmount(ingresoNeto, numericIngresoNeto);
    return errorKey ? t(errorKey) : undefined;
  }, [ingresoNeto, numericIngresoNeto, t]);

  const horasSemanalesError = useMemo(() => {
    if (!horasSemanales.trim()) return undefined;
    if (numericHorasSemanales < 1 || numericHorasSemanales > 80) {
      return t('errors.invalidHours');
    }
    return undefined;
  }, [horasSemanales, numericHorasSemanales, t]);

  // Fixed: max vacation weeks is 51 (must work at least 1 week)
  const semanasVacacionesError = useMemo(() => {
    if (!semanasVacaciones.trim()) return undefined;
    if (numericSemanasVacaciones < 0 || numericSemanasVacaciones > 51) {
      return t('errors.invalidWeeks');
    }
    return undefined;
  }, [semanasVacaciones, numericSemanasVacaciones, t]);

  const porcentajeGastosError = useMemo(() => {
    if (!porcentajeGastos.trim()) return undefined;
    if (numericPorcentajeGastos < 0 || numericPorcentajeGastos > 100) {
      return t('errors.invalidPercentage');
    }
    return undefined;
  }, [porcentajeGastos, numericPorcentajeGastos, t]);

  // Handle input changes
  const handleIngresoNetoChange = useCallback((value: string) => {
    setIngresoNeto(filterAmountInput(value));
  }, []);

  const handleHorasSemanalesChange = useCallback((value: string) => {
    setHorasSemanales(filterAmountInput(value));
  }, []);

  const handleSemanasVacacionesChange = useCallback((value: string) => {
    setSemanasVacaciones(filterAmountInput(value));
  }, []);

  const handlePorcentajeGastosChange = useCallback((value: string) => {
    setPorcentajeGastos(filterAmountInput(value));
  }, []);

  // Calculate results
  const result = useMemo(() => {
    return calculatePrecioHora(
      numericIngresoNeto,
      numericHorasSemanales,
      numericSemanasVacaciones,
      numericPorcentajeGastos
    );
  }, [numericIngresoNeto, numericHorasSemanales, numericSemanasVacaciones, numericPorcentajeGastos]);

  // Check if there are any errors or empty required fields
  const hasErrors =
    ingresoNetoError ||
    horasSemanalesError ||
    semanasVacacionesError ||
    porcentajeGastosError ||
    !ingresoNeto.trim();

  // Memoized main results for display
  const mainResults = useMemo(
    () => [
      {
        label: t('results.precioPorHora'),
        value: result.precioPorHora,
        isHighlighted: true,
        suffix: '/h',
      },
      {
        label: t('results.tarifaDiaria'),
        value: result.tarifaDiaria,
        suffix: '/día',
      },
      {
        label: t('results.ingresoMensualBruto'),
        value: result.ingresoMensualBruto,
        suffix: '/mes',
      },
    ],
    [t, result]
  );

  // Memoized breakdown results
  const breakdownResults = useMemo(
    () => [
      {
        label: t('results.ingresoAnualBruto'),
        value: result.ingresoAnualBruto,
      },
      {
        label: t('results.gastosDeducibles'),
        value: result.gastosDeducibles,
      },
      {
        label: t('results.cuotaAutonomos'),
        value: result.cuotaAutonomosAnual,
      },
      {
        label: t('results.irpfEstimado'),
        value: result.irpfEstimado,
      },
      {
        label: t('results.ingresoNetoFinal'),
        value: result.ingresoNetoDeseado,
        isHighlighted: true,
      },
    ],
    [t, result]
  );

  return (
    <CalculatorCard className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          <CalculatorInput
            label={t('inputs.ingresoNeto')}
            value={ingresoNeto}
            onChange={handleIngresoNetoChange}
            type="text"
            placeholder={placeholder}
            suffix="€"
            helperText={t('inputs.ingresoNetoHelper')}
            error={ingresoNetoError}
          />

          <CalculatorInput
            label={t('inputs.horasSemanales')}
            value={horasSemanales}
            onChange={handleHorasSemanalesChange}
            type="text"
            placeholder="40"
            suffix="h"
            helperText={t('inputs.horasSemanalesHelper')}
            error={horasSemanalesError}
          />

          <CalculatorInput
            label={t('inputs.semanasVacaciones')}
            value={semanasVacaciones}
            onChange={handleSemanasVacacionesChange}
            type="text"
            placeholder="4"
            suffix={t('inputs.weeks')}
            helperText={t('inputs.semanasVacacionesHelper')}
            error={semanasVacacionesError}
          />

          <CalculatorInput
            label={t('inputs.porcentajeGastos')}
            value={porcentajeGastos}
            onChange={handlePorcentajeGastosChange}
            type="text"
            placeholder="20"
            suffix="%"
            helperText={t('inputs.porcentajeGastosHelper')}
            error={porcentajeGastosError}
          />

          {/* Info about billable hours - with accessibility role */}
          {!hasErrors && result.horasFacturablesAnuales > 0 && (
            <div
              className="bg-background-secondary rounded-xl p-4 border border-strokes-primary"
              role="status"
              aria-live="polite"
            >
              <p className="text-caption1 text-secondary">
                {t('inputs.horasFacturablesInfo', {
                  hours: result.horasFacturablesAnuales,
                })}
              </p>
            </div>
          )}
        </div>

        {/* Right side - Results */}
        <div className="flex flex-col gap-6">
          {/* Main Results */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent-purple-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('results.title')}
              </h3>
            </div>

            <div className="flex-1 flex flex-col justify-center bg-background-primary rounded-2xl p-6 border border-strokes-primary min-h-[200px]">
              {hasErrors ? (
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-body text-tertiary">
                    {t('results.placeholder')}
                  </p>
                </div>
              ) : (
                <CalculatorResult results={mainResults} locale={locale} />
              )}
            </div>
          </div>

          {/* Breakdown */}
          {!hasErrors && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
                <h3 className="text-callout-emphasized text-primary">
                  {t('results.breakdownTitle')}
                </h3>
              </div>

              <div className="bg-background-primary rounded-2xl p-6 border border-strokes-primary">
                <CalculatorResult results={breakdownResults} locale={locale} />
              </div>

              {/* Disclaimer about regional tax variations */}
              <p className="text-caption2 text-tertiary mt-4 leading-relaxed">
                {t('results.disclaimer')}
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
}
