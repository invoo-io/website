import {
  Calculator,
  Receipt,
  Percent,
  Shield,
  FileText,
  ClipboardList,
  Clock,
  Wallet,
  ReceiptText,
  Scale,
  BadgePercent,
  Coins,
} from 'lucide-react';

/**
 * Icon mapping for calculator topics
 * Each calculator has a semantically relevant icon
 */
export const calculatorIcons = {
  // IVA Calculator - VAT/tax related
  iva: <Percent className="w-full h-full" />,

  // Cuota Autónomos - Social security quota
  cuotaAutonomos: <Shield className="w-full h-full" />,

  // IRPF Autónomos - Income tax
  irpfAutonomos: <BadgePercent className="w-full h-full" />,

  // Modelo 130 - Quarterly tax form
  modelo130: <ClipboardList className="w-full h-full" />,

  // Modelo 303 - VAT return form
  modelo303: <Receipt className="w-full h-full" />,

  // Precio Hora - Hourly rate
  precioHora: <Clock className="w-full h-full" />,

  // Sueldo Neto Autónomo - Net salary
  sueldoNetoAutonomo: <Wallet className="w-full h-full" />,

  // Gastos Deducibles - Deductible expenses
  gastosDeducibles: <Coins className="w-full h-full" />,

  // Factura - Invoice
  factura: <ReceiptText className="w-full h-full" />,

  // Autónomo vs Empresa - Freelancer vs Company comparison
  autonomoVsEmpresa: <Scale className="w-full h-full" />,

  // Default fallback
  default: <Calculator className="w-full h-full" />,
} as const;

export type CalculatorIconKey = keyof typeof calculatorIcons;

/**
 * Get icon for a calculator by its key
 */
export function getCalculatorIcon(key: CalculatorIconKey | string) {
  return calculatorIcons[key as CalculatorIconKey] || calculatorIcons.default;
}
