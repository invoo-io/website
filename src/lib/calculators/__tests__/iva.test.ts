import { describe, it, expect } from 'vitest';
import {
  calculateIVA,
  calculateIVAFromBase,
  extractIVAFromTotal,
  parseAmountInput,
} from '../iva';

describe('IVA Calculator', () => {
  describe('calculateIVAFromBase', () => {
    it('should calculate 21% IVA from base correctly', () => {
      const result = calculateIVAFromBase(100, 21);
      expect(result.base).toBe(100);
      expect(result.ivaRate).toBe(21);
      expect(result.ivaAmount).toBe(21);
      expect(result.total).toBe(121);
    });

    it('should calculate 10% IVA from base correctly', () => {
      const result = calculateIVAFromBase(100, 10);
      expect(result.base).toBe(100);
      expect(result.ivaRate).toBe(10);
      expect(result.ivaAmount).toBe(10);
      expect(result.total).toBe(110);
    });

    it('should calculate 4% IVA from base correctly', () => {
      const result = calculateIVAFromBase(100, 4);
      expect(result.base).toBe(100);
      expect(result.ivaRate).toBe(4);
      expect(result.ivaAmount).toBe(4);
      expect(result.total).toBe(104);
    });

    it('should handle 0% IVA (exempt)', () => {
      const result = calculateIVAFromBase(100, 0);
      expect(result.base).toBe(100);
      expect(result.ivaRate).toBe(0);
      expect(result.ivaAmount).toBe(0);
      expect(result.total).toBe(100);
    });

    it('should round to 2 decimal places', () => {
      const result = calculateIVAFromBase(99.99, 21);
      expect(result.base).toBe(99.99);
      expect(result.ivaAmount).toBe(21); // 99.99 * 0.21 = 20.9979 -> 21.00
      expect(result.total).toBe(120.99); // 99.99 + 20.9979 = 120.9879 -> 120.99
    });

    it('should handle decimal base amounts', () => {
      const result = calculateIVAFromBase(123.45, 21);
      expect(result.base).toBe(123.45);
      expect(result.ivaAmount).toBe(25.92); // 123.45 * 0.21 = 25.9245 -> 25.92
      expect(result.total).toBe(149.37); // 123.45 + 25.9245 = 149.3745 -> 149.37
    });

    it('should handle zero base amount', () => {
      const result = calculateIVAFromBase(0, 21);
      expect(result.base).toBe(0);
      expect(result.ivaAmount).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should handle negative values by converting to 0', () => {
      const result = calculateIVAFromBase(-100, 21);
      expect(result.base).toBe(0);
      expect(result.ivaAmount).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should handle NaN by converting to 0', () => {
      const result = calculateIVAFromBase(NaN, 21);
      expect(result.base).toBe(0);
      expect(result.ivaAmount).toBe(0);
      expect(result.total).toBe(0);
    });

    it('should handle Infinity by capping at max safe amount', () => {
      const result = calculateIVAFromBase(Infinity, 21);
      // Should return 0 for Infinity (sanitized)
      expect(result.base).toBe(0);
    });

    it('should handle very large numbers by capping', () => {
      const result = calculateIVAFromBase(999_999_999_999_999, 21);
      expect(result.base).toBe(999_999_999_999.99); // Capped at max
    });

    it('should handle negative rates by converting to 0', () => {
      const result = calculateIVAFromBase(100, -21);
      expect(result.ivaRate).toBe(0);
      expect(result.ivaAmount).toBe(0);
      expect(result.total).toBe(100);
    });

    it('should cap rates above 100%', () => {
      const result = calculateIVAFromBase(100, 150);
      expect(result.ivaRate).toBe(100);
      expect(result.ivaAmount).toBe(100);
      expect(result.total).toBe(200);
    });
  });

  describe('extractIVAFromTotal', () => {
    it('should extract 21% IVA from total correctly', () => {
      const result = extractIVAFromTotal(121, 21);
      expect(result.total).toBe(121);
      expect(result.ivaRate).toBe(21);
      expect(result.base).toBe(100);
      expect(result.ivaAmount).toBe(21);
    });

    it('should extract 10% IVA from total correctly', () => {
      const result = extractIVAFromTotal(110, 10);
      expect(result.total).toBe(110);
      expect(result.ivaRate).toBe(10);
      expect(result.base).toBe(100);
      expect(result.ivaAmount).toBe(10);
    });

    it('should extract 4% IVA from total correctly', () => {
      const result = extractIVAFromTotal(104, 4);
      expect(result.total).toBe(104);
      expect(result.ivaRate).toBe(4);
      expect(result.base).toBe(100);
      expect(result.ivaAmount).toBe(4);
    });

    it('should handle 0% IVA (exempt)', () => {
      const result = extractIVAFromTotal(100, 0);
      expect(result.total).toBe(100);
      expect(result.ivaRate).toBe(0);
      expect(result.base).toBe(100);
      expect(result.ivaAmount).toBe(0);
    });

    it('should round to 2 decimal places', () => {
      const result = extractIVAFromTotal(99.99, 21);
      expect(result.total).toBe(99.99);
      expect(result.base).toBe(82.64); // 99.99 / 1.21 = 82.636... -> 82.64
      expect(result.ivaAmount).toBe(17.35); // 99.99 - 82.636... = 17.353... -> 17.35
    });

    it('should handle zero total', () => {
      const result = extractIVAFromTotal(0, 21);
      expect(result.total).toBe(0);
      expect(result.base).toBe(0);
      expect(result.ivaAmount).toBe(0);
    });

    it('should handle negative values by converting to 0', () => {
      const result = extractIVAFromTotal(-121, 21);
      expect(result.total).toBe(0);
      expect(result.base).toBe(0);
      expect(result.ivaAmount).toBe(0);
    });

    it('should handle NaN by converting to 0', () => {
      const result = extractIVAFromTotal(NaN, 21);
      expect(result.total).toBe(0);
      expect(result.base).toBe(0);
      expect(result.ivaAmount).toBe(0);
    });
  });

  describe('calculateIVA (unified function)', () => {
    it('should calculate from base when direction is fromBase', () => {
      const result = calculateIVA(100, 21, 'fromBase');
      expect(result.base).toBe(100);
      expect(result.total).toBe(121);
    });

    it('should extract from total when direction is fromTotal', () => {
      const result = calculateIVA(121, 21, 'fromTotal');
      expect(result.base).toBe(100);
      expect(result.total).toBe(121);
    });
  });

  describe('parseAmountInput', () => {
    it('should parse standard decimal numbers', () => {
      expect(parseAmountInput('100')).toBe(100);
      expect(parseAmountInput('100.50')).toBe(100.5);
      expect(parseAmountInput('1234.56')).toBe(1234.56);
    });

    it('should strip commas (locale-aware parsing is done separately)', () => {
      // parseAmountInput is a basic sanitizer; locale-aware parsing is in IVACalculator
      expect(parseAmountInput('100,50')).toBe(10050); // Comma is stripped, not converted
    });

    it('should handle empty string', () => {
      expect(parseAmountInput('')).toBe(0);
    });

    it('should handle null/undefined-like strings', () => {
      expect(parseAmountInput('   ')).toBe(0);
    });

    it('should handle invalid strings', () => {
      expect(parseAmountInput('abc')).toBe(0);
      expect(parseAmountInput('hello world')).toBe(0);
    });

    it('should extract numbers from mixed strings', () => {
      expect(parseAmountInput('123abc')).toBe(123);
    });
  });

  describe('Real-world scenarios', () => {
    it('should correctly calculate a typical freelancer invoice', () => {
      // Freelancer charges 500€ base for services, 21% IVA
      const result = calculateIVAFromBase(500, 21);
      expect(result.base).toBe(500);
      expect(result.ivaAmount).toBe(105);
      expect(result.total).toBe(605);
    });

    it('should correctly extract IVA from a restaurant bill', () => {
      // Restaurant bill of 55€ including 10% IVA
      const result = extractIVAFromTotal(55, 10);
      expect(result.total).toBe(55);
      expect(result.base).toBe(50);
      expect(result.ivaAmount).toBe(5);
    });

    it('should correctly calculate IVA on basic groceries', () => {
      // Bread, milk, eggs - 4% superreducido
      const result = calculateIVAFromBase(25, 4);
      expect(result.base).toBe(25);
      expect(result.ivaAmount).toBe(1);
      expect(result.total).toBe(26);
    });

    it('should handle medical service (exempt)', () => {
      // Medical consultation - 0% IVA
      const result = calculateIVAFromBase(80, 0);
      expect(result.base).toBe(80);
      expect(result.ivaAmount).toBe(0);
      expect(result.total).toBe(80);
    });

    it('should handle typical e-commerce amounts', () => {
      // Online purchase of 49.99€ + 21% IVA
      const result = calculateIVAFromBase(49.99, 21);
      expect(result.base).toBe(49.99);
      expect(result.ivaAmount).toBe(10.5); // 49.99 * 0.21 = 10.4979 -> 10.50
      expect(result.total).toBe(60.49);
    });
  });

  describe('Mathematical properties', () => {
    it('should be reversible: fromBase -> fromTotal -> original', () => {
      const original = 100;
      const rate = 21;

      const fromBase = calculateIVAFromBase(original, rate);
      const backToBase = extractIVAFromTotal(fromBase.total, rate);

      expect(backToBase.base).toBe(original);
    });

    it('should handle the reversibility with decimals (within rounding tolerance)', () => {
      const original = 123.45;
      const rate = 21;

      const fromBase = calculateIVAFromBase(original, rate);
      const backToBase = extractIVAFromTotal(fromBase.total, rate);

      // Due to rounding, we check within 1 cent tolerance
      expect(Math.abs(backToBase.base - original)).toBeLessThanOrEqual(0.01);
    });

    it('should ensure base + ivaAmount = total (from base calculation)', () => {
      const result = calculateIVAFromBase(100, 21);
      expect(result.base + result.ivaAmount).toBe(result.total);
    });

    it('should ensure base + ivaAmount = total (from total extraction)', () => {
      const result = extractIVAFromTotal(121, 21);
      expect(result.base + result.ivaAmount).toBe(result.total);
    });
  });
});
