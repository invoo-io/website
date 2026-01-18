/**
 * Cuota Autónomos Calculator Logic
 * Calculations for Spanish self-employed social security quotas
 * Based on the new contribution system (Sistema de Cotización por Ingresos Reales)
 */

export interface CuotaTramo {
  min: number;
  max: number | null; // null means unlimited
  baseMin: number;
  baseMax: number;
}

export interface CuotaCalculationResult {
  rendimientoAnual: number;
  rendimientoMensual: number;
  tramo: number;
  baseCotizacion: number;
  cuotaMensual: number;
  cuotaAnual: number;
  bonificacion: number;
  cuotaFinal: number;
  esPrimeraAlta: boolean;
  tieneCuotaCero: boolean;
}

// Official 2024 tramos - Real Decreto-ley 13/2022 (Sistema de Cotización por Ingresos Reales)
// Source: BOE-A-2024-1691, Orden PJC/51/2024
// 15 tramos based on monthly net income (rendimiento neto mensual)
export const CUOTA_TRAMOS_2024: CuotaTramo[] = [
  { min: 0, max: 670, baseMin: 735.29, baseMax: 816.98 },
  { min: 670, max: 900, baseMin: 816.99, baseMax: 900 },
  { min: 900, max: 1166.70, baseMin: 872.55, baseMax: 1166.70 },
  { min: 1166.70, max: 1300, baseMin: 950.98, baseMax: 1300 },
  { min: 1300, max: 1500, baseMin: 960.78, baseMax: 1500 },
  { min: 1500, max: 1700, baseMin: 960.78, baseMax: 1700 },
  { min: 1700, max: 1850, baseMin: 1045.75, baseMax: 1850 },
  { min: 1850, max: 2030, baseMin: 1062.09, baseMax: 2030 },
  { min: 2030, max: 2330, baseMin: 1078.43, baseMax: 2330 },
  { min: 2330, max: 2760, baseMin: 1111.11, baseMax: 2760 },
  { min: 2760, max: 3190, baseMin: 1176.47, baseMax: 3190 },
  { min: 3190, max: 3620, baseMin: 1241.83, baseMax: 3620 },
  { min: 3620, max: 4050, baseMin: 1307.19, baseMax: 4050 },
  { min: 4050, max: 6000, baseMin: 1454.25, baseMax: 4720.50 },
  { min: 6000, max: null, baseMin: 1732.03, baseMax: 4720.50 },
];

// Official 2025 tramos - BOE-A-2025-3780, Orden PJC/178/2025
// Source: https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-3780
export const CUOTA_TRAMOS_2025: CuotaTramo[] = [
  // Tabla Reducida (tramos 1-3)
  { min: 0, max: 670, baseMin: 653.59, baseMax: 718.94 },
  { min: 670, max: 900, baseMin: 718.95, baseMax: 900 },
  { min: 900, max: 1166.70, baseMin: 849.67, baseMax: 1166.70 },
  // Tabla General (tramos 4-15)
  { min: 1166.70, max: 1300, baseMin: 950.98, baseMax: 1300 },
  { min: 1300, max: 1500, baseMin: 960.78, baseMax: 1500 },
  { min: 1500, max: 1700, baseMin: 960.78, baseMax: 1700 },
  { min: 1700, max: 1850, baseMin: 1143.79, baseMax: 1850 },
  { min: 1850, max: 2030, baseMin: 1209.15, baseMax: 2030 },
  { min: 2030, max: 2330, baseMin: 1274.51, baseMax: 2330 },
  { min: 2330, max: 2760, baseMin: 1356.21, baseMax: 2760 },
  { min: 2760, max: 3190, baseMin: 1437.91, baseMax: 3190 },
  { min: 3190, max: 3620, baseMin: 1519.61, baseMax: 3620 },
  { min: 3620, max: 4050, baseMin: 1601.31, baseMax: 4050 },
  { min: 4050, max: 6000, baseMin: 1732.03, baseMax: 4909.50 },
  { min: 6000, max: null, baseMin: 1928.10, baseMax: 4909.50 },
];

// Official 2026 tramos - Government maintained same bases as 2025
// Source: Government decision to freeze bases for 2026
// Note: Same values as 2025 per official announcement
export const CUOTA_TRAMOS_2026: CuotaTramo[] = [
  // Tabla Reducida (tramos 1-3)
  { min: 0, max: 670, baseMin: 653.59, baseMax: 718.94 },
  { min: 670, max: 900, baseMin: 718.95, baseMax: 900 },
  { min: 900, max: 1166.70, baseMin: 849.67, baseMax: 1166.70 },
  // Tabla General (tramos 4-15)
  { min: 1166.70, max: 1300, baseMin: 950.98, baseMax: 1300 },
  { min: 1300, max: 1500, baseMin: 960.78, baseMax: 1500 },
  { min: 1500, max: 1700, baseMin: 960.78, baseMax: 1700 },
  { min: 1700, max: 1850, baseMin: 1143.79, baseMax: 1850 },
  { min: 1850, max: 2030, baseMin: 1209.15, baseMax: 2030 },
  { min: 2030, max: 2330, baseMin: 1274.51, baseMax: 2330 },
  { min: 2330, max: 2760, baseMin: 1356.21, baseMax: 2760 },
  { min: 2760, max: 3190, baseMin: 1437.91, baseMax: 3190 },
  { min: 3190, max: 3620, baseMin: 1519.61, baseMax: 3620 },
  { min: 3620, max: 4050, baseMin: 1601.31, baseMax: 4050 },
  { min: 4050, max: 6000, baseMin: 1732.03, baseMax: 4909.50 },
  { min: 6000, max: null, baseMin: 1928.10, baseMax: 4909.50 },
];

// Tarifa Plana (Flat Rate) for new self-employed - Current system since 2023
// Source: Real Decreto-ley 13/2022, Article 38 ter LGSS
// Note: €80/month flat rate for first 12 months
// Extension to months 13-24 requires rendimientos < SMI (Salario Mínimo Interprofesional)
export const TARIFA_PLANA = {
  mes1_12: 80, // First 12 months - always €80
  mes13_24: 80, // Months 13-24 - €80 only if rendimientos < SMI
} as const;

// Social Security contribution rates by year
// Total rate includes: contingencias comunes + profesionales + cese de actividad + formación
export const CUOTA_RATES = {
  2024: 0.313, // 31.30%
  2025: 0.314, // 31.40%
  2026: 0.315, // 31.50%
} as const;

// Note: Use getRateByYear(year) to get the correct rate for a specific year
// CUOTA_RATE constant removed - always use year-specific rates via getRateByYear()

// Comunidades Autónomas with active Cuota Cero programs (January 2026)
// Cuota Cero = 100% bonification of cuota for first 12-24 months
// IMPORTANT: Regional programs change frequently. Last verified: January 2026
// Note: Other communities (Canarias, Castilla-La Mancha) may reopen programs during 2026
export const CUOTA_CERO_CCAA = [
  'andalucia',     // OPEN until Sept 30, 2026 - 12 months
  'aragon',        // OPEN until Oct 30, 2026 - 12 months
  'cantabria',     // OPEN - 12 months
  'madrid',        // OPEN - 24 months
] as const;

// List of all Comunidades Autónomas for dropdown
export const COMUNIDADES_AUTONOMAS = [
  { value: 'andalucia', label: 'Andalucía' },
  { value: 'aragon', label: 'Aragón' },
  { value: 'asturias', label: 'Asturias' },
  { value: 'baleares', label: 'Islas Baleares' },
  { value: 'canarias', label: 'Canarias' },
  { value: 'cantabria', label: 'Cantabria' },
  { value: 'castilla-la-mancha', label: 'Castilla-La Mancha' },
  { value: 'castilla-y-leon', label: 'Castilla y León' },
  { value: 'cataluna', label: 'Cataluña' },
  { value: 'ceuta', label: 'Ceuta' },
  { value: 'comunidad-valenciana', label: 'Comunidad Valenciana' },
  { value: 'extremadura', label: 'Extremadura' },
  { value: 'galicia', label: 'Galicia' },
  { value: 'madrid', label: 'Madrid' },
  { value: 'melilla', label: 'Melilla' },
  { value: 'murcia', label: 'Murcia' },
  { value: 'navarra', label: 'Navarra' },
  { value: 'pais-vasco', label: 'País Vasco' },
  { value: 'la-rioja', label: 'La Rioja' },
] as const;

// Maximum safe value for calculations
const MAX_SAFE_AMOUNT = 999999999999.99;

/**
 * Sanitize and validate numeric input
 * - NaN, Infinity, -Infinity: treated as invalid, returns 0
 * - Negative values: invalid for monetary amounts, returns 0
 * - Values exceeding MAX_SAFE_AMOUNT: capped to prevent overflow
 */
function sanitizeAmount(value: number): number {
  // Invalid numbers (NaN, Infinity) and negative values return 0
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  // Cap extremely large values to prevent calculation overflow
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
 * Get tramos for a specific year
 */
export function getTramosByYear(year: number): CuotaTramo[] {
  switch (year) {
    case 2024:
      return CUOTA_TRAMOS_2024;
    case 2025:
      return CUOTA_TRAMOS_2025;
    case 2026:
      return CUOTA_TRAMOS_2026;
    default:
      return CUOTA_TRAMOS_2025; // Default to 2025
  }
}

/**
 * Find the appropriate tramo based on monthly income
 */
function findTramo(rendimientoMensual: number, tramos: CuotaTramo[]): { tramo: CuotaTramo; index: number } {
  for (let i = 0; i < tramos.length; i++) {
    const tramo = tramos[i];
    if (tramo.max === null) {
      // Last tramo (unlimited)
      if (rendimientoMensual >= tramo.min) {
        return { tramo, index: i + 1 };
      }
    } else {
      if (rendimientoMensual >= tramo.min && rendimientoMensual < tramo.max) {
        return { tramo, index: i + 1 };
      }
    }
  }
  // Fallback to first tramo
  return { tramo: tramos[0], index: 1 };
}

/**
 * Calculate base de cotización from rendimiento mensual and tramo
 * Uses a proportional calculation within the tramo range
 */
function calculateBaseCotizacion(rendimientoMensual: number, tramo: CuotaTramo): number {
  // If income is below the minimum base, use minimum base
  if (rendimientoMensual <= tramo.min) {
    return tramo.baseMin;
  }

  // If income is above the maximum (last tramo), use maximum base
  if (tramo.max === null) {
    return tramo.baseMax;
  }

  // Calculate proportional base within the tramo
  const incomeRange = tramo.max - tramo.min;
  // Guard against division by zero (edge case: single-value tramo)
  if (incomeRange === 0) {
    return tramo.baseMin;
  }
  const baseRange = tramo.baseMax - tramo.baseMin;
  const incomePosition = rendimientoMensual - tramo.min;
  const proportion = incomePosition / incomeRange;

  const base = tramo.baseMin + baseRange * proportion;

  // Clamp to tramo limits
  return Math.max(tramo.baseMin, Math.min(tramo.baseMax, base));
}

/**
 * Get contribution rate for a specific year
 */
export function getRateByYear(year: number): number {
  switch (year) {
    case 2024:
      return CUOTA_RATES[2024];
    case 2025:
      return CUOTA_RATES[2025];
    case 2026:
      return CUOTA_RATES[2026];
    default:
      return CUOTA_RATES[2025]; // Default to 2025
  }
}

/**
 * Calculate cuota mensual from base de cotización
 */
function calculateCuotaMensual(baseCotizacion: number, year: number): number {
  const rate = getRateByYear(year);
  return baseCotizacion * rate;
}

/**
 * Check if eligible for Cuota Cero
 */
function checkCuotaCero(comunidadAutonoma: string | null, esPrimeraAlta: boolean): boolean {
  if (!esPrimeraAlta || !comunidadAutonoma) {
    return false;
  }
  return CUOTA_CERO_CCAA.includes(comunidadAutonoma as typeof CUOTA_CERO_CCAA[number]);
}

/**
 * Calculate bonificación (discount)
 * Takes into account Tarifa Plana or Cuota Cero
 */
function calculateBonificacion(
  cuotaMensual: number,
  esPrimeraAlta: boolean,
  tieneCuotaCero: boolean
): number {
  if (tieneCuotaCero) {
    // Cuota Cero = 100% discount for eligible CCAA
    return cuotaMensual;
  }

  if (esPrimeraAlta) {
    // Tarifa Plana - placeholder: using first year rate
    // In reality, this should consider which month the person is in
    return cuotaMensual - TARIFA_PLANA.mes1_12;
  }

  return 0;
}

/**
 * Calculate cuota de autónomos
 */
export function calculateCuotaAutonomos(
  rendimientoAnual: number,
  year: number,
  esPrimeraAlta: boolean,
  comunidadAutonoma: string | null
): CuotaCalculationResult {
  const validRendimiento = sanitizeAmount(rendimientoAnual);
  const rendimientoMensual = validRendimiento / 12;

  const tramos = getTramosByYear(year);
  const { tramo, index } = findTramo(rendimientoMensual, tramos);

  const baseCotizacion = calculateBaseCotizacion(rendimientoMensual, tramo);
  const cuotaMensual = calculateCuotaMensual(baseCotizacion, year);
  const cuotaAnual = cuotaMensual * 12;

  const tieneCuotaCero = checkCuotaCero(comunidadAutonoma, esPrimeraAlta);
  const bonificacion = calculateBonificacion(cuotaMensual, esPrimeraAlta, tieneCuotaCero);
  const cuotaFinal = Math.max(0, cuotaMensual - bonificacion);

  return {
    rendimientoAnual: roundToCents(validRendimiento),
    rendimientoMensual: roundToCents(rendimientoMensual),
    tramo: index,
    baseCotizacion: roundToCents(baseCotizacion),
    cuotaMensual: roundToCents(cuotaMensual),
    cuotaAnual: roundToCents(cuotaAnual),
    bonificacion: roundToCents(bonificacion),
    cuotaFinal: roundToCents(cuotaFinal),
    esPrimeraAlta,
    tieneCuotaCero,
  };
}
