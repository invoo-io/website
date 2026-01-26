'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorResult } from './CalculatorResult';
import {
  calculateModelo130,
  Modelo130Periodo,
  EXEMPTION_THRESHOLD,
} from '@/lib/calculators/modelo-130';
import {
  parseLocalizedAmount,
  validateAmount,
  filterAmountInput,
  formatNumber,
} from '@/lib/calculators/constants';

/**
 * Modelo130Calculator - IRPF quarterly advance payment calculator
 *
 * Calculates the Modelo 130 result based on:
 * - Accumulated income YTD
 * - Accumulated deductible expenses YTD
 * - Previous quarterly payments
 * - IRPF retentions on invoices
 */
export function Modelo130Calculator() {
  const t = useTranslations('calculators.modelo130');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State for inputs
  const [ingresosAcumulados, setIngresosAcumulados] = useState<string>('');
  const [gastosAcumulados, setGastosAcumulados] = useState<string>('');
  const [pagosAnteriores, setPagosAnteriores] = useState<string>('');
  const [retencionesFacturas, setRetencionesFacturas] = useState<string>('');

  // State for period selection
  const [periodo, setPeriodo] = useState<string>('1T');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts
  const numericIngresos = useMemo(() => parseLocalizedAmount(ingresosAcumulados, locale), [ingresosAcumulados, locale]);
  const numericGastos = useMemo(() => parseLocalizedAmount(gastosAcumulados, locale), [gastosAcumulados, locale]);
  const numericPagos = useMemo(() => parseLocalizedAmount(pagosAnteriores, locale), [pagosAnteriores, locale]);
  const numericRetenciones = useMemo(() => parseLocalizedAmount(retencionesFacturas, locale), [retencionesFacturas, locale]);

  // Validate inputs
  const validateInput = useCallback((value: string, numericValue: number) => {
    const errorKey = validateAmount(value, numericValue);
    return errorKey ? t(errorKey) : undefined;
  }, [t]);

  // Check if any input has a value
  const hasInput = useMemo(() => {
    return Boolean(
      ingresosAcumulados.trim() ||
      gastosAcumulados.trim() ||
      pagosAnteriores.trim() ||
      retencionesFacturas.trim()
    );
  }, [ingresosAcumulados, gastosAcumulados, pagosAnteriores, retencionesFacturas]);

  // Check for any errors
  const hasErrors = useMemo(() => {
    const inputs = [
      { value: ingresosAcumulados, numeric: numericIngresos },
      { value: gastosAcumulados, numeric: numericGastos },
      { value: pagosAnteriores, numeric: numericPagos },
      { value: retencionesFacturas, numeric: numericRetenciones },
    ];

    return inputs.some(({ value, numeric }) => {
      if (!value.trim()) return false;
      return validateAmount(value, numeric) !== null;
    });
  }, [
    ingresosAcumulados, numericIngresos,
    gastosAcumulados, numericGastos,
    pagosAnteriores, numericPagos,
    retencionesFacturas, numericRetenciones,
  ]);

  // Calculate result
  const result = useMemo(() => {
    return calculateModelo130({
      ingresosAcumulados: numericIngresos,
      gastosAcumulados: numericGastos,
      pagosAnteriores: numericPagos,
      retencionesFacturas: numericRetenciones,
      periodo: periodo as Modelo130Periodo,
    });
  }, [numericIngresos, numericGastos, numericPagos, numericRetenciones, periodo]);

  // Period options (memoized to prevent recreation on every render)
  const periodoOptions = useMemo(() => [
    { value: '1T', label: t('inputs.periodo.1T') },
    { value: '2T', label: t('inputs.periodo.2T') },
    { value: '3T', label: t('inputs.periodo.3T') },
    { value: '4T', label: t('inputs.periodo.4T') },
  ], [t]);

  // Create filter handler
  const createHandler = useCallback((setter: (value: string) => void) => {
    return (value: string) => setter(filterAmountInput(value));
  }, []);

  // Results data for display
  const resultsData = useMemo(() => {
    const items: Array<{
      label: string;
      value: number;
      isHighlighted?: boolean;
      prefix?: string;
    }> = [
      {
        label: t('results.rendimientoNeto'),
        value: result.rendimientoNeto,
      },
      {
        label: t('results.cuota20'),
        value: result.cuota20Porciento,
      },
    ];

    if (result.pagosAnteriores > 0) {
      items.push({
        label: t('results.pagosAnteriores'),
        value: result.pagosAnteriores,
        prefix: '-',
      });
    }

    if (result.retencionesFacturas > 0) {
      items.push({
        label: t('results.retenciones'),
        value: result.retencionesFacturas,
        prefix: '-',
      });
    }

    // Final result
    if (result.resultadoTipo === 'ingresar') {
      items.push({
        label: t('results.aIngresar'),
        value: result.aIngresar,
        isHighlighted: true,
      });
    } else if (result.resultadoTipo === 'negativo') {
      items.push({
        label: t('results.aNegativo'),
        value: 0,
        isHighlighted: true,
      });
    } else {
      items.push({
        label: t('results.resultado'),
        value: 0,
        isHighlighted: true,
      });
    }

    return items;
  }, [result, t]);

  return (
    <CalculatorCard className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          {/* Period selector */}
          <CalculatorSelect
            label={t('inputs.periodo.label')}
            value={periodo}
            onChange={setPeriodo}
            options={periodoOptions}
            helperText={t('inputs.periodo.helper')}
          />

          {/* Income Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-green-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.ingresos')}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {t('sections.ingresosDesc')}
            </p>

            <CalculatorInput
              label={t('inputs.ingresosAcumulados')}
              value={ingresosAcumulados}
              onChange={createHandler(setIngresosAcumulados)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.ingresosAcumuladosHelper')}
              error={validateInput(ingresosAcumulados, numericIngresos)}
            />
          </div>

          {/* Expenses Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-red-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.gastos')}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {t('sections.gastosDesc')}
            </p>

            <CalculatorInput
              label={t('inputs.gastosAcumulados')}
              value={gastosAcumulados}
              onChange={createHandler(setGastosAcumulados)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.gastosAcumuladosHelper')}
              error={validateInput(gastosAcumulados, numericGastos)}
            />
          </div>

          {/* Deductions Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.deducciones')}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {t('sections.deduccionesDesc')}
            </p>

            <CalculatorInput
              label={t('inputs.pagosAnteriores')}
              value={pagosAnteriores}
              onChange={createHandler(setPagosAnteriores)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.pagosAnterioresHelper')}
              error={validateInput(pagosAnteriores, numericPagos)}
            />

            <CalculatorInput
              label={t('inputs.retencionesFacturas')}
              value={retencionesFacturas}
              onChange={createHandler(setRetencionesFacturas)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.retencionesFacturasHelper')}
              error={validateInput(retencionesFacturas, numericRetenciones)}
            />
          </div>
        </div>

        {/* Right side - Results */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col bg-background-tertiary rounded-2xl p-6 border border-strokes-primary min-h-[300px]">
            {!hasInput || hasErrors ? (
              // Empty state placeholder
              <div
                className="flex flex-col items-center justify-center text-center py-8 flex-1"
                role="status"
                aria-live="polite"
              >
                <div className="w-12 h-12 rounded-full bg-background-secondary flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-secondary"
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
                <p className="text-body text-secondary">
                  {t('results.placeholder')}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <CalculatorResult
                  results={resultsData}
                  locale={locale}
                />

                {/* Breakdown section */}
                <div className="mt-4 pt-4 border-t border-strokes-primary">
                  <h4 className="text-footnote-emphasized text-secondary mb-3">
                    {t('results.desglose')}
                  </h4>

                  <div className="space-y-2 text-footnote text-secondary">
                    <div className="flex justify-between">
                      <span>{t('results.ingresos')}</span>
                      <span>{formatNumber(result.ingresosAcumulados, locale)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('results.gastosLabel')}</span>
                      <span>-{formatNumber(result.gastosAcumulados, locale)} €</span>
                    </div>
                    <div className="flex justify-between font-medium text-secondary">
                      <span>{t('results.rendimientoNetoLabel')}</span>
                      <span>{formatNumber(result.rendimientoNeto, locale)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('results.cuota20Label')}</span>
                      <span>{formatNumber(result.cuota20Porciento, locale)} €</span>
                    </div>
                    {result.pagosAnteriores > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.pagosAnterioresLabel')}</span>
                        <span>-{formatNumber(result.pagosAnteriores, locale)} €</span>
                      </div>
                    )}
                    {result.retencionesFacturas > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.retencionesLabel')}</span>
                        <span>-{formatNumber(result.retencionesFacturas, locale)} €</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Result indicator */}
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    result.resultadoTipo === 'ingresar'
                      ? 'bg-accent-red-main/10'
                      : result.resultadoTipo === 'negativo'
                      ? 'bg-accent-green-main/10'
                      : 'bg-background-secondary'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <p className={`text-callout-emphasized ${
                    result.resultadoTipo === 'ingresar'
                      ? 'text-accent-red-main'
                      : result.resultadoTipo === 'negativo'
                      ? 'text-accent-green-main'
                      : 'text-secondary'
                  }`}>
                    {result.resultadoTipo === 'ingresar' && t('results.aIngresarMessage')}
                    {result.resultadoTipo === 'negativo' && t('results.aNegativoMessage')}
                    {result.resultadoTipo === 'cero' && t('results.ceroMessage')}
                  </p>
                </div>

                {/* Exemption notice */}
                {result.posibleExencion && hasInput && !hasErrors && (
                  <div className="mt-4 p-4 rounded-xl bg-accent-yellow-main/10 border border-accent-yellow-main/20">
                    <p className="text-footnote text-secondary">
                      <span className="font-medium text-accent-yellow-dark">
                        {t('results.exencionTitle')}
                      </span>
                      {' '}
                      {t('results.exencionMessage', { threshold: EXEMPTION_THRESHOLD, percentage: result.porcentajeConRetencion })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
