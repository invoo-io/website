'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorResult } from './CalculatorResult';
import {
  calculateModelo303,
  Modelo303Periodo,
} from '@/lib/calculators/modelo-303';
import {
  parseLocalizedAmount,
  validateAmount,
  filterAmountInput,
  formatNumber,
} from '@/lib/calculators/constants';

/**
 * Modelo303Calculator - VAT quarterly self-assessment calculator
 *
 * Calculates the Modelo 303 result based on:
 * - IVA repercutido (VAT collected from sales)
 * - IVA soportado (VAT paid on expenses)
 * - Previous period compensation
 */
export function Modelo303Calculator() {
  const t = useTranslations('calculators.modelo303');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State for IVA Repercutido (collected)
  const [ventasGeneral, setVentasGeneral] = useState<string>('');
  const [ventasReducido, setVentasReducido] = useState<string>('');
  const [ventasSuperreducido, setVentasSuperreducido] = useState<string>('');

  // State for IVA Soportado (paid)
  const [gastosGeneral, setGastosGeneral] = useState<string>('');
  const [gastosReducido, setGastosReducido] = useState<string>('');
  const [gastosSuperreducido, setGastosSuperreducido] = useState<string>('');

  // State for bienes de inversión (investment goods)
  const [inversionGeneral, setInversionGeneral] = useState<string>('');

  // State for compensation
  const [compensacion, setCompensacion] = useState<string>('');

  // State for period selection
  const [periodo, setPeriodo] = useState<string>('1T');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts
  const numericVentasGeneral = useMemo(() => parseLocalizedAmount(ventasGeneral, locale), [ventasGeneral, locale]);
  const numericVentasReducido = useMemo(() => parseLocalizedAmount(ventasReducido, locale), [ventasReducido, locale]);
  const numericVentasSuperreducido = useMemo(() => parseLocalizedAmount(ventasSuperreducido, locale), [ventasSuperreducido, locale]);
  const numericGastosGeneral = useMemo(() => parseLocalizedAmount(gastosGeneral, locale), [gastosGeneral, locale]);
  const numericGastosReducido = useMemo(() => parseLocalizedAmount(gastosReducido, locale), [gastosReducido, locale]);
  const numericGastosSuperreducido = useMemo(() => parseLocalizedAmount(gastosSuperreducido, locale), [gastosSuperreducido, locale]);
  const numericInversionGeneral = useMemo(() => parseLocalizedAmount(inversionGeneral, locale), [inversionGeneral, locale]);
  const numericCompensacion = useMemo(() => parseLocalizedAmount(compensacion, locale), [compensacion, locale]);

  // Validate inputs
  const validateInput = useCallback((value: string, numericValue: number) => {
    const errorKey = validateAmount(value, numericValue);
    return errorKey ? t(errorKey) : undefined;
  }, [t]);

  // Check if any input has a value
  const hasInput = useMemo(() => {
    return Boolean(
      ventasGeneral.trim() ||
      ventasReducido.trim() ||
      ventasSuperreducido.trim() ||
      gastosGeneral.trim() ||
      gastosReducido.trim() ||
      gastosSuperreducido.trim() ||
      inversionGeneral.trim() ||
      compensacion.trim()
    );
  }, [
    ventasGeneral, ventasReducido, ventasSuperreducido,
    gastosGeneral, gastosReducido, gastosSuperreducido,
    inversionGeneral, compensacion
  ]);

  // Check for any errors
  const hasErrors = useMemo(() => {
    const inputs = [
      { value: ventasGeneral, numeric: numericVentasGeneral },
      { value: ventasReducido, numeric: numericVentasReducido },
      { value: ventasSuperreducido, numeric: numericVentasSuperreducido },
      { value: gastosGeneral, numeric: numericGastosGeneral },
      { value: gastosReducido, numeric: numericGastosReducido },
      { value: gastosSuperreducido, numeric: numericGastosSuperreducido },
      { value: inversionGeneral, numeric: numericInversionGeneral },
      { value: compensacion, numeric: numericCompensacion },
    ];

    return inputs.some(({ value, numeric }) => {
      if (!value.trim()) return false;
      return validateAmount(value, numeric) !== null;
    });
  }, [
    ventasGeneral, numericVentasGeneral,
    ventasReducido, numericVentasReducido,
    ventasSuperreducido, numericVentasSuperreducido,
    gastosGeneral, numericGastosGeneral,
    gastosReducido, numericGastosReducido,
    gastosSuperreducido, numericGastosSuperreducido,
    inversionGeneral, numericInversionGeneral,
    compensacion, numericCompensacion,
  ]);

  // Calculate result
  const result = useMemo(() => {
    return calculateModelo303({
      ivaRepercutido: {
        baseGeneral: numericVentasGeneral,
        baseReducido: numericVentasReducido,
        baseSuperreducido: numericVentasSuperreducido,
      },
      ivaSoportado: {
        gastosOperativosGeneral: numericGastosGeneral,
        gastosOperativosReducido: numericGastosReducido,
        gastosOperativosSuperreducido: numericGastosSuperreducido,
        bienesInversionGeneral: numericInversionGeneral,
      },
      compensacionPeriodosAnteriores: numericCompensacion,
      periodo: periodo as Modelo303Periodo,
    });
  }, [
    numericVentasGeneral, numericVentasReducido, numericVentasSuperreducido,
    numericGastosGeneral, numericGastosReducido, numericGastosSuperreducido,
    numericInversionGeneral, numericCompensacion, periodo,
  ]);

  // Period options
  const periodoOptions = [
    { value: '1T', label: t('inputs.periodo.1T') },
    { value: '2T', label: t('inputs.periodo.2T') },
    { value: '3T', label: t('inputs.periodo.3T') },
    { value: '4T', label: t('inputs.periodo.4T') },
  ];

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
        label: t('results.ivaRepercutido'),
        value: result.totalIvaRepercutido,
      },
      {
        label: t('results.ivaSoportado'),
        value: result.totalIvaSoportadoDeducible,
        prefix: '-',
      },
    ];

    if (result.compensacionAplicada > 0) {
      items.push({
        label: t('results.compensacion'),
        value: result.compensacionAplicada,
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
    } else if (result.resultadoTipo === 'compensar') {
      items.push({
        label: t('results.aCompensar'),
        value: result.aCompensar,
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

          {/* IVA Repercutido Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-red-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.ivaRepercutido')}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {t('sections.ivaRepercutidoDesc')}
            </p>

            <CalculatorInput
              label={t('inputs.ventasGeneral')}
              value={ventasGeneral}
              onChange={createHandler(setVentasGeneral)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.ventasGeneralHelper')}
              error={validateInput(ventasGeneral, numericVentasGeneral)}
            />

            <CalculatorInput
              label={t('inputs.ventasReducido')}
              value={ventasReducido}
              onChange={createHandler(setVentasReducido)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.ventasReducidoHelper')}
              error={validateInput(ventasReducido, numericVentasReducido)}
            />

            <CalculatorInput
              label={t('inputs.ventasSuperreducido')}
              value={ventasSuperreducido}
              onChange={createHandler(setVentasSuperreducido)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.ventasSuperreducidoHelper')}
              error={validateInput(ventasSuperreducido, numericVentasSuperreducido)}
            />
          </div>

          {/* IVA Soportado Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-green-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.ivaSoportado')}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {t('sections.ivaSoportadoDesc')}
            </p>

            <CalculatorInput
              label={t('inputs.gastosGeneral')}
              value={gastosGeneral}
              onChange={createHandler(setGastosGeneral)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.gastosGeneralHelper')}
              error={validateInput(gastosGeneral, numericGastosGeneral)}
            />

            <CalculatorInput
              label={t('inputs.gastosReducido')}
              value={gastosReducido}
              onChange={createHandler(setGastosReducido)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.gastosReducidoHelper')}
              error={validateInput(gastosReducido, numericGastosReducido)}
            />

            <CalculatorInput
              label={t('inputs.gastosSuperreducido')}
              value={gastosSuperreducido}
              onChange={createHandler(setGastosSuperreducido)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.gastosSuperreducidoHelper')}
              error={validateInput(gastosSuperreducido, numericGastosSuperreducido)}
            />

            <CalculatorInput
              label={t('inputs.inversionGeneral')}
              value={inversionGeneral}
              onChange={createHandler(setInversionGeneral)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.inversionGeneralHelper')}
              error={validateInput(inversionGeneral, numericInversionGeneral)}
            />
          </div>

          {/* Compensation Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.compensacion')}
              </h3>
            </div>

            <CalculatorInput
              label={t('inputs.compensacion')}
              value={compensacion}
              onChange={createHandler(setCompensacion)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.compensacionHelper')}
              error={validateInput(compensacion, numericCompensacion)}
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
                    {result.ivaRepercutido.general.cuota > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.iva21Collected')}</span>
                        <span>{formatNumber(result.ivaRepercutido.general.cuota, locale)} €</span>
                      </div>
                    )}
                    {result.ivaRepercutido.reducido.cuota > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.iva10Collected')}</span>
                        <span>{formatNumber(result.ivaRepercutido.reducido.cuota, locale)} €</span>
                      </div>
                    )}
                    {result.ivaRepercutido.superreducido.cuota > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.iva4Collected')}</span>
                        <span>{formatNumber(result.ivaRepercutido.superreducido.cuota, locale)} €</span>
                      </div>
                    )}
                    {result.ivaSoportado.gastosOperativos.cuota > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.ivaGastosDeducible')}</span>
                        <span>-{formatNumber(result.ivaSoportado.gastosOperativos.cuota, locale)} €</span>
                      </div>
                    )}
                    {result.ivaSoportado.bienesInversion.cuota > 0 && (
                      <div className="flex justify-between">
                        <span>{t('results.ivaInversionDeducible')}</span>
                        <span>-{formatNumber(result.ivaSoportado.bienesInversion.cuota, locale)} €</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Result indicator */}
                <div className={`mt-4 p-4 rounded-xl ${
                  result.resultadoTipo === 'ingresar'
                    ? 'bg-accent-red-main/10'
                    : result.resultadoTipo === 'compensar'
                    ? 'bg-accent-green-main/10'
                    : 'bg-background-secondary'
                }`}>
                  <p className={`text-callout-emphasized ${
                    result.resultadoTipo === 'ingresar'
                      ? 'text-accent-red-main'
                      : result.resultadoTipo === 'compensar'
                      ? 'text-accent-green-main'
                      : 'text-secondary'
                  }`}>
                    {result.resultadoTipo === 'ingresar' && t('results.aIngresarMessage')}
                    {result.resultadoTipo === 'compensar' && t('results.aCompensarMessage')}
                    {result.resultadoTipo === 'cero' && t('results.ceroMessage')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
