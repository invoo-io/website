'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorInput } from './CalculatorInput';
import { CalculatorSelect } from './CalculatorSelect';
import { CalculatorResult } from './CalculatorResult';
import {
  calculateGastosDeducibles,
  GASTO_CATEGORIES,
  CATEGORY_DISPLAY_ORDER,
  GastoInput,
  type GastoCategoryId,
} from '@/lib/calculators/gastos-deducibles';
import {
  parseLocalizedAmount,
  validateAmount,
  filterAmountInput,
  formatNumber,
} from '@/lib/calculators/constants';

/**
 * GastosDeduciblesCalculator - Deductible expenses calculator for autónomos
 *
 * Calculates tax savings from deductible business expenses:
 * - IVA recovery from deductible expenses
 * - IRPF deduction from business expenses
 * - GDJ (5% automatic deduction, max €2000)
 */
export function GastosDeduciblesCalculator() {
  const t = useTranslations('calculators.gastosDeducibles');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // State for expense inputs (category ID → amount)
  const [expenses, setExpenses] = useState<Record<string, string>>({});

  // State for additional parameters
  const [rendimientoNeto, setRendimientoNeto] = useState<string>('');
  const [tipoMarginal, setTipoMarginal] = useState<string>('30');

  // Locale-specific formatting
  const placeholder = locale === 'es' ? '0,00' : '0.00';

  // Parse amounts
  const numericRendimiento = useMemo(
    () => parseLocalizedAmount(rendimientoNeto, locale),
    [rendimientoNeto, locale]
  );
  const numericTipo = useMemo(
    () => parseLocalizedAmount(tipoMarginal, locale),
    [tipoMarginal, locale]
  );

  // Build gastos array from expenses state
  const gastosArray = useMemo<GastoInput[]>(() => {
    return Object.entries(expenses)
      .filter(([_, value]) => value.trim() !== '')
      .map(([categoryId, value]) => ({
        categoryId,
        amount: parseLocalizedAmount(value, locale),
      }))
      .filter(g => g.amount > 0);
  }, [expenses, locale]);

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
      gastosArray.length > 0 ||
      rendimientoNeto.trim() !== '' ||
      tipoMarginal.trim() !== ''
    );
  }, [gastosArray, rendimientoNeto, tipoMarginal]);

  // Check for any errors
  const hasErrors = useMemo(() => {
    // Check expense inputs
    const expenseErrors = Object.entries(expenses).some(([_, value]) => {
      if (!value.trim()) return false;
      const numeric = parseLocalizedAmount(value, locale);
      return validateAmount(value, numeric) !== null;
    });

    // Check parameter inputs
    const rendimientoError =
      rendimientoNeto.trim() &&
      validateAmount(rendimientoNeto, numericRendimiento);
    const tipoError =
      tipoMarginal.trim() && validateAmount(tipoMarginal, numericTipo);

    return expenseErrors || !!rendimientoError || !!tipoError;
  }, [expenses, rendimientoNeto, numericRendimiento, tipoMarginal, numericTipo, locale]);

  // Calculate result
  const result = useMemo(() => {
    return calculateGastosDeducibles(
      gastosArray,
      numericRendimiento,
      numericTipo
    );
  }, [gastosArray, numericRendimiento, numericTipo]);

  // Marginal rate options
  const tipoOptions = [
    { value: '19', label: t('inputs.tipoMarginal.options.19') },
    { value: '24', label: t('inputs.tipoMarginal.options.24') },
    { value: '30', label: t('inputs.tipoMarginal.options.30') },
    { value: '37', label: t('inputs.tipoMarginal.options.37') },
    { value: '45', label: t('inputs.tipoMarginal.options.45') },
  ];

  // Create filter handler
  const createHandler = useCallback(
    (setter: (value: string) => void) => {
      return (value: string) => setter(filterAmountInput(value));
    },
    []
  );

  // Handle expense input change
  const handleExpenseChange = useCallback((categoryId: string, value: string) => {
    setExpenses(prev => ({
      ...prev,
      [categoryId]: filterAmountInput(value),
    }));
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
        label: t('results.totalGastos'),
        value: result.totalGastos,
      },
      {
        label: t('results.ivaRecuperable'),
        value: result.ivaRecuperable,
      },
      {
        label: t('results.gastosDeduciblesIRPF'),
        value: result.gastosDeduciblesIRPF,
      },
      {
        label: t('results.gdj'),
        value: result.gdj,
      },
      {
        label: t('results.ahorroTotal'),
        value: result.ahorroTotal,
        isHighlighted: true,
      },
    ];

    return items;
  }, [result, t]);

  // Main expense categories to display (using typed constant for type safety)
  const mainCategories: GastoCategoryId[] = CATEGORY_DISPLAY_ORDER;

  return (
    <CalculatorCard className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Inputs */}
        <div className="flex flex-col gap-6">
          {/* Parameters Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-purple-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.parameters')}
              </h3>
            </div>

            <CalculatorInput
              label={t('inputs.rendimientoNeto.label')}
              value={rendimientoNeto}
              onChange={createHandler(setRendimientoNeto)}
              type="text"
              placeholder={placeholder}
              suffix="€"
              helperText={t('inputs.rendimientoNeto.helper')}
              error={validateInput(rendimientoNeto, numericRendimiento)}
            />

            <CalculatorSelect
              label={t('inputs.tipoMarginal.label')}
              value={tipoMarginal}
              onChange={setTipoMarginal}
              options={tipoOptions}
              helperText={t('inputs.tipoMarginal.helper')}
            />
          </div>

          {/* Expense Categories Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-green-main" />
              <h3 className="text-callout-emphasized text-primary">
                {t('sections.expenses')}
              </h3>
            </div>
            <p className="text-footnote text-secondary">
              {t('sections.expensesDesc')}
            </p>

            <div
              className="space-y-3 max-h-[600px] overflow-y-auto pr-2"
              role="region"
              aria-label={t('sections.expensesAriaLabel')}
              tabIndex={0}
            >
              {mainCategories.map(categoryId => {
                const category = GASTO_CATEGORIES[categoryId];
                if (!category) return null;

                const value = expenses[categoryId] || '';
                const numericValue = parseLocalizedAmount(value, locale);

                return (
                  <div key={categoryId} className="space-y-1">
                    <CalculatorInput
                      label={t(`categories.${categoryId}.label`)}
                      value={value}
                      onChange={v => handleExpenseChange(categoryId, v)}
                      type="text"
                      placeholder={placeholder}
                      suffix="€"
                      helperText={t(`categories.${categoryId}.helper`, {
                        ivaPercent: Math.round(category.ivaDeducible * 100),
                        irpfPercent: Math.round(category.irpfDeducible * 100),
                      })}
                      error={validateInput(value, numericValue)}
                    />
                  </div>
                );
              })}
            </div>
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
                <CalculatorResult results={resultsData} locale={locale} />

                {/* Breakdown section */}
                {result.desglosePorCategoria.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-strokes-primary">
                    <h4 className="text-footnote-emphasized text-secondary mb-3">
                      {t('results.desglose')}
                    </h4>

                    <div className="space-y-2 text-footnote text-secondary max-h-[200px] overflow-y-auto">
                      {result.desglosePorCategoria
                        .filter(breakdown => breakdown.totalAmount > 0)
                        .map(breakdown => (
                        <div
                          key={breakdown.categoryId}
                          className="flex justify-between items-start gap-2"
                        >
                          <span className="flex-1">
                            {t(`categories.${breakdown.categoryId}.label`)}
                          </span>
                          <div className="text-right">
                            <div className="text-primary">
                              {formatNumber(breakdown.totalAmount, locale)} €
                            </div>
                            <div className="text-secondary text-caption2">
                              IVA: {formatNumber(breakdown.ivaDeducibleAmount, locale)} € •
                              IRPF: {formatNumber(breakdown.irpfDeducibleAmount, locale)} €
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Savings breakdown */}
                <div className="mt-4 p-4 rounded-xl bg-accent-green-main/10">
                  <p className="text-callout-emphasized text-accent-green-main mb-2">
                    {t('results.savingsMessage')}
                  </p>
                  <div className="space-y-1 text-footnote text-secondary">
                    <div className="flex justify-between">
                      <span>{t('results.ahorroIVA')}</span>
                      <span>{formatNumber(result.ahorroIVA, locale)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('results.ahorroIRPF')}</span>
                      <span>{formatNumber(result.ahorroIRPF, locale)} €</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
