/**
 * Modelo 303 Calculator Logic
 * Spanish VAT quarterly self-assessment form (IVA trimestral)
 *
 * Based on AEAT official documentation and regulations:
 * - Orden EHA/3786/2008 (BOE-A-2008-20953)
 * - Real Decreto 1007/2023 (Verifactu)
 *
 * Formula: Resultado = IVA Repercutido - IVA Soportado Deducible - Compensación periodos anteriores
 *
 * @see https://sede.agenciatributaria.gob.es/Sede/procedimientoini/G414.shtml
 */

import { IVA_RATES } from './constants';

// Maximum safe value for calculations (prevents overflow)
const MAX_SAFE_AMOUNT = 999_999_999_999.99;

// Threshold for considering result as zero (0.5 cents) - accounts for floating point precision
const ZERO_THRESHOLD = 0.005;

/**
 * VAT rates for Modelo 303 calculations
 * Sourced from AEAT official documentation
 */
export const MODELO_303_IVA_RATES = {
  general: IVA_RATES.general,      // 21%
  reducido: IVA_RATES.reducido,    // 10%
  superreducido: IVA_RATES.superreducido, // 4%
} as const;

/**
 * Filing periods for Modelo 303
 */
export type Modelo303Periodo = '1T' | '2T' | '3T' | '4T';

/**
 * Filing type (quarterly for most autónomos/pymes)
 */
export type Modelo303TipoDeclarante = 'trimestral' | 'mensual';

/**
 * Input for IVA repercutido (VAT collected from customers)
 */
export interface IVARepercutidoInput {
  /** Sales base at 21% (Box 07) */
  baseGeneral: number;
  /** Sales base at 10% (Box 04) */
  baseReducido: number;
  /** Sales base at 4% (Box 01) */
  baseSuperreducido: number;
  /** Intra-community acquisitions base (Box 10) - becomes both collected and deductible */
  baseAdquisicionesIntracomunitarias?: number;
  /** Reverse charge operations base (Box 12) - inversión del sujeto pasivo */
  baseInversionSujetoPasivo?: number;
}

/**
 * Input for IVA soportado deducible (deductible VAT paid)
 */
export interface IVASoportadoInput {
  /** Operating expenses base at 21% (part of Box 28) */
  gastosOperativosGeneral: number;
  /** Operating expenses base at 10% */
  gastosOperativosReducido: number;
  /** Operating expenses base at 4% */
  gastosOperativosSuperreducido: number;
  /** Investment goods base at 21% (Box 30) */
  bienesInversionGeneral?: number;
  /** Investment goods base at 10% */
  bienesInversionReducido?: number;
  /** Investment goods base at 4% */
  bienesInversionSuperreducido?: number;
}

/**
 * Full input for Modelo 303 calculation
 */
export interface Modelo303Input {
  /** VAT collected from sales */
  ivaRepercutido: IVARepercutidoInput;
  /** VAT paid on purchases (deductible) */
  ivaSoportado: IVASoportadoInput;
  /** Compensation from previous periods (Box 110 → Box 78) */
  compensacionPeriodosAnteriores?: number;
  /** Prorrata percentage (for businesses with exempt operations) */
  prorrata?: number;
  /** Filing period */
  periodo?: Modelo303Periodo;
}

/**
 * Breakdown of IVA repercutido by rate
 */
export interface IVARepercutidoBreakdown {
  /** Box 01-03: 4% VAT */
  superreducido: {
    base: number;
    cuota: number;
  };
  /** Box 04-06: 10% VAT */
  reducido: {
    base: number;
    cuota: number;
  };
  /** Box 07-09: 21% VAT */
  general: {
    base: number;
    cuota: number;
  };
  /** Box 10-11: EU acquisitions */
  adquisicionesIntracomunitarias: {
    base: number;
    cuota: number;
  };
  /** Box 12-13: Reverse charge */
  inversionSujetoPasivo: {
    base: number;
    cuota: number;
  };
  /** Total VAT collected (Box 27/46) */
  totalCuota: number;
  /** Total tax base */
  totalBase: number;
}

/**
 * Breakdown of IVA soportado by type
 */
export interface IVASoportadoBreakdown {
  /** Box 28-29: Operating expenses */
  gastosOperativos: {
    base: number;
    cuota: number;
  };
  /** Box 30-31: Investment goods */
  bienesInversion: {
    base: number;
    cuota: number;
  };
  /** Box 36-37: EU acquisitions (deductible counterpart) */
  adquisicionesIntracomunitarias: {
    base: number;
    cuota: number;
  };
  /** Box 12-13: Reverse charge (deductible counterpart) */
  inversionSujetoPasivo: {
    base: number;
    cuota: number;
  };
  /** Total deductible VAT before prorrata (Box 64) */
  totalCuotaAntesProrrata: number;
  /** Total deductible VAT after prorrata (Box 70) */
  totalCuota: number;
  /** Prorrata applied */
  prorrataAplicada: number;
}

/**
 * Complete Modelo 303 calculation result
 */
export interface Modelo303Result {
  /** Breakdown of VAT collected */
  ivaRepercutido: IVARepercutidoBreakdown;
  /** Breakdown of deductible VAT */
  ivaSoportado: IVASoportadoBreakdown;
  /** Total VAT collected (Box 69) */
  totalIvaRepercutido: number;
  /** Total deductible VAT (Box 70) */
  totalIvaSoportadoDeducible: number;
  /** Compensation from previous periods applied (Box 78) */
  compensacionAplicada: number;
  /** Final result (Box 71) = Box 69 - Box 70 - Box 78 */
  resultado: number;
  /** Whether result is positive (to pay) or negative (to compensate/refund) */
  resultadoTipo: 'ingresar' | 'compensar' | 'cero';
  /** Amount to pay if positive (Box 71 when > 0) */
  aIngresar: number;
  /** Amount to compensate if negative (Box 87 when < 0) */
  aCompensar: number;
  /** Filing period */
  periodo: Modelo303Periodo;
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
 * Round to 2 decimal places
 */
function roundToCents(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.round(value * 100) / 100;
}

/**
 * Calculate VAT quota from base and rate
 */
function calculateCuota(base: number, rate: number): number {
  return roundToCents(sanitizeAmount(base) * (rate / 100));
}

/**
 * Calculate IVA repercutido (VAT collected)
 */
function calculateIVARepercutido(input: IVARepercutidoInput): IVARepercutidoBreakdown {
  const baseSuperreducido = sanitizeAmount(input.baseSuperreducido);
  const baseReducido = sanitizeAmount(input.baseReducido);
  const baseGeneral = sanitizeAmount(input.baseGeneral);
  const baseIntra = sanitizeAmount(input.baseAdquisicionesIntracomunitarias || 0);
  const baseInversion = sanitizeAmount(input.baseInversionSujetoPasivo || 0);

  const cuotaSuperreducido = calculateCuota(baseSuperreducido, MODELO_303_IVA_RATES.superreducido);
  const cuotaReducido = calculateCuota(baseReducido, MODELO_303_IVA_RATES.reducido);
  const cuotaGeneral = calculateCuota(baseGeneral, MODELO_303_IVA_RATES.general);
  const cuotaIntra = calculateCuota(baseIntra, MODELO_303_IVA_RATES.general);
  const cuotaInversion = calculateCuota(baseInversion, MODELO_303_IVA_RATES.general);

  const totalCuota = roundToCents(
    cuotaSuperreducido + cuotaReducido + cuotaGeneral + cuotaIntra + cuotaInversion
  );
  const totalBase = roundToCents(
    baseSuperreducido + baseReducido + baseGeneral + baseIntra + baseInversion
  );

  return {
    superreducido: { base: roundToCents(baseSuperreducido), cuota: cuotaSuperreducido },
    reducido: { base: roundToCents(baseReducido), cuota: cuotaReducido },
    general: { base: roundToCents(baseGeneral), cuota: cuotaGeneral },
    adquisicionesIntracomunitarias: { base: roundToCents(baseIntra), cuota: cuotaIntra },
    inversionSujetoPasivo: { base: roundToCents(baseInversion), cuota: cuotaInversion },
    totalCuota,
    totalBase,
  };
}

/**
 * Calculate IVA soportado deducible (deductible VAT)
 */
function calculateIVASoportado(
  input: IVASoportadoInput,
  intraBase: number,
  inversionBase: number,
  prorrata: number = 100
): IVASoportadoBreakdown {
  // Operating expenses
  const gastosGeneral = sanitizeAmount(input.gastosOperativosGeneral);
  const gastosReducido = sanitizeAmount(input.gastosOperativosReducido);
  const gastosSuperreducido = sanitizeAmount(input.gastosOperativosSuperreducido);

  const cuotaGastosGeneral = calculateCuota(gastosGeneral, MODELO_303_IVA_RATES.general);
  const cuotaGastosReducido = calculateCuota(gastosReducido, MODELO_303_IVA_RATES.reducido);
  const cuotaGastosSuperreducido = calculateCuota(gastosSuperreducido, MODELO_303_IVA_RATES.superreducido);

  const totalBaseGastos = roundToCents(gastosGeneral + gastosReducido + gastosSuperreducido);
  const totalCuotaGastos = roundToCents(cuotaGastosGeneral + cuotaGastosReducido + cuotaGastosSuperreducido);

  // Investment goods
  const inversionGeneral = sanitizeAmount(input.bienesInversionGeneral || 0);
  const inversionReducido = sanitizeAmount(input.bienesInversionReducido || 0);
  const inversionSuperreducido = sanitizeAmount(input.bienesInversionSuperreducido || 0);

  const cuotaInversionGeneral = calculateCuota(inversionGeneral, MODELO_303_IVA_RATES.general);
  const cuotaInversionReducido = calculateCuota(inversionReducido, MODELO_303_IVA_RATES.reducido);
  const cuotaInversionSuperreducido = calculateCuota(inversionSuperreducido, MODELO_303_IVA_RATES.superreducido);

  const totalBaseInversion = roundToCents(inversionGeneral + inversionReducido + inversionSuperreducido);
  const totalCuotaInversion = roundToCents(cuotaInversionGeneral + cuotaInversionReducido + cuotaInversionSuperreducido);

  // EU acquisitions and reverse charge (mirror from repercutido)
  const cuotaIntra = calculateCuota(intraBase, MODELO_303_IVA_RATES.general);
  const cuotaInversionSP = calculateCuota(inversionBase, MODELO_303_IVA_RATES.general);

  // Total before prorrata
  const totalCuotaAntesProrrata = roundToCents(
    totalCuotaGastos + totalCuotaInversion + cuotaIntra + cuotaInversionSP
  );

  // Apply prorrata (must be between 0 and 100)
  const prorrataPercent = Math.min(100, Math.max(0, prorrata));
  const totalCuota = roundToCents(totalCuotaAntesProrrata * (prorrataPercent / 100));

  return {
    gastosOperativos: { base: totalBaseGastos, cuota: totalCuotaGastos },
    bienesInversion: { base: totalBaseInversion, cuota: totalCuotaInversion },
    adquisicionesIntracomunitarias: { base: roundToCents(intraBase), cuota: cuotaIntra },
    inversionSujetoPasivo: { base: roundToCents(inversionBase), cuota: cuotaInversionSP },
    totalCuotaAntesProrrata,
    totalCuota,
    prorrataAplicada: prorrataPercent,
  };
}

/**
 * Calculate Modelo 303 VAT self-assessment
 *
 * @param input - The calculation input with all VAT data
 * @returns Complete calculation result with all breakdowns
 *
 * @example
 * const result = calculateModelo303({
 *   ivaRepercutido: {
 *     baseGeneral: 10000,
 *     baseReducido: 0,
 *     baseSuperreducido: 0,
 *   },
 *   ivaSoportado: {
 *     gastosOperativosGeneral: 3000,
 *     gastosOperativosReducido: 0,
 *     gastosOperativosSuperreducido: 0,
 *   },
 *   compensacionPeriodosAnteriores: 100,
 * });
 * // result.resultado = 2100 - 630 - 100 = 1370 (a ingresar)
 */
export function calculateModelo303(input: Modelo303Input): Modelo303Result {
  const periodo = input.periodo || '1T';
  const prorrata = input.prorrata ?? 100;

  // Calculate IVA repercutido
  const ivaRepercutido = calculateIVARepercutido(input.ivaRepercutido);

  // Calculate IVA soportado (including mirrored intra/inversion)
  const intraBase = sanitizeAmount(input.ivaRepercutido.baseAdquisicionesIntracomunitarias || 0);
  const inversionBase = sanitizeAmount(input.ivaRepercutido.baseInversionSujetoPasivo || 0);
  const ivaSoportado = calculateIVASoportado(input.ivaSoportado, intraBase, inversionBase, prorrata);

  // Compensation from previous periods
  const compensacionAplicada = sanitizeAmount(input.compensacionPeriodosAnteriores || 0);

  // Final calculation: Box 71 = Box 69 - Box 70 - Box 78
  const totalIvaRepercutido = ivaRepercutido.totalCuota;
  const totalIvaSoportadoDeducible = ivaSoportado.totalCuota;
  const resultado = roundToCents(totalIvaRepercutido - totalIvaSoportadoDeducible - compensacionAplicada);

  // Determine result type
  let resultadoTipo: 'ingresar' | 'compensar' | 'cero';
  let aIngresar = 0;
  let aCompensar = 0;

  if (resultado > ZERO_THRESHOLD) {
    resultadoTipo = 'ingresar';
    aIngresar = resultado;
  } else if (resultado < -ZERO_THRESHOLD) {
    resultadoTipo = 'compensar';
    aCompensar = Math.abs(resultado);
  } else {
    resultadoTipo = 'cero';
  }

  return {
    ivaRepercutido,
    ivaSoportado,
    totalIvaRepercutido: roundToCents(totalIvaRepercutido),
    totalIvaSoportadoDeducible: roundToCents(totalIvaSoportadoDeducible),
    compensacionAplicada: roundToCents(compensacionAplicada),
    resultado: roundToCents(resultado),
    resultadoTipo,
    aIngresar: roundToCents(aIngresar),
    aCompensar: roundToCents(aCompensar),
    periodo,
  };
}

/**
 * Get the filing deadline for a given period
 *
 * @param periodo - The quarter (1T, 2T, 3T, 4T)
 * @param year - The year
 * @returns The deadline date
 */
export function getModelo303Deadline(periodo: Modelo303Periodo, year: number): Date {
  switch (periodo) {
    case '1T':
      return new Date(year, 3, 20); // April 20
    case '2T':
      return new Date(year, 6, 20); // July 20
    case '3T':
      return new Date(year, 9, 20); // October 20
    case '4T':
      return new Date(year + 1, 0, 30); // January 30 of next year
    default:
      return new Date(year, 3, 20);
  }
}

/**
 * Get period name in Spanish
 */
export function getPeriodoLabel(periodo: Modelo303Periodo, locale: string = 'es'): string {
  const labels = {
    es: {
      '1T': 'Primer trimestre (enero-marzo)',
      '2T': 'Segundo trimestre (abril-junio)',
      '3T': 'Tercer trimestre (julio-septiembre)',
      '4T': 'Cuarto trimestre (octubre-diciembre)',
    },
    en: {
      '1T': 'First quarter (January-March)',
      '2T': 'Second quarter (April-June)',
      '3T': 'Third quarter (July-September)',
      '4T': 'Fourth quarter (October-December)',
    },
  };

  return labels[locale as 'es' | 'en']?.[periodo] || labels.es[periodo];
}

/**
 * Calculate simplified Modelo 303 for basic use cases
 * (single VAT rate, no special operations)
 *
 * @param ventasBase - Total sales base (at 21%)
 * @param gastosBase - Total expenses base (at 21%)
 * @param compensacion - Previous period compensation
 * @returns Simplified calculation result
 */
export function calculateModelo303Simple(
  ventasBase: number,
  gastosBase: number,
  compensacion: number = 0
): Modelo303Result {
  return calculateModelo303({
    ivaRepercutido: {
      baseGeneral: ventasBase,
      baseReducido: 0,
      baseSuperreducido: 0,
    },
    ivaSoportado: {
      gastosOperativosGeneral: gastosBase,
      gastosOperativosReducido: 0,
      gastosOperativosSuperreducido: 0,
    },
    compensacionPeriodosAnteriores: compensacion,
  });
}
