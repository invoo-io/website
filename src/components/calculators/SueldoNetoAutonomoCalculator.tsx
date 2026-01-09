'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorRadioGroup } from './CalculatorRadioGroup';
import { CalculatorResult } from './CalculatorResult';
import {
  calculateSueldoNetoAutonomo,
  COMUNIDADES_AUTONOMAS,
} from '@/lib/calculators/sueldo-neto-autonomo';
import {
  formatCurrency,
  parseLocalizedAmount,
  validateAmount,
  filterAmountInput,
} from '@/lib/calculators/constants';

/**
 * Default ages for IRPF personal minimum calculation.
 * These correspond to the age thresholds in Spanish tax law (Ley 35/2006):
 * - Under 65: Standard personal minimum (5,550€)
 * - 65+: Higher personal minimum (6,700€)
 * - 75+: Highest personal minimum (8,100€)
 */
const DEFAULT_AGE_UNDER_65 = 40;
const DEFAULT_AGE_OVER_65 = 65;
const DEFAULT_AGE_OVER_75 = 75;

/**
 * SueldoNetoAutonomoCalculator - Complete net salary calculator for Spanish self-employed
 * Combines Social Security (Cuota de Autónomos) and IRPF calculations
 */
export function SueldoNetoAutonomoCalculator() {
  const t = useTranslations('calculators.sueldoNetoAutonomo');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State - Financial inputs
  const [facturacionAnual, setFacturacionAnual] = useState<string>('');
  const [gastosDeducibles, setGastosDeducibles] = useState<string>('');

  // State - Configuration
  const [year, setYear] = useState<string>('2025');
  const [regimenEstimacion, setRegimenEstimacion] = useState<string>('simplificada');
  const [tipoRetencion, setTipoRetencion] = useState<string>('15');

  // State - Autónomo situation
  const [esPrimeraAlta, setEsPrimeraAlta] = useState<string>('no');
  const [comunidadAutonoma, setComunidadAutonoma] = useState<string>('');

  // State - Personal situation
  const [numDescendientes, setNumDescendientes] = useState<string>('0');
  const [descendientesMenores3, setDescendientesMenores3] = useState<string>('0');
  const [edadContribuyente, setEdadContribuyente] = useState<string>('under65');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts
  const numericFacturacion = useMemo(
    () => parseLocalizedAmount(facturacionAnual, locale),
    [facturacionAnual, locale]
  );
  const numericGastos = useMemo(
    () => parseLocalizedAmount(gastosDeducibles, locale),
    [gastosDeducibles, locale]
  );

  // Validate inputs
  const facturacionError = useMemo(() => {
    const errorKey = validateAmount(facturacionAnual, numericFacturacion);
    return errorKey ? t(errorKey) : undefined;
  }, [facturacionAnual, numericFacturacion, t]);

  const gastosError = useMemo(() => {
    const errorKey = validateAmount(gastosDeducibles, numericGastos);
    return errorKey ? t(errorKey) : undefined;
  }, [gastosDeducibles, numericGastos, t]);

  // Handle amount changes with input sanitization
  const handleAmountChange = useCallback(
    (setter: (value: string) => void) => (value: string) => {
      setter(filterAmountInput(value));
    },
    []
  );

  // Calculate retenciones already paid
  const retencionesYaPagadas = useMemo(() => {
    return numericFacturacion * ((parseInt(tipoRetencion, 10) || 0) / 100);
  }, [numericFacturacion, tipoRetencion]);

  // Map age selection to actual age for IRPF personal minimum calculation
  const edadNumerica = useMemo(() => {
    switch (edadContribuyente) {
      case 'over75':
        return DEFAULT_AGE_OVER_75;
      case 'over65':
        return DEFAULT_AGE_OVER_65;
      default:
        return DEFAULT_AGE_UNDER_65;
    }
  }, [edadContribuyente]);

  // Calculate results
  const result = useMemo(() => {
    const parsedDescendientes = parseInt(numDescendientes, 10) || 0;
    const parsedMenores3 = parseInt(descendientesMenores3, 10) || 0;
    return calculateSueldoNetoAutonomo({
      facturacionAnual: numericFacturacion,
      gastosDeducibles: numericGastos,
      year: parseInt(year, 10) || 2025,
      esPrimeraAlta: esPrimeraAlta === 'yes',
      comunidadAutonoma: comunidadAutonoma || null,
      esEstimacionSimplificada: regimenEstimacion === 'simplificada',
      numDescendientes: parsedDescendientes,
      descendientesMenores3: Math.min(parsedMenores3, parsedDescendientes),
      edadContribuyente: edadNumerica,
      retencionesFacturas: retencionesYaPagadas,
    });
  }, [
    numericFacturacion,
    numericGastos,
    year,
    esPrimeraAlta,
    comunidadAutonoma,
    regimenEstimacion,
    numDescendientes,
    descendientesMenores3,
    edadNumerica,
    retencionesYaPagadas,
  ]);

  // Options
  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
  ];

  const regimenOptions = [
    {
      value: 'simplificada',
      label: t('inputs.regimen.simplificada'),
      description: t('inputs.regimen.simplificadaDesc'),
    },
    {
      value: 'normal',
      label: t('inputs.regimen.normal'),
      description: t('inputs.regimen.normalDesc'),
    },
  ];

  const retencionOptions = [
    { value: '15', label: t('inputs.retencion.standard') },
    { value: '7', label: t('inputs.retencion.nuevo') },
    { value: '0', label: t('inputs.retencion.sin') },
  ];

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

  const ccaaOptions = [
    { value: '', label: t('inputs.ccaa.placeholder') },
    ...COMUNIDADES_AUTONOMAS.map((ccaa) => ({
      value: ccaa.value,
      label: ccaa.label,
    })),
  ];

  const descendientesOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4+' },
  ];

  const menores3Options = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3+' },
  ];

  const edadOptions = [
    {
      value: 'under65',
      label: t('inputs.edad.under65'),
      description: t('inputs.edad.under65Desc'),
    },
    {
      value: 'over65',
      label: t('inputs.edad.over65'),
      description: t('inputs.edad.over65Desc'),
    },
    {
      value: 'over75',
      label: t('inputs.edad.over75'),
      description: t('inputs.edad.over75Desc'),
    },
  ];

  // Check if we have valid input to show results
  const hasValidInput =
    facturacionAnual.trim() && !facturacionError && !gastosError;

  // Results for display - breakdown of expenses
  const breakdownData = [
    { label: t('results.facturacionAnual'), value: result.facturacionAnual },
    {
      label: t('results.gastosDeducibles'),
      value: result.gastosDeducibles,
      prefix: '-' as const,
    },
    {
      label: t('results.cuotaAutonomos'),
      value: result.cuotaAnual,
      prefix: '-' as const,
    },
    {
      label: t('results.irpfTotal'),
      value: result.cuotaIntegra,
      prefix: '-' as const,
    },
    {
      label: t('results.sueldoNetoAnual'),
      value: result.sueldoNetoAnual,
      isHighlighted: true,
    },
  ];

  return (
    <CalculatorCard className="w-full max-w-5xl mx-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label={t('form.ariaLabel')}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          {/* Financial inputs */}
          <div className="space-y-4">
            <h3 className="text-callout-emphasized text-primary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
              {t('sections.ingresos')}
            </h3>

            <CalculatorInput
              label={t('inputs.facturacionAnual')}
              value={facturacionAnual}
              onChange={handleAmountChange(setFacturacionAnual)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.facturacionAnualHelper')}
              error={facturacionError}
            />

            <CalculatorInput
              label={t('inputs.gastosDeducibles')}
              value={gastosDeducibles}
              onChange={handleAmountChange(setGastosDeducibles)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.gastosDeduciblesHelper')}
              error={gastosError}
            />
          </div>

          {/* Autónomo configuration */}
          <div className="space-y-4">
            <h3 className="text-callout-emphasized text-primary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-purple-main" />
              {t('sections.configuracionAutonomo')}
            </h3>

            <CalculatorSelect
              label={t('inputs.year')}
              value={year}
              onChange={setYear}
              options={yearOptions}
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

            <CalculatorRadioGroup
              label={t('inputs.regimen.label')}
              value={regimenEstimacion}
              onChange={setRegimenEstimacion}
              options={regimenOptions}
            />

            <CalculatorSelect
              label={t('inputs.retencion.label')}
              value={tipoRetencion}
              onChange={setTipoRetencion}
              options={retencionOptions}
              helperText={t('inputs.retencion.helper')}
            />
          </div>

          {/* Personal situation */}
          <div className="space-y-4">
            <h3 className="text-callout-emphasized text-primary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-green-main" />
              {t('sections.situacionPersonal')}
            </h3>

            <CalculatorRadioGroup
              label={t('inputs.edad.label')}
              value={edadContribuyente}
              onChange={setEdadContribuyente}
              options={edadOptions}
            />

            <div className="grid grid-cols-2 gap-4">
              <CalculatorSelect
                label={t('inputs.descendientes')}
                value={numDescendientes}
                onChange={setNumDescendientes}
                options={descendientesOptions}
              />

              {(parseInt(numDescendientes, 10) || 0) > 0 && (
                <CalculatorSelect
                  label={t('inputs.menores3')}
                  value={descendientesMenores3}
                  onChange={setDescendientesMenores3}
                  options={menores3Options}
                />
              )}
            </div>
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

          <div
            className="flex-1 flex flex-col justify-center bg-background-primary rounded-2xl p-6 border border-strokes-primary min-h-[300px]"
            aria-live="polite"
            aria-atomic="true"
          >
            {!hasValidInput ? (
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
                <p className="text-body text-tertiary">{t('results.placeholder')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main result - Monthly net salary */}
                <div className="text-center p-6 bg-accent-green-soft/10 border border-accent-green-soft rounded-2xl">
                  <p className="text-footnote text-tertiary mb-2">
                    {t('results.sueldoNetoMensual')}
                  </p>
                  <p className="text-large-title-emphasized text-accent-green-main">
                    {formatCurrency(result.sueldoNetoMensual, locale)}
                  </p>
                </div>

                {/* Breakdown */}
                <CalculatorResult results={breakdownData} locale={locale} />

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background-secondary rounded-lg p-4">
                    <p className="text-footnote text-tertiary mb-1">
                      {t('results.cuotaMensual')}
                    </p>
                    <p className="text-title2-emphasized text-primary">
                      {formatCurrency(result.cuotaMensual, locale)}
                    </p>
                    <p className="text-caption2 text-tertiary mt-1">
                      {t('results.tramo')} {result.cuotaAutonomos.tramo}
                    </p>
                  </div>
                  <div className="bg-background-secondary rounded-lg p-4">
                    <p className="text-footnote text-tertiary mb-1">
                      {t('results.tipoEfectivoIRPF')}
                    </p>
                    <p className="text-title2-emphasized text-primary">
                      {result.tipoEfectivo.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Tax percentage summary */}
                <div className="bg-background-secondary rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-footnote text-tertiary">
                      {t('results.porcentajeImpuestos')}
                    </p>
                    <p className="text-callout-emphasized text-primary">
                      {result.porcentajeImpuestos.toFixed(1)}%
                    </p>
                  </div>
                  <div className="mt-2 h-2 bg-background-primary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-orange-main rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(result.porcentajeImpuestos, 100)}%` }}
                    />
                  </div>
                </div>

                {/* IRPF bracket breakdown */}
                {result.desglosePorTramos.length > 0 && (
                  <details className="group">
                    <summary className="cursor-pointer text-footnote text-secondary hover:text-primary transition-colors">
                      {t('results.verDesgloseIRPF')}
                    </summary>
                    <div className="mt-3 space-y-2">
                      {result.desglosePorTramos.map((tramo) => (
                        <div
                          key={tramo.tramo}
                          className="flex justify-between text-footnote text-tertiary"
                        >
                          <span>
                            {t('results.tramoIRPF')} {tramo.tramo} ({tramo.tipo}%)
                          </span>
                          <span>{formatCurrency(tramo.cuota, locale)}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {/* Cuota Cero or Tarifa Plana notice */}
                {result.cuotaAutonomos.tieneCuotaCero && (
                  <div
                    className="p-3 bg-accent-green-soft/10 border border-accent-green-soft rounded-lg"
                    role="alert"
                  >
                    <p className="text-footnote text-accent-green-main">
                      {t('results.cuotaCeroNotice')}
                    </p>
                  </div>
                )}

                {result.cuotaAutonomos.esPrimeraAlta &&
                  !result.cuotaAutonomos.tieneCuotaCero && (
                    <div
                      className="p-3 bg-accent-blue-soft/10 border border-accent-blue-soft rounded-lg"
                      role="alert"
                    >
                      <p className="text-footnote text-accent-blue-main">
                        {t('results.tarifaPlanaNotice')}
                      </p>
                    </div>
                  )}

                {/* Retenciones notice */}
                {result.cuotaDiferencial < 0 && (
                  <div
                    className="p-3 bg-accent-green-soft/10 border border-accent-green-soft rounded-lg"
                    role="alert"
                  >
                    <p className="text-footnote text-accent-green-main">
                      {t('results.devolucionNotice', {
                        amount: formatCurrency(Math.abs(result.cuotaDiferencial), locale),
                      })}
                    </p>
                  </div>
                )}

                {result.cuotaDiferencial > 0 && (
                  <div
                    className="p-3 bg-accent-orange-soft/10 border border-accent-orange-soft rounded-lg"
                    role="alert"
                  >
                    <p className="text-footnote text-accent-orange-main">
                      {t('results.pagarNotice', {
                        amount: formatCurrency(result.cuotaDiferencial, locale),
                      })}
                    </p>
                  </div>
                )}

                {/* Regional variation disclaimer */}
                <div className="p-3 bg-accent-orange-soft/5 border border-accent-orange-soft/30 rounded-lg">
                  <p className="text-footnote text-secondary">
                    {t('results.regionalDisclaimer')}
                  </p>
                </div>

                {/* Legal disclaimer */}
                <div className="p-3 bg-background-secondary rounded-lg">
                  <p className="text-footnote text-tertiary">
                    {t('results.legalDisclaimer')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </CalculatorCard>
  );
}
