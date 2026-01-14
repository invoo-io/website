/**
 * Gastos Deducibles Calculator Logic
 * Deductible expenses calculator for Spanish autónomos
 *
 * Based on Spanish tax regulations:
 * - Reglamento del IRPF (Real Decreto 439/2007)
 * - Ley del Impuesto sobre la Renta de las Personas Físicas
 * - AEAT criteria for deductibility
 *
 * Formula:
 * - IVA recuperable = Sum of IVA amounts × deductibility percentage per category
 * - Gastos deducibles IRPF = Sum of base amounts × deductibility percentage per category
 * - GDJ (Gastos Difícil Justificación) = Min(rendimiento neto × 5%, €2000)
 * - Ahorro = IVA recuperable + (Gastos deducibles IRPF × tipo marginal IRPF)
 *
 * @see https://sede.agenciatributaria.gob.es/Sede/autonomos-empresarios-profesionales.html
 */

import { IVA_RATES } from './constants';

// Maximum safe value for calculations (prevents overflow)
const MAX_SAFE_AMOUNT = 999_999_999_999.99;

// Maximum GDJ allowed by law (5% with €2000 cap)
const GDJ_MAX_AMOUNT = 2000;
const GDJ_PERCENTAGE = 0.05;

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
 * Expense category with deductibility rules
 */
export interface GastoCategory {
  id: string;
  label: string;
  ivaDeducible: number; // 0, 0.3, 0.5, 1 (percentage as decimal)
  irpfDeducible: number; // 0, 0.3, 0.5, 1 (percentage as decimal)
  requiresProof: 'factura' | 'recibo' | 'both';
  examples?: string[];
}

/**
 * Predefined expense categories with Spanish regulations
 */
export const GASTO_CATEGORIES: Record<string, GastoCategory> = {
  oficina: {
    id: 'oficina',
    label: 'Material de oficina',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['Papel', 'Tinta', 'Carpetas', 'Material de escritorio'],
  },
  informatica: {
    id: 'informatica',
    label: 'Equipos informáticos',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['Ordenador', 'Tablet', 'Móvil', 'Impresora'],
  },
  software: {
    id: 'software',
    label: 'Software y suscripciones',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['SaaS', 'Licencias', 'Dominios', 'Hosting'],
  },
  telefono: {
    id: 'telefono',
    label: 'Teléfono e internet',
    // 50% for mixed use; exclusive professional use = 100%
    // DGT consultation V1233-2025 requires proof of exclusive use
    ivaDeducible: 0.5,
    irpfDeducible: 0.5,
    requiresProof: 'factura',
    examples: ['Línea móvil', 'Fibra', 'Datos móviles'],
  },
  suministros: {
    id: 'suministros',
    label: 'Suministros (teletrabajo)',
    ivaDeducible: 0.3,
    irpfDeducible: 0.3,
    requiresProof: 'factura',
    examples: ['Luz', 'Agua', 'Gas', 'Calefacción'],
  },
  alquiler: {
    id: 'alquiler',
    label: 'Alquiler de local',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['Oficina', 'Coworking', 'Almacén'],
  },
  transporte: {
    id: 'transporte',
    label: 'Transporte',
    ivaDeducible: 0.5,
    irpfDeducible: 0.5,
    requiresProof: 'factura',
    examples: ['Gasolina', 'Parking', 'Peajes', 'Taxis'],
  },
  vehiculo: {
    id: 'vehiculo',
    label: 'Vehículo (afecto a actividad)',
    // IVA: Generally NOT deductible for passenger cars (LIVA Art. 95.Tres)
    // Only 100% for taxis, delivery vehicles, driving schools, commercial vehicles
    // IRPF: 50% for mixed use (professional + personal)
    ivaDeducible: 0,
    irpfDeducible: 0.5,
    requiresProof: 'factura',
    examples: ['Mantenimiento', 'Seguro', 'Reparaciones'],
  },
  formacion: {
    id: 'formacion',
    label: 'Formación profesional',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['Cursos', 'Libros técnicos', 'Conferencias'],
  },
  seguros: {
    id: 'seguros',
    label: 'Seguros',
    ivaDeducible: 0,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['RC profesional', 'Multirriesgo', 'Salud autónomo'],
  },
  comidas: {
    id: 'comidas',
    label: 'Comidas con clientes',
    // IVA NOT deductible for hospitality services (LIVA Art. 96.1.6º)
    // IRPF deductible with 1% of turnover limit, properly justified
    ivaDeducible: 0,
    irpfDeducible: 1,
    requiresProof: 'factura',
    examples: ['Restaurantes', 'Cafeterías'],
  },
  cuota: {
    id: 'cuota',
    label: 'Cuota de autónomos',
    ivaDeducible: 0,
    irpfDeducible: 1,
    requiresProof: 'recibo',
    examples: ['Seguridad Social'],
  },
} as const;

/**
 * Type-safe category ID type
 */
export type GastoCategoryId = keyof typeof GASTO_CATEGORIES;

/**
 * Array of all category IDs for iteration
 */
export const GASTO_CATEGORY_IDS = Object.keys(GASTO_CATEGORIES) as GastoCategoryId[];

/**
 * Recommended display order for expense categories
 */
export const CATEGORY_DISPLAY_ORDER: GastoCategoryId[] = [
  'oficina',
  'informatica',
  'software',
  'telefono',
  'suministros',
  'alquiler',
  'transporte',
  'vehiculo',
  'formacion',
  'seguros',
  'comidas',
  'cuota',
];

/**
 * Breakdown of a single expense category
 */
export interface CategoryBreakdown {
  categoryId: string;
  categoryLabel: string;
  totalAmount: number;
  baseAmount: number;
  ivaAmount: number;
  ivaDeducible: number;
  irpfDeducible: number;
  ivaDeducibleAmount: number;
  irpfDeducibleAmount: number;
}

/**
 * Input for a single expense entry
 */
export interface GastoInput {
  categoryId: string;
  amount: number; // Total amount including IVA
  ivaRate?: number; // If not provided, assumes 21%
}

/**
 * Complete result of gastos deducibles calculation
 */
export interface GastosResult {
  /** Total expenses entered */
  totalGastos: number;
  /** Total base (without IVA) */
  totalBase: number;
  /** Total IVA amount in expenses */
  totalIva: number;
  /** IVA that can be recovered */
  ivaRecuperable: number;
  /** Expenses deductible for IRPF */
  gastosDeduciblesIRPF: number;
  /** GDJ (5% automatic deduction, max €2000) */
  gdj: number;
  /** Tax savings from IVA recovery */
  ahorroIVA: number;
  /** Tax savings from IRPF deductions */
  ahorroIRPF: number;
  /** Total tax savings */
  ahorroTotal: number;
  /** Breakdown by category */
  desglosePorCategoria: CategoryBreakdown[];
}

/**
 * Calculate breakdown for a single expense entry
 */
function calculateCategoryBreakdown(
  input: GastoInput,
  category: GastoCategory
): CategoryBreakdown {
  const totalAmount = sanitizeAmount(input.amount);
  const ivaRate = input.ivaRate ?? IVA_RATES.general;

  // Calculate base and IVA amounts
  const baseAmount = totalAmount / (1 + ivaRate / 100);
  const ivaAmount = totalAmount - baseAmount;

  // Apply deductibility percentages
  const ivaDeducibleAmount = ivaAmount * category.ivaDeducible;
  const irpfDeducibleAmount = baseAmount * category.irpfDeducible;

  return {
    categoryId: category.id,
    categoryLabel: category.label,
    totalAmount: roundToCents(totalAmount),
    baseAmount: roundToCents(baseAmount),
    ivaAmount: roundToCents(ivaAmount),
    ivaDeducible: category.ivaDeducible,
    irpfDeducible: category.irpfDeducible,
    ivaDeducibleAmount: roundToCents(ivaDeducibleAmount),
    irpfDeducibleAmount: roundToCents(irpfDeducibleAmount),
  };
}

/**
 * Calculate gastos deducibles (deductible expenses) for autónomos
 *
 * @param gastos - Array of expense entries
 * @param rendimientoNeto - Net income for GDJ calculation
 * @param tipoMarginalIRPF - Marginal IRPF rate for calculating tax savings
 * @returns Complete calculation result with breakdowns
 *
 * @example
 * const result = calculateGastosDeducibles(
 *   [
 *     { categoryId: 'oficina', amount: 100 },
 *     { categoryId: 'telefono', amount: 60.50 },
 *   ],
 *   30000,
 *   30
 * );
 */
export function calculateGastosDeducibles(
  gastos: GastoInput[],
  rendimientoNeto: number = 0,
  tipoMarginalIRPF: number = 30
): GastosResult {
  const sanitizedRendimiento = sanitizeAmount(rendimientoNeto);
  const sanitizedTipo = Math.min(100, Math.max(0, tipoMarginalIRPF));

  let totalGastos = 0;
  let totalBase = 0;
  let totalIva = 0;
  let ivaRecuperable = 0;
  let gastosDeduciblesIRPF = 0;
  const desglosePorCategoria: CategoryBreakdown[] = [];

  // Process each expense entry
  for (const gasto of gastos) {
    const category = GASTO_CATEGORIES[gasto.categoryId];
    if (!category) continue;

    const breakdown = calculateCategoryBreakdown(gasto, category);
    desglosePorCategoria.push(breakdown);

    totalGastos += breakdown.totalAmount;
    totalBase += breakdown.baseAmount;
    totalIva += breakdown.ivaAmount;
    ivaRecuperable += breakdown.ivaDeducibleAmount;
    gastosDeduciblesIRPF += breakdown.irpfDeducibleAmount;
  }

  // Calculate GDJ (5% of net income, max €2000)
  const gdj = Math.min(sanitizedRendimiento * GDJ_PERCENTAGE, GDJ_MAX_AMOUNT);

  // Calculate tax savings
  const ahorroIVA = ivaRecuperable;
  const ahorroIRPF = (gastosDeduciblesIRPF + gdj) * (sanitizedTipo / 100);
  const ahorroTotal = ahorroIVA + ahorroIRPF;

  return {
    totalGastos: roundToCents(totalGastos),
    totalBase: roundToCents(totalBase),
    totalIva: roundToCents(totalIva),
    ivaRecuperable: roundToCents(ivaRecuperable),
    gastosDeduciblesIRPF: roundToCents(gastosDeduciblesIRPF),
    gdj: roundToCents(gdj),
    ahorroIVA: roundToCents(ahorroIVA),
    ahorroIRPF: roundToCents(ahorroIRPF),
    ahorroTotal: roundToCents(ahorroTotal),
    desglosePorCategoria,
  };
}

/**
 * Get category by ID
 */
export function getCategory(categoryId: string): GastoCategory | undefined {
  return GASTO_CATEGORIES[categoryId];
}

/**
 * Get all available categories as array
 */
export function getAllCategories(): GastoCategory[] {
  return Object.values(GASTO_CATEGORIES);
}

/**
 * Get category IDs as array
 */
export function getCategoryIds(): string[] {
  return Object.keys(GASTO_CATEGORIES);
}
