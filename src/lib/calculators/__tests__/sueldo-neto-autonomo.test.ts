import { describe, it, expect } from 'vitest';
import {
  calculateSueldoNetoAutonomo,
  calculateSueldoNetoSimple,
  getAvailableYears,
  type SueldoNetoInputParams,
} from '../sueldo-neto-autonomo';

describe('Sueldo Neto Autónomo Calculator', () => {
  describe('calculateSueldoNetoSimple', () => {
    it('should calculate net salary with minimal inputs', () => {
      const result = calculateSueldoNetoSimple(30000, 3000, 2025);

      expect(result.facturacionAnual).toBe(30000);
      expect(result.gastosDeducibles).toBe(3000);
      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result.sueldoNetoAnual).toBeLessThan(30000);
      expect(result.sueldoNetoMensual).toBeCloseTo(result.sueldoNetoAnual / 12, 2);
    });

    it('should use default values when omitted', () => {
      const result = calculateSueldoNetoSimple(20000);

      expect(result.facturacionAnual).toBe(20000);
      expect(result.gastosDeducibles).toBe(0);
      expect(result.cuotaAutonomos.esPrimeraAlta).toBe(false);
    });
  });

  describe('calculateSueldoNetoAutonomo - Basic calculations', () => {
    const defaultParams: SueldoNetoInputParams = {
      facturacionAnual: 30000,
      gastosDeducibles: 3000,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should calculate all required fields', () => {
      const result = calculateSueldoNetoAutonomo(defaultParams);

      // Input values
      expect(result.facturacionAnual).toBe(30000);
      expect(result.facturacionMensual).toBe(2500);
      expect(result.gastosDeducibles).toBe(3000);
      expect(result.gastosMensuales).toBe(250);

      // Cuota de autónomos
      expect(result.cuotaAutonomos).toBeDefined();
      expect(result.cuotaAnual).toBeGreaterThan(0);
      expect(result.cuotaMensual).toBeGreaterThan(0);
      expect(result.cuotaAnual).toBeCloseTo(result.cuotaMensual * 12, 0);

      // IRPF
      expect(result.cuotaIntegra).toBeGreaterThan(0);
      expect(result.tipoEfectivo).toBeGreaterThan(0);
      expect(result.tipoEfectivo).toBeLessThan(50); // Sanity check

      // Final results
      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result.sueldoNetoMensual).toBeCloseTo(result.sueldoNetoAnual / 12, 2);
      expect(result.impuestosTotales).toBeCloseTo(result.cuotaAnual + result.cuotaIntegra, 2);
    });

    it('should calculate correct breakdown', () => {
      const result = calculateSueldoNetoAutonomo(defaultParams);

      const expectedNeto =
        result.desglose.facturacionAnual -
        result.desglose.gastosDeducibles -
        result.desglose.cuotaAutonomos -
        result.desglose.irpfTotal;

      expect(result.desglose.netoFinal).toBeCloseTo(expectedNeto, 2);
      expect(result.sueldoNetoAnual).toBeCloseTo(result.desglose.netoFinal, 2);
    });

    it('should calculate percentage of taxes correctly', () => {
      const result = calculateSueldoNetoAutonomo(defaultParams);

      const expectedPercentage = (result.impuestosTotales / result.facturacionAnual) * 100;
      expect(result.porcentajeImpuestos).toBeCloseTo(expectedPercentage, 2);
    });
  });

  describe('calculateSueldoNetoAutonomo - Different income levels', () => {
    const baseParams: Omit<SueldoNetoInputParams, 'facturacionAnual'> = {
      gastosDeducibles: 0,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should handle low income (€15,000)', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 15000,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result.porcentajeImpuestos).toBeGreaterThan(20);
      expect(result.porcentajeImpuestos).toBeLessThan(40);
    });

    it('should handle medium income (€40,000)', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 40000,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result.tipoEfectivo).toBeGreaterThan(10);
      expect(result.tipoEfectivo).toBeLessThan(30);
    });

    it('should handle high income (€80,000)', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 80000,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result.tipoEfectivo).toBeGreaterThan(15);
      expect(result.cuotaAutonomos.tramo).toBeGreaterThanOrEqual(14);
    });

    it('should handle very high income (€150,000)', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 150000,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result.cuotaAutonomos.tramo).toBe(15); // Last tramo
      expect(result.porcentajeImpuestos).toBeGreaterThan(35);
    });
  });

  describe('calculateSueldoNetoAutonomo - Tarifa Plana and Cuota Cero', () => {
    const baseParams: SueldoNetoInputParams = {
      facturacionAnual: 30000,
      gastosDeducibles: 3000,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should apply Tarifa Plana for new freelancers', () => {
      const resultNew = calculateSueldoNetoAutonomo({
        ...baseParams,
        esPrimeraAlta: true,
      });

      const resultEstablished = calculateSueldoNetoAutonomo({
        ...baseParams,
        esPrimeraAlta: false,
      });

      expect(resultNew.cuotaAutonomos.esPrimeraAlta).toBe(true);
      expect(resultNew.cuotaMensual).toBe(80); // Tarifa Plana
      expect(resultNew.sueldoNetoAnual).toBeGreaterThan(resultEstablished.sueldoNetoAnual);
    });

    it('should apply Cuota Cero for eligible communities', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        esPrimeraAlta: true,
        comunidadAutonoma: 'madrid',
      });

      expect(result.cuotaAutonomos.tieneCuotaCero).toBe(true);
      expect(result.cuotaMensual).toBe(0);
      expect(result.cuotaAnual).toBe(0);
    });

    it('should NOT apply Cuota Cero for non-eligible communities', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        esPrimeraAlta: true,
        comunidadAutonoma: 'cataluna',
      });

      expect(result.cuotaAutonomos.tieneCuotaCero).toBe(false);
      expect(result.cuotaMensual).toBe(80); // Still gets Tarifa Plana
    });

    it('should NOT apply Cuota Cero for established freelancers even in eligible communities', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        esPrimeraAlta: false,
        comunidadAutonoma: 'madrid',
      });

      expect(result.cuotaAutonomos.tieneCuotaCero).toBe(false);
      expect(result.cuotaMensual).toBeGreaterThan(80);
    });
  });

  describe('calculateSueldoNetoAutonomo - Gastos de difícil justificación', () => {
    const baseParams: SueldoNetoInputParams = {
      facturacionAnual: 50000,
      gastosDeducibles: 5000,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should apply 5% gastos de difícil justificación for estimación simplificada', () => {
      const result = calculateSueldoNetoAutonomo(baseParams);

      expect(result.gastosDificilJustificacion).toBeGreaterThan(0);
    });

    it('should NOT apply gastos de difícil justificación for estimación normal', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        esEstimacionSimplificada: false,
      });

      expect(result.gastosDificilJustificacion).toBe(0);
    });

    it('should cap gastos de difícil justificación at €2,000', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 200000,
        gastosDeducibles: 10000,
      });

      expect(result.gastosDificilJustificacion).toBe(2000);
    });

    it('should result in lower IRPF with estimación simplificada', () => {
      const resultSimplificada = calculateSueldoNetoAutonomo(baseParams);
      const resultNormal = calculateSueldoNetoAutonomo({
        ...baseParams,
        esEstimacionSimplificada: false,
      });

      expect(resultSimplificada.cuotaIntegra).toBeLessThan(resultNormal.cuotaIntegra);
    });
  });

  describe('calculateSueldoNetoAutonomo - Personal situation', () => {
    const baseParams: SueldoNetoInputParams = {
      facturacionAnual: 40000,
      gastosDeducibles: 4000,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should apply higher mínimo personal for age 65+', () => {
      const resultUnder65 = calculateSueldoNetoAutonomo({
        ...baseParams,
        edadContribuyente: 40,
      });

      const resultOver65 = calculateSueldoNetoAutonomo({
        ...baseParams,
        edadContribuyente: 67,
      });

      expect(resultOver65.minimoPersonal).toBeGreaterThan(resultUnder65.minimoPersonal);
      expect(resultOver65.cuotaIntegra).toBeLessThan(resultUnder65.cuotaIntegra);
    });

    it('should apply highest mínimo personal for age 75+', () => {
      const resultOver65 = calculateSueldoNetoAutonomo({
        ...baseParams,
        edadContribuyente: 67,
      });

      const resultOver75 = calculateSueldoNetoAutonomo({
        ...baseParams,
        edadContribuyente: 77,
      });

      expect(resultOver75.minimoPersonal).toBeGreaterThan(resultOver65.minimoPersonal);
    });

    it('should apply mínimo por descendientes', () => {
      const resultNoKids = calculateSueldoNetoAutonomo(baseParams);

      const resultWithKids = calculateSueldoNetoAutonomo({
        ...baseParams,
        numDescendientes: 2,
        descendientesMenores3: 1,
      });

      expect(resultWithKids.minimoDescendientes).toBeGreaterThan(0);
      expect(resultWithKids.cuotaIntegra).toBeLessThan(resultNoKids.cuotaIntegra);
    });

    it('should handle descendientes under 3 years', () => {
      const result1Under3 = calculateSueldoNetoAutonomo({
        ...baseParams,
        numDescendientes: 2,
        descendientesMenores3: 1,
      });

      const result2Under3 = calculateSueldoNetoAutonomo({
        ...baseParams,
        numDescendientes: 2,
        descendientesMenores3: 2,
      });

      expect(result2Under3.minimoDescendientes).toBeGreaterThan(result1Under3.minimoDescendientes);
    });
  });

  describe('calculateSueldoNetoAutonomo - Retenciones', () => {
    const baseParams: SueldoNetoInputParams = {
      facturacionAnual: 40000,
      gastosDeducibles: 4000,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should track retenciones and calculate cuota diferencial', () => {
      const retenciones = 40000 * 0.15; // 15% withholding
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        retencionesFacturas: retenciones,
      });

      expect(result.retencionesYaPagadas).toBe(retenciones);
      expect(result.cuotaDiferencial).toBeCloseTo(result.cuotaIntegra - retenciones, 2);
    });

    it('should show negative cuota diferencial when retenciones exceed cuota', () => {
      // Lower income with high retentions
      const retenciones = 15000 * 0.15; // 15% of €15,000
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 15000,
        gastosDeducibles: 1500,
        retencionesFacturas: retenciones,
      });

      // With low income and 15% retention, should have negative diferencial
      if (result.cuotaIntegra < retenciones) {
        expect(result.cuotaDiferencial).toBeLessThan(0);
      }
    });
  });

  describe('calculateSueldoNetoAutonomo - Year variations', () => {
    const baseParams: Omit<SueldoNetoInputParams, 'year'> = {
      facturacionAnual: 30000,
      gastosDeducibles: 3000,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should calculate for 2024', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        year: 2024,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
    });

    it('should calculate for 2025', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        year: 2025,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
    });

    it('should calculate for 2026', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        year: 2026,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
    });

    it('should show slightly different results for different years', () => {
      const result2024 = calculateSueldoNetoAutonomo({ ...baseParams, year: 2024 });
      const result2025 = calculateSueldoNetoAutonomo({ ...baseParams, year: 2025 });
      const result2026 = calculateSueldoNetoAutonomo({ ...baseParams, year: 2026 });

      // Cuota rates vary by year (31.3%, 31.4%, 31.5%)
      expect(result2024.cuotaAnual).not.toBe(result2025.cuotaAnual);
      expect(result2025.cuotaAnual).not.toBe(result2026.cuotaAnual);
    });
  });

  describe('calculateSueldoNetoAutonomo - Input validation', () => {
    it('should handle zero facturación', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 0,
        gastosDeducibles: 0,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.facturacionAnual).toBe(0);
      // Net salary is negative because cuota autónomos is still owed
      // even with zero income (you still have to pay social security)
      expect(result.sueldoNetoAnual).toBeLessThanOrEqual(0);
      expect(result.cuotaAnual).toBeGreaterThan(0); // SS quota is still owed
    });

    it('should handle negative values by converting to 0', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: -10000,
        gastosDeducibles: -1000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.facturacionAnual).toBe(0);
      expect(result.gastosDeducibles).toBe(0);
    });

    it('should handle NaN values by converting to 0', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: NaN,
        gastosDeducibles: NaN,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.facturacionAnual).toBe(0);
      expect(result.gastosDeducibles).toBe(0);
    });

    it('should cap extremely large values', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 999_999_999_999_999,
        gastosDeducibles: 0,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.facturacionAnual).toBe(999_999_999_999.99);
    });
  });

  describe('calculateSueldoNetoAutonomo - IRPF bracket breakdown', () => {
    it('should provide IRPF bracket breakdown', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 60000,
        gastosDeducibles: 5000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.desglosePorTramos).toBeDefined();
      expect(result.desglosePorTramos.length).toBeGreaterThan(0);

      // Check structure of breakdown
      for (const tramo of result.desglosePorTramos) {
        expect(tramo).toHaveProperty('tramo');
        expect(tramo).toHaveProperty('base');
        expect(tramo).toHaveProperty('tipo');
        expect(tramo).toHaveProperty('cuota');
        expect(tramo.base).toBeGreaterThan(0);
        expect(tramo.cuota).toBeGreaterThan(0);
      }
    });

    it('should have bracket amounts sum to base liquidable', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 60000,
        gastosDeducibles: 5000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      const sumOfBases = result.desglosePorTramos.reduce((sum, t) => sum + t.base, 0);
      expect(sumOfBases).toBeCloseTo(result.baseLiquidable, 0);
    });
  });

  describe('getAvailableYears', () => {
    it('should return available years', () => {
      const years = getAvailableYears();

      expect(years).toContain(2024);
      expect(years).toContain(2025);
      expect(years).toContain(2026);
    });
  });

  describe('Real-world scenarios', () => {
    it('should calculate net salary for typical freelancer developer (€45,000)', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 45000,
        gastosDeducibles: 5000, // Hardware, software, etc.
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 32,
        retencionesFacturas: 45000 * 0.15, // 15% retention
      });

      // Sanity checks for a €45k freelancer
      // Net monthly should be roughly €1,900-€2,500 depending on exact taxes
      expect(result.sueldoNetoMensual).toBeGreaterThan(1800);
      expect(result.sueldoNetoMensual).toBeLessThan(3000);
      expect(result.porcentajeImpuestos).toBeGreaterThan(25);
      expect(result.porcentajeImpuestos).toBeLessThan(40);
    });

    it('should calculate net salary for new freelancer in Madrid (€25,000)', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 25000,
        gastosDeducibles: 2000,
        year: 2025,
        esPrimeraAlta: true,
        comunidadAutonoma: 'madrid',
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 28,
        retencionesFacturas: 0,
      });

      // Cuota Cero should be applied
      expect(result.cuotaAutonomos.tieneCuotaCero).toBe(true);
      expect(result.cuotaMensual).toBe(0);
      expect(result.sueldoNetoMensual).toBeGreaterThan(1500);
    });

    it('should calculate net salary for freelancer with family (€60,000, 2 kids)', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 60000,
        gastosDeducibles: 6000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 2,
        descendientesMenores3: 1,
        edadContribuyente: 38,
        retencionesFacturas: 60000 * 0.15,
      });

      // Should have descendientes mínimo
      expect(result.minimoDescendientes).toBeGreaterThan(0);
      expect(result.minimoTotal).toBeGreaterThan(result.minimoPersonal);
    });

    it('should calculate net salary for senior freelancer (€80,000, age 67)', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 80000,
        gastosDeducibles: 10000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 67,
        retencionesFacturas: 80000 * 0.15,
      });

      // Higher mínimo personal for 65+
      expect(result.minimoPersonal).toBe(6700);
      expect(result.cuotaAutonomos.tramo).toBeGreaterThanOrEqual(14);
    });
  });

  describe('Edge cases', () => {
    const baseParams: SueldoNetoInputParams = {
      facturacionAnual: 30000,
      gastosDeducibles: 3000,
      year: 2025,
      esPrimeraAlta: false,
      comunidadAutonoma: null,
      esEstimacionSimplificada: true,
      numDescendientes: 0,
      descendientesMenores3: 0,
      edadContribuyente: 35,
      retencionesFacturas: 0,
    };

    it('should handle gastos greater than facturación (loss scenario)', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 10000,
        gastosDeducibles: 15000, // More expenses than income
      });

      // In loss scenarios, gastos are capped at facturación effectively
      // because rendimiento neto can't be negative for IRPF purposes
      expect(result.sueldoNetoAnual).toBeLessThan(0);
      // SS quota is still owed even in loss scenarios
      expect(result.cuotaAnual).toBeGreaterThan(0);
    });

    it('should cap descendientesMenores3 at numDescendientes', () => {
      // Edge case: user says they have 1 descendant but 3 under age 3
      // This is logically impossible, so we cap it
      const resultCapped = calculateSueldoNetoAutonomo({
        ...baseParams,
        numDescendientes: 1,
        descendientesMenores3: 3, // More than total descendientes - impossible
      });

      const resultNormal = calculateSueldoNetoAutonomo({
        ...baseParams,
        numDescendientes: 1,
        descendientesMenores3: 1, // 1 of 1 is under 3
      });

      // Both should have the same mínimo por descendientes since
      // descendientesMenores3 is capped at numDescendientes
      expect(resultCapped.minimoDescendientes).toBe(resultNormal.minimoDescendientes);
    });

    it('should handle maximum gastos de difícil justificación edge', () => {
      // Test the exact boundary where 5% of rendimiento equals 2000
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        facturacionAnual: 43000, // 5% of (43000 - 3000) = 2000 exactly
        gastosDeducibles: 3000,
      });

      expect(result.gastosDificilJustificacion).toBeLessThanOrEqual(2000);
    });

    it('should handle edge case with all benefits combined', () => {
      // New freelancer in Madrid with family and senior status
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 30000,
        gastosDeducibles: 3000,
        year: 2025,
        esPrimeraAlta: true,
        comunidadAutonoma: 'madrid',
        esEstimacionSimplificada: true,
        numDescendientes: 2,
        descendientesMenores3: 1,
        edadContribuyente: 67, // Senior
        retencionesFacturas: 0,
      });

      // Should have Cuota Cero
      expect(result.cuotaAutonomos.tieneCuotaCero).toBe(true);
      expect(result.cuotaMensual).toBe(0);
      // Should have senior mínimo personal
      expect(result.minimoPersonal).toBe(6700);
      // Should have descendientes mínimo
      expect(result.minimoDescendientes).toBeGreaterThan(0);
      // Should have higher net due to all benefits
      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
    });

    it('should handle unsupported year gracefully', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        year: 2030, // Future year not in the system
      });

      // Should still calculate something (likely using nearest available year)
      expect(result.sueldoNetoAnual).toBeDefined();
      expect(typeof result.sueldoNetoAnual).toBe('number');
    });

    it('should handle invalid comunidad autonoma gracefully', () => {
      const result = calculateSueldoNetoAutonomo({
        ...baseParams,
        esPrimeraAlta: true,
        comunidadAutonoma: 'not-a-real-ccaa' as string,
      });

      // Should not crash and should not give Cuota Cero
      expect(result.cuotaAutonomos.tieneCuotaCero).toBe(false);
      expect(result.cuotaMensual).toBe(80); // Tarifa Plana only
    });
  });

  describe('Mathematical properties', () => {
    it('should ensure sueldoNetoAnual = facturación - gastos - cuotaAutonomos - IRPF', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 40000,
        gastosDeducibles: 4000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      const calculated =
        result.facturacionAnual -
        result.gastosDeducibles -
        result.cuotaAnual -
        result.cuotaIntegra;

      expect(result.sueldoNetoAnual).toBeCloseTo(calculated, 1);
    });

    it('should ensure monthly = annual / 12', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 36000,
        gastosDeducibles: 3600,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.facturacionMensual).toBeCloseTo(result.facturacionAnual / 12, 2);
      expect(result.gastosMensuales).toBeCloseTo(result.gastosDeducibles / 12, 2);
      expect(result.sueldoNetoMensual).toBeCloseTo(result.sueldoNetoAnual / 12, 2);
    });

    it('should ensure impuestosTotales = cuotaAnual + cuotaIntegra', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 50000,
        gastosDeducibles: 5000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.impuestosTotales).toBeCloseTo(result.cuotaAnual + result.cuotaIntegra, 2);
    });

    it('should ensure porcentajeImpuestos is calculated correctly', () => {
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 50000,
        gastosDeducibles: 5000,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      const expectedPct = (result.impuestosTotales / result.facturacionAnual) * 100;
      expect(result.porcentajeImpuestos).toBeCloseTo(expectedPct, 2);
    });

    it('should never produce negative sueldoNetoAnual for positive income', () => {
      // Even with maximum taxes, net should not be negative
      const result = calculateSueldoNetoAutonomo({
        facturacionAnual: 1000000,
        gastosDeducibles: 0,
        year: 2025,
        esPrimeraAlta: false,
        comunidadAutonoma: null,
        esEstimacionSimplificada: true,
        numDescendientes: 0,
        descendientesMenores3: 0,
        edadContribuyente: 35,
        retencionesFacturas: 0,
      });

      expect(result.sueldoNetoAnual).toBeGreaterThan(0);
    });
  });
});
