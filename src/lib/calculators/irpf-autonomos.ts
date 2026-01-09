/**
 * IRPF Autónomos Calculator Logic
 * Calculations for Spanish Income Tax (IRPF) for self-employed individuals
 *
 * Legal basis:
 * - Ley 35/2006, de 28 de noviembre, del Impuesto sobre la Renta de las Personas Físicas (LIRPF)
 * - Real Decreto 439/2007, Reglamento del IRPF
 *
 * Sources:
 * - AEAT Manual Práctico IRPF 2024: https://sede.agenciatributaria.gob.es/Sede/Ayuda/24Manual/100.html
 * - Gravamen Estatal - Base General: https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/irpf-2024/c15-calculo-impuesto-determinacion-cuotas-integras/gravamen-base-liquidable-general/gravamen-estatal.html
 */

export interface IRPFTramo {
  desde: number;
  hasta: number | null; // null = unlimited
  tipo: number; // percentage (e.g., 19 = 19%)
  cuotaAcumulada: number; // accumulated quota up to this bracket
}

export interface IRPFCalculationResult {
  // Input values
  ingresosBrutos: number;
  gastosDeducibles: number;
  gastosDificilJustificacion: number;
  seguridadSocial: number;
  rendimientoNeto: number;

  // Reductions
  minimoPersonal: number;
  minimoDescendientes: number;
  minimoTotal: number;
  baseLiquidable: number;

  // Tax calculation
  cuotaIntegra: number;
  retencionesYaPagadas: number;
  cuotaDiferencial: number;

  // Summary
  tipoEfectivo: number; // effective tax rate
  netoAnual: number; // net income after all taxes
  netoMensual: number;

  // Breakdown by brackets
  desglosePorTramos: Array<{
    tramo: number;
    base: number;
    tipo: number;
    cuota: number;
  }>;
}

export interface IRPFInputParams {
  ingresosBrutos: number;
  gastosDeducibles: number;
  seguridadSocial: number; // Cuota de autónomos paid
  esEstimacionSimplificada: boolean;
  numDescendientes: number;
  descendientesMenores3: number;
  edadContribuyente: number;
  retencionesFacturas: number; // IRPF retentions already paid on invoices (7% or 15%)
  year: number;
}

// IRPF Tax Brackets 2024-2025 (Combined State + Regional - General scale)
// Source: AEAT Manual Práctico IRPF 2024
// Note: These are the combined (state + regional) rates
export const IRPF_TRAMOS_2024: IRPFTramo[] = [
  { desde: 0, hasta: 12450, tipo: 19, cuotaAcumulada: 0 },
  { desde: 12450, hasta: 20200, tipo: 24, cuotaAcumulada: 2365.5 },
  { desde: 20200, hasta: 35200, tipo: 30, cuotaAcumulada: 4225.5 },
  { desde: 35200, hasta: 60000, tipo: 37, cuotaAcumulada: 8725.5 },
  { desde: 60000, hasta: 300000, tipo: 45, cuotaAcumulada: 17901.5 },
  { desde: 300000, hasta: null, tipo: 47, cuotaAcumulada: 125901.5 },
];

// 2025 maintains same brackets as 2024
export const IRPF_TRAMOS_2025: IRPFTramo[] = IRPF_TRAMOS_2024;

// 2026 maintains same brackets (no announced changes)
export const IRPF_TRAMOS_2026: IRPFTramo[] = IRPF_TRAMOS_2024;

// Mínimo personal y familiar 2024-2026
// Source: https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-especifico-irpf-2024-personas-anos/minimos/minimo-personal-familiar.html
export const MINIMO_PERSONAL = {
  base: 5550, // Under 65
  mayor65: 6700, // 65 or older (5550 + 1150)
  mayor75: 8100, // 75 or older (5550 + 1150 + 1400)
} as const;

export const MINIMO_DESCENDIENTES = {
  primero: 2400,
  segundo: 2700,
  tercero: 4000,
  cuartoYSiguientes: 4500,
  menorDe3Anos: 2800, // Additional for children under 3
} as const;

// Gastos de difícil justificación (5% for estimación directa simplificada)
// Source: https://sede.agenciatributaria.gob.es/Sede/irpf/empresarios-individuales-profesionales/regimenes-determinar-rendimiento-actividad/estimacion-directa-simplificada.html
export const GASTOS_DIFICIL_JUSTIFICACION = {
  porcentaje: 5,
  maximo: 2000,
} as const;

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
 * Get IRPF brackets for a specific year
 */
export function getTramosByYear(year: number): IRPFTramo[] {
  switch (year) {
    case 2024:
      return IRPF_TRAMOS_2024;
    case 2025:
      return IRPF_TRAMOS_2025;
    case 2026:
      return IRPF_TRAMOS_2026;
    default:
      return IRPF_TRAMOS_2025;
  }
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
  total += menoresDe3 * MINIMO_DESCENDIENTES.menorDe3Anos;

  return total;
}

/**
 * Calculate gastos de difícil justificación (5% of net income before this deduction)
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
 * Calculate cuota íntegra corresponding to mínimo personal y familiar
 * This is calculated applying the same brackets to the minimum amounts
 */
function calcularCuotaMinimos(minimoTotal: number, tramos: IRPFTramo[]): number {
  const { cuota } = calcularCuotaIntegra(minimoTotal, tramos);
  return cuota;
}

/**
 * Main IRPF calculation function
 */
export function calculateIRPFAutonomos(params: IRPFInputParams): IRPFCalculationResult {
  const {
    ingresosBrutos,
    gastosDeducibles,
    seguridadSocial,
    esEstimacionSimplificada,
    numDescendientes,
    descendientesMenores3,
    edadContribuyente,
    retencionesFacturas,
    year,
  } = params;

  // Sanitize inputs
  const ingresos = sanitizeAmount(ingresosBrutos);
  const gastos = sanitizeAmount(gastosDeducibles);
  const ss = sanitizeAmount(seguridadSocial);
  const retenciones = sanitizeAmount(retencionesFacturas);

  // Step 1: Calculate rendimiento neto previo
  // Rendimiento neto = Ingresos - Gastos deducibles - Seguridad Social
  const rendimientoNetoPrevio = Math.max(0, ingresos - gastos - ss);

  // Step 2: Calculate gastos de difícil justificación (5% with €2,000 max)
  const gastosDificilJustificacion = calcularGastosDificilJustificacion(
    rendimientoNetoPrevio,
    esEstimacionSimplificada
  );

  // Step 3: Calculate rendimiento neto definitivo
  const rendimientoNeto = Math.max(0, rendimientoNetoPrevio - gastosDificilJustificacion);

  // Step 4: Calculate mínimo personal y familiar
  const minimoPersonal = calcularMinimoPersonal(edadContribuyente);
  const minimoDescendientes = calcularMinimoDescendientes(
    numDescendientes,
    descendientesMenores3
  );
  const minimoTotal = minimoPersonal + minimoDescendientes;

  // Step 5: Calculate base liquidable
  // Base liquidable = Rendimiento neto (cannot be negative after applying minimums)
  const baseLiquidable = rendimientoNeto;

  // Step 6: Get tax brackets for the year
  const tramos = getTramosByYear(year);

  // Step 7: Calculate cuota íntegra on base liquidable
  const { cuota: cuotaSobreBase, desglose } = calcularCuotaIntegra(baseLiquidable, tramos);

  // Step 8: Calculate cuota corresponding to mínimos
  const cuotaMinimos = calcularCuotaMinimos(minimoTotal, tramos);

  // Step 9: Calculate cuota íntegra final
  // Cuota íntegra = Cuota sobre base - Cuota sobre mínimos
  const cuotaIntegra = Math.max(0, cuotaSobreBase - cuotaMinimos);

  // Step 10: Calculate cuota diferencial (what you owe or get back)
  // Cuota diferencial = Cuota íntegra - Retenciones ya pagadas
  const cuotaDiferencial = cuotaIntegra - retenciones;

  // Step 11: Calculate effective tax rate
  const tipoEfectivo = rendimientoNeto > 0 ? (cuotaIntegra / rendimientoNeto) * 100 : 0;

  // Step 12: Calculate net annual and monthly income
  // Neto = Ingresos brutos - Gastos - SS - IRPF total (cuota íntegra)
  const netoAnual = ingresos - gastos - ss - cuotaIntegra;
  const netoMensual = netoAnual / 12;

  return {
    ingresosBrutos: roundToCents(ingresos),
    gastosDeducibles: roundToCents(gastos),
    gastosDificilJustificacion: roundToCents(gastosDificilJustificacion),
    seguridadSocial: roundToCents(ss),
    rendimientoNeto: roundToCents(rendimientoNeto),

    minimoPersonal: roundToCents(minimoPersonal),
    minimoDescendientes: roundToCents(minimoDescendientes),
    minimoTotal: roundToCents(minimoTotal),
    baseLiquidable: roundToCents(baseLiquidable),

    cuotaIntegra: roundToCents(cuotaIntegra),
    retencionesYaPagadas: roundToCents(retenciones),
    cuotaDiferencial: roundToCents(cuotaDiferencial),

    tipoEfectivo: roundToCents(tipoEfectivo),
    netoAnual: roundToCents(netoAnual),
    netoMensual: roundToCents(netoMensual),

    desglosePorTramos: desglose,
  };
}

/**
 * Helper function to estimate quarterly IRPF payment (Modelo 130)
 * This is 20% of rendimiento neto quarterly
 */
export function calculateModelo130(rendimientoNetoTrimestral: number): number {
  return roundToCents(sanitizeAmount(rendimientoNetoTrimestral) * 0.2);
}

/**
 * Calculate estimated retenciones based on gross income and retention rate
 */
export function calculateRetenciones(
  ingresosBrutos: number,
  tipoRetencion: number
): number {
  return roundToCents(sanitizeAmount(ingresosBrutos) * (tipoRetencion / 100));
}
