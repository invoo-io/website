'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorRadioGroup } from './CalculatorRadioGroup';
import { CalculatorResult } from './CalculatorResult';
import { calculateIRPFAutonomos } from '@/lib/calculators/irpf-autonomos';
import { formatCurrency, parseLocalizedAmount, validateAmount } from '@/lib/calculators/constants';

/**
 * IRPFAutonomosCalculator - Complete IRPF calculator component for Spanish self-employed
 */
export function IRPFAutonomosCalculator() {
  const t = useTranslations('calculators.irpfAutonomos');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State - Financial inputs
  const [ingresosBrutos, setIngresosBrutos] = useState<string>('');
  const [gastosDeducibles, setGastosDeducibles] = useState<string>('');
  const [seguridadSocial, setSeguridadSocial] = useState<string>('');

  // State - Configuration
  const [year, setYear] = useState<string>('2025');
  const [regimenEstimacion, setRegimenEstimacion] = useState<string>('simplificada');
  const [tipoRetencion, setTipoRetencion] = useState<string>('15');

  // State - Personal situation
  const [numDescendientes, setNumDescendientes] = useState<string>('0');
  const [descendientesMenores3, setDescendientesMenores3] = useState<string>('0');
  const [edadContribuyente, setEdadContribuyente] = useState<string>('under65');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts
  const numericIngresos = useMemo(
    () => parseLocalizedAmount(ingresosBrutos, locale),
    [ingresosBrutos, locale]
  );
  const numericGastos = useMemo(
    () => parseLocalizedAmount(gastosDeducibles, locale),
    [gastosDeducibles, locale]
  );
  const numericSS = useMemo(
    () => parseLocalizedAmount(seguridadSocial, locale),
    [seguridadSocial, locale]
  );

  // Validate inputs
  const ingresosError = useMemo(() => {
    const errorKey = validateAmount(ingresosBrutos, numericIngresos);
    return errorKey ? t(errorKey) : undefined;
  }, [ingresosBrutos, numericIngresos, t]);

  const gastosError = useMemo(() => {
    const errorKey = validateAmount(gastosDeducibles, numericGastos);
    return errorKey ? t(errorKey) : undefined;
  }, [gastosDeducibles, numericGastos, t]);

  const ssError = useMemo(() => {
    const errorKey = validateAmount(seguridadSocial, numericSS);
    return errorKey ? t(errorKey) : undefined;
  }, [seguridadSocial, numericSS, t]);

  // Handle amount changes
  const handleAmountChange = useCallback(
    (setter: (value: string) => void) => (value: string) => {
      const filtered = value.replace(/[^\d.,\s]/g, '');
      setter(filtered);
    },
    []
  );

  // Calculate retenciones already paid
  const retencionesYaPagadas = useMemo(() => {
    return numericIngresos * ((parseInt(tipoRetencion, 10) || 0) / 100);
  }, [numericIngresos, tipoRetencion]);

  // Map age selection to actual age
  const edadNumerica = useMemo(() => {
    switch (edadContribuyente) {
      case 'over75':
        return 75;
      case 'over65':
        return 65;
      default:
        return 40;
    }
  }, [edadContribuyente]);

  // Calculate results
  const result = useMemo(() => {
    const parsedDescendientes = parseInt(numDescendientes, 10) || 0;
    const parsedMenores3 = parseInt(descendientesMenores3, 10) || 0;
    return calculateIRPFAutonomos({
      ingresosBrutos: numericIngresos,
      gastosDeducibles: numericGastos,
      seguridadSocial: numericSS,
      esEstimacionSimplificada: regimenEstimacion === 'simplificada',
      numDescendientes: parsedDescendientes,
      descendientesMenores3: Math.min(parsedMenores3, parsedDescendientes),
      edadContribuyente: edadNumerica,
      retencionesFacturas: retencionesYaPagadas,
      year: parseInt(year, 10) || 2025,
    });
  }, [
    numericIngresos,
    numericGastos,
    numericSS,
    regimenEstimacion,
    numDescendientes,
    descendientesMenores3,
    edadNumerica,
    retencionesYaPagadas,
    year,
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
    ingresosBrutos.trim() && !ingresosError && !gastosError && !ssError;

  // Results for display
  const resultsData = [
    { label: t('results.rendimientoNeto'), value: result.rendimientoNeto },
    ...(result.gastosDificilJustificacion > 0
      ? [
          {
            label: t('results.gastosDificilJustificacion'),
            value: result.gastosDificilJustificacion,
            prefix: '-' as const,
          },
        ]
      : []),
    { label: t('results.minimoPersonal'), value: result.minimoPersonal },
    ...(result.minimoDescendientes > 0
      ? [{ label: t('results.minimoDescendientes'), value: result.minimoDescendientes }]
      : []),
    { label: t('results.cuotaIntegra'), value: result.cuotaIntegra },
    { label: t('results.retenciones'), value: result.retencionesYaPagadas, prefix: '-' as const },
    {
      label:
        result.cuotaDiferencial >= 0
          ? t('results.aPagar')
          : t('results.aDevolver'),
      value: Math.abs(result.cuotaDiferencial),
      isHighlighted: true,
    },
  ];

  return (
    <CalculatorCard className="w-full">
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
              label={t('inputs.ingresosBrutos')}
              value={ingresosBrutos}
              onChange={handleAmountChange(setIngresosBrutos)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.ingresosBrutosHelper')}
              error={ingresosError}
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

            <CalculatorInput
              label={t('inputs.seguridadSocial')}
              value={seguridadSocial}
              onChange={handleAmountChange(setSeguridadSocial)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.seguridadSocialHelper')}
              error={ssError}
            />
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h3 className="text-callout-emphasized text-primary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-purple-main" />
              {t('sections.configuracion')}
            </h3>

            <CalculatorSelect
              label={t('inputs.year')}
              value={year}
              onChange={setYear}
              options={yearOptions}
            />

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
          <div
            className="flex-1 flex flex-col justify-center bg-background-tertiary rounded-2xl p-6 border border-strokes-primary min-h-[300px]"
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
                <p className="text-body text-secondary">{t('results.placeholder')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <CalculatorResult results={resultsData} locale={locale} />

                {/* Effective rate and summary */}
                <div className="pt-4 border-t border-strokes-primary">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background-secondary rounded-lg p-4">
                      <p className="text-footnote text-secondary mb-1">
                        {t('results.tipoEfectivo')}
                      </p>
                      <p className="text-title2-emphasized text-primary">
                        {result.tipoEfectivo.toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-background-secondary rounded-lg p-4">
                      <p className="text-footnote text-secondary mb-1">
                        {t('results.netoMensual')}
                      </p>
                      <p className="text-title2-emphasized text-accent-green-main">
                        {formatCurrency(result.netoMensual, locale)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tax brackets breakdown */}
                {result.desglosePorTramos.length > 0 && (
                  <details className="group">
                    <summary className="cursor-pointer text-footnote text-secondary hover:text-primary transition-colors">
                      {t('results.verDesglose')}
                    </summary>
                    <div className="mt-3 space-y-2">
                      {result.desglosePorTramos.map((tramo) => (
                        <div
                          key={tramo.tramo}
                          className="flex justify-between text-footnote text-secondary"
                        >
                          <span>
                            {t('results.tramo')} {tramo.tramo} ({tramo.tipo}%)
                          </span>
                          <span>{formatCurrency(tramo.cuota, locale)}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {/* Info about cuota diferencial */}
                {result.cuotaDiferencial < 0 && (
                  <div
                    className="p-3 bg-accent-green-soft/10 border border-accent-green-soft rounded-lg"
                    role="alert"
                  >
                    <p className="text-footnote text-accent-green-main">
                      {t('results.devolucionNotice')}
                    </p>
                  </div>
                )}

                {result.cuotaDiferencial > 0 && (
                  <div
                    className="p-3 bg-accent-orange-soft/10 border border-accent-orange-soft rounded-lg"
                    role="alert"
                  >
                    <p className="text-footnote text-accent-orange-main">
                      {t('results.pagarNotice')}
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
                  <p className="text-footnote text-secondary">
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
