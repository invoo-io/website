/**
 * Unit tests for Precio Hora (Hourly Rate) Calculator
 * Tests calculation logic, edge cases, and input validation
 */

import { describe, it, expect } from 'vitest';
import {
  calculatePrecioHora,
  calculateIRPF,
  getEffectiveIRPFRate,
  getMinimoPersonal,
  IRPF_TRAMOS,
  PrecioHoraCalculationResult,
} from '../precio-hora';

describe('calculatePrecioHora', () => {
  describe('basic calculations', () => {
    it('calculates hourly rate for typical freelancer scenario', () => {
      const result = calculatePrecioHora(30000, 40, 4, 20);

      // With 40h/week, 48 working weeks = 1920 billable hours
      expect(result.horasFacturablesAnuales).toBe(1920);

      // Hourly rate should be reasonable (€20-50/h range for €30k net)
      expect(result.precioPorHora).toBeGreaterThan(20);
      expect(result.precioPorHora).toBeLessThan(50);

      // Daily rate should be 8x hourly
      expect(result.tarifaDiaria).toBeCloseTo(result.precioPorHora * 8, 1);

      // Monthly should be annual / 12
      expect(result.ingresoMensualBruto).toBeCloseTo(result.ingresoAnualBruto / 12, 1);
    });

    it('returns higher rate for fewer working hours', () => {
      const fullTime = calculatePrecioHora(30000, 40, 4, 20);
      const partTime = calculatePrecioHora(30000, 20, 4, 20);

      // Part-time should have higher hourly rate to achieve same net
      expect(partTime.precioPorHora).toBeGreaterThan(fullTime.precioPorHora);

      // But same net income
      expect(partTime.ingresoNetoDeseado).toBe(fullTime.ingresoNetoDeseado);
    });

    it('returns higher rate with more vacation weeks', () => {
      const lessVacation = calculatePrecioHora(30000, 40, 2, 20);
      const moreVacation = calculatePrecioHora(30000, 40, 6, 20);

      // More vacation = fewer billable hours = higher hourly rate needed
      expect(moreVacation.precioPorHora).toBeGreaterThan(lessVacation.precioPorHora);
    });

    it('returns higher rate with more expenses', () => {
      const lowExpenses = calculatePrecioHora(30000, 40, 4, 10);
      const highExpenses = calculatePrecioHora(30000, 40, 4, 40);

      // Higher expenses = need more gross to get same net
      expect(highExpenses.ingresoAnualBruto).toBeGreaterThan(lowExpenses.ingresoAnualBruto);
      expect(highExpenses.precioPorHora).toBeGreaterThan(lowExpenses.precioPorHora);
    });
  });

  describe('input validation and sanitization', () => {
    it('handles zero income', () => {
      const result = calculatePrecioHora(0, 40, 4, 20);

      expect(result.ingresoNetoDeseado).toBe(0);
      expect(result.precioPorHora).toBe(0);
      expect(result.ingresoAnualBruto).toBe(0);
    });

    it('handles negative income by treating as zero', () => {
      const result = calculatePrecioHora(-10000, 40, 4, 20);

      expect(result.ingresoNetoDeseado).toBe(0);
      expect(result.precioPorHora).toBe(0);
    });

    it('clamps hours to valid range (1-80)', () => {
      const tooLow = calculatePrecioHora(30000, 0, 4, 20);
      const tooHigh = calculatePrecioHora(30000, 100, 4, 20);

      // Hours should be clamped to 1 minimum
      expect(tooLow.horasSemanales).toBe(1);

      // Hours should be clamped to 80 maximum
      expect(tooHigh.horasSemanales).toBe(80);
    });

    it('clamps vacation weeks to valid range (0-51)', () => {
      const tooLow = calculatePrecioHora(30000, 40, -5, 20);
      const tooHigh = calculatePrecioHora(30000, 40, 60, 20);

      expect(tooLow.semanasVacaciones).toBe(0);
      expect(tooHigh.semanasVacaciones).toBe(51);

      // With 51 vacation weeks, only 1 working week = 40 hours
      expect(tooHigh.horasFacturablesAnuales).toBe(40);
    });

    it('clamps expense percentage to valid range (0-100)', () => {
      const tooLow = calculatePrecioHora(30000, 40, 4, -10);
      const tooHigh = calculatePrecioHora(30000, 40, 4, 150);

      expect(tooLow.porcentajeGastos).toBe(0);
      expect(tooHigh.porcentajeGastos).toBe(100);
    });

    it('handles NaN inputs gracefully', () => {
      const result = calculatePrecioHora(NaN, NaN, NaN, NaN);

      expect(result.ingresoNetoDeseado).toBe(0);
      expect(result.horasSemanales).toBe(1); // Minimum
      expect(result.semanasVacaciones).toBe(0);
      expect(result.porcentajeGastos).toBe(0);
    });

    it('handles Infinity inputs gracefully', () => {
      const result = calculatePrecioHora(Infinity, 40, 4, 20);

      // Should cap to max safe amount
      expect(result.ingresoNetoDeseado).toBeLessThan(Infinity);
      expect(Number.isFinite(result.precioPorHora)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles 51 vacation weeks (minimum 1 working week)', () => {
      const result = calculatePrecioHora(30000, 40, 51, 20);

      expect(result.horasFacturablesAnuales).toBe(40); // 1 week × 40 hours
      expect(result.precioPorHora).toBeGreaterThan(0);
    });

    it('handles 0 vacation weeks (52 working weeks)', () => {
      const result = calculatePrecioHora(30000, 40, 0, 20);

      expect(result.horasFacturablesAnuales).toBe(2080); // 52 weeks × 40 hours
    });

    it('handles 100% expense ratio', () => {
      const result = calculatePrecioHora(30000, 40, 4, 100);

      // With 100% expenses, need infinite billing - should handle gracefully
      expect(result.gastosDeducibles).toBe(result.ingresoAnualBruto);
    });

    it('handles 0% expense ratio', () => {
      const result = calculatePrecioHora(30000, 40, 4, 0);

      expect(result.gastosDeducibles).toBe(0);
      expect(result.porcentajeGastos).toBe(0);
    });

    it('handles very low income (below tax threshold)', () => {
      const result = calculatePrecioHora(5000, 40, 4, 20);

      // With personal minimum of €5,550, IRPF might be very low or zero
      expect(result.irpfEstimado).toBeGreaterThanOrEqual(0);
      expect(result.precioPorHora).toBeGreaterThan(0);
    });

    it('handles very high income', () => {
      const result = calculatePrecioHora(200000, 40, 4, 20);

      // Should work without overflow
      expect(result.precioPorHora).toBeGreaterThan(100);
      expect(Number.isFinite(result.ingresoAnualBruto)).toBe(true);
    });
  });

  describe('result structure', () => {
    it('returns all expected properties', () => {
      const result = calculatePrecioHora(30000, 40, 4, 20);

      // Input properties
      expect(result).toHaveProperty('ingresoNetoDeseado');
      expect(result).toHaveProperty('horasSemanales');
      expect(result).toHaveProperty('semanasVacaciones');
      expect(result).toHaveProperty('porcentajeGastos');

      // Calculated properties
      expect(result).toHaveProperty('horasFacturablesAnuales');
      expect(result).toHaveProperty('ingresoBrutoNecesario');
      expect(result).toHaveProperty('cuotaAutonomosAnual');
      expect(result).toHaveProperty('irpfEstimado');
      expect(result).toHaveProperty('gastosDeducibles');

      // Result properties
      expect(result).toHaveProperty('precioPorHora');
      expect(result).toHaveProperty('tarifaDiaria');
      expect(result).toHaveProperty('ingresoMensualBruto');
      expect(result).toHaveProperty('ingresoAnualBruto');
    });

    it('rounds all monetary values to 2 decimal places', () => {
      const result = calculatePrecioHora(33333.33, 37, 5, 23);

      const checkDecimals = (value: number) => {
        const decimals = (value.toString().split('.')[1] || '').length;
        return decimals <= 2;
      };

      expect(checkDecimals(result.ingresoNetoDeseado)).toBe(true);
      expect(checkDecimals(result.precioPorHora)).toBe(true);
      expect(checkDecimals(result.tarifaDiaria)).toBe(true);
      expect(checkDecimals(result.ingresoAnualBruto)).toBe(true);
      expect(checkDecimals(result.cuotaAutonomosAnual)).toBe(true);
      expect(checkDecimals(result.irpfEstimado)).toBe(true);
    });
  });

  describe('mathematical consistency', () => {
    it('breakdown shows reasonable tax burden', () => {
      const result = calculatePrecioHora(30000, 40, 4, 20);

      // Verify the breakdown components are reasonable
      // Gross should be higher than net
      expect(result.ingresoAnualBruto).toBeGreaterThan(result.ingresoNetoDeseado);

      // Expenses should be the correct percentage of gross
      const expenseRatio = result.gastosDeducibles / result.ingresoAnualBruto;
      expect(expenseRatio).toBeCloseTo(0.20, 2);

      // Cuota should be reasonable (depends on tramo, typically €3,000-€15,000)
      expect(result.cuotaAutonomosAnual).toBeGreaterThan(2000);
      expect(result.cuotaAutonomosAnual).toBeLessThan(15000);

      // IRPF should be positive for this income level
      expect(result.irpfEstimado).toBeGreaterThan(0);
    });

    it('expenses percentage should match', () => {
      const result = calculatePrecioHora(30000, 40, 4, 25);

      const calculatedPercentage =
        (result.gastosDeducibles / result.ingresoAnualBruto) * 100;

      expect(calculatedPercentage).toBeCloseTo(25, 1);
    });

    it('billable hours should match formula', () => {
      const result = calculatePrecioHora(30000, 35, 6, 20);

      const expectedHours = 35 * (52 - 6);
      expect(result.horasFacturablesAnuales).toBe(expectedHours);
    });

    it('annual gross equals monthly × 12', () => {
      const result = calculatePrecioHora(30000, 40, 4, 20);

      expect(result.ingresoAnualBruto).toBeCloseTo(result.ingresoMensualBruto * 12, 1);
    });
  });
});

describe('calculateIRPF', () => {
  describe('progressive tax calculation', () => {
    it('applies 19% to first bracket (up to €12,450)', () => {
      // With personal minimum of €5,550 applied
      // Taxable: €10,000 - €5,550 = €4,450
      const irpf = calculateIRPF(10000, true);
      expect(irpf).toBeCloseTo(4450 * 0.19, 0);
    });

    it('applies 19% + 24% for second bracket', () => {
      // Taxable: €20,000 - €5,550 = €14,450
      // First €12,450 at 19%, remaining €2,000 at 24%
      const irpf = calculateIRPF(20000, true);
      const expected = 12450 * 0.19 + 2000 * 0.24;
      expect(irpf).toBeCloseTo(expected, 0);
    });

    it('returns 0 for income below personal minimum', () => {
      const irpf = calculateIRPF(5000, true);
      expect(irpf).toBe(0);
    });

    it('returns 0 for zero income', () => {
      expect(calculateIRPF(0)).toBe(0);
    });

    it('returns 0 for negative income', () => {
      expect(calculateIRPF(-10000)).toBe(0);
    });

    it('can skip personal minimum when requested', () => {
      const withMinimum = calculateIRPF(10000, true);
      const withoutMinimum = calculateIRPF(10000, false);

      expect(withoutMinimum).toBeGreaterThan(withMinimum);
    });
  });

  describe('all tax brackets', () => {
    it('applies all progressive brackets for high income', () => {
      // Very high income to test all brackets
      const irpf = calculateIRPF(400000, false);

      // Should apply all brackets: 19%, 24%, 30%, 37%, 45%, 47%
      expect(irpf).toBeGreaterThan(0);

      // Effective rate should be between marginal rates
      const effectiveRate = irpf / 400000;
      expect(effectiveRate).toBeGreaterThan(0.19);
      expect(effectiveRate).toBeLessThan(0.47);
    });
  });
});

describe('getEffectiveIRPFRate', () => {
  it('returns 0 for zero income', () => {
    expect(getEffectiveIRPFRate(0)).toBe(0);
  });

  it('returns 0 for negative income', () => {
    expect(getEffectiveIRPFRate(-10000)).toBe(0);
  });

  it('returns rate as percentage', () => {
    const rate = getEffectiveIRPFRate(50000);

    // Rate should be between 0 and 100
    expect(rate).toBeGreaterThan(0);
    expect(rate).toBeLessThan(100);
  });

  it('increases with income (progressive nature)', () => {
    const lowRate = getEffectiveIRPFRate(20000);
    const highRate = getEffectiveIRPFRate(100000);

    expect(highRate).toBeGreaterThan(lowRate);
  });
});

describe('getMinimoPersonal', () => {
  it('returns the personal minimum allowance', () => {
    const minimo = getMinimoPersonal();

    expect(minimo).toBe(5550);
    expect(typeof minimo).toBe('number');
  });
});

describe('IRPF_TRAMOS', () => {
  it('has correct structure', () => {
    expect(IRPF_TRAMOS.length).toBeGreaterThan(0);

    IRPF_TRAMOS.forEach((tramo) => {
      expect(tramo).toHaveProperty('min');
      expect(tramo).toHaveProperty('max');
      expect(tramo).toHaveProperty('rate');
      expect(typeof tramo.min).toBe('number');
      expect(typeof tramo.rate).toBe('number');
      expect(tramo.rate).toBeGreaterThan(0);
      expect(tramo.rate).toBeLessThanOrEqual(1);
    });
  });

  it('has non-overlapping brackets', () => {
    for (let i = 1; i < IRPF_TRAMOS.length; i++) {
      const prev = IRPF_TRAMOS[i - 1];
      const curr = IRPF_TRAMOS[i];

      expect(curr.min).toBe(prev.max);
    }
  });

  it('has increasing rates', () => {
    for (let i = 1; i < IRPF_TRAMOS.length; i++) {
      const prev = IRPF_TRAMOS[i - 1];
      const curr = IRPF_TRAMOS[i];

      expect(curr.rate).toBeGreaterThanOrEqual(prev.rate);
    }
  });

  it('last bracket has null max (unlimited)', () => {
    const lastTramo = IRPF_TRAMOS[IRPF_TRAMOS.length - 1];
    expect(lastTramo.max).toBeNull();
  });
});

describe('default parameters', () => {
  it('uses default values when not provided', () => {
    const withDefaults = calculatePrecioHora(30000);
    const withExplicit = calculatePrecioHora(30000, 40, 4, 20);

    expect(withDefaults.horasSemanales).toBe(40);
    expect(withDefaults.semanasVacaciones).toBe(4);
    expect(withDefaults.porcentajeGastos).toBe(20);

    // Results should be identical
    expect(withDefaults.precioPorHora).toBe(withExplicit.precioPorHora);
  });
});

describe('convergence algorithm', () => {
  it('produces consistent and reasonable results', () => {
    const desiredNet = 30000;
    const result = calculatePrecioHora(desiredNet, 40, 4, 20);

    // The algorithm should produce a gross that's significantly higher than net
    // to account for taxes and social security
    expect(result.ingresoAnualBruto).toBeGreaterThan(desiredNet * 1.3);

    // Hourly rate should be reasonable
    expect(result.precioPorHora).toBeGreaterThan(15);
    expect(result.precioPorHora).toBeLessThan(100);

    // All outputs should be positive and finite
    expect(result.ingresoAnualBruto).toBeGreaterThan(0);
    expect(result.cuotaAutonomosAnual).toBeGreaterThan(0);
    expect(result.irpfEstimado).toBeGreaterThan(0);
    expect(Number.isFinite(result.precioPorHora)).toBe(true);
  });

  it('scales appropriately with income levels', () => {
    const results = [10000, 25000, 50000, 75000, 100000].map((desired) =>
      calculatePrecioHora(desired, 40, 4, 20)
    );

    // Higher desired income should require higher hourly rate
    for (let i = 1; i < results.length; i++) {
      expect(results[i].precioPorHora).toBeGreaterThan(results[i - 1].precioPorHora);
    }

    // Higher income should have higher tax burden percentage
    const taxBurden = (r: PrecioHoraCalculationResult) =>
      (r.cuotaAutonomosAnual + r.irpfEstimado) / r.ingresoAnualBruto;

    expect(taxBurden(results[4])).toBeGreaterThan(taxBurden(results[0]));
  });

  it('returns the desired net income value', () => {
    const desiredNet = 35000;
    const result = calculatePrecioHora(desiredNet, 40, 4, 20);

    // The result should echo back the desired net income
    expect(result.ingresoNetoDeseado).toBe(desiredNet);
  });
});
