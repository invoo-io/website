'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorRadioGroup } from './CalculatorRadioGroup';
import {
  compareAutonomoVsEmpresa,
  type ComparisonResult,
} from '@/lib/calculators/autonomo-vs-empresa';
import {
  parseLocalizedAmount,
  validateAmount,
  filterAmountInput,
  formatNumber,
} from '@/lib/calculators/constants';

/**
 * AutonomoVsEmpresaCalculator - Comparison calculator between autónomo and SL
 *
 * Helps Spanish freelancers decide between:
 * - Remaining as autónomo (self-employed)
 * - Creating a Sociedad Limitada (limited company)
 */
export function AutonomoVsEmpresaCalculator() {
  const t = useTranslations('calculators.autonomoVsEmpresa');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State for inputs
  const [facturacion, setFacturacion] = useState<string>('');
  const [gastosNegocio, setGastosNegocio] = useState<string>('20');
  const [sueldoMensual, setSueldoMensual] = useState<string>('');
  const [esPrimeraVez, setEsPrimeraVez] = useState<string>('false');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts
  const numericFacturacion = useMemo(
    () => parseLocalizedAmount(facturacion, locale),
    [facturacion, locale]
  );
  const numericGastos = useMemo(
    () => parseLocalizedAmount(gastosNegocio, locale),
    [gastosNegocio, locale]
  );
  const numericSueldo = useMemo(
    () => parseLocalizedAmount(sueldoMensual, locale),
    [sueldoMensual, locale]
  );

  // Validate inputs
  const validateInput = useCallback(
    (value: string, numericValue: number) => {
      const errorKey = validateAmount(value, numericValue);
      return errorKey ? t(errorKey) : undefined;
    },
    [t]
  );

  // Check if any input has a value
  const hasInput = useMemo(() => {
    return (
      facturacion.trim() !== '' ||
      gastosNegocio.trim() !== '' ||
      sueldoMensual.trim() !== ''
    );
  }, [facturacion, gastosNegocio, sueldoMensual]);

  // Check for any errors
  const hasErrors = useMemo(() => {
    const facturacionError =
      facturacion.trim() && validateAmount(facturacion, numericFacturacion);
    const gastosError =
      gastosNegocio.trim() && validateAmount(gastosNegocio, numericGastos);
    const sueldoError =
      sueldoMensual.trim() && validateAmount(sueldoMensual, numericSueldo);

    return !!facturacionError || !!gastosError || !!sueldoError;
  }, [facturacion, numericFacturacion, gastosNegocio, numericGastos, sueldoMensual, numericSueldo]);

  // Calculate result
  const result: ComparisonResult | null = useMemo(() => {
    if (!hasInput || hasErrors || numericFacturacion === 0 || numericSueldo === 0) {
      return null;
    }

    return compareAutonomoVsEmpresa({
      facturacionAnual: numericFacturacion,
      gastosNegocio: numericGastos,
      sueldoMensualDeseado: numericSueldo,
      esPrimeraVezEmprendedor: esPrimeraVez === 'true',
      comunidadAutonoma: null,
      year: new Date().getFullYear(),
    });
  }, [hasInput, hasErrors, numericFacturacion, numericSueldo, numericGastos, esPrimeraVez]);

  // Expenses options
  const gastosOptions = [
    { value: '10', label: t('inputs.gastosNegocio.options.10') },
    { value: '20', label: t('inputs.gastosNegocio.options.20') },
    { value: '30', label: t('inputs.gastosNegocio.options.30') },
    { value: '40', label: t('inputs.gastosNegocio.options.40') },
    { value: '50', label: t('inputs.gastosNegocio.options.50') },
  ];

  // Primera vez options
  const primeraVezOptions = [
    { value: 'false', label: t('inputs.esPrimeraVez.options.no') },
    { value: 'true', label: t('inputs.esPrimeraVez.options.yes') },
  ];

  // Create filter handler
  const createHandler = useCallback(
    (setter: (value: string) => void) => {
      return (value: string) => setter(filterAmountInput(value));
    },
    []
  );

  return (
    <CalculatorCard className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-8">
        {/* Inputs Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-purple-main" />
            <h3 className="text-callout-emphasized text-primary">
              {t('sections.inputs')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label={t('inputs.facturacion.label')}
              value={facturacion}
              onChange={createHandler(setFacturacion)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.facturacion.helper')}
              error={validateInput(facturacion, numericFacturacion)}
            />

            <CalculatorSelect
              label={t('inputs.gastosNegocio.label')}
              value={gastosNegocio}
              onChange={setGastosNegocio}
              options={gastosOptions}
              helperText={t('inputs.gastosNegocio.helper')}
            />

            <CalculatorInput
              label={t('inputs.sueldoMensual.label')}
              value={sueldoMensual}
              onChange={createHandler(setSueldoMensual)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.sueldoMensual.helper')}
              error={validateInput(sueldoMensual, numericSueldo)}
            />

            <div>
              <CalculatorRadioGroup
                label={t('inputs.esPrimeraVez.label')}
                value={esPrimeraVez}
                onChange={setEsPrimeraVez}
                options={primeraVezOptions}
              />
              <p className="text-footnote text-tertiary mt-2">
                {t('inputs.esPrimeraVez.helper')}
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div
            className="flex flex-col gap-6"
            role="region"
            aria-label={t('results.ariaLabel')}
            aria-live="polite"
          >
            {/* Recommendation Banner */}
            <div
              className={`p-6 rounded-2xl border ${
                result.recomendacion === 'autonomo'
                  ? 'bg-accent-green-main/10 border-accent-green-main/20'
                  : result.recomendacion === 'sociedad'
                    ? 'bg-accent-blue-main/10 border-accent-blue-main/20'
                    : 'bg-accent-orange-main/10 border-accent-orange-main/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    result.recomendacion === 'autonomo'
                      ? 'bg-accent-green-main/20'
                      : result.recomendacion === 'sociedad'
                        ? 'bg-accent-blue-main/20'
                        : 'bg-accent-orange-main/20'
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      result.recomendacion === 'autonomo'
                        ? 'text-accent-green-main'
                        : result.recomendacion === 'sociedad'
                          ? 'text-accent-blue-main'
                          : 'text-accent-orange-main'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-callout-emphasized text-primary mb-2">
                    {t(`results.recommendation.${result.recomendacion}.title`)}
                  </h3>
                  <p className="text-footnote text-secondary">
                    {t(`results.recommendation.${result.recomendacion}.description`)}
                  </p>
                  {result.recomendacion === 'similar' && (
                    <p className="text-footnote text-tertiary mt-2">
                      {t('results.recommendation.similar.context', {
                        diferencia: formatNumber(Math.abs(result.diferencia), locale),
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Autónomo Column */}
              <div className="bg-background-primary rounded-2xl p-6 border border-strokes-primary">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-green-main" />
                  <h4 className="text-callout-emphasized text-primary">
                    {t('results.autonomo.title')}
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.autonomo.facturacion')}</span>
                    <span className="text-primary font-medium">
                      {formatNumber(result.autonomo.facturacion, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.autonomo.gastos')}</span>
                    <span className="text-primary">
                      {formatNumber(result.autonomo.gastos, locale)} €
                    </span>
                  </div>
                  <div className="h-px bg-strokes-primary" />
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.autonomo.cuota')}</span>
                    <span className="text-primary">
                      {formatNumber(result.autonomo.cuotaAnual, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.autonomo.irpf')}</span>
                    <span className="text-primary">
                      {formatNumber(result.autonomo.irpfAnual, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.autonomo.gestion')}</span>
                    <span className="text-primary">
                      {formatNumber(result.autonomo.costeGestion, locale)} €
                    </span>
                  </div>
                  <div className="h-px bg-strokes-primary" />
                  <div className="flex justify-between text-callout-emphasized">
                    <span className="text-accent-green-main">{t('results.autonomo.neto')}</span>
                    <span className="text-accent-green-main">
                      {formatNumber(result.autonomo.sueldoNetoAnual, locale)} €
                    </span>
                  </div>
                </div>
              </div>

              {/* Sociedad Column */}
              <div className="bg-background-primary rounded-2xl p-6 border border-strokes-primary">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
                  <h4 className="text-callout-emphasized text-primary">
                    {t('results.sociedad.title')}
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.facturacion')}</span>
                    <span className="text-primary font-medium">
                      {formatNumber(result.sociedad.facturacion, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.gastos')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.gastos, locale)} €
                    </span>
                  </div>
                  <div className="h-px bg-strokes-primary" />
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.sueldo')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.sueldoBruto, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.ss')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.cuotaSS, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.irpf')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.irpfSueldo, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.is')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.impuestoSociedades, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.gestion')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.costeGestion, locale)} €
                    </span>
                  </div>
                  <div className="h-px bg-strokes-primary" />
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.sueldoNeto')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.sueldoNetoAnual, locale)} €
                    </span>
                  </div>
                  <div className="flex justify-between text-footnote">
                    <span className="text-secondary">{t('results.sociedad.beneficio')}</span>
                    <span className="text-primary">
                      {formatNumber(result.sociedad.beneficioRetenido, locale)} €
                    </span>
                  </div>
                  <div className="h-px bg-strokes-primary" />
                  <div className="flex justify-between text-callout-emphasized">
                    <span className="text-accent-blue-main">{t('results.sociedad.total')}</span>
                    <span className="text-accent-blue-main">
                      {formatNumber(
                        result.sociedad.sueldoNetoAnual + result.sociedad.beneficioRetenido,
                        locale
                      )}{' '}
                      €
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Break-even info */}
            <div className="p-4 rounded-xl bg-background-secondary border border-strokes-primary">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-accent-purple-main flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-footnote-emphasized text-primary mb-1">
                    {t('results.breakEven.title')}
                  </p>
                  <p className="text-footnote text-secondary">
                    {t('results.breakEven.description', {
                      amount: formatNumber(result.breakEvenPoint, locale),
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Razonamientos */}
            {result.razonamientos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-footnote-emphasized text-secondary">
                  {t('results.razonamientos.title')}
                </h4>
                <ul className="space-y-2">
                  {result.razonamientos.map((razon, index) => (
                    <li key={index} className="flex items-start gap-2 text-footnote text-tertiary">
                      <span className="text-accent-purple-main mt-1">•</span>
                      <span>{t(`results.razonamientos.${razon}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-background-secondary/50 border border-strokes-primary/50">
              <p className="text-caption text-tertiary">
                {t('results.disclaimer')}
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result && (
          <div
            className="flex flex-col items-center justify-center text-center py-12 bg-background-primary rounded-2xl border border-strokes-primary"
            role="status"
            aria-live="polite"
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-body text-tertiary">{t('results.placeholder')}</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
