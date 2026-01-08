/**
 * IVA (VAT) Calculator Logic
 * Calculations for Spanish IVA (Impuesto sobre el Valor Añadido)
 */

export interface IVACalculationResult {
  base: number;
  ivaRate: number;
  ivaAmount: number;
  total: number;
}

// Maximum safe value for calculations (prevents overflow)
const MAX_SAFE_AMOUNT = 999999999999.99;

/**
 * Sanitize and validate numeric input
 * Returns 0 for invalid values
 */
function sanitizeAmount(value: number): number {
  // Handle NaN, Infinity, and negative values
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  // Cap at maximum safe amount
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
  // Cap rate at 100% (reasonable maximum for tax rates)
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
 * Calculate IVA from a base amount (add IVA to base)
 * @param base - The base amount before IVA
 * @param rate - The IVA rate (e.g., 21 for 21%)
 * @returns IVA calculation result
 */
export function calculateIVAFromBase(
  base: number,
  rate: number
): IVACalculationResult {
  const validBase = sanitizeAmount(base);
  const validRate = sanitizeRate(rate);
  const ivaAmount = validBase * (validRate / 100);

  return {
    base: roundToCents(validBase),
    ivaRate: validRate,
    ivaAmount: roundToCents(ivaAmount),
    total: roundToCents(validBase + ivaAmount),
  };
}

/**
 * Extract IVA from a total amount (remove IVA from total)
 * @param total - The total amount including IVA
 * @param rate - The IVA rate (e.g., 21 for 21%)
 * @returns IVA calculation result
 */
export function extractIVAFromTotal(
  total: number,
  rate: number
): IVACalculationResult {
  const validTotal = sanitizeAmount(total);
  const validRate = sanitizeRate(rate);

  // Avoid division by zero
  const divisor = 1 + validRate / 100;
  const base = divisor !== 0 ? validTotal / divisor : validTotal;
  const ivaAmount = validTotal - base;

  return {
    base: roundToCents(base),
    ivaRate: validRate,
    ivaAmount: roundToCents(ivaAmount),
    total: roundToCents(validTotal),
  };
}

/**
 * Calculate IVA based on calculation direction
 * @param amount - The amount to calculate from
 * @param rate - The IVA rate
 * @param direction - 'fromBase' to add IVA, 'fromTotal' to extract IVA
 */
export function calculateIVA(
  amount: number,
  rate: number,
  direction: 'fromBase' | 'fromTotal'
): IVACalculationResult {
  if (direction === 'fromBase') {
    return calculateIVAFromBase(amount, rate);
  }
  return extractIVAFromTotal(amount, rate);
}

/**
 * Parse user input string to number safely
 * Returns 0 for invalid input
 */
export function parseAmountInput(input: string): number {
  if (!input || typeof input !== 'string') {
    return 0;
  }

  // Remove any non-numeric characters except decimal point and minus
  const cleaned = input.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);

  return Number.isFinite(parsed) ? parsed : 0;
}
