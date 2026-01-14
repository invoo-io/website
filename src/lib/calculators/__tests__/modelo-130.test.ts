import { describe, it, expect } from 'vitest';
import {
  calculateModelo130,
  calculateModelo130Simple,
  getModelo130Deadline,
  getModelo130PeriodoLabel,
  checkModelo130Exemption,
  MODELO_130_IRPF_RATE,
  EXEMPTION_THRESHOLD,
} from '../modelo-130';

describe('Modelo 130 Calculator', () => {
  describe('Constants', () => {
    it('should have correct IRPF rate', () => {
      expect(MODELO_130_IRPF_RATE).toBe(20);
    });

    it('should have correct exemption threshold', () => {
      expect(EXEMPTION_THRESHOLD).toBe(70);
    });
  });

  describe('calculateModelo130', () => {
    it('should calculate basic positive result (amount to pay)', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 15000,
        gastosAcumulados: 3000,
        pagosAnteriores: 0,
        retencionesFacturas: 1000,
      });

      // Rendimiento neto: 15000 - 3000 = 12000
      // 20%: 12000 * 0.20 = 2400
      // Resultado: 2400 - 0 - 1000 = 1400
      expect(result.rendimientoNeto).toBe(12000);
      expect(result.cuota20Porciento).toBe(2400);
      expect(result.resultado).toBe(1400);
      expect(result.resultadoTipo).toBe('ingresar');
      expect(result.aIngresar).toBe(1400);
      expect(result.aNegativo).toBe(0);
    });

    it('should calculate negative result (no payment due)', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 10000,
        gastosAcumulados: 2000,
        pagosAnteriores: 1000,
        retencionesFacturas: 1500,
      });

      // Rendimiento neto: 10000 - 2000 = 8000
      // 20%: 8000 * 0.20 = 1600
      // Resultado: 1600 - 1000 - 1500 = -900
      expect(result.rendimientoNeto).toBe(8000);
      expect(result.cuota20Porciento).toBe(1600);
      expect(result.resultadoTipo).toBe('negativo');
      expect(result.aIngresar).toBe(0);
      expect(result.aNegativo).toBe(900);
      // M130 result is always >= 0
      expect(result.resultado).toBe(0);
    });

    it('should calculate zero result', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 5000,
        gastosAcumulados: 0,
        pagosAnteriores: 500,
        retencionesFacturas: 500,
      });

      // Rendimiento neto: 5000 - 0 = 5000
      // 20%: 5000 * 0.20 = 1000
      // Resultado: 1000 - 500 - 500 = 0
      expect(result.rendimientoNeto).toBe(5000);
      expect(result.cuota20Porciento).toBe(1000);
      expect(result.resultado).toBe(0);
      expect(result.resultadoTipo).toBe('cero');
      expect(result.aIngresar).toBe(0);
      expect(result.aNegativo).toBe(0);
    });

    it('should handle negative net income', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 5000,
        gastosAcumulados: 8000,
        pagosAnteriores: 0,
        retencionesFacturas: 0,
      });

      // Rendimiento neto: 5000 - 8000 = -3000
      // 20% of negative = 0 (no negative tax)
      expect(result.rendimientoNeto).toBe(-3000);
      expect(result.cuota20Porciento).toBe(0);
      expect(result.resultado).toBe(0);
      expect(result.resultadoTipo).toBe('cero');
    });

    it('should deduct previous payments correctly', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 30000,
        gastosAcumulados: 5000,
        pagosAnteriores: 3500, // Sum of Q1+Q2 payments for Q3
        retencionesFacturas: 0,
      });

      // Rendimiento neto: 30000 - 5000 = 25000
      // 20%: 25000 * 0.20 = 5000
      // Resultado: 5000 - 3500 - 0 = 1500
      expect(result.rendimientoNeto).toBe(25000);
      expect(result.cuota20Porciento).toBe(5000);
      expect(result.pagosAnteriores).toBe(3500);
      expect(result.resultado).toBe(1500);
      expect(result.aIngresar).toBe(1500);
    });

    it('should deduct retentions correctly', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 20000,
        gastosAcumulados: 4000,
        pagosAnteriores: 0,
        retencionesFacturas: 3000, // 15% retention on 20000
      });

      // Rendimiento neto: 20000 - 4000 = 16000
      // 20%: 16000 * 0.20 = 3200
      // Resultado: 3200 - 0 - 3000 = 200
      expect(result.rendimientoNeto).toBe(16000);
      expect(result.cuota20Porciento).toBe(3200);
      expect(result.retencionesFacturas).toBe(3000);
      expect(result.resultado).toBe(200);
    });

    it('should handle zero inputs', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 0,
        gastosAcumulados: 0,
        pagosAnteriores: 0,
        retencionesFacturas: 0,
      });

      expect(result.rendimientoNeto).toBe(0);
      expect(result.cuota20Porciento).toBe(0);
      expect(result.resultado).toBe(0);
      expect(result.resultadoTipo).toBe('cero');
    });

    it('should handle negative inputs as zero', () => {
      const result = calculateModelo130({
        ingresosAcumulados: -1000,
        gastosAcumulados: -500,
        pagosAnteriores: -100,
        retencionesFacturas: -50,
      });

      expect(result.ingresosAcumulados).toBe(0);
      expect(result.gastosAcumulados).toBe(0);
      expect(result.pagosAnteriores).toBe(0);
      expect(result.retencionesFacturas).toBe(0);
    });

    it('should return correct period', () => {
      const result1 = calculateModelo130({
        ingresosAcumulados: 10000,
        gastosAcumulados: 2000,
        pagosAnteriores: 0,
        retencionesFacturas: 0,
        periodo: '2T',
      });
      expect(result1.periodo).toBe('2T');

      const result2 = calculateModelo130({
        ingresosAcumulados: 10000,
        gastosAcumulados: 2000,
        pagosAnteriores: 0,
        retencionesFacturas: 0,
      });
      expect(result2.periodo).toBe('1T'); // Default
    });

    it('should round to cents correctly', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 12345.67,
        gastosAcumulados: 2345.67,
        pagosAnteriores: 0,
        retencionesFacturas: 0,
      });

      // Rendimiento: 12345.67 - 2345.67 = 10000
      // 20%: 10000 * 0.20 = 2000
      expect(result.ingresosAcumulados).toBe(12345.67);
      expect(result.gastosAcumulados).toBe(2345.67);
      expect(result.rendimientoNeto).toBe(10000);
      expect(result.cuota20Porciento).toBe(2000);
    });

    it('should calculate cumulative scenario correctly (Q3)', () => {
      // Simulating Q3: January-September accumulated
      const result = calculateModelo130({
        ingresosAcumulados: 45000, // Total Jan-Sep income
        gastosAcumulados: 9000, // Total Jan-Sep expenses
        pagosAnteriores: 4800, // Q1 (2400) + Q2 (2400) payments
        retencionesFacturas: 2250, // 5% retention on some invoices
        periodo: '3T',
      });

      // Rendimiento neto: 45000 - 9000 = 36000
      // 20%: 36000 * 0.20 = 7200
      // Resultado: 7200 - 4800 - 2250 = 150
      expect(result.rendimientoNeto).toBe(36000);
      expect(result.cuota20Porciento).toBe(7200);
      expect(result.resultado).toBe(150);
      expect(result.aIngresar).toBe(150);
    });
  });

  describe('Exemption detection', () => {
    it('should detect possible exemption when >70% income has retention', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 10000,
        gastosAcumulados: 2000,
        pagosAnteriores: 0,
        retencionesFacturas: 1500, // Equivalent to 15% of 10000 = all income
      });

      // With 1500€ retention at 15%, estimated income with retention = 10000
      // Percentage with retention = 100%
      expect(result.posibleExencion).toBe(true);
      expect(result.porcentajeConRetencion).toBe(100);
    });

    it('should not detect exemption when <70% income has retention', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 20000,
        gastosAcumulados: 4000,
        pagosAnteriores: 0,
        retencionesFacturas: 600, // Equivalent to 15% of 4000 = only 20% of income
      });

      // With 600€ retention at 15%, estimated income with retention = 4000
      // Percentage with retention = 20%
      expect(result.posibleExencion).toBe(false);
      expect(result.porcentajeConRetencion).toBe(20);
    });

    it('should handle edge case at exactly 70%', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 10000,
        gastosAcumulados: 2000,
        pagosAnteriores: 0,
        retencionesFacturas: 1050, // 15% of 7000 = 70%
      });

      expect(result.posibleExencion).toBe(true);
      expect(result.porcentajeConRetencion).toBe(70);
    });

    it('should handle zero retentions', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 10000,
        gastosAcumulados: 2000,
        pagosAnteriores: 0,
        retencionesFacturas: 0,
      });

      expect(result.posibleExencion).toBe(false);
      expect(result.porcentajeConRetencion).toBe(0);
    });
  });

  describe('calculateModelo130Simple', () => {
    it('should calculate simple scenario correctly', () => {
      const result = calculateModelo130Simple(15000, 3000, 1000, 500);

      // Rendimiento: 15000 - 3000 = 12000
      // 20%: 2400
      // Resultado: 2400 - 1000 - 500 = 900
      expect(result.rendimientoNeto).toBe(12000);
      expect(result.resultado).toBe(900);
    });

    it('should work with default values', () => {
      const result = calculateModelo130Simple(10000, 2000);

      // Rendimiento: 10000 - 2000 = 8000
      // 20%: 1600
      expect(result.rendimientoNeto).toBe(8000);
      expect(result.cuota20Porciento).toBe(1600);
      expect(result.resultado).toBe(1600);
    });
  });

  describe('checkModelo130Exemption', () => {
    it('should return true when income with retention >= 70%', () => {
      expect(checkModelo130Exemption(7000, 10000)).toBe(true);
      expect(checkModelo130Exemption(8000, 10000)).toBe(true);
      expect(checkModelo130Exemption(10000, 10000)).toBe(true);
    });

    it('should return false when income with retention < 70%', () => {
      expect(checkModelo130Exemption(6999, 10000)).toBe(false);
      expect(checkModelo130Exemption(5000, 10000)).toBe(false);
      expect(checkModelo130Exemption(0, 10000)).toBe(false);
    });

    it('should return false when total income is zero', () => {
      expect(checkModelo130Exemption(1000, 0)).toBe(false);
    });
  });

  describe('getModelo130Deadline', () => {
    it('should return correct deadline for Q1', () => {
      const deadline = getModelo130Deadline('1T', 2026);
      expect(deadline.getFullYear()).toBe(2026);
      expect(deadline.getMonth()).toBe(3); // April (0-indexed)
      expect(deadline.getDate()).toBe(20);
    });

    it('should return correct deadline for Q2', () => {
      const deadline = getModelo130Deadline('2T', 2026);
      expect(deadline.getFullYear()).toBe(2026);
      expect(deadline.getMonth()).toBe(6); // July
      expect(deadline.getDate()).toBe(20);
    });

    it('should return correct deadline for Q3', () => {
      const deadline = getModelo130Deadline('3T', 2026);
      expect(deadline.getFullYear()).toBe(2026);
      expect(deadline.getMonth()).toBe(9); // October
      expect(deadline.getDate()).toBe(20);
    });

    it('should return correct deadline for Q4 (next year)', () => {
      const deadline = getModelo130Deadline('4T', 2026);
      expect(deadline.getFullYear()).toBe(2027);
      expect(deadline.getMonth()).toBe(0); // January
      expect(deadline.getDate()).toBe(30);
    });
  });

  describe('getModelo130PeriodoLabel', () => {
    it('should return Spanish labels by default', () => {
      expect(getModelo130PeriodoLabel('1T')).toBe('Primer trimestre (enero-marzo)');
      expect(getModelo130PeriodoLabel('2T')).toBe('Segundo trimestre (abril-junio)');
      expect(getModelo130PeriodoLabel('3T')).toBe('Tercer trimestre (julio-septiembre)');
      expect(getModelo130PeriodoLabel('4T')).toBe('Cuarto trimestre (octubre-diciembre)');
    });

    it('should return English labels when requested', () => {
      expect(getModelo130PeriodoLabel('1T', 'en')).toBe('First quarter (January-March)');
      expect(getModelo130PeriodoLabel('2T', 'en')).toBe('Second quarter (April-June)');
      expect(getModelo130PeriodoLabel('3T', 'en')).toBe('Third quarter (July-September)');
      expect(getModelo130PeriodoLabel('4T', 'en')).toBe('Fourth quarter (October-December)');
    });

    it('should fallback to Spanish for unknown locale', () => {
      expect(getModelo130PeriodoLabel('1T', 'fr')).toBe('Primer trimestre (enero-marzo)');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle freelancer with mixed retention invoices (Q1)', () => {
      // Freelancer with 15000€ income, 8000€ invoiced to companies (15% retention)
      // 7000€ invoiced to individuals (no retention)
      const result = calculateModelo130({
        ingresosAcumulados: 15000,
        gastosAcumulados: 3000,
        pagosAnteriores: 0,
        retencionesFacturas: 1200, // 15% of 8000
        periodo: '1T',
      });

      // Rendimiento: 15000 - 3000 = 12000
      // 20%: 2400
      // Resultado: 2400 - 0 - 1200 = 1200
      expect(result.resultado).toBe(1200);
      expect(result.aIngresar).toBe(1200);
      // 1200 retention at 15% = ~8000 income with retention = ~53%
      expect(result.posibleExencion).toBe(false);
    });

    it('should handle new freelancer first quarter', () => {
      const result = calculateModelo130({
        ingresosAcumulados: 5000,
        gastosAcumulados: 1500,
        pagosAnteriores: 0,
        retencionesFacturas: 350, // 7% new freelancer rate
        periodo: '1T',
      });

      // Rendimiento: 5000 - 1500 = 3500
      // 20%: 700
      // Resultado: 700 - 0 - 350 = 350
      expect(result.resultado).toBe(350);
      expect(result.aIngresar).toBe(350);
    });

    it('should handle professional with all income retained (exempt candidate)', () => {
      // Consultant invoicing only to companies with 15% retention
      const result = calculateModelo130({
        ingresosAcumulados: 30000,
        gastosAcumulados: 6000,
        pagosAnteriores: 0,
        retencionesFacturas: 4500, // 15% of 30000
        periodo: '1T',
      });

      expect(result.posibleExencion).toBe(true);
      // Despite being exempt, if they file:
      // Rendimiento: 24000
      // 20%: 4800
      // Resultado: 4800 - 4500 = 300
      expect(result.resultado).toBe(300);
    });
  });
});
