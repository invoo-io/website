/**
 * Invoice (Factura) Calculator Logic
 * Calculations for Spanish invoices including IVA and IRPF retention
 *
 * Based on Spanish tax legislation:
 * - Ley 37/1992 del IVA (BOE-A-1992-28740)
 * - Reglamento IRPF Art. 95 and Ley IRPF Art. 101
 *
 * @see https://www.boe.es/buscar/doc.php?id=BOE-A-1992-28740
 * @see https://sede.agenciatributaria.gob.es
 */

export interface FacturaCalculationResult {
  base: number;
  ivaRate: number;
  ivaAmount: number;
  irpfRate: number;
  irpfAmount: number;
  totalFactura: number; // Base + IVA
  netoACobrar: number; // Base + IVA - IRPF
}

/**
 * Maximum safe value for calculations
 * Prevents overflow in financial calculations while supporting realistic invoice amounts
 * (e.g., large construction projects, enterprise contracts up to ~1 trillion EUR)
 * Matches the constant used in other calculators for consistency
 */
const MAX_SAFE_AMOUNT = 999999999999.99;

/**
 * IRPF retention rates for professionals (autónomos)
 * Based on Reglamento IRPF Art. 95
 */
export const IRPF_RATES = {
  standard: 15, // Standard rate for professionals
  nuevo: 7, // New autónomos (first 3 years)
  sin: 0, // No retention (for individuals or exempt)
} as const;

export type IRPFRateType = keyof typeof IRPF_RATES;

/**
 * IRPF rate descriptions
 */
export const IRPF_RATE_INFO = {
  standard: {
    rate: 15,
    examples: {
      es: [
        'Tipo general para profesionales autónomos',
        'Actividades de la sección 2ª del IAE',
        'Facturación a empresas y profesionales',
      ],
      en: [
        'Standard rate for self-employed professionals',
        'Activities in IAE section 2',
        'Invoicing to companies and professionals',
      ],
    },
  },
  nuevo: {
    rate: 7,
    examples: {
      es: [
        'Nuevos autónomos (año de alta + 2 siguientes)',
        'Actividades artísticas y culturales',
        'Debe comunicarse al pagador',
      ],
      en: [
        'New self-employed (start year + 2 following)',
        'Artistic and cultural activities',
        'Must be communicated to the payer',
      ],
    },
  },
  sin: {
    rate: 0,
    examples: {
      es: [
        'Facturas a particulares',
        'Actividades empresariales (sección 1ª IAE)',
        'Operaciones exentas de retención',
      ],
      en: [
        'Invoices to individuals',
        'Business activities (IAE section 1)',
        'Retention-exempt operations',
      ],
    },
  },
} as const;

/**
 * Sanitize and validate numeric input
 * Returns 0 for invalid values
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
 * Sanitize and validate rate input
 * Returns 0 for invalid values, caps at 100%
 */
function sanitizeRate(rate: number): number {
  if (!Number.isFinite(rate) || rate < 0) {
    return 0;
  }
  if (rate > 100) {
    return 100;
  }
  return rate;
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

/**
 * Calculate invoice totals from base amount
 *
 * Formula:
 * - IVA = Base × IVA Rate
 * - IRPF = Base × IRPF Rate (retention applied to base, not total)
 * - Total Factura = Base + IVA
 * - Neto a Cobrar = Total Factura - IRPF = Base + IVA - IRPF
 *
 * @param base - The base amount (base imponible) before taxes
 * @param ivaRate - The IVA rate (e.g., 21 for 21%)
 * @param irpfRate - The IRPF retention rate (e.g., 15 for 15%)
 * @returns Invoice calculation result
 */
export function calculateFactura(
  base: number,
  ivaRate: number,
  irpfRate: number
): FacturaCalculationResult {
  const validBase = sanitizeAmount(base);
  const validIvaRate = sanitizeRate(ivaRate);
  const validIrpfRate = sanitizeRate(irpfRate);

  // Calculate IVA (applied to base)
  const ivaAmount = validBase * (validIvaRate / 100);

  // Calculate IRPF retention (applied to base, not total)
  const irpfAmount = validBase * (validIrpfRate / 100);

  // Total invoice amount (what the client pays)
  const totalFactura = validBase + ivaAmount;

  // Net amount to receive (total minus IRPF retention)
  const netoACobrar = totalFactura - irpfAmount;

  return {
    base: roundToCents(validBase),
    ivaRate: validIvaRate,
    ivaAmount: roundToCents(ivaAmount),
    irpfRate: validIrpfRate,
    irpfAmount: roundToCents(irpfAmount),
    totalFactura: roundToCents(totalFactura),
    netoACobrar: roundToCents(netoACobrar),
  };
}

/**
 * Calculate base amount from net to receive (reverse calculation)
 *
 * Given: netoACobrar = Base + (Base × IVA) - (Base × IRPF)
 * Therefore: netoACobrar = Base × (1 + IVA - IRPF)
 * So: Base = netoACobrar / (1 + IVA - IRPF)
 *
 * @param netoACobrar - The net amount to receive
 * @param ivaRate - The IVA rate (e.g., 21 for 21%)
 * @param irpfRate - The IRPF retention rate (e.g., 15 for 15%)
 * @returns Invoice calculation result
 */
export function calculateFacturaFromNeto(
  netoACobrar: number,
  ivaRate: number,
  irpfRate: number
): FacturaCalculationResult {
  const validNeto = sanitizeAmount(netoACobrar);
  const validIvaRate = sanitizeRate(ivaRate);
  const validIrpfRate = sanitizeRate(irpfRate);

  // Calculate the divisor: 1 + IVA% - IRPF%
  const divisor = 1 + validIvaRate / 100 - validIrpfRate / 100;

  // Avoid division by zero or negative results
  const base = divisor > 0 ? validNeto / divisor : validNeto;

  // Now calculate all amounts from the derived base
  return calculateFactura(base, validIvaRate, validIrpfRate);
}

/**
 * Calculate base amount from total invoice (reverse calculation)
 *
 * Given: totalFactura = Base + (Base × IVA)
 * Therefore: totalFactura = Base × (1 + IVA)
 * So: Base = totalFactura / (1 + IVA)
 *
 * @param totalFactura - The total invoice amount (Base + IVA)
 * @param ivaRate - The IVA rate (e.g., 21 for 21%)
 * @param irpfRate - The IRPF retention rate (e.g., 15 for 15%)
 * @returns Invoice calculation result
 */
export function calculateFacturaFromTotal(
  totalFactura: number,
  ivaRate: number,
  irpfRate: number
): FacturaCalculationResult {
  const validTotal = sanitizeAmount(totalFactura);
  const validIvaRate = sanitizeRate(ivaRate);
  const validIrpfRate = sanitizeRate(irpfRate);

  // Calculate base from total: Base = Total / (1 + IVA%)
  const divisor = 1 + validIvaRate / 100;
  const base = divisor > 0 ? validTotal / divisor : validTotal;

  // Now calculate all amounts from the derived base
  return calculateFactura(base, validIvaRate, validIrpfRate);
}

/**
 * Calculate invoice based on direction
 *
 * @param amount - The amount to calculate from
 * @param ivaRate - The IVA rate
 * @param irpfRate - The IRPF retention rate
 * @param direction - 'fromBase' to calculate from base, 'fromTotal' to extract from total, 'fromNeto' to calculate from net
 */
export function calculateFacturaByDirection(
  amount: number,
  ivaRate: number,
  irpfRate: number,
  direction: 'fromBase' | 'fromTotal' | 'fromNeto'
): FacturaCalculationResult {
  switch (direction) {
    case 'fromBase':
      return calculateFactura(amount, ivaRate, irpfRate);
    case 'fromTotal':
      return calculateFacturaFromTotal(amount, ivaRate, irpfRate);
    case 'fromNeto':
      return calculateFacturaFromNeto(amount, ivaRate, irpfRate);
  }
}
