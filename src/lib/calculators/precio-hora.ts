/**
 * Precio Hora (Hourly Rate) Calculator Logic
 * Calculates required hourly rate for Spanish freelancers/autónomos
 * to achieve desired net income after taxes and expenses
 *
 * Based on official Spanish tax regulations:
 * - IRPF: Progressive tax brackets from AEAT
 * - Cuota Autónomos: Real tramos from Seguridad Social
 */

import { calculateCuotaAutonomos, getRateByYear } from './cuota-autonomos';

// ============================================================================
// TYPES
// ============================================================================

export interface PrecioHoraCalculationResult {
  // === Inputs (validated) ===
  /** User's desired annual net salary after all deductions */
  ingresoNetoDeseado: number;
  /** Weekly working hours (1-80) */
  horasSemanales: number;
  /** Vacation weeks per year (0-51) */
  semanasVacaciones: number;
  /** Business expense percentage (0-100) */
  porcentajeGastos: number;

  // === Calculated values ===
  /** Total billable hours per year (horasSemanales × working weeks) */
  horasFacturablesAnuales: number;
  /** Required gross annual billing to achieve net income */
  ingresoBrutoNecesario: number;
  /** Estimated annual cuota de autónomos (Social Security) */
  cuotaAutonomosAnual: number;
  /** Estimated annual IRPF (income tax) after personal deduction */
  irpfEstimado: number;
  /** Deductible business expenses (billing × expense%) */
  gastosDeducibles: number;

  // === Results ===
  /** Recommended hourly rate (before IVA) */
  precioPorHora: number;
  /** Daily rate based on 8-hour workday */
  tarifaDiaria: number;
  /** Monthly gross income (annual ÷ 12) */
  ingresoMensualBruto: number;
  /** Annual gross income (same as ingresoBrutoNecesario) */
  ingresoAnualBruto: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * IRPF 2024-2026 progressive tax brackets for Spain
 * Source: AEAT - Impuesto sobre la Renta de las Personas Físicas
 * These are marginal rates - each bracket taxes only income within that range
 */
export const IRPF_TRAMOS = [
  { min: 0, max: 12450, rate: 0.19 },
  { min: 12450, max: 20200, rate: 0.24 },
  { min: 20200, max: 35200, rate: 0.30 },
  { min: 35200, max: 60000, rate: 0.37 },
  { min: 60000, max: 300000, rate: 0.45 },
  { min: 300000, max: null, rate: 0.47 }, // null means unlimited
] as const;

/**
 * Personal and family minimum allowance (mínimo personal y familiar)
 * This amount is exempt from IRPF taxation
 * Source: AEAT - Art. 57 LIRPF
 */
const MINIMO_PERSONAL = 5550;

/**
 * Maximum iterations for gross income convergence algorithm
 * Higher values increase accuracy but slow down calculation
 */
const MAX_CONVERGENCE_ITERATIONS = 15;

/**
 * Convergence tolerance in euros
 * Algorithm stops when difference is less than this amount
 */
const CONVERGENCE_TOLERANCE_EUR = 1;

/**
 * Adjustment factor for faster convergence
 * Accounts for marginal tax rates when adjusting gross income
 */
const TAX_ADJUSTMENT_FACTOR = 1.4;

/** Maximum safe value for calculations (prevents overflow) */
const MAX_SAFE_AMOUNT = 999999999999.99;

/** Default calculation year for cuota autónomos */
const DEFAULT_CALCULATION_YEAR = 2026;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Sanitize and validate numeric input
 * @returns 0 for invalid values, capped value for overflow prevention
 */
function sanitizeAmount(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  if (value > MAX_SAFE_AMOUNT) {
    return MAX_SAFE_AMOUNT;
  }
  return value;
}

/**
 * Round to 2 decimal places with proper handling of edge cases
 */
function roundToCents(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.round(value * 100) / 100;
}

// ============================================================================
// TAX CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate progressive IRPF (Spanish income tax)
 * Uses marginal tax rates - each bracket only taxes the portion within that bracket
 *
 * @param baseImponible - Taxable income after deductions
 * @param applyMinimoPersonal - Whether to apply personal allowance (default: true)
 * @returns Total IRPF tax amount
 */
export function calculateIRPF(
  baseImponible: number,
  applyMinimoPersonal: boolean = true
): number {
  // Apply personal minimum allowance
  const taxableBase = applyMinimoPersonal
    ? Math.max(0, baseImponible - MINIMO_PERSONAL)
    : baseImponible;

  if (taxableBase <= 0) return 0;

  let totalTax = 0;
  let remainingIncome = taxableBase;

  for (const tramo of IRPF_TRAMOS) {
    if (remainingIncome <= 0) break;

    const tramoMin = tramo.min;
    const tramoMax = tramo.max === null ? Infinity : tramo.max;
    const tramoRange = tramoMax - tramoMin;

    // Calculate how much income falls in this bracket
    const incomeInBracket = Math.min(remainingIncome, tramoRange);

    // Tax this portion at the bracket's marginal rate
    totalTax += incomeInBracket * tramo.rate;

    // Move to next bracket
    remainingIncome -= incomeInBracket;
  }

  return totalTax;
}

/**
 * Calculate cuota de autónomos using real tramos from Seguridad Social
 *
 * @param rendimientoNetoAnual - Annual net income (ingresos - gastos)
 * @param year - Calculation year (2024, 2025, or 2026)
 * @returns Annual cuota amount
 */
function calculateCuotaAnual(
  rendimientoNetoAnual: number,
  year: number = DEFAULT_CALCULATION_YEAR
): number {
  // Use the real cuota autónomos calculation from the existing module
  const cuotaResult = calculateCuotaAutonomos(
    rendimientoNetoAnual,
    year,
    false, // not primera alta (conservative estimate)
    null // no comunidad autónoma
  );

  return cuotaResult.cuotaAnual;
}

// ============================================================================
// MAIN CALCULATION FUNCTION
// ============================================================================

/**
 * Calculate required hourly rate for Spanish freelancers
 *
 * Working backwards from desired net income:
 * 1. Add back IRPF and cuota autónomos to get gross income needed
 * 2. Add expense percentage to get total billing needed
 * 3. Divide by billable hours to get hourly rate
 *
 * Uses iterative convergence since IRPF is calculated on the gross income
 * we're trying to find.
 *
 * @param ingresoNetoDeseado - Desired annual net income after all deductions
 * @param horasSemanales - Weekly working hours (default: 40)
 * @param semanasVacaciones - Vacation weeks per year (default: 4)
 * @param porcentajeGastos - Business expense percentage (default: 20)
 * @returns Complete calculation result with hourly rate and breakdown
 */
export function calculatePrecioHora(
  ingresoNetoDeseado: number,
  horasSemanales: number = 40,
  semanasVacaciones: number = 4,
  porcentajeGastos: number = 20
): PrecioHoraCalculationResult {
  // Sanitize and validate inputs
  const validIngresoNeto = sanitizeAmount(ingresoNetoDeseado);
  const validHorasSemanales = Math.max(1, Math.min(80, sanitizeAmount(horasSemanales)));
  const validSemanasVacaciones = Math.max(0, Math.min(51, sanitizeAmount(semanasVacaciones)));
  const validPorcentajeGastos = Math.max(0, Math.min(100, sanitizeAmount(porcentajeGastos)));

  // Calculate billable hours per year
  const semanasTrabajadas = 52 - validSemanasVacaciones;
  const horasFacturablesAnuales = validHorasSemanales * semanasTrabajadas;

  // Handle edge case: no billable hours
  if (horasFacturablesAnuales === 0 || validIngresoNeto === 0) {
    return createEmptyResult(
      validIngresoNeto,
      validHorasSemanales,
      validSemanasVacaciones,
      validPorcentajeGastos,
      horasFacturablesAnuales
    );
  }

  // Iterative calculation to find gross income that yields desired net
  // We need to iterate because IRPF depends on the gross we're solving for
  const expenseMultiplier = 1 - validPorcentajeGastos / 100;
  let ingresoBrutoNecesario = validIngresoNeto * 1.5; // Initial estimate
  let iterations = 0;

  while (iterations < MAX_CONVERGENCE_ITERATIONS) {
    // Calculate net income from current gross estimate
    const rendimientoNeto = ingresoBrutoNecesario * expenseMultiplier;
    const cuotaAutonomos = calculateCuotaAnual(rendimientoNeto);
    const baseImponible = rendimientoNeto - cuotaAutonomos;
    const irpf = calculateIRPF(baseImponible);
    const ingresoNetoCalculado = baseImponible - irpf;

    // Check convergence
    const diferencia = validIngresoNeto - ingresoNetoCalculado;
    if (Math.abs(diferencia) < CONVERGENCE_TOLERANCE_EUR) {
      break;
    }

    // Adjust gross income estimate
    // Use adjustment factor to account for marginal tax rates
    ingresoBrutoNecesario += diferencia * TAX_ADJUSTMENT_FACTOR;
    iterations++;
  }

  // Final calculations with converged gross income
  const gastosDeducibles = ingresoBrutoNecesario * (validPorcentajeGastos / 100);
  const rendimientoNeto = ingresoBrutoNecesario - gastosDeducibles;
  const cuotaAutonomosAnual = calculateCuotaAnual(rendimientoNeto);
  const baseImponible = rendimientoNeto - cuotaAutonomosAnual;
  const irpfEstimado = calculateIRPF(baseImponible);

  // Calculate rates
  const precioPorHora = ingresoBrutoNecesario / horasFacturablesAnuales;
  const tarifaDiaria = precioPorHora * 8; // Standard 8-hour day
  const ingresoMensualBruto = ingresoBrutoNecesario / 12;

  return {
    ingresoNetoDeseado: roundToCents(validIngresoNeto),
    horasSemanales: validHorasSemanales,
    semanasVacaciones: validSemanasVacaciones,
    porcentajeGastos: validPorcentajeGastos,
    horasFacturablesAnuales: Math.round(horasFacturablesAnuales),
    ingresoBrutoNecesario: roundToCents(ingresoBrutoNecesario),
    cuotaAutonomosAnual: roundToCents(cuotaAutonomosAnual),
    irpfEstimado: roundToCents(irpfEstimado),
    gastosDeducibles: roundToCents(gastosDeducibles),
    precioPorHora: roundToCents(precioPorHora),
    tarifaDiaria: roundToCents(tarifaDiaria),
    ingresoMensualBruto: roundToCents(ingresoMensualBruto),
    ingresoAnualBruto: roundToCents(ingresoBrutoNecesario),
  };
}

/**
 * Create an empty result for edge cases (no hours or no income)
 */
function createEmptyResult(
  ingresoNeto: number,
  horas: number,
  vacaciones: number,
  gastos: number,
  horasAnuales: number
): PrecioHoraCalculationResult {
  return {
    ingresoNetoDeseado: roundToCents(ingresoNeto),
    horasSemanales: horas,
    semanasVacaciones: vacaciones,
    porcentajeGastos: gastos,
    horasFacturablesAnuales: Math.round(horasAnuales),
    ingresoBrutoNecesario: 0,
    cuotaAutonomosAnual: 0,
    irpfEstimado: 0,
    gastosDeducibles: 0,
    precioPorHora: 0,
    tarifaDiaria: 0,
    ingresoMensualBruto: 0,
    ingresoAnualBruto: 0,
  };
}

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Get effective IRPF rate for a given income (average rate, not marginal)
 * Useful for displaying percentage to users
 *
 * @param baseImponible - Taxable income
 * @returns Effective tax rate as percentage (0-100)
 */
export function getEffectiveIRPFRate(baseImponible: number): number {
  if (baseImponible <= 0) return 0;
  const irpf = calculateIRPF(baseImponible);
  return (irpf / baseImponible) * 100;
}

/**
 * Get the personal minimum allowance value
 * Exported for UI display purposes
 */
export function getMinimoPersonal(): number {
  return MINIMO_PERSONAL;
}

/**
 * Re-export getRateByYear for consistency
 */
export { getRateByYear };
