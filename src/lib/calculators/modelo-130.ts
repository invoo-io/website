/**
 * Modelo 130 Calculator Logic
 * Spanish IRPF quarterly advance payment for self-employed (Pago fraccionado)
 *
 * Based on AEAT official documentation and regulations:
 * - Ley 35/2006, de 28 de noviembre, del IRPF
 * - Real Decreto 439/2007, Reglamento del IRPF (Art. 109-111)
 * - Orden EHA/672/2007, Modelo 130
 *
 * Formula: Resultado = (Rendimiento Neto Acumulado × 20%) - Pagos Anteriores - Retenciones
 *
 * @see https://sede.agenciatributaria.gob.es/Sede/procedimientoini/G601.shtml
 * @see https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/modelo-130.html
 */

// Maximum safe value for calculations (prevents overflow)
const MAX_SAFE_AMOUNT = 999_999_999_999.99;

// Threshold for considering result as zero (0.5 cents)
const ZERO_THRESHOLD = 0.005;

// IRPF advance payment rate for Modelo 130
export const MODELO_130_IRPF_RATE = 20; // 20% fixed rate

// Threshold for exemption: if >70% of income has IRPF retention
export const EXEMPTION_THRESHOLD = 70;

/**
 * Filing periods for Modelo 130
 */
export type Modelo130Periodo = '1T' | '2T' | '3T' | '4T';

/**
 * Input for Modelo 130 calculation
 */
export interface Modelo130Input {
  /** Accumulated gross income YTD (Casilla 01) */
  ingresosAcumulados: number;
  /** Accumulated deductible expenses YTD (Casilla 02) */
  gastosAcumulados: number;
  /** Previous quarterly payments already made (Casillas 04-06 previous M130) */
  pagosAnteriores: number;
  /** IRPF retentions on invoices YTD (Casilla 07) */
  retencionesFacturas: number;
  /** Filing period */
  periodo?: Modelo130Periodo;
  /** Year for deadline calculation */
  year?: number;
}

/**
 * Complete Modelo 130 calculation result
 */
export interface Modelo130Result {
  /** Accumulated gross income (Casilla 01) */
  ingresosAcumulados: number;
  /** Accumulated deductible expenses (Casilla 02) */
  gastosAcumulados: number;
  /** Net income (Casilla 03 = Casilla 01 - Casilla 02) */
  rendimientoNeto: number;
  /** 20% of net income (Casilla 04) */
  cuota20Porciento: number;
  /** Previous quarterly payments (Casilla 05) */
  pagosAnteriores: number;
  /** IRPF retentions (Casilla 07) */
  retencionesFacturas: number;
  /** Final result (Casilla 07 final = Casilla 04 - Casilla 05 - Casilla 07 retenciones) */
  resultado: number;
  /** Amount to pay if positive */
  aIngresar: number;
  /** Amount to compensate if negative (not applicable in M130, becomes 0) */
  aNegativo: number;
  /** Result type */
  resultadoTipo: 'ingresar' | 'negativo' | 'cero';
  /** Filing period */
  periodo: Modelo130Periodo;
  /** Filing deadline */
  fechaLimite: Date;
  /** Whether potentially exempt from filing (>70% income with retention) */
  posibleExencion: boolean;
  /** Percentage of income with retention */
  porcentajeConRetencion: number;
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
 * Get the filing deadline for a given period
 *
 * @param periodo - The quarter (1T, 2T, 3T, 4T)
 * @param year - The year
 * @returns The deadline date
 */
export function getModelo130Deadline(periodo: Modelo130Periodo, year: number): Date {
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
 * Get period name in Spanish/English
 */
export function getModelo130PeriodoLabel(periodo: Modelo130Periodo, locale: string = 'es'): string {
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
 * Calculate Modelo 130 quarterly IRPF advance payment
 *
 * The calculation follows AEAT guidelines:
 * 1. Rendimiento neto = Ingresos acumulados - Gastos acumulados
 * 2. Cuota = Rendimiento neto × 20%
 * 3. Resultado = Cuota - Pagos anteriores - Retenciones
 *
 * If the result is negative, no payment is due (M130 doesn't allow compensation,
 * unlike M303 for VAT). The negative amount can reduce future quarters' payments
 * within the same fiscal year.
 *
 * @param input - The calculation input
 * @returns Complete calculation result
 *
 * @example
 * const result = calculateModelo130({
 *   ingresosAcumulados: 15000,
 *   gastosAcumulados: 3000,
 *   pagosAnteriores: 0,
 *   retencionesFacturas: 1000,
 *   periodo: '1T',
 * });
 * // Rendimiento neto = 15000 - 3000 = 12000
 * // 20% = 2400
 * // Resultado = 2400 - 0 - 1000 = 1400 (a ingresar)
 */
export function calculateModelo130(input: Modelo130Input): Modelo130Result {
  const periodo = input.periodo || '1T';
  const year = input.year || new Date().getFullYear();

  // Sanitize inputs
  const ingresos = sanitizeAmount(input.ingresosAcumulados);
  const gastos = sanitizeAmount(input.gastosAcumulados);
  const pagosAnteriores = sanitizeAmount(input.pagosAnteriores);
  const retenciones = sanitizeAmount(input.retencionesFacturas);

  // Step 1: Calculate net income (Casilla 03)
  // Rendimiento neto = Ingresos - Gastos (can be negative)
  const rendimientoNeto = ingresos - gastos;

  // Step 2: Calculate 20% of net income (Casilla 04)
  // Only positive net income generates tax liability
  const cuota20Porciento = rendimientoNeto > 0
    ? roundToCents(rendimientoNeto * (MODELO_130_IRPF_RATE / 100))
    : 0;

  // Step 3: Calculate final result (Casilla 07 final)
  // Resultado = Cuota 20% - Pagos anteriores - Retenciones
  const resultadoBruto = cuota20Porciento - pagosAnteriores - retenciones;
  const resultado = roundToCents(resultadoBruto);

  // Step 4: Determine result type
  // In Modelo 130, negative results don't generate a refund within the form
  // They become 0 (no payment due) but the full IRPF is settled in annual return
  let resultadoTipo: 'ingresar' | 'negativo' | 'cero';
  let aIngresar = 0;
  let aNegativo = 0;

  if (resultado > ZERO_THRESHOLD) {
    resultadoTipo = 'ingresar';
    aIngresar = resultado;
  } else if (resultado < -ZERO_THRESHOLD) {
    resultadoTipo = 'negativo';
    aNegativo = Math.abs(resultado);
  } else {
    resultadoTipo = 'cero';
  }

  // Step 5: Check if potentially exempt from filing
  // Autónomos with >70% of income subject to retention may be exempt
  // This is calculated based on the portion of income that generated retentions
  // Assuming standard 15% retention rate for the calculation
  const STANDARD_RETENTION_RATE = 0.15;
  const ingresosConRetencion = retenciones > 0 && ingresos > 0
    ? Math.min(retenciones / STANDARD_RETENTION_RATE, ingresos)
    : 0;
  const porcentajeConRetencion = ingresos > 0
    ? roundToCents((ingresosConRetencion / ingresos) * 100)
    : 0;
  const posibleExencion = porcentajeConRetencion >= EXEMPTION_THRESHOLD;

  // Step 6: Get filing deadline
  const fechaLimite = getModelo130Deadline(periodo, year);

  return {
    ingresosAcumulados: roundToCents(ingresos),
    gastosAcumulados: roundToCents(gastos),
    rendimientoNeto: roundToCents(rendimientoNeto),
    cuota20Porciento,
    pagosAnteriores: roundToCents(pagosAnteriores),
    retencionesFacturas: roundToCents(retenciones),
    resultado: roundToCents(Math.max(0, resultado)), // M130 result is always >= 0
    aIngresar: roundToCents(aIngresar),
    aNegativo: roundToCents(aNegativo),
    resultadoTipo,
    periodo,
    fechaLimite,
    posibleExencion,
    porcentajeConRetencion,
  };
}

/**
 * Calculate simplified Modelo 130 for basic use cases
 *
 * @param ingresosAcumulados - Total accumulated income YTD
 * @param gastosAcumulados - Total accumulated expenses YTD
 * @param pagosAnteriores - Sum of previous M130 payments this year
 * @param retencionesFacturas - IRPF retentions on invoices YTD
 * @returns Simplified calculation result
 */
export function calculateModelo130Simple(
  ingresosAcumulados: number,
  gastosAcumulados: number,
  pagosAnteriores: number = 0,
  retencionesFacturas: number = 0
): Modelo130Result {
  return calculateModelo130({
    ingresosAcumulados,
    gastosAcumulados,
    pagosAnteriores,
    retencionesFacturas,
  });
}

/**
 * Check if autónomo might be exempt from filing Modelo 130
 *
 * Per AEAT regulations, autónomos in estimación directa are exempt if:
 * - At least 70% of income is subject to IRPF retention
 *
 * @param ingresosConRetencion - Income that had IRPF retention applied
 * @param ingresosTotales - Total income
 * @returns Whether potentially exempt
 */
export function checkModelo130Exemption(
  ingresosConRetencion: number,
  ingresosTotales: number
): boolean {
  if (ingresosTotales <= 0) return false;
  const porcentaje = (ingresosConRetencion / ingresosTotales) * 100;
  return porcentaje >= EXEMPTION_THRESHOLD;
}

/**
 * Format result for display in Spanish
 */
export function formatModelo130ResultMessage(
  result: Modelo130Result,
  locale: string = 'es'
): string {
  const messages = {
    es: {
      ingresar: `Deberás ingresar ${result.aIngresar.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} a Hacienda`,
      negativo: `El resultado es negativo (${result.aNegativo.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}). No tienes que pagar este trimestre. El exceso se regulariza en la Renta anual.`,
      cero: 'El resultado es cero. No tienes que ingresar nada este trimestre.',
    },
    en: {
      ingresar: `You must pay ${result.aIngresar.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })} to the Tax Agency`,
      negativo: `The result is negative (${result.aNegativo.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}). No payment due this quarter. The excess is settled in the annual return.`,
      cero: 'The result is zero. No payment due this quarter.',
    },
  };

  const lang = locale as 'es' | 'en';
  return messages[lang]?.[result.resultadoTipo] || messages.es[result.resultadoTipo];
}
