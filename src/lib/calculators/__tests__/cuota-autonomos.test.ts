import { describe, it, expect } from 'vitest';
import {
  calculateCuotaAutonomos,
  getTramosByYear,
  getRateByYear,
  CUOTA_TRAMOS_2024,
  CUOTA_TRAMOS_2025,
  CUOTA_TRAMOS_2026,
  CUOTA_RATES,
  TARIFA_PLANA,
  CUOTA_CERO_CCAA,
  COMUNIDADES_AUTONOMAS,
} from '../cuota-autonomos';

describe('Cuota Autónomos Calculator', () => {
  describe('getTramosByYear', () => {
    it('should return 2024 tramos for year 2024', () => {
      const tramos = getTramosByYear(2024);
      expect(tramos).toBe(CUOTA_TRAMOS_2024);
      expect(tramos.length).toBe(15);
    });

    it('should return 2025 tramos for year 2025', () => {
      const tramos = getTramosByYear(2025);
      expect(tramos).toBe(CUOTA_TRAMOS_2025);
      expect(tramos.length).toBe(15);
    });

    it('should return 2026 tramos for year 2026', () => {
      const tramos = getTramosByYear(2026);
      expect(tramos).toBe(CUOTA_TRAMOS_2026);
      expect(tramos.length).toBe(15);
    });

    it('should default to 2025 tramos for unknown years', () => {
      const tramos = getTramosByYear(2030);
      expect(tramos).toBe(CUOTA_TRAMOS_2025);
    });
  });

  describe('getRateByYear', () => {
    it('should return 31.30% for 2024', () => {
      expect(getRateByYear(2024)).toBe(0.313);
    });

    it('should return 31.40% for 2025', () => {
      expect(getRateByYear(2025)).toBe(0.314);
    });

    it('should return 31.50% for 2026', () => {
      expect(getRateByYear(2026)).toBe(0.315);
    });

    it('should default to 2025 rate for unknown years', () => {
      expect(getRateByYear(2030)).toBe(CUOTA_RATES[2025]);
    });
  });

  describe('calculateCuotaAutonomos - Basic calculations', () => {
    it('should calculate quota for first tramo (lowest income)', () => {
      // €6,000 annual = €500/month (below €670 threshold)
      const result = calculateCuotaAutonomos(6000, 2024, false, null);

      expect(result.rendimientoAnual).toBe(6000);
      expect(result.rendimientoMensual).toBe(500);
      expect(result.tramo).toBe(1); // First tramo
      expect(result.baseCotizacion).toBeGreaterThan(0);
      expect(result.cuotaMensual).toBeGreaterThan(0);
      expect(result.cuotaAnual).toBeCloseTo(result.cuotaMensual * 12, 0);
      expect(result.bonificacion).toBe(0);
      expect(result.cuotaFinal).toBe(result.cuotaMensual);
      expect(result.esPrimeraAlta).toBe(false);
      expect(result.tieneCuotaCero).toBe(false);
    });

    it('should calculate quota for middle tramo', () => {
      // €24,000 annual = €2,000/month (tramo 8: €1850-€2030)
      const result = calculateCuotaAutonomos(24000, 2024, false, null);

      expect(result.rendimientoAnual).toBe(24000);
      expect(result.rendimientoMensual).toBe(2000);
      expect(result.tramo).toBe(8); // Tramo 8: €1850-€2030
      expect(result.cuotaMensual).toBeGreaterThan(0);
    });

    it('should calculate quota for highest tramo', () => {
      // €100,000 annual = €8,333/month (last tramo)
      const result = calculateCuotaAutonomos(100000, 2024, false, null);

      expect(result.rendimientoAnual).toBe(100000);
      expect(result.tramo).toBe(15); // Last tramo (>€6000)
    });

    it('should handle zero income', () => {
      const result = calculateCuotaAutonomos(0, 2024, false, null);

      expect(result.rendimientoAnual).toBe(0);
      expect(result.rendimientoMensual).toBe(0);
      expect(result.tramo).toBe(1); // Falls into first tramo
    });
  });

  describe('calculateCuotaAutonomos - Tarifa Plana', () => {
    it('should apply Tarifa Plana for first-time self-employed', () => {
      const result = calculateCuotaAutonomos(24000, 2024, true, null);

      expect(result.esPrimeraAlta).toBe(true);
      expect(result.bonificacion).toBeGreaterThan(0);
      expect(result.cuotaFinal).toBe(TARIFA_PLANA.mes1_12); // €80
    });

    it('should not apply Tarifa Plana for existing self-employed', () => {
      const result = calculateCuotaAutonomos(24000, 2024, false, null);

      expect(result.esPrimeraAlta).toBe(false);
      expect(result.bonificacion).toBe(0);
      expect(result.cuotaFinal).toBe(result.cuotaMensual);
    });
  });

  describe('calculateCuotaAutonomos - Cuota Cero', () => {
    it('should apply Cuota Cero for eligible CCAA and first-time registration', () => {
      const result = calculateCuotaAutonomos(24000, 2024, true, 'madrid');

      expect(result.esPrimeraAlta).toBe(true);
      expect(result.tieneCuotaCero).toBe(true);
      expect(result.bonificacion).toBe(result.cuotaMensual); // 100% discount
      expect(result.cuotaFinal).toBe(0);
    });

    it('should not apply Cuota Cero for non-eligible CCAA', () => {
      // Cataluña is not in the Cuota Cero list
      const result = calculateCuotaAutonomos(24000, 2024, true, 'cataluna');

      expect(result.tieneCuotaCero).toBe(false);
      expect(result.cuotaFinal).toBe(TARIFA_PLANA.mes1_12); // Tarifa Plana applies
    });

    it('should not apply Cuota Cero for existing self-employed', () => {
      const result = calculateCuotaAutonomos(24000, 2024, false, 'madrid');

      expect(result.esPrimeraAlta).toBe(false);
      expect(result.tieneCuotaCero).toBe(false);
      expect(result.cuotaFinal).toBe(result.cuotaMensual);
    });

    it('should apply Cuota Cero for all eligible communities', () => {
      for (const ccaa of CUOTA_CERO_CCAA) {
        const result = calculateCuotaAutonomos(24000, 2024, true, ccaa);
        expect(result.tieneCuotaCero).toBe(true);
        expect(result.cuotaFinal).toBe(0);
      }
    });
  });

  describe('calculateCuotaAutonomos - Input validation', () => {
    it('should handle negative income by converting to 0', () => {
      const result = calculateCuotaAutonomos(-10000, 2024, false, null);

      expect(result.rendimientoAnual).toBe(0);
      expect(result.rendimientoMensual).toBe(0);
    });

    it('should handle NaN by converting to 0', () => {
      const result = calculateCuotaAutonomos(NaN, 2024, false, null);

      expect(result.rendimientoAnual).toBe(0);
      expect(result.rendimientoMensual).toBe(0);
    });

    it('should handle Infinity by capping', () => {
      const result = calculateCuotaAutonomos(Infinity, 2024, false, null);

      expect(result.rendimientoAnual).toBe(0); // Sanitized to 0
    });

    it('should handle very large numbers by capping', () => {
      const result = calculateCuotaAutonomos(999_999_999_999_999, 2024, false, null);

      expect(result.rendimientoAnual).toBe(999_999_999_999.99); // Capped
    });
  });

  describe('calculateCuotaAutonomos - Year variations', () => {
    it('should calculate different quotas for different years', () => {
      const result2024 = calculateCuotaAutonomos(24000, 2024, false, null);
      const result2025 = calculateCuotaAutonomos(24000, 2025, false, null);
      const result2026 = calculateCuotaAutonomos(24000, 2026, false, null);

      // Different years have different rates
      expect(result2024.cuotaMensual).not.toBe(result2025.cuotaMensual);
      expect(result2025.cuotaMensual).not.toBe(result2026.cuotaMensual);
    });

    it('should handle invalid year by defaulting to 2025', () => {
      const resultNaN = calculateCuotaAutonomos(24000, NaN, false, null);
      const result2025 = calculateCuotaAutonomos(24000, 2025, false, null);

      expect(resultNaN.cuotaMensual).toBe(result2025.cuotaMensual);
    });

    it('should handle future years by defaulting to 2025', () => {
      const result2030 = calculateCuotaAutonomos(24000, 2030, false, null);
      const result2025 = calculateCuotaAutonomos(24000, 2025, false, null);

      expect(result2030.cuotaMensual).toBe(result2025.cuotaMensual);
    });
  });

  describe('calculateCuotaAutonomos - Boundary values', () => {
    it('should handle exact tramo boundary at €670/month', () => {
      // €670 is the boundary between tramo 1 and 2
      const result = calculateCuotaAutonomos(670 * 12, 2024, false, null);

      // €670 should fall into tramo 2 (boundary goes to higher tramo)
      expect(result.tramo).toBe(2);
    });

    it('should handle just below tramo boundary at €669.99/month', () => {
      const result = calculateCuotaAutonomos(669.99 * 12, 2024, false, null);

      // Just below €670 should be in tramo 1
      expect(result.tramo).toBe(1);
    });

    it('should handle exact tramo boundary at €900/month', () => {
      const result = calculateCuotaAutonomos(900 * 12, 2024, false, null);

      // €900 should fall into tramo 3
      expect(result.tramo).toBe(3);
    });

    it('should handle exact tramo boundary at €6000/month (last tramo threshold)', () => {
      const result = calculateCuotaAutonomos(6000 * 12, 2024, false, null);

      // €6000 should fall into tramo 15 (the last tramo)
      expect(result.tramo).toBe(15);
    });

    it('should handle decimal income values correctly', () => {
      const result = calculateCuotaAutonomos(24000.57, 2024, false, null);

      expect(result.rendimientoAnual).toBe(24000.57);
      expect(result.rendimientoMensual).toBeCloseTo(2000.05, 2);
    });
  });

  describe('Tramo structure validation', () => {
    it('should have 15 tramos for each year', () => {
      expect(CUOTA_TRAMOS_2024.length).toBe(15);
      expect(CUOTA_TRAMOS_2025.length).toBe(15);
      expect(CUOTA_TRAMOS_2026.length).toBe(15);
    });

    it('should have continuous tramos without gaps', () => {
      for (const tramos of [CUOTA_TRAMOS_2024, CUOTA_TRAMOS_2025, CUOTA_TRAMOS_2026]) {
        for (let i = 0; i < tramos.length - 1; i++) {
          expect(tramos[i].max).toBe(tramos[i + 1].min);
        }
      }
    });

    it('should have last tramo with unlimited max', () => {
      expect(CUOTA_TRAMOS_2024[14].max).toBeNull();
      expect(CUOTA_TRAMOS_2025[14].max).toBeNull();
      expect(CUOTA_TRAMOS_2026[14].max).toBeNull();
    });

    it('should have valid base ranges', () => {
      for (const tramos of [CUOTA_TRAMOS_2024, CUOTA_TRAMOS_2025, CUOTA_TRAMOS_2026]) {
        for (const tramo of tramos) {
          expect(tramo.baseMin).toBeGreaterThan(0);
          expect(tramo.baseMax).toBeGreaterThanOrEqual(tramo.baseMin);
        }
      }
    });
  });

  describe('Constants validation', () => {
    it('should have valid CUOTA_RATES', () => {
      expect(CUOTA_RATES[2024]).toBe(0.313);
      expect(CUOTA_RATES[2025]).toBe(0.314);
      expect(CUOTA_RATES[2026]).toBe(0.315);
    });

    it('should have valid TARIFA_PLANA values', () => {
      expect(TARIFA_PLANA.mes1_12).toBe(80);
      expect(TARIFA_PLANA.mes13_24).toBe(80);
    });

    it('should have CUOTA_CERO_CCAA as array', () => {
      expect(Array.isArray([...CUOTA_CERO_CCAA])).toBe(true);
      expect(CUOTA_CERO_CCAA.length).toBeGreaterThan(0);
    });

    it('should have COMUNIDADES_AUTONOMAS with all regions', () => {
      expect(COMUNIDADES_AUTONOMAS.length).toBe(19); // All Spanish autonomous communities

      // Check structure
      for (const ccaa of COMUNIDADES_AUTONOMAS) {
        expect(ccaa).toHaveProperty('value');
        expect(ccaa).toHaveProperty('label');
        expect(typeof ccaa.value).toBe('string');
        expect(typeof ccaa.label).toBe('string');
      }
    });
  });

  describe('Real-world scenarios', () => {
    it('should calculate quota for typical freelancer earning €20,000/year', () => {
      const result = calculateCuotaAutonomos(20000, 2025, false, null);

      expect(result.rendimientoMensual).toBeCloseTo(1666.67, 1);
      expect(result.tramo).toBe(6); // €1500-€1700 tramo
      expect(result.cuotaMensual).toBeGreaterThan(200);
      expect(result.cuotaMensual).toBeLessThan(500);
    });

    it('should calculate quota for new freelancer in Madrid', () => {
      const result = calculateCuotaAutonomos(18000, 2025, true, 'madrid');

      expect(result.esPrimeraAlta).toBe(true);
      expect(result.tieneCuotaCero).toBe(true);
      expect(result.cuotaFinal).toBe(0); // Cuota Cero
    });

    it('should calculate quota for established freelancer earning €50,000/year', () => {
      const result = calculateCuotaAutonomos(50000, 2025, false, null);

      expect(result.rendimientoMensual).toBeCloseTo(4166.67, 1);
      expect(result.tramo).toBe(14); // €4050-€6000 tramo
      expect(result.cuotaMensual).toBeGreaterThan(400);
    });

    it('should calculate quota for high earner (>€72,000/year)', () => {
      const result = calculateCuotaAutonomos(80000, 2025, false, null);

      expect(result.rendimientoMensual).toBeCloseTo(6666.67, 1);
      expect(result.tramo).toBe(15); // Last tramo (>€6000)
    });
  });

  describe('Mathematical properties', () => {
    it('should ensure cuotaAnual = cuotaMensual * 12', () => {
      const result = calculateCuotaAutonomos(30000, 2024, false, null);
      expect(result.cuotaAnual).toBeCloseTo(result.cuotaMensual * 12, 0);
    });

    it('should ensure cuotaFinal = cuotaMensual - bonificacion', () => {
      const result = calculateCuotaAutonomos(30000, 2024, true, null);
      expect(result.cuotaFinal).toBeCloseTo(result.cuotaMensual - result.bonificacion, 2);
    });

    it('should ensure cuotaFinal is never negative', () => {
      const result = calculateCuotaAutonomos(6000, 2024, true, 'madrid');
      expect(result.cuotaFinal).toBeGreaterThanOrEqual(0);
    });
  });
});
