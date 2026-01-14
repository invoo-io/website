import { describe, it, expect } from 'vitest';
import {
  calculateModelo303,
  calculateModelo303Simple,
  getModelo303Deadline,
  getPeriodoLabel,
  MODELO_303_IVA_RATES,
} from '../modelo-303';

describe('Modelo 303 Calculator', () => {
  describe('MODELO_303_IVA_RATES', () => {
    it('should have correct VAT rates', () => {
      expect(MODELO_303_IVA_RATES.general).toBe(21);
      expect(MODELO_303_IVA_RATES.reducido).toBe(10);
      expect(MODELO_303_IVA_RATES.superreducido).toBe(4);
    });
  });

  describe('calculateModelo303', () => {
    it('should calculate basic positive result (amount to pay)', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 10000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 3000,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      // IVA repercutido: 10000 * 0.21 = 2100
      // IVA soportado: 3000 * 0.21 = 630
      // Resultado: 2100 - 630 = 1470
      expect(result.totalIvaRepercutido).toBe(2100);
      expect(result.totalIvaSoportadoDeducible).toBe(630);
      expect(result.resultado).toBe(1470);
      expect(result.resultadoTipo).toBe('ingresar');
      expect(result.aIngresar).toBe(1470);
      expect(result.aCompensar).toBe(0);
    });

    it('should calculate negative result (amount to compensate)', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 1000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 5000,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      // IVA repercutido: 1000 * 0.21 = 210
      // IVA soportado: 5000 * 0.21 = 1050
      // Resultado: 210 - 1050 = -840
      expect(result.totalIvaRepercutido).toBe(210);
      expect(result.totalIvaSoportadoDeducible).toBe(1050);
      expect(result.resultado).toBe(-840);
      expect(result.resultadoTipo).toBe('compensar');
      expect(result.aIngresar).toBe(0);
      expect(result.aCompensar).toBe(840);
    });

    it('should calculate zero result', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 1000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 1000,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      expect(result.resultado).toBe(0);
      expect(result.resultadoTipo).toBe('cero');
      expect(result.aIngresar).toBe(0);
      expect(result.aCompensar).toBe(0);
    });

    it('should handle multiple VAT rates', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 5000,    // 5000 * 0.21 = 1050
          baseReducido: 2000,  // 2000 * 0.10 = 200
          baseSuperreducido: 1000, // 1000 * 0.04 = 40
        },
        ivaSoportado: {
          gastosOperativosGeneral: 2000,   // 2000 * 0.21 = 420
          gastosOperativosReducido: 500,   // 500 * 0.10 = 50
          gastosOperativosSuperreducido: 250, // 250 * 0.04 = 10
        },
      });

      // IVA repercutido: 1050 + 200 + 40 = 1290
      // IVA soportado: 420 + 50 + 10 = 480
      // Resultado: 1290 - 480 = 810
      expect(result.totalIvaRepercutido).toBe(1290);
      expect(result.totalIvaSoportadoDeducible).toBe(480);
      expect(result.resultado).toBe(810);
      expect(result.resultadoTipo).toBe('ingresar');
    });

    it('should apply compensation from previous periods', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 10000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 3000,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
        compensacionPeriodosAnteriores: 500,
      });

      // IVA repercutido: 2100
      // IVA soportado: 630
      // Compensación: 500
      // Resultado: 2100 - 630 - 500 = 970
      expect(result.totalIvaRepercutido).toBe(2100);
      expect(result.totalIvaSoportadoDeducible).toBe(630);
      expect(result.compensacionAplicada).toBe(500);
      expect(result.resultado).toBe(970);
      expect(result.aIngresar).toBe(970);
    });

    it('should handle investment goods', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 10000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 2000,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
          bienesInversionGeneral: 5000, // 5000 * 0.21 = 1050
        },
      });

      // IVA repercutido: 2100
      // IVA soportado gastos: 420
      // IVA soportado inversión: 1050
      // Total soportado: 420 + 1050 = 1470
      // Resultado: 2100 - 1470 = 630
      expect(result.ivaSoportado.gastosOperativos.cuota).toBe(420);
      expect(result.ivaSoportado.bienesInversion.cuota).toBe(1050);
      expect(result.totalIvaSoportadoDeducible).toBe(1470);
      expect(result.resultado).toBe(630);
    });

    it('should apply prorrata correctly', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 10000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 5000,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
        prorrata: 80, // Only 80% of input VAT is deductible
      });

      // IVA repercutido: 2100
      // IVA soportado before prorrata: 1050
      // IVA soportado after prorrata: 1050 * 0.80 = 840
      // Resultado: 2100 - 840 = 1260
      expect(result.ivaSoportado.prorrataAplicada).toBe(80);
      expect(result.ivaSoportado.totalCuotaAntesProrrata).toBe(1050);
      expect(result.totalIvaSoportadoDeducible).toBe(840);
      expect(result.resultado).toBe(1260);
    });

    it('should handle intra-community acquisitions', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 10000,
          baseReducido: 0,
          baseSuperreducido: 0,
          baseAdquisicionesIntracomunitarias: 2000, // Both collected and deductible
        },
        ivaSoportado: {
          gastosOperativosGeneral: 0,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      // IVA repercutido: 2100 + 420 (intra) = 2520
      // IVA soportado: 420 (intra - neutralizes)
      // Resultado: 2520 - 420 = 2100
      expect(result.ivaRepercutido.adquisicionesIntracomunitarias.cuota).toBe(420);
      expect(result.ivaSoportado.adquisicionesIntracomunitarias.cuota).toBe(420);
      expect(result.totalIvaRepercutido).toBe(2520);
      expect(result.totalIvaSoportadoDeducible).toBe(420);
      expect(result.resultado).toBe(2100);
    });

    it('should handle zero inputs', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 0,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 0,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      expect(result.totalIvaRepercutido).toBe(0);
      expect(result.totalIvaSoportadoDeducible).toBe(0);
      expect(result.resultado).toBe(0);
      expect(result.resultadoTipo).toBe('cero');
    });

    it('should handle negative inputs as zero', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: -1000,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: -500,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      expect(result.totalIvaRepercutido).toBe(0);
      expect(result.totalIvaSoportadoDeducible).toBe(0);
      expect(result.resultado).toBe(0);
    });

    it('should return correct period', () => {
      const result1 = calculateModelo303({
        ivaRepercutido: { baseGeneral: 1000, baseReducido: 0, baseSuperreducido: 0 },
        ivaSoportado: { gastosOperativosGeneral: 0, gastosOperativosReducido: 0, gastosOperativosSuperreducido: 0 },
        periodo: '2T',
      });
      expect(result1.periodo).toBe('2T');

      const result2 = calculateModelo303({
        ivaRepercutido: { baseGeneral: 1000, baseReducido: 0, baseSuperreducido: 0 },
        ivaSoportado: { gastosOperativosGeneral: 0, gastosOperativosReducido: 0, gastosOperativosSuperreducido: 0 },
      });
      expect(result2.periodo).toBe('1T'); // Default
    });

    it('should round to cents correctly', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 1234.567,
          baseReducido: 0,
          baseSuperreducido: 0,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 0,
          gastosOperativosReducido: 0,
          gastosOperativosSuperreducido: 0,
        },
      });

      // 1234.567 * 0.21 = 259.25907 → 259.26
      expect(result.totalIvaRepercutido).toBe(259.26);
    });

    it('should provide correct breakdown', () => {
      const result = calculateModelo303({
        ivaRepercutido: {
          baseGeneral: 5000,
          baseReducido: 3000,
          baseSuperreducido: 2000,
        },
        ivaSoportado: {
          gastosOperativosGeneral: 1000,
          gastosOperativosReducido: 500,
          gastosOperativosSuperreducido: 250,
        },
      });

      // Check repercutido breakdown
      expect(result.ivaRepercutido.general.base).toBe(5000);
      expect(result.ivaRepercutido.general.cuota).toBe(1050);
      expect(result.ivaRepercutido.reducido.base).toBe(3000);
      expect(result.ivaRepercutido.reducido.cuota).toBe(300);
      expect(result.ivaRepercutido.superreducido.base).toBe(2000);
      expect(result.ivaRepercutido.superreducido.cuota).toBe(80);
      expect(result.ivaRepercutido.totalBase).toBe(10000);
      expect(result.ivaRepercutido.totalCuota).toBe(1430);

      // Check soportado breakdown
      // 1000 + 500 + 250 = 1750 base
      // 1000 * 0.21 + 500 * 0.10 + 250 * 0.04 = 210 + 50 + 10 = 270 cuota
      expect(result.ivaSoportado.gastosOperativos.base).toBe(1750);
      expect(result.ivaSoportado.gastosOperativos.cuota).toBe(270);
    });
  });

  describe('calculateModelo303Simple', () => {
    it('should calculate simple scenario correctly', () => {
      const result = calculateModelo303Simple(10000, 3000, 100);

      expect(result.totalIvaRepercutido).toBe(2100);
      expect(result.totalIvaSoportadoDeducible).toBe(630);
      expect(result.compensacionAplicada).toBe(100);
      expect(result.resultado).toBe(1370);
    });

    it('should work without compensation', () => {
      const result = calculateModelo303Simple(10000, 3000);

      expect(result.resultado).toBe(1470);
      expect(result.compensacionAplicada).toBe(0);
    });
  });

  describe('getModelo303Deadline', () => {
    it('should return correct deadline for Q1', () => {
      const deadline = getModelo303Deadline('1T', 2026);
      expect(deadline.getFullYear()).toBe(2026);
      expect(deadline.getMonth()).toBe(3); // April (0-indexed)
      expect(deadline.getDate()).toBe(20);
    });

    it('should return correct deadline for Q2', () => {
      const deadline = getModelo303Deadline('2T', 2026);
      expect(deadline.getFullYear()).toBe(2026);
      expect(deadline.getMonth()).toBe(6); // July
      expect(deadline.getDate()).toBe(20);
    });

    it('should return correct deadline for Q3', () => {
      const deadline = getModelo303Deadline('3T', 2026);
      expect(deadline.getFullYear()).toBe(2026);
      expect(deadline.getMonth()).toBe(9); // October
      expect(deadline.getDate()).toBe(20);
    });

    it('should return correct deadline for Q4 (next year)', () => {
      const deadline = getModelo303Deadline('4T', 2026);
      expect(deadline.getFullYear()).toBe(2027);
      expect(deadline.getMonth()).toBe(0); // January
      expect(deadline.getDate()).toBe(30);
    });
  });

  describe('getPeriodoLabel', () => {
    it('should return Spanish labels by default', () => {
      expect(getPeriodoLabel('1T')).toBe('Primer trimestre (enero-marzo)');
      expect(getPeriodoLabel('2T')).toBe('Segundo trimestre (abril-junio)');
      expect(getPeriodoLabel('3T')).toBe('Tercer trimestre (julio-septiembre)');
      expect(getPeriodoLabel('4T')).toBe('Cuarto trimestre (octubre-diciembre)');
    });

    it('should return English labels when requested', () => {
      expect(getPeriodoLabel('1T', 'en')).toBe('First quarter (January-March)');
      expect(getPeriodoLabel('2T', 'en')).toBe('Second quarter (April-June)');
      expect(getPeriodoLabel('3T', 'en')).toBe('Third quarter (July-September)');
      expect(getPeriodoLabel('4T', 'en')).toBe('Fourth quarter (October-December)');
    });

    it('should fallback to Spanish for unknown locale', () => {
      expect(getPeriodoLabel('1T', 'fr')).toBe('Primer trimestre (enero-marzo)');
    });
  });
});
