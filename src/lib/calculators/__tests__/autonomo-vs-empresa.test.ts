import { describe, it, expect } from 'vitest';
import { compareAutonomoVsEmpresa, IS_RATES, SS_REGIMEN_GENERAL } from '../autonomo-vs-empresa';

describe('Autónomo vs Empresa Calculator', () => {
  describe('Low income scenario (€30k revenue)', () => {
    it('should favor autónomo for low income', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 30000,
        gastosNegocio: 20, // 20% expenses
        sueldoMensualDeseado: 1500,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // Autónomo should be better or similar for low income
      expect(['autonomo', 'similar']).toContain(result.recomendacion);
      // Difference should not heavily favor SL
      expect(result.diferencia).toBeGreaterThanOrEqual(-2000);

      // Verify autónomo calculations
      expect(result.autonomo.facturacion).toBe(30000);
      expect(result.autonomo.gastos).toBe(6000); // 20% of 30k
      expect(result.autonomo.rendimientoNeto).toBe(24000);
      expect(result.autonomo.cuotaAnual).toBeGreaterThan(0);
      expect(result.autonomo.irpfAnual).toBeGreaterThan(0);
      expect(result.autonomo.sueldoNetoAnual).toBeGreaterThan(0);

      // Verify SL calculations
      expect(result.sociedad.facturacion).toBe(30000);
      expect(result.sociedad.sueldoBruto).toBe(18000); // 1500 × 12
      expect(result.sociedad.cuotaSS).toBeGreaterThan(0);
      expect(result.sociedad.impuestoSociedades).toBeGreaterThanOrEqual(0);
    });
  });

  describe('High income scenario (€100k revenue)', () => {
    it('should favor sociedad for high income', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 100000,
        gastosNegocio: 20,
        sueldoMensualDeseado: 3000,
        esPrimeraVezEmprendedor: true, // 15% IS rate
        comunidadAutonoma: null,
        year: 2026,
      });

      // SL should be better for high income
      expect(result.recomendacion).toBe('sociedad');
      expect(result.diferencia).toBeLessThan(0);

      // Verify SL has retained profit
      expect(result.sociedad.beneficioRetenido).toBeGreaterThan(0);
    });
  });

  describe('Break-even calculation', () => {
    it('should estimate realistic break-even point', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 50000,
        gastosNegocio: 25,
        sueldoMensualDeseado: 2000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // Break-even should be in realistic range (€40k-60k typically)
      expect(result.breakEvenPoint).toBeGreaterThan(20000);
      expect(result.breakEvenPoint).toBeLessThan(150000);
    });
  });

  describe('Emprendedor rate (15% IS)', () => {
    it('should apply 15% IS rate for first-time entrepreneurs', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 80000,
        gastosNegocio: 30,
        sueldoMensualDeseado: 2500,
        esPrimeraVezEmprendedor: true,
        comunidadAutonoma: null,
        year: 2026,
      });

      const expectedProfit = result.sociedad.beneficioSociedad;
      const expectedIS = expectedProfit * 0.15; // 15% for emprendedores

      expect(result.sociedad.impuestoSociedades).toBeCloseTo(expectedIS, 0);
    });

    it('should apply mixed rates when profit exceeds €300k', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 500000,
        gastosNegocio: 20,
        sueldoMensualDeseado: 3000,
        esPrimeraVezEmprendedor: true,
        comunidadAutonoma: null,
        year: 2026,
      });

      // IS should be: first €300k at 15%, excess at 20% (Art. 29 LIS)
      const profit = result.sociedad.beneficioSociedad;
      if (profit > IS_RATES.emprendedoresLimit) {
        const part1 = IS_RATES.emprendedoresLimit * 0.15;
        const part2 = (profit - IS_RATES.emprendedoresLimit) * 0.20; // 20%, not 25%
        const expectedIS = part1 + part2;

        expect(result.sociedad.impuestoSociedades).toBeCloseTo(expectedIS, 0);
      }
    });
  });

  describe('Social Security calculations', () => {
    it('should calculate SS correctly for SL administrator', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 60000,
        gastosNegocio: 25,
        sueldoMensualDeseado: 2000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      const sueldoBruto = 2000 * 12; // 24000
      const expectedSSTotal = sueldoBruto * (SS_REGIMEN_GENERAL.total / 100);

      // Allow small rounding differences
      expect(result.sociedad.cuotaSS).toBeCloseTo(expectedSSTotal, 0);
    });

    // SS Base cap boundary tests (2026: min €1,260, max €5,101.20/month)
    it('should cap SS at maximum base for high salaries', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 200000,
        gastosNegocio: 20,
        sueldoMensualDeseado: 6000, // Above max base €5,101.20
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // SS should be calculated on capped base, not full salary
      const cappedBaseAnnual = SS_REGIMEN_GENERAL.maxBaseMonthly * 12;
      const expectedSSTotal = cappedBaseAnnual * (SS_REGIMEN_GENERAL.total / 100);

      expect(result.sociedad.cuotaSS).toBeCloseTo(expectedSSTotal, 0);
    });

    it('should use minimum base for very low salaries', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 30000,
        gastosNegocio: 20,
        sueldoMensualDeseado: 1000, // Below min base €1,260
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // SS should be calculated on minimum base, not the low salary
      const minBaseAnnual = SS_REGIMEN_GENERAL.minBaseMonthly * 12;
      const expectedSSTotal = minBaseAnnual * (SS_REGIMEN_GENERAL.total / 100);

      expect(result.sociedad.cuotaSS).toBeCloseTo(expectedSSTotal, 0);
    });

    it('should calculate autónomo cuota based on rendimiento neto', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 40000,
        gastosNegocio: 30,
        sueldoMensualDeseado: 1800,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // Cuota should be based on rendimiento neto (40000 - 12000 = 28000)
      expect(result.autonomo.cuotaAnual).toBeGreaterThan(0);
      expect(result.autonomo.cuotaAnual).toBeLessThan(result.autonomo.rendimientoNeto);
    });
  });

  describe('Management costs', () => {
    it('should include gestoría costs for both scenarios', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 50000,
        gastosNegocio: 20,
        sueldoMensualDeseado: 2000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // Autónomo gestoría should be around €600/year
      expect(result.autonomo.costeGestion).toBe(600);

      // SL gestoría should be around €2400/year
      expect(result.sociedad.costeGestion).toBe(2400);

      // SL should include amortized constitution cost
      expect(result.sociedad.costeConstitucion).toBeGreaterThan(0);
      expect(result.sociedad.costeConstitucion).toBeLessThan(200); // €750 / 5 years
    });
  });

  describe('Fiscal cost total', () => {
    it('should sum all costs correctly for autónomo', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 45000,
        gastosNegocio: 25,
        sueldoMensualDeseado: 2000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      const expectedTotal =
        result.autonomo.cuotaAnual +
        result.autonomo.irpfAnual +
        result.autonomo.costeGestion;

      expect(result.autonomo.costeFiscalTotal).toBeCloseTo(expectedTotal, 1);
    });

    it('should sum all costs correctly for SL', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 70000,
        gastosNegocio: 30,
        sueldoMensualDeseado: 2500,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      const expectedTotal =
        result.sociedad.cuotaSS +
        result.sociedad.irpfSueldo +
        result.sociedad.impuestoSociedades +
        result.sociedad.costeGestion +
        result.sociedad.costeConstitucion;

      expect(result.sociedad.costeFiscalTotal).toBeCloseTo(expectedTotal, 1);
    });
  });

  describe('Razonamientos (reasoning)', () => {
    it('should provide reasons for low income scenario', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 25000,
        gastosNegocio: 20,
        sueldoMensualDeseado: 1500,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      expect(result.razonamientos).toContain('lowIncome');
      expect(result.razonamientos.length).toBeGreaterThan(0);
    });

    it('should provide reasons for high income scenario', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 120000,
        gastosNegocio: 25,
        sueldoMensualDeseado: 3500,
        esPrimeraVezEmprendedor: true,
        comunidadAutonoma: null,
        year: 2026,
      });

      expect(result.razonamientos).toContain('highIncome');
      expect(result.razonamientos.length).toBeGreaterThan(0);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero revenue', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 0,
        gastosNegocio: 20,
        sueldoMensualDeseado: 1500,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      expect(result.autonomo.facturacion).toBe(0);
      expect(result.sociedad.facturacion).toBe(0);
      expect(result.autonomo.sueldoNetoAnual).toBeLessThanOrEqual(0);
      // SL net salary can be positive if desired salary > 0 (but company loses money)
      // The key is that the company will have negative profit
      expect(result.sociedad.beneficioSociedad).toBeLessThan(0);
    });

    it('should handle very high revenue', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: 500000,
        gastosNegocio: 30,
        sueldoMensualDeseado: 5000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      expect(result.sociedad.beneficioRetenido).toBeGreaterThan(0);
      expect(result.recomendacion).toBe('sociedad');
    });

    it('should handle negative values as zero', () => {
      const result = compareAutonomoVsEmpresa({
        facturacionAnual: -1000,
        gastosNegocio: 20,
        sueldoMensualDeseado: -500,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      expect(result.autonomo.facturacion).toBe(0);
      expect(result.sociedad.sueldoBruto).toBe(0);
    });
  });

  describe('Year-specific calculations', () => {
    it('should work with different years', () => {
      const result2024 = compareAutonomoVsEmpresa({
        facturacionAnual: 50000,
        gastosNegocio: 25,
        sueldoMensualDeseado: 2000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2024,
      });

      const result2026 = compareAutonomoVsEmpresa({
        facturacionAnual: 50000,
        gastosNegocio: 25,
        sueldoMensualDeseado: 2000,
        esPrimeraVezEmprendedor: false,
        comunidadAutonoma: null,
        year: 2026,
      });

      // Both should produce valid results
      expect(result2024.autonomo.sueldoNetoAnual).toBeGreaterThan(0);
      expect(result2026.autonomo.sueldoNetoAnual).toBeGreaterThan(0);

      // Results might differ due to different rates
      // This is just checking they both work
      expect(result2024.recomendacion).toBeDefined();
      expect(result2026.recomendacion).toBeDefined();
    });
  });
});
