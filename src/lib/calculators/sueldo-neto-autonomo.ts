/**
 * Sueldo Neto Autónomo Calculator Logic
 * Comprehensive net salary calculation for Spanish self-employed individuals
 *
 * This calculator integrates:
 * - Cuota de Autónomos (Social Security contributions)
 * - IRPF (Personal Income Tax)
 * - Deductible expenses
 *
 * Legal basis:
 * - Real Decreto-ley 13/2022 - Sistema de Cotización por Ingresos Reales
 * - Ley 35/2006 - Impuesto sobre la Renta de las Personas Físicas (LIRPF)
 * - Real Decreto 439/2007 - Reglamento del IRPF
 *
 * Sources:
 * - AEAT: https://sede.agenciatributaria.gob.es
 * - Seguridad Social: https://portal.seg-social.gob.es
 */

import {
  calculateCuotaAutonomos,
  type CuotaCalculationResult,
} from './cuota-autonomos';

import {
  getTramosByYear as getIRPFTramosByYear,
  MINIMO_PERSONAL,
  MINIMO_DESCENDIENTES,
  GASTOS_DIFICIL_JUSTIFICACION,
  type IRPFTramo,
} from './irpf-autonomos';

export interface SueldoNetoInputParams {
  facturacionAnual: number; // Annual gross billing (without VAT)
  gastosDeducibles: number; // Deductible business expenses
  year: number;
  esPrimeraAlta: boolean; // First registration as autónomo (for Tarifa Plana)
  comunidadAutonoma: string | null; // For Cuota Cero programs
  esEstimacionSimplificada: boolean; // For 5% hard-to-justify expenses
  numDescendientes: number;
  descendientesMenores3: number;
  edadContribuyente: number;
  retencionesFacturas: number; // IRPF withholdings already paid (7% or 15%)
}

export interface SueldoNetoResult {
  // Input values
  facturacionAnual: number;
  facturacionMensual: number;
  gastosDeducibles: number;
  gastosMensuales: number;

  // Rendimiento calculation for SS
  rendimientoNetoParaSS: number;
  rendimientoMensualSS: number;

  // Social Security (Cuota de Autónomos)
  cuotaAutonomos: CuotaCalculationResult;
  cuotaAnual: number;
  cuotaMensual: number;

  // IRPF calculation
  rendimientoNetoIRPF: number;
  gastosDificilJustificacion: number;
  minimoPersonal: number;
  minimoDescendientes: number;
  minimoTotal: number;
  baseLiquidable: number;
  cuotaIntegra: number;
  retencionesYaPagadas: number;
  cuotaDiferencial: number;
  tipoEfectivo: number;

  // Breakdown by IRPF brackets
  desglosePorTramos: Array<{
    tramo: number;
    base: number;
    tipo: number;
    cuota: number;
  }>;

  // Final results
  sueldoNetoAnual: number;
  sueldoNetoMensual: number;
  impuestosTotales: number;
  porcentajeImpuestos: number;

  // Summary breakdown
  desglose: {
    facturacionAnual: number;
    gastosDeducibles: number;
    cuotaAutonomos: number;
    irpfTotal: number;
    netoFinal: number;
  };
}

// Maximum safe value for calculations
const MAX_SAFE_AMOUNT = 999999999999.99;

/**
 * Sanitize and validate numeric input
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
 * Round to 2 decimal places
 */
function roundToCents(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.round(value * 100) / 100;
}

/**
 * Calculate mínimo personal based on age
 */
function calcularMinimoPersonal(edad: number): number {
  if (edad >= 75) {
    return MINIMO_PERSONAL.mayor75;
  }
  if (edad >= 65) {
    return MINIMO_PERSONAL.mayor65;
  }
  return MINIMO_PERSONAL.base;
}

/**
 * Calculate mínimo por descendientes
 */
function calcularMinimoDescendientes(
  numDescendientes: number,
  menoresDe3: number
): number {
  let total = 0;

  for (let i = 1; i <= numDescendientes; i++) {
    if (i === 1) total += MINIMO_DESCENDIENTES.primero;
    else if (i === 2) total += MINIMO_DESCENDIENTES.segundo;
    else if (i === 3) total += MINIMO_DESCENDIENTES.tercero;
    else total += MINIMO_DESCENDIENTES.cuartoYSiguientes;
  }

  // Add extra for children under 3
  // Cap menoresDe3 at numDescendientes (can't have more under-3 than total)
  const cappedMenoresDe3 = Math.min(menoresDe3, numDescendientes);
  total += cappedMenoresDe3 * MINIMO_DESCENDIENTES.menorDe3Anos;

  return total;
}

/**
 * Calculate gastos de difícil justificación (5% of net income with €2,000 max)
 * Only applies for estimación directa simplificada
 */
function calcularGastosDificilJustificacion(
  rendimientoNetoPrevio: number,
  aplicar: boolean
): number {
  if (!aplicar || rendimientoNetoPrevio <= 0) {
    return 0;
  }

  const gasto = rendimientoNetoPrevio * (GASTOS_DIFICIL_JUSTIFICACION.porcentaje / 100);
  return Math.min(gasto, GASTOS_DIFICIL_JUSTIFICACION.maximo);
}

/**
 * Calculate IRPF using progressive tax brackets
 */
function calcularCuotaIntegra(
  baseLiquidable: number,
  tramos: IRPFTramo[]
): { cuota: number; desglose: Array<{ tramo: number; base: number; tipo: number; cuota: number }> } {
  if (baseLiquidable <= 0) {
    return { cuota: 0, desglose: [] };
  }

  let cuotaTotal = 0;
  const desglose: Array<{ tramo: number; base: number; tipo: number; cuota: number }> = [];
  let baseRestante = baseLiquidable;

  for (let i = 0; i < tramos.length && baseRestante > 0; i++) {
    const tramo = tramos[i];
    const limiteTramo = tramo.hasta ?? Infinity;
    const anchoTramo = limiteTramo - tramo.desde;

    const baseEnEsteTramo = Math.min(baseRestante, anchoTramo);
    const cuotaTramo = (baseEnEsteTramo * tramo.tipo) / 100;

    if (baseEnEsteTramo > 0) {
      desglose.push({
        tramo: i + 1,
        base: roundToCents(baseEnEsteTramo),
        tipo: tramo.tipo,
        cuota: roundToCents(cuotaTramo),
      });
    }

    cuotaTotal += cuotaTramo;
    baseRestante -= baseEnEsteTramo;
  }

  return { cuota: cuotaTotal, desglose };
}

/**
 * Calculate rendimiento neto for Social Security purposes
 *
 * This calculation follows the official AEAT/Social Security methodology for
 * determining the contribution base under the "Sistema de Cotización por Ingresos Reales"
 * (Real Income-Based Contribution System).
 *
 * ## Regulatory Basis
 * - **Real Decreto-ley 13/2022**, de 26 de julio, Art. 308.1.c
 * - **BOE-A-2022-12482**: Establishes the new contribution system
 * - **AEAT Information**: https://sede.agenciatributaria.gob.es/Sede/empresarios-individuales-profesionales/nuevo-sistema-cotizacion-autonomos/
 *
 * ## Formula Explanation
 * The Social Security uses a specific formula to determine the "rendimientos netos"
 * that determines which contribution bracket (tramo) applies:
 *
 * ```
 * Rendimientos Netos = (Ingresos - Gastos + Cuotas SS pagadas) × (1 - reducción)
 * ```
 *
 * ### Why add back Social Security contributions?
 * The SS contributions are added back because they are considered a "gasto deducible"
 * in the fiscal sense (for IRPF), but for SS contribution purposes, the system needs
 * to know your "capacity to pay" BEFORE the SS deduction was applied. This prevents
 * a circular dependency where lower contributions lead to lower base, which leads to
 * even lower contributions.
 *
 * ### Generic expense reduction (7% or 3%)
 * - **7% reduction**: For individual autónomos (autónomo persona física)
 * - **3% reduction**: For autónomos societarios (those who work through a company)
 *
 * This reduction accounts for generic business expenses that are difficult to justify
 * individually (similar to the "gastos de difícil justificación" concept in IRPF).
 *
 * @param ingresos - Gross annual income (facturación bruta sin IVA)
 * @param gastos - Deductible business expenses
 * @param cuotasSS - Social Security contributions already paid (added back for calculation)
 * @param esAutonomoSocietario - Whether the freelancer operates through a company (uses 3% instead of 7%)
 * @returns The net income figure used to determine SS contribution bracket
 *
 * @example
 * ```ts
 * // Individual freelancer with €30,000 income, €3,000 expenses, €3,000 SS paid
 * const rendimiento = calcularRendimientoNetoSS(30000, 3000, 3000, false);
 * // = (30000 - 3000 + 3000) × 0.93 = 27900
 * ```
 */
function calcularRendimientoNetoSS(
  ingresos: number,
  gastos: number,
  cuotasSS: number,
  esAutonomoSocietario: boolean = false
): number {
  // Step 1: Calculate base income adding back SS contributions
  // This is per AEAT guidance for determining "rendimientos netos computables"
  const rendimientoPrevio = ingresos - gastos + cuotasSS;

  // Step 2: Apply generic expense reduction
  // - 7% for individual autónomos (Art. 308.1.c RDL 13/2022)
  // - 3% for autónomos societarios
  const reduccion = esAutonomoSocietario ? 0.03 : 0.07;

  // Step 3: Return final rendimiento (minimum 0)
  return Math.max(0, rendimientoPrevio * (1 - reduccion));
}

/**
 * Main calculation function for Sueldo Neto Autónomo
 */
export function calculateSueldoNetoAutonomo(params: SueldoNetoInputParams): SueldoNetoResult {
  const {
    facturacionAnual,
    gastosDeducibles,
    year,
    esPrimeraAlta,
    comunidadAutonoma,
    esEstimacionSimplificada,
    numDescendientes,
    descendientesMenores3,
    edadContribuyente,
    retencionesFacturas,
  } = params;

  // Sanitize inputs
  const facturacion = sanitizeAmount(facturacionAnual);
  const gastos = sanitizeAmount(gastosDeducibles);
  const retenciones = sanitizeAmount(retencionesFacturas);
  const facturacionMensual = facturacion / 12;
  const gastosMensuales = gastos / 12;

  // Step 1: Initial estimation of cuota de autónomos
  // We need to estimate SS contribution first, then calculate IRPF
  // Use rendimiento neto inicial for SS bracket determination
  const rendimientoInicialSS = calcularRendimientoNetoSS(facturacion, gastos, 0);

  // Calculate cuota de autónomos based on estimated rendimiento
  const cuotaAutonomos = calculateCuotaAutonomos(
    rendimientoInicialSS,
    year,
    esPrimeraAlta,
    comunidadAutonoma
  );

  // Use the final cuota (after bonifications) for our calculations
  const cuotaMensual = cuotaAutonomos.cuotaFinal;
  const cuotaAnual = cuotaMensual * 12;

  // Step 2: Recalculate rendimiento neto for SS with actual cuota
  const rendimientoNetoSS = calcularRendimientoNetoSS(facturacion, gastos, cuotaAnual);
  const rendimientoMensualSS = rendimientoNetoSS / 12;

  // Step 3: Calculate IRPF
  // Base imponible for IRPF = Ingresos - Gastos - Cuota SS
  const rendimientoNetoPrevioIRPF = Math.max(0, facturacion - gastos - cuotaAnual);

  // Apply 5% gastos de difícil justificación if applicable
  const gastosDificilJustificacion = calcularGastosDificilJustificacion(
    rendimientoNetoPrevioIRPF,
    esEstimacionSimplificada
  );

  const rendimientoNetoIRPF = Math.max(0, rendimientoNetoPrevioIRPF - gastosDificilJustificacion);

  // Calculate personal and family minimums
  const minimoPersonal = calcularMinimoPersonal(edadContribuyente);
  const minimoDescendientes = calcularMinimoDescendientes(
    numDescendientes,
    descendientesMenores3
  );
  const minimoTotal = minimoPersonal + minimoDescendientes;

  // Base liquidable
  const baseLiquidable = rendimientoNetoIRPF;

  // Get IRPF brackets
  const tramosIRPF = getIRPFTramosByYear(year);

  // Calculate cuota íntegra on base liquidable
  const { cuota: cuotaSobreBase, desglose } = calcularCuotaIntegra(baseLiquidable, tramosIRPF);

  // Calculate cuota corresponding to mínimos
  const { cuota: cuotaMinimos } = calcularCuotaIntegra(minimoTotal, tramosIRPF);

  // Final cuota íntegra
  const cuotaIntegra = Math.max(0, cuotaSobreBase - cuotaMinimos);

  // Cuota diferencial (what you owe or get back)
  const cuotaDiferencial = cuotaIntegra - retenciones;

  // Effective tax rate
  const tipoEfectivo = rendimientoNetoIRPF > 0 ? (cuotaIntegra / rendimientoNetoIRPF) * 100 : 0;

  // Step 4: Calculate final net salary
  // Sueldo Neto = Facturación - Gastos - Cuota Autónomos - IRPF
  const sueldoNetoAnual = facturacion - gastos - cuotaAnual - cuotaIntegra;
  const sueldoNetoMensual = sueldoNetoAnual / 12;

  // Total taxes and percentage
  const impuestosTotales = cuotaAnual + cuotaIntegra;
  const porcentajeImpuestos = facturacion > 0 ? (impuestosTotales / facturacion) * 100 : 0;

  return {
    // Input values
    facturacionAnual: roundToCents(facturacion),
    facturacionMensual: roundToCents(facturacionMensual),
    gastosDeducibles: roundToCents(gastos),
    gastosMensuales: roundToCents(gastosMensuales),

    // SS calculation
    rendimientoNetoParaSS: roundToCents(rendimientoNetoSS),
    rendimientoMensualSS: roundToCents(rendimientoMensualSS),

    // Cuota de autónomos
    cuotaAutonomos,
    cuotaAnual: roundToCents(cuotaAnual),
    cuotaMensual: roundToCents(cuotaMensual),

    // IRPF calculation
    rendimientoNetoIRPF: roundToCents(rendimientoNetoIRPF),
    gastosDificilJustificacion: roundToCents(gastosDificilJustificacion),
    minimoPersonal: roundToCents(minimoPersonal),
    minimoDescendientes: roundToCents(minimoDescendientes),
    minimoTotal: roundToCents(minimoTotal),
    baseLiquidable: roundToCents(baseLiquidable),
    cuotaIntegra: roundToCents(cuotaIntegra),
    retencionesYaPagadas: roundToCents(retenciones),
    cuotaDiferencial: roundToCents(cuotaDiferencial),
    tipoEfectivo: roundToCents(tipoEfectivo),

    // IRPF breakdown
    desglosePorTramos: desglose,

    // Final results
    sueldoNetoAnual: roundToCents(sueldoNetoAnual),
    sueldoNetoMensual: roundToCents(sueldoNetoMensual),
    impuestosTotales: roundToCents(impuestosTotales),
    porcentajeImpuestos: roundToCents(porcentajeImpuestos),

    // Summary breakdown
    desglose: {
      facturacionAnual: roundToCents(facturacion),
      gastosDeducibles: roundToCents(gastos),
      cuotaAutonomos: roundToCents(cuotaAnual),
      irpfTotal: roundToCents(cuotaIntegra),
      netoFinal: roundToCents(sueldoNetoAnual),
    },
  };
}

/**
 * Simple calculation with default parameters
 * Useful for quick estimates
 */
export function calculateSueldoNetoSimple(
  facturacionAnual: number,
  gastosDeducibles: number = 0,
  year: number = 2025
): SueldoNetoResult {
  return calculateSueldoNetoAutonomo({
    facturacionAnual,
    gastosDeducibles,
    year,
    esPrimeraAlta: false,
    comunidadAutonoma: null,
    esEstimacionSimplificada: true,
    numDescendientes: 0,
    descendientesMenores3: 0,
    edadContribuyente: 35,
    retencionesFacturas: 0,
  });
}

/**
 * Get available years for the calculator
 */
export function getAvailableYears(): number[] {
  return [2024, 2025, 2026];
}

/**
 * Re-export CCAA list for use in component
 */
export { COMUNIDADES_AUTONOMAS } from './cuota-autonomos';
