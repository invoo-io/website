# Calculator Implementation Plan

Comprehensive plan for building 10 SEO-optimized calculators to drive organic traffic from Spanish autónomos and freelancers.

---

## Table of Contents

1. [Overview](#overview)
2. [Technical Architecture](#technical-architecture)
3. [URL Structure & Routing](#url-structure--routing)
4. [Shared Components](#shared-components)
5. [Calculator Specifications](#calculator-specifications)
   - [1. Calculadora IVA](#1-calculadora-iva)
   - [2. Calculadora Cuota Autónomos](#2-calculadora-cuota-autónomos)
   - [3. Calculadora Factura](#3-calculadora-factura)
   - [4. Calculadora IRPF Autónomos](#4-calculadora-irpf-autónomos)
   - [5. Calculadora Sueldo Neto Autónomo](#5-calculadora-sueldo-neto-autónomo)
   - [6. Calculadora Precio Hora Freelance](#6-calculadora-precio-hora-freelance)
   - [7. Calculadora Modelo 303](#7-calculadora-modelo-303)
   - [8. Calculadora Modelo 130](#8-calculadora-modelo-130)
   - [9. Calculadora Gastos Deducibles](#9-calculadora-gastos-deducibles)
   - [10. Calculadora Autónomo vs Empresa](#10-calculadora-autónomo-vs-empresa)
6. [SEO Requirements](#seo-requirements)
7. [Translation Keys](#translation-keys)
8. [Implementation Phases](#implementation-phases)
9. [Testing Strategy](#testing-strategy)

---

## Overview

### Business Goals

- **Primary:** Drive organic traffic from Spanish autónomos searching for tax/business calculators
- **Secondary:** Convert calculator users to Invoo waiting list
- **Tertiary:** Build topical authority in the autónomo/freelancer space

### Target Metrics (12 months)

| Metric | Target |
|--------|--------|
| Monthly organic visits | 35,000 |
| Email capture rate | 8-12% |
| Trial signup rate | 2-4% |
| New customers/month | 40-120 |

### Key Differentiators

1. **Verifactu-ready messaging** on all calculators
2. **Regional intelligence** (CCAA-specific rates and bonuses)
3. **Mobile-first UX** (clean, fast, no clutter)
4. **Educational approach** (explain WHY, not just HOW)
5. **Integration path** to Invoo product

---

## Technical Architecture

### File Structure

```
src/
├── app/
│   └── [locale]/
│       └── herramientas/
│           ├── page.tsx                    # Tools hub page
│           └── calculadoras/
│               ├── page.tsx                # Calculator index
│               ├── layout.tsx              # Shared calculator layout
│               ├── iva/
│               │   └── page.tsx
│               ├── cuota-autonomos/
│               │   └── page.tsx
│               ├── factura/
│               │   └── page.tsx
│               ├── irpf/
│               │   └── page.tsx
│               ├── sueldo-neto/
│               │   └── page.tsx
│               ├── precio-hora-freelance/
│               │   └── page.tsx
│               ├── modelo-303/
│               │   └── page.tsx
│               ├── modelo-130/
│               │   └── page.tsx
│               ├── gastos-deducibles/
│               │   └── page.tsx
│               └── autonomo-vs-empresa/
│                   └── page.tsx
├── components/
│   └── calculators/
│       ├── shared/
│       │   ├── CalculatorCard.tsx          # Wrapper with consistent styling
│       │   ├── CalculatorInput.tsx         # Styled number/text inputs
│       │   ├── CalculatorSelect.tsx        # Styled select dropdowns
│       │   ├── CalculatorResult.tsx        # Result display component
│       │   ├── CalculatorCTA.tsx           # Call-to-action component
│       │   ├── CalculatorFAQ.tsx           # FAQ section with schema
│       │   ├── CalculatorSchema.tsx        # JSON-LD schema markup
│       │   ├── RelatedCalculators.tsx      # Internal linking component
│       │   └── EmailCapture.tsx            # Optional email capture modal
│       ├── IVACalculator.tsx
│       ├── CuotaAutonomosCalculator.tsx
│       ├── FacturaCalculator.tsx
│       ├── IRPFCalculator.tsx
│       ├── SueldoNetoCalculator.tsx
│       ├── PrecioHoraCalculator.tsx
│       ├── Modelo303Calculator.tsx
│       ├── Modelo130Calculator.tsx
│       ├── GastosDeduciblesCalculator.tsx
│       └── AutonomoVsEmpresaCalculator.tsx
├── lib/
│   └── calculators/
│       ├── constants.ts                    # Tax rates, tramos, etc.
│       ├── types.ts                        # TypeScript interfaces
│       ├── iva.ts                          # IVA calculation logic
│       ├── cuota-autonomos.ts              # Cuota calculation logic
│       ├── irpf.ts                         # IRPF calculation logic
│       ├── modelo-303.ts                   # Modelo 303 logic
│       ├── modelo-130.ts                   # Modelo 130 logic
│       └── utils.ts                        # Shared utility functions
└── messages/
    ├── es.json                             # Spanish translations
    └── en.json                             # English translations
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI primitives |
| Animations | Framer Motion |
| i18n | next-intl |
| Schema | JSON-LD (inline) |
| State | React useState (local) |

### Component Guidelines

```typescript
// All calculator components must:
// 1. Be client components ('use client')
// 2. Handle calculations locally (no API calls)
// 3. Be mobile-responsive
// 4. Include proper ARIA labels
// 5. Show results instantly (no submit button)

'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

export function ExampleCalculator() {
  const t = useTranslations('calculators.example');
  const [input, setInput] = useState<number>(0);

  // Calculations should use useMemo for performance
  const result = useMemo(() => {
    return calculateSomething(input);
  }, [input]);

  return (
    <CalculatorCard title={t('title')}>
      {/* Calculator content */}
    </CalculatorCard>
  );
}
```

---

## URL Structure & Routing

### Spanish URLs (Primary)

| Calculator | URL |
|------------|-----|
| Hub | `/es/herramientas/calculadoras` |
| IVA | `/es/herramientas/calculadoras/iva` |
| Cuota Autónomos | `/es/herramientas/calculadoras/cuota-autonomos` |
| Factura | `/es/herramientas/calculadoras/factura` |
| IRPF | `/es/herramientas/calculadoras/irpf` |
| Sueldo Neto | `/es/herramientas/calculadoras/sueldo-neto` |
| Precio Hora | `/es/herramientas/calculadoras/precio-hora-freelance` |
| Modelo 303 | `/es/herramientas/calculadoras/modelo-303` |
| Modelo 130 | `/es/herramientas/calculadoras/modelo-130` |
| Gastos Deducibles | `/es/herramientas/calculadoras/gastos-deducibles` |
| Autónomo vs Empresa | `/es/herramientas/calculadoras/autonomo-vs-empresa` |

### English URLs (Secondary)

| Calculator | URL |
|------------|-----|
| Hub | `/en/tools/calculators` |
| VAT | `/en/tools/calculators/vat` |
| Self-employed Quota | `/en/tools/calculators/self-employed-quota` |
| Invoice | `/en/tools/calculators/invoice` |
| Income Tax | `/en/tools/calculators/income-tax` |
| Net Salary | `/en/tools/calculators/net-salary` |
| Hourly Rate | `/en/tools/calculators/hourly-rate-freelance` |
| Form 303 | `/en/tools/calculators/form-303` |
| Form 130 | `/en/tools/calculators/form-130` |
| Deductible Expenses | `/en/tools/calculators/deductible-expenses` |
| Freelance vs Company | `/en/tools/calculators/freelance-vs-company` |

### Routing Configuration

```typescript
// src/app/[locale]/herramientas/calculadoras/[slug]/page.tsx

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const calculators = [
    'iva',
    'cuota-autonomos',
    'factura',
    'irpf',
    'sueldo-neto',
    'precio-hora-freelance',
    'modelo-303',
    'modelo-130',
    'gastos-deducibles',
    'autonomo-vs-empresa',
  ];

  const locales = ['es', 'en'];

  return locales.flatMap(locale =>
    calculators.map(slug => ({ locale, slug }))
  );
}
```

---

## Shared Components

### CalculatorCard

Container component for all calculators with consistent styling.

```typescript
interface CalculatorCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

// Features:
// - White background with subtle shadow
// - Rounded corners (rounded-2xl)
// - Responsive padding
// - Optional description below title
```

### CalculatorInput

Styled number input with label and optional helper text.

```typescript
interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;        // e.g., "€"
  suffix?: string;        // e.g., "%"
  helperText?: string;
  error?: string;
  id: string;             // Required for accessibility
}

// Features:
// - Large touch targets (min 44px)
// - Clear focus states
// - Numeric keyboard on mobile
// - Instant value updates (no debounce)
// - Format numbers with locale (1.234,56 for ES)
```

### CalculatorSelect

Styled dropdown for selecting options.

```typescript
interface CalculatorSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  helperText?: string;
  id: string;
}

// Features:
// - Native select on mobile (better UX)
// - Custom styled on desktop
// - Keyboard navigable
```

### CalculatorResult

Display component for calculation results.

```typescript
interface CalculatorResultProps {
  label: string;
  value: number;
  format?: 'currency' | 'percentage' | 'number';
  variant?: 'default' | 'highlight' | 'warning';
  breakdown?: Array<{ label: string; value: number }>;
}

// Features:
// - Large, readable numbers
// - Color coding for positive/negative
// - Optional breakdown table
// - Animated number transitions
```

### CalculatorCTA

Call-to-action component for conversion.

```typescript
interface CalculatorCTAProps {
  variant: 'primary' | 'secondary';
  headline: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

// Variants:
// - primary: Full-width banner below results
// - secondary: Subtle inline mention
```

### CalculatorFAQ

FAQ section with collapsible items and schema markup.

```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorFAQProps {
  items: FAQItem[];
}

// Features:
// - Accordion UI (one open at a time)
// - Auto-generates FAQPage schema
// - Accessible expand/collapse
```

### CalculatorSchema

JSON-LD schema markup component.

```typescript
interface CalculatorSchemaProps {
  name: string;
  description: string;
  features: string[];
  faqs?: FAQItem[];
  howToSteps?: string[];
}

// Generates:
// - SoftwareApplication schema
// - FAQPage schema (if faqs provided)
// - HowTo schema (if steps provided)
// - BreadcrumbList schema
```

### RelatedCalculators

Internal linking to other calculators.

```typescript
interface RelatedCalculatorsProps {
  current: string;        // Current calculator slug
  related?: string[];     // Override default related
}

// Features:
// - Shows 3-4 related calculators
// - Card format with icon and description
// - Intelligent defaults based on topic
```

---

## Calculator Specifications

---

### 1. Calculadora IVA

**Priority:** CRITICAL (Phase 1)
**Difficulty:** Low
**Est. Development:** 4-6 hours

#### Purpose

Calculate IVA (VAT) amounts for invoices, showing base amount, IVA amount, and total.

#### Target Keywords

- `calculadora iva` (primary)
- `calcular iva`
- `calculadora iva online`
- `calculadora iva 21`
- `iva incluido calculadora`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Base Imponible | number | 0 | min: 0, step: 0.01 |
| Tipo de IVA | select | 21% | 21% (General), 10% (Reducido), 4% (Superreducido), 0% (Exento) |
| Dirección del cálculo | radio | base→total | "Calcular IVA desde base", "Extraer IVA del total" |

#### Outputs

| Result | Calculation |
|--------|-------------|
| Base Imponible | Input (or calculated if extracting) |
| IVA ({rate}%) | base × rate |
| Total con IVA | base + IVA |

#### Calculation Logic

```typescript
// src/lib/calculators/iva.ts

export interface IVAResult {
  base: number;
  ivaRate: number;
  ivaAmount: number;
  total: number;
}

export function calculateIVAFromBase(
  base: number,
  rate: number
): IVAResult {
  const ivaAmount = base * (rate / 100);
  return {
    base,
    ivaRate: rate,
    ivaAmount,
    total: base + ivaAmount,
  };
}

export function extractIVAFromTotal(
  total: number,
  rate: number
): IVAResult {
  const base = total / (1 + rate / 100);
  const ivaAmount = total - base;
  return {
    base,
    ivaRate: rate,
    ivaAmount,
    total,
  };
}
```

#### FAQ Content

1. ¿Cuáles son los tipos de IVA en España?
2. ¿Cuándo aplico el IVA reducido del 10%?
3. ¿Qué productos tienen IVA superreducido del 4%?
4. ¿Cómo calcular el IVA incluido en un precio?
5. ¿Debo cobrar IVA como autónomo?

#### Related Calculators

- Calculadora Factura
- Calculadora Modelo 303
- Calculadora Gastos Deducibles

---

### 2. Calculadora Cuota Autónomos

**Priority:** CRITICAL (Phase 1)
**Difficulty:** Medium
**Est. Development:** 8-12 hours

#### Purpose

Calculate monthly Social Security quota based on net income using the 2024-2025 tramos system.

#### Target Keywords

- `calculadora cuota autonomos` (primary)
- `cuota autonomo 2026`
- `cuanto paga un autonomo`
- `calculadora seguridad social autonomos`
- `tramos cuota autonomos`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Rendimiento Neto Anual | number | 0 | min: 0, step: 100 |
| Año | select | 2026 | 2024, 2025, 2026 |
| ¿Primera alta como autónomo? | toggle | false | - |
| ¿En los últimos 2 años? | toggle | false | Shows if primera alta = true |
| Comunidad Autónoma | select | - | All 17 CCAA + Ceuta/Melilla |

#### 2024-2026 Tramos (Constants)

```typescript
// src/lib/calculators/constants.ts

export const CUOTA_TRAMOS_2024 = [
  { min: 0, max: 670, base: 735.29, rate: 0.313, cuota: 230.15 },
  { min: 670.01, max: 900, base: 816.98, rate: 0.313, cuota: 255.71 },
  { min: 900.01, max: 1166.70, base: 872.55, rate: 0.313, cuota: 273.11 },
  { min: 1166.71, max: 1300, base: 951.06, rate: 0.313, cuota: 297.68 },
  { min: 1300.01, max: 1500, base: 960.78, rate: 0.313, cuota: 300.72 },
  { min: 1500.01, max: 1700, base: 960.78, rate: 0.313, cuota: 300.72 },
  { min: 1700.01, max: 1850, base: 1045.75, rate: 0.313, cuota: 327.32 },
  { min: 1850.01, max: 2030, base: 1062.09, rate: 0.313, cuota: 332.43 },
  { min: 2030.01, max: 2330, base: 1078.43, rate: 0.313, cuota: 337.55 },
  { min: 2330.01, max: 2760, base: 1111.11, rate: 0.313, cuota: 347.78 },
  { min: 2760.01, max: 3190, base: 1176.47, rate: 0.313, cuota: 368.24 },
  { min: 3190.01, max: 3620, base: 1241.83, rate: 0.313, cuota: 388.69 },
  { min: 3620.01, max: 4050, base: 1307.19, rate: 0.313, cuota: 409.15 },
  { min: 4050.01, max: 6000, base: 1454.25, rate: 0.313, cuota: 455.18 },
  { min: 6000.01, max: Infinity, base: 1732.03, rate: 0.313, cuota: 542.13 },
];

// 2025 and 2026 tables would have adjusted values

export const TARIFA_PLANA = {
  firstYear: 80,          // €80/month first 12 months
  secondYear: {           // Months 13-24
    standard: 160,        // If income > SMI
    reduced: 80,          // If income < SMI
  },
};

export const CUOTA_CERO_CCAA = [
  'madrid',
  'andalucia',
  'murcia',
  'canarias',
  'baleares',
];
```

#### Outputs

| Result | Description |
|--------|-------------|
| Tramo | Which income bracket applies |
| Base de Cotización | Contribution base for the tramo |
| Cuota Mensual | Monthly payment |
| Cuota Anual | Monthly × 12 |
| Bonificación aplicable | Tarifa plana or Cuota Cero if eligible |
| Cuota con bonificación | Final amount after discounts |

#### Calculation Logic

```typescript
// src/lib/calculators/cuota-autonomos.ts

export interface CuotaResult {
  rendimientoMensual: number;
  tramo: number;
  baseCotizacion: number;
  cuotaMensual: number;
  cuotaAnual: number;
  bonificacion?: {
    tipo: 'tarifa_plana' | 'cuota_cero';
    cuotaBonificada: number;
    ahorro: number;
  };
}

export function calculateCuotaAutonomos(
  rendimientoAnual: number,
  year: 2024 | 2025 | 2026,
  options: {
    primeraAlta: boolean;
    menosDosTanos: boolean;
    ccaa: string;
  }
): CuotaResult {
  const rendimientoMensual = rendimientoAnual / 12;
  const tramos = getTramosByYear(year);

  const tramo = tramos.find(
    t => rendimientoMensual >= t.min && rendimientoMensual <= t.max
  );

  // Apply tarifa plana if eligible
  // Apply cuota cero if eligible (CCAA-specific)

  return {
    rendimientoMensual,
    tramo: tramos.indexOf(tramo) + 1,
    baseCotizacion: tramo.base,
    cuotaMensual: tramo.cuota,
    cuotaAnual: tramo.cuota * 12,
    bonificacion: calculateBonificacion(options),
  };
}
```

#### FAQ Content

1. ¿Cómo funciona el sistema de cotización por tramos?
2. ¿Qué es la tarifa plana de autónomos y quién puede solicitarla?
3. ¿Qué comunidades tienen Cuota Cero para nuevos autónomos?
4. ¿Cuándo cambia mi tramo de cotización?
5. ¿Cómo calculo mi rendimiento neto?
6. ¿Puedo elegir una base de cotización superior?

#### Related Calculators

- Calculadora Sueldo Neto Autónomo
- Calculadora IRPF Autónomos
- Calculadora Modelo 130

---

### 3. Calculadora Factura

**Priority:** CRITICAL (Phase 1)
**Difficulty:** Low
**Est. Development:** 4-6 hours

#### Purpose

Calculate complete invoice amounts including base, IVA, and IRPF retention.

#### Target Keywords

- `calculadora factura` (primary)
- `calculadora factura autonomo`
- `calcular factura con iva e irpf`
- `calculadora retencion factura`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Base Imponible | number | 0 | min: 0, step: 0.01 |
| Tipo de IVA | select | 21% | 21%, 10%, 4%, 0% |
| ¿Aplica retención IRPF? | toggle | false | - |
| Porcentaje IRPF | select | 15% | 7% (nuevos), 15% (general), 19%, 0% |
| ¿Cliente empresa o autónomo? | radio | empresa | empresa, particular |

#### Outputs

| Result | Calculation |
|--------|-------------|
| Base Imponible | Input |
| IVA ({rate}%) | base × ivaRate |
| Subtotal | base + IVA |
| Retención IRPF ({rate}%) | base × irpfRate |
| **Total Factura** | subtotal - retención |
| A cobrar del cliente | Total Factura |
| A recibir de Hacienda | Retención (en declaración) |

#### Calculation Logic

```typescript
// src/lib/calculators/factura.ts

export interface FacturaResult {
  base: number;
  ivaRate: number;
  ivaAmount: number;
  subtotal: number;
  irpfRate: number;
  irpfAmount: number;
  total: number;
  aRecibirHacienda: number;
}

export function calculateFactura(
  base: number,
  ivaRate: number,
  irpfRate: number = 0,
  clienteEmpresa: boolean = true
): FacturaResult {
  const ivaAmount = base * (ivaRate / 100);
  const subtotal = base + ivaAmount;

  // IRPF only applies when client is empresa/autonomo
  const irpfAmount = clienteEmpresa ? base * (irpfRate / 100) : 0;
  const total = subtotal - irpfAmount;

  return {
    base,
    ivaRate,
    ivaAmount,
    subtotal,
    irpfRate,
    irpfAmount,
    total,
    aRecibirHacienda: irpfAmount, // Gets returned via Renta
  };
}
```

#### Visual Output

Show a mock invoice preview with all fields filled in, making it easy to understand.

#### FAQ Content

1. ¿Cuándo debo aplicar retención de IRPF en mis facturas?
2. ¿Puedo usar retención del 7% como nuevo autónomo?
3. ¿Qué pasa si facturo a un particular (sin retención)?
4. ¿Cómo afecta el IVA y el IRPF a mis beneficios reales?
5. ¿Qué es Verifactu y cómo afecta a mis facturas?

#### CTA Integration

Strong CTA: "Genera esta factura automáticamente con Invoo" → Link to signup

#### Related Calculators

- Calculadora IVA
- Calculadora IRPF Autónomos
- Calculadora Sueldo Neto

---

### 4. Calculadora IRPF Autónomos

**Priority:** HIGH (Phase 2)
**Difficulty:** Medium-High
**Est. Development:** 10-14 hours

#### Purpose

Calculate IRPF (income tax) liability for autónomos based on annual income, expenses, and regional rates.

#### Target Keywords

- `calculadora irpf autonomos` (primary)
- `calcular irpf autonomo`
- `cuanto irpf paga un autonomo`
- `irpf autonomos 2026`
- `tramos irpf autonomos`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Ingresos Brutos Anuales | number | 0 | min: 0 |
| Gastos Deducibles | number | 0 | min: 0 |
| Comunidad Autónoma | select | madrid | All 17 CCAA |
| Situación Personal | select | soltero | soltero, casado_1_ingreso, casado_2_ingresos |
| Hijos a cargo | number | 0 | 0-10 |
| ¿Mayor de 65 años? | toggle | false | - |
| ¿Discapacidad >33%? | toggle | false | - |
| Retenciones ya practicadas | number | 0 | From invoices |

#### IRPF Tramos 2024 (State portion)

```typescript
// src/lib/calculators/constants.ts

export const IRPF_TRAMOS_ESTATAL_2024 = [
  { min: 0, max: 12450, rate: 9.5 },
  { min: 12450.01, max: 20199, rate: 12 },
  { min: 20199.01, max: 35199, rate: 15 },
  { min: 35199.01, max: 59999, rate: 18.5 },
  { min: 59999.01, max: 299999, rate: 22.5 },
  { min: 299999.01, max: Infinity, rate: 24.5 },
];

// Regional portions vary by CCAA
export const IRPF_TRAMOS_CCAA = {
  madrid: [
    { min: 0, max: 12450, rate: 8.5 },
    { min: 12450.01, max: 17707, rate: 10.7 },
    { min: 17707.01, max: 33007, rate: 12.8 },
    { min: 33007.01, max: 53407, rate: 17.4 },
    { min: 53407.01, max: Infinity, rate: 20.5 },
  ],
  cataluna: [
    { min: 0, max: 12450, rate: 10.5 },
    { min: 12450.01, max: 17707, rate: 12 },
    // ... etc
  ],
  // ... all other CCAA
};
```

#### Outputs

| Result | Description |
|--------|-------------|
| Rendimiento Neto | Ingresos - Gastos - GDJ (5%) |
| Base Imponible General | Rendimiento neto after reductions |
| Cuota Íntegra Estatal | Tax from state tramos |
| Cuota Íntegra Autonómica | Tax from regional tramos |
| Deducciones | Personal/family deductions |
| Cuota Líquida | Total tax liability |
| Retenciones | Already withheld |
| **Resultado** | To pay or return |

#### Calculation Logic

```typescript
// src/lib/calculators/irpf.ts

export interface IRPFResult {
  ingresosBrutos: number;
  gastos: number;
  gastosDeduciblesDificilJustificacion: number; // 5% automatic
  rendimientoNeto: number;
  reduccionesPersonales: number;
  baseImponible: number;
  cuotaEstatal: number;
  cuotaAutonomica: number;
  cuotaIntegra: number;
  deducciones: number;
  cuotaLiquida: number;
  retenciones: number;
  resultado: number; // Positive = to pay, negative = return
  tipoEfectivo: number; // Effective tax rate %
}

export function calculateIRPF(
  ingresos: number,
  gastos: number,
  ccaa: string,
  personal: PersonalSituation
): IRPFResult {
  // 5% GDJ for estimación directa simplificada
  const gdj = (ingresos - gastos) * 0.05;
  const rendimientoNeto = ingresos - gastos - Math.min(gdj, 2000);

  // Calculate tax by tramos (progressive)
  const cuotaEstatal = calculateByTramos(rendimientoNeto, IRPF_TRAMOS_ESTATAL);
  const cuotaAutonomica = calculateByTramos(rendimientoNeto, IRPF_TRAMOS_CCAA[ccaa]);

  // Apply deductions based on personal situation
  // ...

  return result;
}
```

#### FAQ Content

1. ¿Cómo se calcula el IRPF de un autónomo?
2. ¿Qué son los tramos del IRPF y cómo funcionan?
3. ¿Qué gastos puedo deducir en el IRPF como autónomo?
4. ¿Qué es el GDJ (5% de gastos de difícil justificación)?
5. ¿Cómo afecta mi comunidad autónoma al IRPF?
6. ¿Cuándo tengo que presentar la declaración de la Renta?

#### Related Calculators

- Calculadora Modelo 130
- Calculadora Gastos Deducibles
- Calculadora Sueldo Neto Autónomo

---

### 5. Calculadora Sueldo Neto Autónomo

**Priority:** HIGH (Phase 2)
**Difficulty:** Medium
**Est. Development:** 8-10 hours

#### Purpose

Calculate actual take-home pay ("cuánto me queda en el bolsillo") after all taxes and Social Security.

#### Target Keywords

- `calculadora sueldo neto autonomo` (primary)
- `cuanto gana un autonomo`
- `cuanto me queda de autonomo`
- `sueldo neto freelance`
- `cuanto cobra un autonomo`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Facturación Anual | number | 0 | min: 0 |
| Gastos del Negocio (%) | slider | 20% | 0-60% |
| Comunidad Autónoma | select | madrid | All 17 CCAA |
| ¿Tarifa plana? | toggle | false | - |
| Situación personal | select | soltero | soltero, casado, hijos |

#### Outputs

| Result | Calculation |
|--------|-------------|
| Facturación Anual | Input |
| - Gastos del Negocio | facturación × gastos% |
| = Rendimiento Neto | facturación - gastos |
| - Cuota Autónomos Anual | From cuota calculation |
| - IRPF Anual | From IRPF calculation |
| = **Sueldo Neto Anual** | After all deductions |
| = **Sueldo Neto Mensual** | Anual / 12 |
| Tipo impositivo efectivo | (Cuota + IRPF) / Facturación |

#### Visual Breakdown

Show a clear waterfall chart or bar visualization:
- Green: What you keep
- Red: Cuota SS
- Orange: IRPF
- Gray: Business expenses

#### Calculation Logic

```typescript
// src/lib/calculators/sueldo-neto.ts

export interface SueldoNetoResult {
  facturacion: number;
  gastos: number;
  rendimientoNeto: number;
  cuotaAnual: number;
  irpfAnual: number;
  sueldoNetoAnual: number;
  sueldoNetoMensual: number;
  tipoEfectivo: number;
  desglose: {
    label: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
}

export function calculateSueldoNeto(
  facturacion: number,
  gastosPercent: number,
  ccaa: string,
  options: SueldoNetoOptions
): SueldoNetoResult {
  const gastos = facturacion * (gastosPercent / 100);
  const rendimientoNeto = facturacion - gastos;

  // Use cuota calculator
  const cuotaResult = calculateCuotaAutonomos(rendimientoNeto, 2026, options);

  // Use IRPF calculator
  const irpfResult = calculateIRPF(facturacion, gastos, ccaa, options.personal);

  const sueldoNetoAnual = rendimientoNeto - cuotaResult.cuotaAnual - irpfResult.cuotaLiquida;

  return {
    facturacion,
    gastos,
    rendimientoNeto,
    cuotaAnual: cuotaResult.cuotaAnual,
    irpfAnual: irpfResult.cuotaLiquida,
    sueldoNetoAnual,
    sueldoNetoMensual: sueldoNetoAnual / 12,
    tipoEfectivo: ((cuotaResult.cuotaAnual + irpfResult.cuotaLiquida) / facturacion) * 100,
    desglose: buildDesglose(/* ... */),
  };
}
```

#### FAQ Content

1. ¿Cuánto dinero me queda realmente como autónomo?
2. ¿Qué porcentaje de gastos es normal para un autónomo?
3. ¿Cómo puedo aumentar mi sueldo neto como autónomo?
4. ¿Cuál es el tipo impositivo efectivo de un autónomo?
5. ¿Es mejor ser autónomo o trabajador por cuenta ajena?

#### Related Calculators

- Calculadora Cuota Autónomos
- Calculadora IRPF Autónomos
- Calculadora Autónomo vs Empresa

---

### 6. Calculadora Precio Hora Freelance

**Priority:** HIGH (Phase 2)
**Difficulty:** Low-Medium
**Est. Development:** 6-8 hours

#### Purpose

Calculate what hourly rate to charge based on desired annual income and business costs.

#### Target Keywords

- `calculadora precio hora freelance` (primary)
- `cuanto cobrar como freelance`
- `tarifa hora autonomo`
- `calculadora tarifa freelance`
- `precio por hora autonomo`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Sueldo Neto Deseado (anual) | number | 30000 | min: 0 |
| Horas de trabajo al día | number | 8 | 1-12 |
| Días de trabajo a la semana | number | 5 | 1-7 |
| Semanas de vacaciones | number | 4 | 0-12 |
| % Horas facturables | slider | 70% | 30-100% |
| Gastos fijos mensuales | number | 200 | min: 0 |
| Comunidad Autónoma | select | madrid | All 17 CCAA |

#### Outputs

| Result | Calculation |
|--------|-------------|
| Días laborables al año | (52 - vacaciones) × días/semana |
| Horas laborables al año | días × horas/día |
| Horas facturables al año | horas × facturables% |
| Ingresos brutos necesarios | Back-calculate from net |
| **Precio por hora mínimo** | brutos / horas facturables |
| Precio recomendado (+20% margen) | mínimo × 1.2 |
| Precio para proyecto de 8h | hora × 8 |
| Precio para proyecto de 40h | hora × 40 |

#### Calculation Logic

```typescript
// src/lib/calculators/precio-hora.ts

export interface PrecioHoraResult {
  diasLaborables: number;
  horasLaborables: number;
  horasFacturables: number;
  ingresosNecesarios: number;
  precioHoraMinimo: number;
  precioHoraRecomendado: number;
  precioMediaJornada: number;
  precioDiaCompleto: number;
  precioSemana: number;
}

export function calculatePrecioHora(
  sueldoNetoDeseado: number,
  horasDia: number,
  diasSemana: number,
  semanasVacaciones: number,
  porcentajeFacturable: number,
  gastosMensuales: number,
  ccaa: string
): PrecioHoraResult {
  const semanasLaborables = 52 - semanasVacaciones;
  const diasLaborables = semanasLaborables * diasSemana;
  const horasLaborables = diasLaborables * horasDia;
  const horasFacturables = horasLaborables * (porcentajeFacturable / 100);

  // Back-calculate gross income needed to achieve net
  const ingresosNecesarios = backCalculateGross(sueldoNetoDeseado, gastosMensuales, ccaa);

  const precioHoraMinimo = ingresosNecesarios / horasFacturables;

  return {
    diasLaborables,
    horasLaborables,
    horasFacturables,
    ingresosNecesarios,
    precioHoraMinimo,
    precioHoraRecomendado: precioHoraMinimo * 1.2,
    precioMediaJornada: precioHoraMinimo * 4,
    precioDiaCompleto: precioHoraMinimo * 8,
    precioSemana: precioHoraMinimo * horasDia * diasSemana,
  };
}
```

#### FAQ Content

1. ¿Cómo calculo mi tarifa por hora como freelance?
2. ¿Qué porcentaje de mi tiempo es realmente facturable?
3. ¿Debo cobrar el mismo precio a todos mis clientes?
4. ¿Cómo incluyo mis impuestos en el precio por hora?
5. ¿Cuál es la tarifa media de un freelance en España?
6. ¿Es mejor cobrar por hora o por proyecto?

#### Related Calculators

- Calculadora Sueldo Neto Autónomo
- Calculadora Factura
- Calculadora Cuota Autónomos

---

### 7. Calculadora Modelo 303

**Priority:** MEDIUM (Phase 3)
**Difficulty:** Medium
**Est. Development:** 8-10 hours

#### Purpose

Calculate IVA quarterly payment (Modelo 303) from invoices issued and received.

#### Target Keywords

- `calculadora modelo 303` (primary)
- `calcular iva trimestral`
- `modelo 303 calculadora`
- `iva a pagar trimestre`
- `liquidacion iva autonomos`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| **IVA Repercutido (ventas)** | | | |
| Facturas emitidas al 21% | number | 0 | Base amount |
| Facturas emitidas al 10% | number | 0 | Base amount |
| Facturas emitidas al 4% | number | 0 | Base amount |
| **IVA Soportado (gastos)** | | | |
| Facturas recibidas al 21% | number | 0 | Base amount |
| Facturas recibidas al 10% | number | 0 | Base amount |
| Facturas recibidas al 4% | number | 0 | Base amount |
| IVA pendiente de compensar | number | 0 | From previous quarters |
| Trimestre | select | Q1 | Q1, Q2, Q3, Q4 |

#### Outputs

| Result | Calculation |
|--------|-------------|
| IVA Repercutido (21%) | base21 × 0.21 |
| IVA Repercutido (10%) | base10 × 0.10 |
| IVA Repercutido (4%) | base4 × 0.04 |
| **Total IVA Repercutido** | Sum of above |
| IVA Soportado (21%) | gastos21 × 0.21 |
| IVA Soportado (10%) | gastos10 × 0.10 |
| IVA Soportado (4%) | gastos4 × 0.04 |
| **Total IVA Soportado** | Sum of above |
| IVA pendiente anterior | Input |
| **Resultado** | Repercutido - Soportado - Pendiente |
| Casilla 69 (a ingresar) | If positive |
| Casilla 71 (a compensar) | If negative (Q1-Q3) |
| Casilla 72 (a devolver) | If negative (Q4) |

#### Calculation Logic

```typescript
// src/lib/calculators/modelo-303.ts

export interface Modelo303Result {
  ivaRepercutido: {
    base21: number;
    cuota21: number;
    base10: number;
    cuota10: number;
    base4: number;
    cuota4: number;
    total: number;
  };
  ivaSoportado: {
    base21: number;
    cuota21: number;
    base10: number;
    cuota10: number;
    base4: number;
    cuota4: number;
    total: number;
  };
  pendienteCompensar: number;
  resultado: number;
  casilla69: number; // A ingresar
  casilla71: number; // A compensar (Q1-Q3)
  casilla72: number; // A devolver (Q4)
  fechaLimite: Date;
}

export function calculateModelo303(
  repercutido: IVADesglose,
  soportado: IVADesglose,
  pendiente: number,
  trimestre: 1 | 2 | 3 | 4,
  year: number
): Modelo303Result {
  const totalRepercutido = calculateIVATotal(repercutido);
  const totalSoportado = calculateIVATotal(soportado);

  const resultado = totalRepercutido - totalSoportado - pendiente;

  return {
    ivaRepercutido: repercutido,
    ivaSoportado: soportado,
    pendienteCompensar: pendiente,
    resultado,
    casilla69: resultado > 0 ? resultado : 0,
    casilla71: resultado < 0 && trimestre < 4 ? Math.abs(resultado) : 0,
    casilla72: resultado < 0 && trimestre === 4 ? Math.abs(resultado) : 0,
    fechaLimite: getDeadline(trimestre, year),
  };
}
```

#### FAQ Content

1. ¿Cuándo se presenta el Modelo 303?
2. ¿Qué diferencia hay entre IVA repercutido y soportado?
3. ¿Qué pasa si el resultado es negativo?
4. ¿Puedo compensar IVA de trimestres anteriores?
5. ¿Cuándo puedo solicitar la devolución del IVA?
6. ¿Qué gastos tienen IVA deducible?

#### Related Calculators

- Calculadora IVA
- Calculadora Modelo 130
- Calculadora Gastos Deducibles

---

### 8. Calculadora Modelo 130

**Priority:** MEDIUM (Phase 3)
**Difficulty:** Medium
**Est. Development:** 8-10 hours

#### Purpose

Calculate quarterly IRPF advance payment (Modelo 130) for autónomos in estimación directa.

#### Target Keywords

- `calculadora modelo 130` (primary)
- `modelo 130 autonomos`
- `pago fraccionado irpf`
- `calcular modelo 130`
- `irpf trimestral autonomo`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Ingresos acumulados YTD | number | 0 | Total invoiced this year |
| Gastos acumulados YTD | number | 0 | Deductible expenses |
| Pagos fraccionados anteriores | number | 0 | M130 Q1+Q2+Q3 paid |
| Retenciones YTD | number | 0 | From invoices |
| Trimestre | select | Q1 | Q1, Q2, Q3, Q4 |

#### Outputs

| Result | Calculation |
|--------|-------------|
| Rendimiento neto acumulado | Ingresos - Gastos |
| 20% del rendimiento | rendimiento × 0.20 |
| - Pagos anteriores | Sum of previous M130 |
| - Retenciones | IRPF retenido en facturas |
| **Resultado (casilla 7)** | A ingresar |
| Fecha límite | Based on quarter |

#### Exemption Check

Show if user might be exempt (>70% income with retention):
- "Tus retenciones representan el X% de tus ingresos. Si supera el 70%, no estás obligado a presentar el Modelo 130."

#### Calculation Logic

```typescript
// src/lib/calculators/modelo-130.ts

export interface Modelo130Result {
  ingresosAcumulados: number;
  gastosAcumulados: number;
  rendimientoNeto: number;
  porcentaje20: number;
  pagosAnteriores: number;
  retenciones: number;
  resultado: number;
  casilla7: number; // A ingresar
  fechaLimite: Date;
  exento: boolean;
  porcentajeRetencion: number;
}

export function calculateModelo130(
  ingresos: number,
  gastos: number,
  pagosAnteriores: number,
  retenciones: number,
  trimestre: 1 | 2 | 3 | 4,
  year: number
): Modelo130Result {
  const rendimientoNeto = ingresos - gastos;
  const porcentaje20 = rendimientoNeto * 0.20;
  const resultado = porcentaje20 - pagosAnteriores - retenciones;

  const porcentajeRetencion = ingresos > 0 ? (retenciones / (ingresos * 0.15)) * 100 : 0;

  return {
    ingresosAcumulados: ingresos,
    gastosAcumulados: gastos,
    rendimientoNeto,
    porcentaje20,
    pagosAnteriores,
    retenciones,
    resultado: Math.max(0, resultado),
    casilla7: Math.max(0, resultado),
    fechaLimite: getDeadline(trimestre, year),
    exento: porcentajeRetencion >= 70,
    porcentajeRetencion,
  };
}
```

#### FAQ Content

1. ¿Quién tiene que presentar el Modelo 130?
2. ¿Cómo calculo el pago fraccionado de IRPF?
3. ¿Qué pasa si mis retenciones superan el 70%?
4. ¿Puedo presentar el Modelo 130 si sale cero?
5. ¿Qué relación tiene el Modelo 130 con la Renta anual?
6. ¿Cuándo se presenta el Modelo 130?

#### Related Calculators

- Calculadora IRPF Autónomos
- Calculadora Modelo 303
- Calculadora Cuota Autónomos

---

### 9. Calculadora Gastos Deducibles

**Priority:** MEDIUM (Phase 3)
**Difficulty:** Medium
**Est. Development:** 8-10 hours

#### Purpose

Help autónomos understand which expenses are deductible and calculate their tax savings.

#### Target Keywords

- `calculadora gastos deducibles` (primary)
- `gastos deducibles autonomo`
- `que gastos puedo deducir`
- `gastos deducibles irpf autonomo`

#### Inputs

Category-based expense entry:

| Category | Examples | IVA Deducible | IRPF Deducible |
|----------|----------|---------------|----------------|
| Material de oficina | Papel, tinta, etc. | 100% | 100% |
| Equipos informáticos | Ordenador, móvil | 100% | 100% (or amortized) |
| Software y suscripciones | SaaS, dominios | 100% | 100% |
| Teléfono e internet | Línea móvil, fibra | 50% | 50% (if home office) |
| Suministros (si home office) | Luz, agua, gas | 30% | 30% |
| Alquiler de local | Oficina, coworking | 100% | 100% |
| Transporte | Gasolina, parking | 50-100% | 50-100% |
| Vehículo (si afecto) | Coche empresa | 50% | 50% |
| Formación | Cursos, libros | 100% | 100% |
| Seguros | RC, salud autónomo | 0% | 100% |
| Comidas con clientes | Restaurantes | 100% | 100% (limits apply) |
| Cuota autónomos | Seguridad Social | 0% | 100% |

#### Outputs

| Result | Calculation |
|--------|-------------|
| Total gastos introducidos | Sum of all |
| IVA recuperable | Sum of IVA deducible |
| Gastos deducibles IRPF | Sum of IRPF deducible |
| GDJ automático (5%) | Min(rendimiento × 5%, 2000) |
| **Ahorro IVA estimado** | IVA recuperable |
| **Ahorro IRPF estimado** | Deducibles × tipo marginal |
| **Ahorro total estimado** | IVA + IRPF |

#### Calculation Logic

```typescript
// src/lib/calculators/gastos-deducibles.ts

export interface GastoCategory {
  id: string;
  label: string;
  ivaDeducible: number;    // 0, 0.3, 0.5, 1 (percentage)
  irpfDeducible: number;   // 0, 0.3, 0.5, 1 (percentage)
  limit?: number;          // Annual limit if applicable
  requiresProof: 'factura' | 'recibo' | 'both';
}

export interface GastosResult {
  totalGastos: number;
  ivaRecuperable: number;
  gastosDeduciblesIRPF: number;
  gdj: number;
  ahorroIVA: number;
  ahorroIRPF: number;
  ahorroTotal: number;
  desglosePorCategoria: CategoryBreakdown[];
}

export const GASTO_CATEGORIES: GastoCategory[] = [
  {
    id: 'oficina',
    label: 'Material de oficina',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
  },
  {
    id: 'informatica',
    label: 'Equipos informáticos',
    ivaDeducible: 1,
    irpfDeducible: 1,
    requiresProof: 'factura',
  },
  // ... more categories
];

export function calculateGastosDeducibles(
  gastos: Record<string, number>,
  rendimientoNeto: number,
  tipoMarginalIRPF: number
): GastosResult {
  let totalGastos = 0;
  let ivaRecuperable = 0;
  let gastosDeduciblesIRPF = 0;

  for (const [categoryId, amount] of Object.entries(gastos)) {
    const category = GASTO_CATEGORIES.find(c => c.id === categoryId);
    if (!category) continue;

    totalGastos += amount;

    // Calculate IVA (assume 21% unless otherwise)
    const ivaAmount = amount - (amount / 1.21);
    ivaRecuperable += ivaAmount * category.ivaDeducible;

    // IRPF deduction (on base amount)
    const baseAmount = amount / 1.21;
    gastosDeduciblesIRPF += baseAmount * category.irpfDeducible;
  }

  // 5% GDJ (max €2000)
  const gdj = Math.min(rendimientoNeto * 0.05, 2000);

  return {
    totalGastos,
    ivaRecuperable,
    gastosDeduciblesIRPF,
    gdj,
    ahorroIVA: ivaRecuperable,
    ahorroIRPF: (gastosDeduciblesIRPF + gdj) * (tipoMarginalIRPF / 100),
    ahorroTotal: ivaRecuperable + ((gastosDeduciblesIRPF + gdj) * (tipoMarginalIRPF / 100)),
    desglosePorCategoria: buildDesglose(gastos),
  };
}
```

#### FAQ Content

1. ¿Qué gastos son deducibles para un autónomo?
2. ¿Qué es el 5% de gastos de difícil justificación (GDJ)?
3. ¿Puedo deducir el teléfono móvil si es personal y profesional?
4. ¿Qué porcentaje de suministros puedo deducir si trabajo desde casa?
5. ¿Necesito factura para deducir un gasto?
6. ¿Puedo deducir las comidas con clientes?
7. ¿Cómo deduzco la compra de un ordenador o vehículo?

#### Related Calculators

- Calculadora IRPF Autónomos
- Calculadora Modelo 303
- Calculadora Sueldo Neto Autónomo

---

### 10. Calculadora Autónomo vs Empresa

**Priority:** LOW-MEDIUM (Phase 3)
**Difficulty:** High
**Est. Development:** 12-16 hours

#### Purpose

Compare tax burden of operating as autónomo vs. creating a Sociedad Limitada (SL).

#### Target Keywords

- `autonomo o sociedad limitada` (primary)
- `autonomo vs empresa`
- `crear sociedad limitada`
- `cuando crear una sl`
- `comparativa autonomo empresa`

#### Inputs

| Field | Type | Default | Options |
|-------|------|---------|---------|
| Facturación anual prevista | number | 0 | min: 0 |
| Gastos del negocio (%) | slider | 20% | 0-60% |
| Sueldo que te gustaría cobrar (SL) | number | 24000 | If SL option |
| Comunidad Autónoma | select | madrid | All 17 CCAA |
| ¿Ya eres autónomo? | toggle | false | For cuota calculation |
| ¿Quieres reinvertir beneficios? | toggle | false | Affects SL calculation |

#### Comparison Outputs

| Concept | Autónomo | Sociedad Limitada |
|---------|----------|-------------------|
| Coste constitución | €0 | €500-1000 |
| Cuota mensual SS | Varies (tramos) | €300+ (régimen general) |
| Impuestos sobre beneficios | IRPF (19-47%) | IS (25%) + IRPF on salary |
| Sueldo neto mensual | Calculated | Calculated |
| Beneficio reinvertible | 0 (ya es personal) | Calculated |
| Responsabilidad | Ilimitada | Limitada al capital |
| Costes gestión anual | €500-800 | €1500-3000 |
| **Coste fiscal total** | Calculated | Calculated |
| **Recomendación** | Based on break-even |

#### Break-even Analysis

Show the facturación level where SL becomes more advantageous (typically €40k-50k+ net profit).

#### Calculation Logic

```typescript
// src/lib/calculators/autonomo-vs-empresa.ts

export interface ComparisonResult {
  autonomo: {
    facturacion: number;
    gastos: number;
    rendimientoNeto: number;
    cuotaAnual: number;
    irpfAnual: number;
    sueldoNetoAnual: number;
    costeGestion: number;
    costeFiscalTotal: number;
  };
  sociedad: {
    facturacion: number;
    gastos: number;
    sueldoBruto: number;
    cuotaSS: number;
    sueldoNeto: number;
    beneficioSociedad: number;
    impuestoSociedades: number;
    beneficioRetenido: number;
    dividendos?: number;
    costeGestion: number;
    costeFiscalTotal: number;
  };
  recomendacion: 'autonomo' | 'sociedad' | 'depende';
  razonamiento: string[];
  breakEvenPoint: number;
}

export function compareAutonomoVsSociedad(
  facturacion: number,
  gastosPercent: number,
  sueldoDeseado: number,
  ccaa: string,
  reinvertir: boolean
): ComparisonResult {
  // Calculate autónomo scenario
  const autonomo = calculateAutonomoScenario(facturacion, gastosPercent, ccaa);

  // Calculate SL scenario
  const sociedad = calculateSociedadScenario(facturacion, gastosPercent, sueldoDeseado, ccaa, reinvertir);

  // Determine recommendation
  const recommendation = determineRecommendation(autonomo, sociedad);

  return {
    autonomo,
    sociedad,
    ...recommendation,
  };
}

function calculateSociedadScenario(
  facturacion: number,
  gastosPercent: number,
  sueldoBruto: number,
  ccaa: string,
  reinvertir: boolean
) {
  const gastos = facturacion * (gastosPercent / 100);

  // Sueldo costs for the company
  const costesSalariales = sueldoBruto * 1.30; // ~30% SS empresa

  // Company profit before IS
  const beneficioAntes = facturacion - gastos - costesSalariales;

  // Impuesto de Sociedades (25%, or 23% for pymes first €50k, or 15% for nuevas empresas)
  const isRate = beneficioAntes <= 50000 ? 0.23 : 0.25;
  const is = Math.max(0, beneficioAntes * isRate);

  // Net profit retained
  const beneficioRetenido = beneficioAntes - is;

  // If not reinvesting, calculate dividends
  let dividendos = 0;
  let irpfDividendos = 0;
  if (!reinvertir && beneficioRetenido > 0) {
    dividendos = beneficioRetenido;
    // Dividends taxed at 19-26% depending on amount
    irpfDividendos = calculateDividendTax(dividendos);
  }

  return {
    facturacion,
    gastos,
    sueldoBruto,
    // ... etc
  };
}
```

#### Decision Factors Table

| Factor | Favorece Autónomo | Favorece SL |
|--------|-------------------|-------------|
| Facturación | < €40k | > €60k |
| Beneficio neto | < €30k | > €40k |
| Responsabilidad | No crítica | Importante |
| Inversores/socios | No | Sí |
| Reinversión | No | Sí |
| Complejidad | Mínima | Acepta mayor |

#### FAQ Content

1. ¿Cuándo me conviene crear una Sociedad Limitada?
2. ¿Cuánto cuesta crear y mantener una SL?
3. ¿Puedo ser autónomo y tener una SL?
4. ¿Qué impuestos paga una Sociedad Limitada?
5. ¿Cómo me pago un sueldo si tengo una SL?
6. ¿Qué es la responsabilidad limitada?
7. ¿Puedo convertir mi actividad de autónomo en SL?

#### Related Calculators

- Calculadora Sueldo Neto Autónomo
- Calculadora IRPF Autónomos
- Calculadora Cuota Autónomos

---

## SEO Requirements

### Schema Markup (All Calculator Pages)

```typescript
// Implement in CalculatorSchema.tsx component

// 1. SoftwareApplication Schema
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Calculadora [TYPE] - Invoo",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "[Description]",
  "featureList": ["Feature 1", "Feature 2"],
  "inLanguage": "es-ES"
};

// 2. FAQPage Schema (auto-generated from FAQ content)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Pregunta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Respuesta..."
      }
    }
  ]
};

// 3. BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Herramientas",
      "item": "https://invoo.es/es/herramientas"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Calculadoras",
      "item": "https://invoo.es/es/herramientas/calculadoras"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Calculator Name]",
      "item": "https://invoo.es/es/herramientas/calculadoras/[slug]"
    }
  ]
};
```

### Meta Tags Template

```typescript
// src/app/[locale]/herramientas/calculadoras/[slug]/page.tsx

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: `calculators.${params.slug}`,
  });

  return {
    title: t('meta.title'),        // "Calculadora IVA Autónomos 2026 | Gratis - Invoo"
    description: t('meta.description'), // 150-160 chars
    alternates: {
      canonical: `/${params.locale}/herramientas/calculadoras/${params.slug}`,
      languages: {
        'es': `/es/herramientas/calculadoras/${params.slug}`,
        'en': `/en/tools/calculators/${getEnglishSlug(params.slug)}`,
      },
    },
    openGraph: {
      title: t('og.title'),
      description: t('og.description'),
      type: 'website',
      locale: params.locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: `/og/calculators/${params.slug}.png`,
          width: 1200,
          height: 630,
          alt: t('og.imageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

### Title Tag Patterns

| Calculator | Spanish Title (55-60 chars) |
|------------|---------------------------|
| IVA | Calculadora IVA Online 2026 | Gratis para Autónomos - Invoo |
| Cuota | Calculadora Cuota Autónomos 2026 | Por Tramos - Invoo |
| Factura | Calculadora Factura con IVA e IRPF | Gratis - Invoo |
| IRPF | Calculadora IRPF Autónomos 2026 | Por Comunidad - Invoo |
| Sueldo Neto | Calculadora Sueldo Neto Autónomo | Gratis - Invoo |
| Precio Hora | Calculadora Tarifa Freelance por Hora | Gratis - Invoo |
| Modelo 303 | Calculadora Modelo 303 IVA Trimestral | Gratis - Invoo |
| Modelo 130 | Calculadora Modelo 130 IRPF Trimestral | Gratis - Invoo |
| Gastos | Calculadora Gastos Deducibles Autónomos | Gratis - Invoo |
| Autónomo vs SL | Comparador Autónomo vs Sociedad Limitada | Invoo |

### Internal Linking Strategy

```typescript
// Default related calculators for each calculator

const CALCULATOR_RELATIONS = {
  'iva': ['factura', 'modelo-303', 'gastos-deducibles'],
  'cuota-autonomos': ['sueldo-neto', 'irpf', 'modelo-130'],
  'factura': ['iva', 'irpf', 'sueldo-neto'],
  'irpf': ['modelo-130', 'gastos-deducibles', 'cuota-autonomos'],
  'sueldo-neto': ['cuota-autonomos', 'irpf', 'autonomo-vs-empresa'],
  'precio-hora-freelance': ['sueldo-neto', 'factura', 'cuota-autonomos'],
  'modelo-303': ['iva', 'modelo-130', 'gastos-deducibles'],
  'modelo-130': ['irpf', 'modelo-303', 'cuota-autonomos'],
  'gastos-deducibles': ['irpf', 'modelo-303', 'sueldo-neto'],
  'autonomo-vs-empresa': ['sueldo-neto', 'irpf', 'cuota-autonomos'],
};
```

---

## Translation Keys

### Structure in messages/es.json

```json
{
  "calculators": {
    "hub": {
      "title": "Calculadoras para Autónomos",
      "description": "Herramientas gratuitas para calcular tus impuestos, cuotas y facturación",
      "meta": {
        "title": "Calculadoras para Autónomos | Herramientas Gratis - Invoo",
        "description": "Calculadoras gratuitas de IVA, IRPF, cuota de autónomos, y más. Herramientas actualizadas para 2026."
      }
    },
    "iva": {
      "title": "Calculadora de IVA",
      "description": "Calcula el IVA de tus facturas al instante",
      "meta": {
        "title": "Calculadora IVA Online 2026 | Gratis para Autónomos - Invoo",
        "description": "Calcula el IVA de tus facturas al instante. Tipos del 21%, 10% y 4%. Calculadora gratuita y actualizada para autónomos en España."
      },
      "inputs": {
        "baseImponible": {
          "label": "Base Imponible",
          "helper": "El importe antes de aplicar el IVA"
        },
        "tipoIva": {
          "label": "Tipo de IVA",
          "options": {
            "general": "21% - General",
            "reducido": "10% - Reducido",
            "superreducido": "4% - Superreducido",
            "exento": "0% - Exento"
          }
        },
        "direccion": {
          "label": "¿Qué quieres calcular?",
          "fromBase": "Calcular IVA desde base",
          "fromTotal": "Extraer IVA del total"
        }
      },
      "results": {
        "base": "Base Imponible",
        "iva": "IVA ({rate}%)",
        "total": "Total con IVA"
      },
      "faq": [
        {
          "question": "¿Cuáles son los tipos de IVA en España?",
          "answer": "En España hay tres tipos de IVA: general (21%), reducido (10%) y superreducido (4%). El tipo general se aplica a la mayoría de productos y servicios."
        }
      ],
      "cta": {
        "headline": "¿Cansado de calcular manualmente?",
        "description": "Invoo calcula el IVA de tus facturas automáticamente",
        "button": "Probar gratis"
      }
    },
    "cuota-autonomos": {
      // Similar structure...
    }
    // ... other calculators
  }
}
```

### Structure in messages/en.json

```json
{
  "calculators": {
    "hub": {
      "title": "Calculators for Self-Employed",
      "description": "Free tools to calculate your taxes, contributions and invoicing"
    },
    "vat": {
      "title": "VAT Calculator",
      "description": "Calculate VAT for your invoices instantly",
      "inputs": {
        "taxableBase": {
          "label": "Taxable Base",
          "helper": "The amount before VAT"
        }
      }
    }
    // ... etc
  }
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goal:** Launch 3 core calculators with full SEO optimization

| Task | Priority | Estimate |
|------|----------|----------|
| Create shared components (CalculatorCard, Input, Result, etc.) | P0 | 8h |
| Set up routing structure | P0 | 2h |
| Create calculator constants (tax rates, tramos) | P0 | 4h |
| Implement Calculadora IVA | P0 | 6h |
| Implement Calculadora Cuota Autónomos | P0 | 12h |
| Implement Calculadora Factura | P0 | 6h |
| Add translations (ES + EN) | P0 | 4h |
| Create calculator hub page | P0 | 4h |
| Add schema markup | P0 | 4h |
| Create OG images | P1 | 4h |
| Write FAQ content | P1 | 4h |
| Add RelatedCalculators component | P1 | 2h |
| Mobile testing & optimization | P0 | 4h |

**Total Phase 1:** ~60 hours

### Phase 2: High-Intent Expansion (Week 3-4)

**Goal:** Add 3 more calculators targeting decision-stage users

| Task | Priority | Estimate |
|------|----------|----------|
| Implement Calculadora IRPF | P0 | 14h |
| Implement Calculadora Sueldo Neto | P0 | 10h |
| Implement Calculadora Precio Hora | P0 | 8h |
| Add regional IRPF rates (all CCAA) | P0 | 6h |
| Add translations | P0 | 4h |
| Add visual charts (sueldo neto breakdown) | P1 | 6h |
| Write FAQ content | P1 | 4h |
| Add CTAs and email capture | P1 | 4h |
| Testing & optimization | P0 | 6h |

**Total Phase 2:** ~62 hours

### Phase 3: Specialized Tools (Week 5-6)

**Goal:** Add quarterly tax calculators and comparison tools

| Task | Priority | Estimate |
|------|----------|----------|
| Implement Calculadora Modelo 303 | P0 | 10h |
| Implement Calculadora Modelo 130 | P0 | 10h |
| Implement Calculadora Gastos Deducibles | P0 | 10h |
| Implement Calculadora Autónomo vs Empresa | P1 | 16h |
| Add deadline reminders feature | P1 | 4h |
| Add translations | P0 | 4h |
| Write FAQ content | P1 | 6h |
| Testing & optimization | P0 | 6h |

**Total Phase 3:** ~66 hours

### Phase 4: Optimization (Week 7+)

**Goal:** Improve performance, add analytics, iterate based on data

| Task | Priority | Estimate |
|------|----------|----------|
| Add analytics events | P0 | 4h |
| Performance optimization | P0 | 8h |
| A/B test CTAs | P1 | 8h |
| Add save/export results feature | P2 | 12h |
| Add email capture modal | P1 | 6h |
| SEO monitoring and iteration | P0 | Ongoing |

---

## Testing Strategy

### Unit Tests (Calculation Logic)

```typescript
// src/lib/calculators/__tests__/iva.test.ts

import { calculateIVAFromBase, extractIVAFromTotal } from '../iva';

describe('IVA Calculator', () => {
  describe('calculateIVAFromBase', () => {
    it('calculates 21% IVA correctly', () => {
      const result = calculateIVAFromBase(100, 21);
      expect(result.base).toBe(100);
      expect(result.ivaAmount).toBe(21);
      expect(result.total).toBe(121);
    });

    it('calculates 10% IVA correctly', () => {
      const result = calculateIVAFromBase(100, 10);
      expect(result.ivaAmount).toBe(10);
      expect(result.total).toBe(110);
    });

    it('handles zero base', () => {
      const result = calculateIVAFromBase(0, 21);
      expect(result.total).toBe(0);
    });

    it('handles decimal amounts', () => {
      const result = calculateIVAFromBase(99.99, 21);
      expect(result.ivaAmount).toBeCloseTo(20.9979);
      expect(result.total).toBeCloseTo(120.9879);
    });
  });

  describe('extractIVAFromTotal', () => {
    it('extracts 21% IVA correctly', () => {
      const result = extractIVAFromTotal(121, 21);
      expect(result.base).toBeCloseTo(100);
      expect(result.ivaAmount).toBeCloseTo(21);
    });
  });
});
```

### E2E Tests (Calculator Pages)

```typescript
// tests/calculators/iva.spec.ts

import { test, expect } from '@playwright/test';

test.describe('IVA Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/herramientas/calculadoras/iva');
  });

  test('page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Calculadora IVA/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('IVA');
  });

  test('calculates IVA from base amount', async ({ page }) => {
    await page.fill('[data-testid="base-input"]', '100');
    await page.selectOption('[data-testid="iva-select"]', '21');

    await expect(page.getByTestId('result-iva')).toContainText('21,00');
    await expect(page.getByTestId('result-total')).toContainText('121,00');
  });

  test('updates results in real-time', async ({ page }) => {
    await page.fill('[data-testid="base-input"]', '100');

    // Change IVA rate
    await page.selectOption('[data-testid="iva-select"]', '10');
    await expect(page.getByTestId('result-total')).toContainText('110,00');

    await page.selectOption('[data-testid="iva-select"]', '4');
    await expect(page.getByTestId('result-total')).toContainText('104,00');
  });

  test('has proper schema markup', async ({ page }) => {
    const schema = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(schema || '{}');

    expect(parsed['@type']).toBe('SoftwareApplication');
    expect(parsed.applicationCategory).toBe('BusinessApplication');
  });

  test('FAQ accordion works', async ({ page }) => {
    const firstQuestion = page.getByRole('button', { name: /tipos de IVA/ });
    await firstQuestion.click();

    await expect(page.getByText(/21%/)).toBeVisible();
  });

  test('mobile layout is correct', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const calculator = page.getByTestId('calculator-card');
    await expect(calculator).toBeVisible();

    // Inputs should be full width on mobile
    const input = page.getByTestId('base-input');
    const inputBox = await input.boundingBox();
    expect(inputBox?.width).toBeGreaterThan(300);
  });
});
```

### Accessibility Tests

```typescript
// tests/calculators/a11y.spec.ts

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Calculator Accessibility', () => {
  const calculators = [
    '/es/herramientas/calculadoras/iva',
    '/es/herramientas/calculadoras/cuota-autonomos',
    '/es/herramientas/calculadoras/factura',
  ];

  for (const path of calculators) {
    test(`${path} should not have accessibility violations`, async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }

  test('calculator inputs have proper labels', async ({ page }) => {
    await page.goto('/es/herramientas/calculadoras/iva');

    const input = page.getByTestId('base-input');
    const label = await input.getAttribute('aria-labelledby') || await input.getAttribute('id');

    expect(label).toBeTruthy();
  });

  test('results are announced to screen readers', async ({ page }) => {
    await page.goto('/es/herramientas/calculadoras/iva');

    const resultsRegion = page.getByRole('region', { name: /resultado/i });
    await expect(resultsRegion).toHaveAttribute('aria-live', 'polite');
  });
});
```

### Performance Tests

```typescript
// tests/calculators/performance.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Calculator Performance', () => {
  test('page loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/es/herramientas/calculadoras/iva');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000); // Under 2 seconds
  });

  test('calculator responds instantly', async ({ page }) => {
    await page.goto('/es/herramientas/calculadoras/iva');

    const startTime = Date.now();
    await page.fill('[data-testid="base-input"]', '100');
    await page.waitForSelector('[data-testid="result-total"]:has-text("121")');
    const responseTime = Date.now() - startTime;

    expect(responseTime).toBeLessThan(100); // Under 100ms
  });

  test('no layout shift on calculation', async ({ page }) => {
    await page.goto('/es/herramientas/calculadoras/iva');

    // Get initial position of results area
    const resultsBefore = await page.getByTestId('results-area').boundingBox();

    // Trigger calculation
    await page.fill('[data-testid="base-input"]', '100');

    // Get position after calculation
    const resultsAfter = await page.getByTestId('results-area').boundingBox();

    // Position should not change (no CLS)
    expect(resultsBefore?.y).toBe(resultsAfter?.y);
  });
});
```

---

## Appendix: Tax Rate Constants (2024-2026)

### IVA Rates

```typescript
export const IVA_RATES = {
  general: 21,
  reducido: 10,
  superreducido: 4,
  exento: 0,
} as const;

export const IVA_RATE_PRODUCTS = {
  general: [
    'Mayoría de productos y servicios',
    'Electrónica',
    'Ropa',
    'Servicios profesionales',
  ],
  reducido: [
    'Alimentos (excepto básicos)',
    'Transporte de viajeros',
    'Hostelería',
    'Entradas a espectáculos',
  ],
  superreducido: [
    'Pan, leche, huevos, frutas, verduras',
    'Libros, periódicos, revistas',
    'Medicamentos',
    'Prótesis y vehículos para personas con discapacidad',
  ],
};
```

### IRPF Retention Rates

```typescript
export const IRPF_RETENTION = {
  general: 15,
  nuevosAutonomos: 7,   // First 3 years
  profesionales: 15,
  artistasCreadores: 15,
  administradores: 19,
} as const;
```

### Cuota Autónomos Tramos (2024)

```typescript
export const CUOTA_TRAMOS_2024: Tramo[] = [
  { min: 0, max: 670, cuota: 230.15, base: 735.29 },
  { min: 670.01, max: 900, cuota: 255.71, base: 816.98 },
  { min: 900.01, max: 1166.70, cuota: 273.11, base: 872.55 },
  { min: 1166.71, max: 1300, cuota: 297.68, base: 951.06 },
  { min: 1300.01, max: 1500, cuota: 300.72, base: 960.78 },
  { min: 1500.01, max: 1700, cuota: 300.72, base: 960.78 },
  { min: 1700.01, max: 1850, cuota: 327.32, base: 1045.75 },
  { min: 1850.01, max: 2030, cuota: 332.43, base: 1062.09 },
  { min: 2030.01, max: 2330, cuota: 337.55, base: 1078.43 },
  { min: 2330.01, max: 2760, cuota: 347.78, base: 1111.11 },
  { min: 2760.01, max: 3190, cuota: 368.24, base: 1176.47 },
  { min: 3190.01, max: 3620, cuota: 388.69, base: 1241.83 },
  { min: 3620.01, max: 4050, cuota: 409.15, base: 1307.19 },
  { min: 4050.01, max: 6000, cuota: 455.18, base: 1454.25 },
  { min: 6000.01, max: Infinity, cuota: 542.13, base: 1732.03 },
];

// 2025 and 2026 values to be updated when officially published
```

### Tax Deadlines

```typescript
export const TAX_DEADLINES = {
  modelo303: {
    Q1: { month: 4, day: 20 },  // April 20
    Q2: { month: 7, day: 20 },  // July 20
    Q3: { month: 10, day: 20 }, // October 20
    Q4: { month: 1, day: 30 },  // January 30 (next year)
  },
  modelo130: {
    Q1: { month: 4, day: 20 },
    Q2: { month: 7, day: 20 },
    Q3: { month: 10, day: 20 },
    Q4: { month: 1, day: 30 },
  },
  renta: {
    start: { month: 4, day: 3 },
    end: { month: 7, day: 1 },
  },
};
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-08 | Claude | Initial comprehensive plan |

---

## Next Steps

1. **Review and approve** this implementation plan
2. **Set up project tracking** in Linear with tasks from phases
3. **Begin Phase 1** development
4. **Create content briefs** for supporting blog articles
5. **Design OG images** for each calculator
