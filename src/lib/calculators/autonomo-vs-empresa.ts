/**
 * Autónomo vs Empresa Calculator Logic
 * Comparison between being a Spanish autónomo vs creating a Sociedad Limitada (SL)
 *
 * Legal basis:
 * - Autónomo: IRPF + Régimen Especial de Trabajadores Autónomos (RETA)
 * - SL: Impuesto de Sociedades (IS) + Régimen General SS for administrator
 *
 * Sources:
 * - IRPF: Ley 35/2006 (LIRPF)
 * - IS: Ley 27/2014 del Impuesto sobre Sociedades
 * - SS Autónomos: Sistema de Cotización por Ingresos Reales
 * - SS Régimen General: Real Decreto Legislativo 8/2015
 */

import { calculateIRPFAutonomos, getTramosByYear as getIRPFTramos } from './irpf-autonomos';
import { calculateCuotaAutonomos } from './cuota-autonomos';

// Maximum safe value for calculations
const MAX_SAFE_AMOUNT = 999999999999.99;

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
 * Sanitize numeric input
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
 * Result for Autónomo scenario
 */
export interface AutonomoResult {
  facturacion: number;
  gastos: number;
  rendimientoNeto: number;
  cuotaAnual: number; // Cuota autónomos
  irpfAnual: number; // IRPF to pay
  sueldoNetoAnual: number; // What you take home
  costeGestion: number; // Gestoría ~€600/year
  costeFiscalTotal: number; // Total taxes + SS + management
}

/**
 * Result for Sociedad Limitada scenario
 */
export interface SociedadResult {
  facturacion: number;
  gastos: number;
  sueldoBruto: number; // Salary as administrator
  cuotaSS: number; // SS régimen general (employer + employee)
  irpfSueldo: number; // IRPF on salary
  sueldoNetoAnual: number; // Net salary
  beneficioSociedad: number; // Profit before IS
  impuestoSociedades: number; // IS 25% (15% for new companies)
  beneficioRetenido: number; // Kept in the company
  costeConstitucion: number; // ~€500-1000 (amortized over 5 years)
  costeGestion: number; // Gestoría ~€1800-3000/year
  costeFiscalTotal: number;
}

/**
 * Comparison result with recommendation
 */
export interface ComparisonResult {
  autonomo: AutonomoResult;
  sociedad: SociedadResult;
  diferencia: number; // Positive = autónomo better (more net income)
  recomendacion: 'autonomo' | 'sociedad' | 'similar';
  breakEvenPoint: number; // Billing where SL becomes better
  razonamientos: string[];
}

/**
 * Input parameters for comparison
 */
export interface ComparisonInputParams {
  facturacionAnual: number;
  gastosNegocio: number; // As percentage (0-100)
  sueldoMensualDeseado: number; // Desired monthly salary if SL
  esPrimeraVezEmprendedor: boolean; // For 15% IS rate
  comunidadAutonoma: string | null; // For cuota cero
  year: number;
}

// Impuesto de Sociedades rates
// Source: Art. 29 Ley 27/2014 del Impuesto sobre Sociedades
export const IS_RATES = {
  general: 25, // Standard rate
  emprendedores: 15, // First 2 years for new companies (first €300k)
  emprendedoresExcess: 20, // First 2 years, amounts over €300k
  emprendedoresLimit: 300000, // €300k limit for 15% rate
} as const;

// Social Security rates for Régimen General 2026
// Sources:
// - https://afinom.es/bases-y-tipos-de-cotizacion-2026/
// - https://www.cuatrecasas.com/es/spain/laboral/art/smi-nuevas-cotizaciones-seguridad-social
// - BOE: Base máxima 2026 = €5,101.20/month
export const SS_REGIMEN_GENERAL = {
  // Contingencias Comunes
  employerRateComunes: 23.6, // Employer CC
  employeeRateComunes: 4.7, // Employee CC
  totalComunes: 28.3, // Total CC
  // MEI (Mecanismo de Equidad Intergeneracional) - 2026 rate: 0.90%
  employerRateMEI: 0.75,
  employeeRateMEI: 0.15,
  totalMEI: 0.90,
  // Desempleo (Unemployment) - contrato indefinido
  desempleoEmployer: 5.5, // Employer
  desempleoEmployee: 1.55, // Employee
  totalDesempleo: 7.05,
  // FOGASA (Wage guarantee fund) - employer only
  fogasa: 0.2,
  // Formación Profesional (Training)
  formacionEmployer: 0.6, // Employer
  formacionEmployee: 0.1, // Employee
  totalFormacion: 0.7,
  // TOTALS (including all contributions)
  // Employer: 23.6 (CC) + 0.75 (MEI) + 5.5 (desempleo) + 0.2 (FOGASA) + 0.6 (formación) = 30.65%
  totalEmployer: 30.65,
  // Employee: 4.7 (CC) + 0.15 (MEI) + 1.55 (desempleo) + 0.1 (formación) = 6.5%
  totalEmployee: 6.5,
  // Combined total
  total: 37.15, // 30.65 + 6.5
  // Contribution base caps 2026
  // Source: BOE - Orden cotización 2026
  minBaseMonthly: 1260.00, // Minimum monthly contribution base
  maxBaseMonthly: 5101.20, // Maximum monthly contribution base (updated 2026)
} as const;

// Management costs
export const GESTION_COSTS = {
  autonomo: 600, // Annual gestoría cost for autónomo
  sociedad: 2400, // Annual gestoría cost for SL (higher complexity)
  constitucionSL: 750, // One-time cost to create SL (amortized over 5 years)
  amortizacionAnos: 5, // Years to amortize constitution cost
} as const;

/**
 * Calculate IRPF on salary (for SL administrator)
 *
 * SIMPLIFIED CALCULATION:
 * This uses a simplified model with flat €5,550 personal deduction.
 * Real IRPF salary calculation would include:
 * - Rendimientos del trabajo deduction (Art. 19 LIRPF): up to €7,500 based on income
 * - Mínimo personal y familiar (Art. 57-59 LIRPF)
 * - Other personal circumstances (disability, age, dependents)
 *
 * This simplified approach is acceptable for comparison purposes as it
 * provides reasonable estimates for typical cases. For precise calculations,
 * use AEAT's official calculator.
 */
function calculateIRPFSalary(sueldoBruto: number, year: number): number {
  const tramos = getIRPFTramos(year);

  // Simplified: flat €5,550 personal deduction (mínimo personal básico)
  // Real calculation would add up to €7,500 additional deduction for work income
  const baseLiquidable = Math.max(0, sueldoBruto - 5550);

  let irpf = 0;
  let baseRestante = baseLiquidable;

  for (const tramo of tramos) {
    if (baseRestante <= 0) break;

    const limiteTramo = tramo.hasta ?? Infinity;
    const anchoTramo = limiteTramo - tramo.desde;
    const baseEnEsteTramo = Math.min(baseRestante, anchoTramo);

    irpf += (baseEnEsteTramo * tramo.tipo) / 100;
    baseRestante -= baseEnEsteTramo;
  }

  return roundToCents(irpf);
}

/**
 * Calculate Impuesto de Sociedades
 *
 * New company rates (first 2 taxable periods with positive base):
 * - First €300,000: 15%
 * - Excess over €300,000: 20% (not the general 25%)
 *
 * Source: Art. 29 Ley 27/2014 del Impuesto sobre Sociedades
 */
function calculateImpuestoSociedades(
  beneficio: number,
  esPrimeraVezEmprendedor: boolean
): number {
  if (beneficio <= 0) return 0;

  if (esPrimeraVezEmprendedor) {
    // First €300k at 15%, excess at 20% (Art. 29 LIS)
    if (beneficio <= IS_RATES.emprendedoresLimit) {
      return roundToCents(beneficio * (IS_RATES.emprendedores / 100));
    } else {
      const primerosParte = IS_RATES.emprendedoresLimit * (IS_RATES.emprendedores / 100);
      const restoBase = beneficio - IS_RATES.emprendedoresLimit;
      const restoParte = restoBase * (IS_RATES.emprendedoresExcess / 100); // 20%, not 25%
      return roundToCents(primerosParte + restoParte);
    }
  }

  // Standard 25% rate
  return roundToCents(beneficio * (IS_RATES.general / 100));
}

/**
 * Calculate scenario as Autónomo
 */
function calculateAutonomoScenario(
  facturacion: number,
  gastosPercentage: number,
  comunidadAutonoma: string | null,
  year: number
): AutonomoResult {
  const facturacionSanitized = sanitizeAmount(facturacion);
  const gastosAmount = facturacionSanitized * (gastosPercentage / 100);
  const rendimientoNeto = facturacionSanitized - gastosAmount;

  // Calculate cuota autónomos based on rendimiento neto
  const cuotaResult = calculateCuotaAutonomos(
    rendimientoNeto,
    year,
    false, // Not primera alta (we don't apply tarifa plana for comparison)
    comunidadAutonoma
  );

  // Calculate IRPF
  const irpfResult = calculateIRPFAutonomos({
    ingresosBrutos: facturacionSanitized,
    gastosDeducibles: gastosAmount,
    seguridadSocial: cuotaResult.cuotaAnual,
    esEstimacionSimplificada: true,
    numDescendientes: 0,
    descendientesMenores3: 0,
    edadContribuyente: 35,
    retencionesFacturas: 0,
    year,
  });

  const costeGestion = GESTION_COSTS.autonomo;
  const costeFiscalTotal = cuotaResult.cuotaAnual + irpfResult.cuotaIntegra + costeGestion;
  const sueldoNetoAnual = facturacionSanitized - gastosAmount - costeFiscalTotal;

  return {
    facturacion: roundToCents(facturacionSanitized),
    gastos: roundToCents(gastosAmount),
    rendimientoNeto: roundToCents(rendimientoNeto),
    cuotaAnual: roundToCents(cuotaResult.cuotaAnual),
    irpfAnual: roundToCents(irpfResult.cuotaIntegra),
    sueldoNetoAnual: roundToCents(sueldoNetoAnual),
    costeGestion: roundToCents(costeGestion),
    costeFiscalTotal: roundToCents(costeFiscalTotal),
  };
}

/**
 * Calculate scenario as Sociedad Limitada
 */
function calculateSociedadScenario(
  facturacion: number,
  gastosPercentage: number,
  sueldoMensualDeseado: number,
  esPrimeraVezEmprendedor: boolean,
  year: number
): SociedadResult {
  const facturacionSanitized = sanitizeAmount(facturacion);
  const gastosNegocio = facturacionSanitized * (gastosPercentage / 100);
  const sueldoBrutoAnual = sanitizeAmount(sueldoMensualDeseado) * 12;

  // Calculate contribution base (capped to min/max)
  // SS contributions are calculated on the contribution base, not the full salary
  const sueldoMensual = sueldoBrutoAnual / 12;
  const baseCotizacionMensual = Math.min(
    Math.max(sueldoMensual, SS_REGIMEN_GENERAL.minBaseMonthly),
    SS_REGIMEN_GENERAL.maxBaseMonthly
  );
  const baseCotizacionAnual = baseCotizacionMensual * 12;

  // Calculate employer SS contribution (36.2% of contribution base)
  const cuotaSSEmpresa = baseCotizacionAnual * (SS_REGIMEN_GENERAL.totalEmployer / 100);

  // Calculate employee SS contribution (4.7% of contribution base)
  const cuotaSSEmpleado = baseCotizacionAnual * (SS_REGIMEN_GENERAL.totalEmployee / 100);

  const cuotaSS = cuotaSSEmpresa + cuotaSSEmpleado;

  // Calculate IRPF on salary
  const irpfSueldo = calculateIRPFSalary(sueldoBrutoAnual, year);

  // Net salary after SS employee part and IRPF
  const sueldoNetoAnual = sueldoBrutoAnual - cuotaSSEmpleado - irpfSueldo;

  // Company profit before IS
  // Profit = Revenue - Business expenses - Gross salary - Employer SS
  const beneficioSociedad = facturacionSanitized - gastosNegocio - sueldoBrutoAnual - cuotaSSEmpresa;

  // Calculate IS (Impuesto de Sociedades)
  const impuestoSociedades = calculateImpuestoSociedades(
    beneficioSociedad,
    esPrimeraVezEmprendedor
  );

  // Profit kept in the company after IS
  const beneficioRetenido = Math.max(0, beneficioSociedad - impuestoSociedades);

  // Management costs
  const costeConstitucion = GESTION_COSTS.constitucionSL / GESTION_COSTS.amortizacionAnos;
  const costeGestion = GESTION_COSTS.sociedad;

  // Total fiscal cost (SS + IRPF + IS + management)
  const costeFiscalTotal = cuotaSS + irpfSueldo + impuestoSociedades + costeGestion + costeConstitucion;

  return {
    facturacion: roundToCents(facturacionSanitized),
    gastos: roundToCents(gastosNegocio),
    sueldoBruto: roundToCents(sueldoBrutoAnual),
    cuotaSS: roundToCents(cuotaSS),
    irpfSueldo: roundToCents(irpfSueldo),
    sueldoNetoAnual: roundToCents(sueldoNetoAnual),
    beneficioSociedad: roundToCents(beneficioSociedad),
    impuestoSociedades: roundToCents(impuestoSociedades),
    beneficioRetenido: roundToCents(beneficioRetenido),
    costeConstitucion: roundToCents(costeConstitucion),
    costeGestion: roundToCents(costeGestion),
    costeFiscalTotal: roundToCents(costeFiscalTotal),
  };
}

/**
 * Generate recommendation reasons based on the comparison
 */
function generateRazonamientos(
  autonomo: AutonomoResult,
  sociedad: SociedadResult,
  diferencia: number
): string[] {
  const razonamientos: string[] = [];

  // Income level reasoning
  if (autonomo.rendimientoNeto < 30000) {
    razonamientos.push('lowIncome');
  } else if (autonomo.rendimientoNeto > 50000) {
    razonamientos.push('highIncome');
  }

  // Tax burden comparison
  const autonomoTaxRate = (autonomo.costeFiscalTotal / autonomo.facturacion) * 100;
  const sociedadTaxRate = (sociedad.costeFiscalTotal / sociedad.facturacion) * 100;

  if (Math.abs(autonomoTaxRate - sociedadTaxRate) < 3) {
    razonamientos.push('similarTaxBurden');
  } else if (autonomoTaxRate < sociedadTaxRate) {
    razonamientos.push('lowerTaxesAutonomo');
  } else {
    razonamientos.push('lowerTaxesSociedad');
  }

  // Complexity and management
  razonamientos.push('complexityConsideration');

  // Liability protection
  if (sociedad.facturacion > 50000) {
    razonamientos.push('liabilityProtection');
  }

  // Reinvestment capacity
  if (sociedad.beneficioRetenido > 10000) {
    razonamientos.push('reinvestmentCapacity');
  }

  return razonamientos;
}

/**
 * Estimate break-even point where SL becomes better than autónomo
 * Uses binary search to find the billing amount where SL net income equals autónomo.
 *
 * Search parameters:
 * - Range: €20,000 - €200,000 annual billing (covers typical autónomo range)
 * - Convergence: €1,000 difference threshold (practical precision for comparison)
 * - Default: €50,000 if search doesn't converge (middle ground estimate)
 */
function estimateBreakEvenPoint(
  gastosPercentage: number,
  sueldoMensualDeseado: number,
  esPrimeraVezEmprendedor: boolean,
  comunidadAutonoma: string | null,
  year: number
): number {
  // Binary search bounds (typical autónomo billing range)
  const SEARCH_MIN_BILLING = 20000; // Below this, autónomo is almost always better
  const SEARCH_MAX_BILLING = 200000; // Above this, SL is almost always better
  const DEFAULT_BREAK_EVEN = 50000; // Reasonable default if search fails
  const CONVERGENCE_THRESHOLD = 1000; // €1,000 precision is sufficient for comparison

  let low = SEARCH_MIN_BILLING;
  let high = SEARCH_MAX_BILLING;
  let breakEven = DEFAULT_BREAK_EVEN;

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;

    const autonomoResult = calculateAutonomoScenario(mid, gastosPercentage, comunidadAutonoma, year);
    const sociedadResult = calculateSociedadScenario(mid, gastosPercentage, sueldoMensualDeseado, esPrimeraVezEmprendedor, year);

    const sociedadTotal = sociedadResult.sueldoNetoAnual + sociedadResult.beneficioRetenido;
    const diff = autonomoResult.sueldoNetoAnual - sociedadTotal;

    if (Math.abs(diff) < CONVERGENCE_THRESHOLD) {
      breakEven = mid;
      break;
    }

    if (diff > 0) {
      // Autónomo is still better, SL needs higher income
      low = mid;
    } else {
      // SL is better, check lower income
      high = mid;
    }
  }

  return roundToCents(breakEven);
}

/**
 * Main comparison function
 */
export function compareAutonomoVsEmpresa(params: ComparisonInputParams): ComparisonResult {
  const {
    facturacionAnual,
    gastosNegocio,
    sueldoMensualDeseado,
    esPrimeraVezEmprendedor,
    comunidadAutonoma,
    year,
  } = params;

  // Calculate both scenarios
  const autonomo = calculateAutonomoScenario(
    facturacionAnual,
    gastosNegocio,
    comunidadAutonoma,
    year
  );

  const sociedad = calculateSociedadScenario(
    facturacionAnual,
    gastosNegocio,
    sueldoMensualDeseado,
    esPrimeraVezEmprendedor,
    year
  );

  // Calculate total disponible (available money)
  // Autónomo: net salary
  // SL: net salary + retained profit (money you could distribute)
  const autonomoDisponible = autonomo.sueldoNetoAnual;
  const sociedadDisponible = sociedad.sueldoNetoAnual + sociedad.beneficioRetenido;

  // Difference (positive = autónomo better)
  const diferencia = roundToCents(autonomoDisponible - sociedadDisponible);

  // Store difference for return (used in recommendation)

  // Recommendation
  let recomendacion: 'autonomo' | 'sociedad' | 'similar';
  if (Math.abs(diferencia) < 2000) {
    recomendacion = 'similar';
  } else if (diferencia > 0) {
    recomendacion = 'autonomo';
  } else {
    recomendacion = 'sociedad';
  }

  // Generate reasoning
  const razonamientos = generateRazonamientos(autonomo, sociedad, diferencia);

  // Estimate break-even point
  const breakEvenPoint = estimateBreakEvenPoint(
    gastosNegocio,
    sueldoMensualDeseado,
    esPrimeraVezEmprendedor,
    comunidadAutonoma,
    year
  );

  return {
    autonomo,
    sociedad,
    diferencia,
    recomendacion,
    breakEvenPoint,
    razonamientos,
  };
}
