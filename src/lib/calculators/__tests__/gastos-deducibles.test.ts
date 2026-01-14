import { describe, it, expect } from 'vitest';
import {
  calculateGastosDeducibles,
  GASTO_CATEGORIES,
  getCategory,
  getAllCategories,
  getCategoryIds,
} from '../gastos-deducibles';

describe('Gastos Deducibles Calculator', () => {
  describe('GASTO_CATEGORIES', () => {
    it('should have all expected categories', () => {
      const categoryIds = Object.keys(GASTO_CATEGORIES);
      expect(categoryIds).toContain('oficina');
      expect(categoryIds).toContain('informatica');
      expect(categoryIds).toContain('software');
      expect(categoryIds).toContain('telefono');
      expect(categoryIds).toContain('suministros');
      expect(categoryIds).toContain('alquiler');
      expect(categoryIds).toContain('transporte');
      expect(categoryIds).toContain('vehiculo');
      expect(categoryIds).toContain('formacion');
      expect(categoryIds).toContain('seguros');
      expect(categoryIds).toContain('comidas');
      expect(categoryIds).toContain('cuota');
    });

    it('should have correct deductibility for office materials (100%)', () => {
      expect(GASTO_CATEGORIES.oficina.ivaDeducible).toBe(1);
      expect(GASTO_CATEGORIES.oficina.irpfDeducible).toBe(1);
    });

    it('should have correct deductibility for phone/internet (50%)', () => {
      expect(GASTO_CATEGORIES.telefono.ivaDeducible).toBe(0.5);
      expect(GASTO_CATEGORIES.telefono.irpfDeducible).toBe(0.5);
    });

    it('should have correct deductibility for home office supplies (30%)', () => {
      expect(GASTO_CATEGORIES.suministros.ivaDeducible).toBe(0.3);
      expect(GASTO_CATEGORIES.suministros.irpfDeducible).toBe(0.3);
    });

    it('should have correct deductibility for insurance (0% IVA, 100% IRPF)', () => {
      expect(GASTO_CATEGORIES.seguros.ivaDeducible).toBe(0);
      expect(GASTO_CATEGORIES.seguros.irpfDeducible).toBe(1);
    });

    it('should have correct deductibility for cuota autónomos (0% IVA, 100% IRPF)', () => {
      expect(GASTO_CATEGORIES.cuota.ivaDeducible).toBe(0);
      expect(GASTO_CATEGORIES.cuota.irpfDeducible).toBe(1);
    });

    // Critical compliance test: comidas IVA is NOT deductible per LIVA Art. 96.1.6º
    it('should have correct deductibility for comidas (0% IVA, 100% IRPF)', () => {
      expect(GASTO_CATEGORIES.comidas.ivaDeducible).toBe(0);
      expect(GASTO_CATEGORIES.comidas.irpfDeducible).toBe(1);
    });

    // Vehicle IVA generally NOT deductible for passenger cars (LIVA Art. 95.Tres)
    it('should have correct deductibility for vehiculo (0% IVA, 50% IRPF)', () => {
      expect(GASTO_CATEGORIES.vehiculo.ivaDeducible).toBe(0);
      expect(GASTO_CATEGORIES.vehiculo.irpfDeducible).toBe(0.5);
    });
  });

  describe('calculateGastosDeducibles', () => {
    it('should calculate 100% deductible expense correctly', () => {
      // Office materials: 121€ total (100€ base + 21€ IVA at 21%)
      const result = calculateGastosDeducibles(
        [{ categoryId: 'oficina', amount: 121 }],
        30000,
        30
      );

      expect(result.totalGastos).toBe(121);
      expect(result.totalBase).toBeCloseTo(100, 1);
      expect(result.totalIva).toBeCloseTo(21, 1);
      expect(result.ivaRecuperable).toBeCloseTo(21, 1); // 100% deductible
      expect(result.gastosDeduciblesIRPF).toBeCloseTo(100, 1); // 100% deductible
    });

    it('should calculate 50% deductible expense correctly', () => {
      // Phone: 60.50€ total (50€ base + 10.50€ IVA at 21%)
      const result = calculateGastosDeducibles(
        [{ categoryId: 'telefono', amount: 60.50 }],
        30000,
        30
      );

      expect(result.totalGastos).toBe(60.50);
      expect(result.totalBase).toBeCloseTo(50, 1);
      expect(result.totalIva).toBeCloseTo(10.50, 1);
      expect(result.ivaRecuperable).toBeCloseTo(5.25, 1); // 50% of 10.50
      expect(result.gastosDeduciblesIRPF).toBeCloseTo(25, 1); // 50% of 50
    });

    it('should calculate 30% deductible expense correctly', () => {
      // Home office supplies: 121€ total (100€ base + 21€ IVA)
      const result = calculateGastosDeducibles(
        [{ categoryId: 'suministros', amount: 121 }],
        30000,
        30
      );

      expect(result.ivaRecuperable).toBeCloseTo(6.3, 1); // 30% of 21
      expect(result.gastosDeduciblesIRPF).toBeCloseTo(30, 1); // 30% of 100
    });

    // Critical: comidas IVA is NOT deductible per LIVA Art. 96.1.6º
    it('should calculate comidas correctly - NO IVA deductible', () => {
      // Comidas: 121€ total (100€ base + 21€ IVA at 21%)
      const result = calculateGastosDeducibles(
        [{ categoryId: 'comidas', amount: 121 }],
        30000,
        30
      );

      expect(result.totalGastos).toBe(121);
      expect(result.totalBase).toBeCloseTo(100, 1);
      expect(result.totalIva).toBeCloseTo(21, 1);
      expect(result.ivaRecuperable).toBe(0); // 0% IVA deductible
      expect(result.gastosDeduciblesIRPF).toBeCloseTo(100, 1); // 100% IRPF deductible
    });

    // Vehicle IVA NOT deductible for passenger cars (LIVA Art. 95.Tres)
    it('should calculate vehiculo correctly - NO IVA, 50% IRPF', () => {
      // Vehicle: 121€ total (100€ base + 21€ IVA at 21%)
      const result = calculateGastosDeducibles(
        [{ categoryId: 'vehiculo', amount: 121 }],
        30000,
        30
      );

      expect(result.totalGastos).toBe(121);
      expect(result.totalBase).toBeCloseTo(100, 1);
      expect(result.totalIva).toBeCloseTo(21, 1);
      expect(result.ivaRecuperable).toBe(0); // 0% IVA deductible
      expect(result.gastosDeduciblesIRPF).toBeCloseTo(50, 1); // 50% IRPF deductible
    });

    it('should handle multiple expenses', () => {
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'oficina', amount: 121 }, // 100 base + 21 IVA
          { categoryId: 'telefono', amount: 60.50 }, // 50 base + 10.50 IVA
          { categoryId: 'cuota', amount: 300, ivaRate: 0 }, // No IVA, 100% IRPF deductible
        ],
        30000,
        30
      );

      // Total: 121 + 60.50 + 300 = 481.50
      expect(result.totalGastos).toBeCloseTo(481.50, 1);

      // Base: 100 + 50 + 300 = 450
      expect(result.totalBase).toBeCloseTo(450, 1);

      // IVA: 21 + 10.50 + 0 = 31.50
      expect(result.totalIva).toBeCloseTo(31.50, 1);

      // IVA recuperable: 21 (100%) + 5.25 (50%) + 0 = 26.25
      expect(result.ivaRecuperable).toBeCloseTo(26.25, 1);

      // IRPF deducible: 100 (100%) + 25 (50%) + 300 (100%) = 425
      expect(result.gastosDeduciblesIRPF).toBeCloseTo(425, 1);
    });

    it('should calculate GDJ correctly (5% with €2000 cap)', () => {
      // Rendimiento neto: 30000
      // GDJ: 30000 * 5% = 1500 (below cap)
      const result1 = calculateGastosDeducibles([], 30000, 30);
      expect(result1.gdj).toBe(1500);

      // Rendimiento neto: 50000
      // GDJ: 50000 * 5% = 2500 → capped at 2000
      const result2 = calculateGastosDeducibles([], 50000, 30);
      expect(result2.gdj).toBe(2000);

      // Rendimiento neto: 10000
      // GDJ: 10000 * 5% = 500
      const result3 = calculateGastosDeducibles([], 10000, 30);
      expect(result3.gdj).toBe(500);
    });

    it('should calculate tax savings correctly', () => {
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'oficina', amount: 121 }, // 100 base + 21 IVA
        ],
        30000,
        30 // 30% marginal rate
      );

      // IVA savings: 21 (fully recoverable)
      expect(result.ahorroIVA).toBeCloseTo(21, 1);

      // IRPF savings: (100 gastos + 1500 GDJ) × 30% = 480
      expect(result.ahorroIRPF).toBeCloseTo(480, 1);

      // Total: 21 + 480 = 501
      expect(result.ahorroTotal).toBeCloseTo(501, 1);
    });

    it('should handle zero expenses', () => {
      const result = calculateGastosDeducibles([], 30000, 30);

      expect(result.totalGastos).toBe(0);
      expect(result.totalBase).toBe(0);
      expect(result.totalIva).toBe(0);
      expect(result.ivaRecuperable).toBe(0);
      expect(result.gastosDeduciblesIRPF).toBe(0);
      expect(result.gdj).toBe(1500); // GDJ still applies
      expect(result.ahorroIRPF).toBeCloseTo(450, 1); // 1500 × 30%
    });

    it('should handle zero rendimiento neto', () => {
      const result = calculateGastosDeducibles(
        [{ categoryId: 'oficina', amount: 121 }],
        0,
        30
      );

      expect(result.gdj).toBe(0);
      // IRPF savings: 100 × 30% = 30 (no GDJ)
      expect(result.ahorroIRPF).toBeCloseTo(30, 1);
    });

    it('should handle different IVA rates', () => {
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'oficina', amount: 110, ivaRate: 10 }, // 100 base + 10 IVA (10%)
        ],
        30000,
        30
      );

      expect(result.totalIva).toBeCloseTo(10, 1);
      expect(result.ivaRecuperable).toBeCloseTo(10, 1);
    });

    it('should handle insurance (no IVA)', () => {
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'seguros', amount: 100, ivaRate: 0 }, // No IVA on insurance
        ],
        30000,
        30
      );

      expect(result.totalBase).toBe(100);
      expect(result.totalIva).toBe(0);
      expect(result.ivaRecuperable).toBe(0); // 0% IVA deductible
      expect(result.gastosDeduciblesIRPF).toBe(100); // 100% IRPF deductible
    });

    it('should provide detailed breakdown per category', () => {
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'oficina', amount: 121 },
          { categoryId: 'telefono', amount: 60.50 },
        ],
        30000,
        30
      );

      expect(result.desglosePorCategoria).toHaveLength(2);

      const oficina = result.desglosePorCategoria[0];
      expect(oficina.categoryId).toBe('oficina');
      expect(oficina.totalAmount).toBe(121);
      expect(oficina.ivaDeducible).toBe(1);
      expect(oficina.irpfDeducible).toBe(1);

      const telefono = result.desglosePorCategoria[1];
      expect(telefono.categoryId).toBe('telefono');
      expect(telefono.totalAmount).toBe(60.50);
      expect(telefono.ivaDeducible).toBe(0.5);
      expect(telefono.irpfDeducible).toBe(0.5);
    });

    it('should handle invalid category gracefully', () => {
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'invalid_category', amount: 100 },
          { categoryId: 'oficina', amount: 121 },
        ],
        30000,
        30
      );

      // Invalid category is skipped
      expect(result.desglosePorCategoria).toHaveLength(1);
      expect(result.totalGastos).toBeCloseTo(121, 1);
    });

    it('should handle negative amounts as zero', () => {
      const result = calculateGastosDeducibles(
        [{ categoryId: 'oficina', amount: -100 }],
        30000,
        30
      );

      expect(result.totalGastos).toBe(0);
      expect(result.ivaRecuperable).toBe(0);
    });

    it('should cap marginal rate between 0 and 100', () => {
      const result1 = calculateGastosDeducibles(
        [{ categoryId: 'oficina', amount: 121 }],
        30000,
        150 // Invalid, should be capped at 100
      );

      // 100% marginal rate applied
      expect(result1.ahorroIRPF).toBeCloseTo(1600, 1); // (100 + 1500) × 100%

      const result2 = calculateGastosDeducibles(
        [{ categoryId: 'oficina', amount: 121 }],
        30000,
        -10 // Invalid, should be capped at 0
      );

      // 0% marginal rate applied
      expect(result2.ahorroIRPF).toBe(0);
    });

    it('should calculate realistic autónomo scenario', () => {
      // Realistic monthly expenses for an autónomo
      const result = calculateGastosDeducibles(
        [
          { categoryId: 'cuota', amount: 300 }, // Cuota autónomos (no IVA)
          { categoryId: 'oficina', amount: 48.40 }, // 40€ + 8.40€ IVA
          { categoryId: 'software', amount: 60.50 }, // 50€ + 10.50€ IVA
          { categoryId: 'telefono', amount: 48.40 }, // 40€ + 8.40€ IVA (50% deductible)
          { categoryId: 'formacion', amount: 121 }, // 100€ + 21€ IVA
        ],
        30000, // Annual net income
        30 // 30% marginal rate
      );

      // Total: 578.30€
      expect(result.totalGastos).toBeCloseTo(578.30, 1);

      // IVA recuperable: 8.40 + 10.50 + 4.20 (50% of 8.40) + 21 = 44.10€
      expect(result.ivaRecuperable).toBeCloseTo(44.10, 1);

      // GDJ: 30000 × 5% = 1500€
      expect(result.gdj).toBe(1500);

      // Total savings should be positive
      expect(result.ahorroTotal).toBeGreaterThan(0);
    });
  });

  describe('Helper functions', () => {
    it('getCategory should return category by ID', () => {
      const category = getCategory('oficina');
      expect(category).toBeDefined();
      expect(category?.id).toBe('oficina');
      expect(category?.ivaDeducible).toBe(1);
    });

    it('getCategory should return undefined for invalid ID', () => {
      const category = getCategory('invalid');
      expect(category).toBeUndefined();
    });

    it('getAllCategories should return all categories', () => {
      const categories = getAllCategories();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories.every(c => c.id && c.label)).toBe(true);
    });

    it('getCategoryIds should return all category IDs', () => {
      const ids = getCategoryIds();
      expect(ids).toContain('oficina');
      expect(ids).toContain('telefono');
      expect(ids).toContain('cuota');
    });
  });
});
