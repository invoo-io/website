/**
 * Calculator Constants
 * Tax rates and configuration for Spanish calculators
 */

// Maximum safe amount for calculator inputs (prevents overflow and unrealistic values)
export const MAX_CALCULATOR_AMOUNT = 999_999_999_999.99;

// IVA (VAT) rates in Spain
export const IVA_RATES = {
  general: 21,
  reducido: 10,
  superreducido: 4,
  exento: 0,
} as const;

export type IVARateType = keyof typeof IVA_RATES;

// IVA rate descriptions and product examples
export const IVA_RATE_INFO = {
  general: {
    rate: 21,
    examples: {
      es: [
        'Mayoría de productos y servicios',
        'Electrónica y electrodomésticos',
        'Ropa y calzado',
        'Servicios profesionales',
        'Hostelería y restauración',
      ],
      en: [
        'Most products and services',
        'Electronics and appliances',
        'Clothing and footwear',
        'Professional services',
        'Hospitality and restaurants',
      ],
    },
  },
  reducido: {
    rate: 10,
    examples: {
      es: [
        'Alimentos procesados',
        'Transporte de viajeros',
        'Servicios de hostelería',
        'Entradas a espectáculos',
        'Agua para riego',
      ],
      en: [
        'Processed foods',
        'Passenger transport',
        'Hospitality services',
        'Event tickets',
        'Irrigation water',
      ],
    },
  },
  superreducido: {
    rate: 4,
    examples: {
      es: [
        'Pan, leche, huevos, frutas, verduras',
        'Libros, periódicos, revistas',
        'Medicamentos de uso humano',
        'Prótesis y sillas de ruedas',
        'Viviendas de protección oficial',
      ],
      en: [
        'Bread, milk, eggs, fruits, vegetables',
        'Books, newspapers, magazines',
        'Human medicines',
        'Prosthetics and wheelchairs',
        'Social housing',
      ],
    },
  },
  exento: {
    rate: 0,
    examples: {
      es: [
        'Servicios médicos y sanitarios',
        'Educación y formación',
        'Servicios financieros y seguros',
        'Alquiler de vivienda',
        'Loterías y apuestas del Estado',
      ],
      en: [
        'Medical and health services',
        'Education and training',
        'Financial and insurance services',
        'Residential rental',
        'State lotteries and betting',
      ],
    },
  },
} as const;

// Number formatting for Spanish locale
export function formatCurrency(amount: number, locale: string = 'es'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount: number, locale: string = 'es'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(rate: number, locale: string = 'es'): string {
  return new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rate / 100);
}

/**
 * Input parsing and validation utilities for calculator components
 */

/**
 * Parse amount string handling both Spanish (1.234,56) and English (1,234.56) formats.
 * Handles thousand separators and decimal marks correctly for each locale.
 *
 * @param value - The string value to parse
 * @param locale - The locale ('es' or 'en')
 * @returns The parsed number, or 0 if parsing fails
 *
 * @example
 * parseLocalizedAmount('1.234,56', 'es') // returns 1234.56
 * parseLocalizedAmount('1,234.56', 'en') // returns 1234.56
 */
export function parseLocalizedAmount(value: string, locale: string): number {
  if (!value || !value.trim()) return 0;

  let normalized = value.trim();

  if (locale === 'es') {
    // Spanish: remove thousand separators (.) and convert decimal comma to period
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else {
    // English: remove thousand separators (,) and keep decimal period
    normalized = normalized.replace(/,/g, '');
  }

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Error key types for validateAmount function.
 * These correspond to translation keys in the calculators namespace.
 */
export type AmountValidationError =
  | 'errors.invalidNumber'
  | 'errors.negativeNotAllowed'
  | 'errors.amountTooLarge';

/**
 * Validate amount and return error message key if invalid.
 * Returns null if the amount is valid.
 *
 * @param value - The raw string input value
 * @param numericValue - The parsed numeric value
 * @returns Error message key, or null if valid
 */
export function validateAmount(
  value: string,
  numericValue: number
): AmountValidationError | null {
  if (!value || !value.trim()) return null;

  const validChars = /^[\d.,\s]+$/;
  if (!validChars.test(value)) {
    return 'errors.invalidNumber';
  }

  if (numericValue < 0) {
    return 'errors.negativeNotAllowed';
  }

  if (numericValue > MAX_CALCULATOR_AMOUNT) {
    return 'errors.amountTooLarge';
  }

  return null;
}

/**
 * Filter input to only allow valid numeric characters for amount fields.
 * Used in onChange handlers to sanitize user input before validation.
 *
 * @param value - The raw input value
 * @returns Filtered string with only digits, dots, commas, and spaces
 */
export function filterAmountInput(value: string): string {
  return value.replace(/[^\d.,\s]/g, '');
}
