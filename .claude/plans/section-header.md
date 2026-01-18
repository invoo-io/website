# Unified SectionHeader Component - Architecture Plan

## Executive Summary

Consolidate 10+ header patterns across the Invoo website into a single, flexible `SectionHeader` component with size-based variants. This will eliminate code duplication, ensure visual consistency across pages, and provide a single source of truth for all page/section headers.

---

## Current State Analysis

### Existing Header Patterns

After analyzing the codebase, I've identified the following distinct header patterns:

| Pattern | Typography Class | Font Size | Usage Location | Example |
|---------|-----------------|-----------|----------------|---------|
| **Hero Headers** | `text-header-title-emphasized` | 64px (desktop), 48px (mobile) | Homepage hero, landing page heroes | "Create compliant invoices in 30 seconds" |
| **Section Headers** | `text-section-title-emphasized` | 48px (desktop), 40px (mobile) | Major section titles (WhyChoose, Invoicing, FAQ) | "Facturación simplificada" |
| **Subsection Headers** | `text-title1-emphasized` | 34px | Calculator SEO sections, blog headers | "How to use this calculator" |
| **Card/Block Headers** | `text-title2-emphasized` | 28px | Feature cards, CTA cards, FAQ questions | "Stop calculating. Start invoicing." |
| **Small Block Headers** | `text-title3-emphasized` | 22px | FAQ questions in accordions, small sections | Individual FAQ question titles |

### Current Header Usage by File

#### Hero Size (text-header-title-emphasized - 64px/48px)
```typescript
// src/components/HeroSection.tsx (Line 25)
<h1 className="text-header-title-emphasized text-center mb-8">

// src/app/[locale]/page.tsx (Lines 98-103)
<HeroSection title={<><span>Crea </span><GradientText>facturas conformes</GradientText>...</>} />

// src/app/[locale]/freelancers/page.tsx (Lines 67-73)
// src/app/[locale]/gestorias/page.tsx (Lines 82-88)
// src/components/PricingSection.tsx (Line 30)
// Calculator pages (12 files): PrecioHoraCalculatorPage, SueldoNetoCalculatorPage, etc.
```

#### Section Size (text-section-title-emphasized - 48px/40px)
```typescript
// src/components/WhyChooseSection.tsx (Line 52)
<h2 className="text-section-title-emphasized text-center text-primary max-w-4xl mx-auto mb-16">

// src/components/InvoicingSection.tsx (Line 37)
<h2 className="text-section-title-emphasized text-center text-primary max-w-4xl mx-auto mb-16">

// src/components/BuildForGestoriasSection.tsx (Line 67)
<h2 className="text-section-title-emphasized text-primary mb-6">

// src/components/FAQSection.tsx (Line 26)
// src/components/IntroSection.tsx (Line 22)
// src/components/MoreThanInvoiceSection.tsx (Line 45)
// src/components/FocusSection.tsx (Line 32)
```

#### Subsection Size (text-title1-emphasized - 34px)
```typescript
// src/components/calculators/CalculatorSEOContent.tsx (Lines 29, 66, 96, 154, 256)
<h2 className="text-title1-emphasized text-primary mb-4">

// src/components/blog/CategoryBlock.tsx (Line 33)
<h2 className="text-title1-emphasized text-label">

// src/components/blog/FeaturedBlogSection.tsx (Line 32)
<h2 className="text-title1-emphasized md:text-large-title-emphasized mb-4">
```

#### Card Size (text-title2-emphasized - 28px)
```typescript
// src/components/calculators/CalculatorCTA.tsx (Line 24)
<h3 className="text-title2-emphasized text-primary mb-3">

// src/components/InvoicingSection.tsx (Lines 64, 78)
<h3 className="text-title2-emphasized text-primary mb-3">

// src/components/WhyChooseSection.tsx (Lines 90, 118)
<h3 className="text-title2-emphasized text-primary mb-3">

// src/components/PricingCard.tsx (Line 50)
// src/components/ContactForm.tsx (Lines 102, 186)
// src/components/BuildForGestoriasSection.tsx (Lines 77, 219)
```

#### XSmall Size (text-title3-emphasized - 22px)
```typescript
// src/components/FAQSection.tsx (Line 38)
<h3 className="text-title3-emphasized text-primary pr-4">

// src/components/MoreThanInvoiceSection.tsx (Line 76)
<h3 className="text-title3-emphasized text-primary mb-3">

// src/components/BuildForGestoriasSection.tsx (Line 109)
<h3 className="text-title3-emphasized text-primary mb-3">
```

### Common Patterns Identified

All headers share these characteristics:

1. **Typography system integration**: Use design token CSS variables
2. **Gradient text support**: Split text to wrap portions in `<GradientText>`
3. **Alignment variants**: Center or left-aligned
4. **Spacing**: Bottom margin for separation
5. **Color**: Primary text color (`text-primary`)
6. **Optional description**: Subtitle/paragraph below title
7. **Optional eyebrow**: Small label above title (rare, but exists)

### Divergences & Edge Cases

| Feature | Examples |
|---------|----------|
| **Split text for gradient** | "Crea `<GradientText>`facturas conformes`</GradientText>` en 30 segundos" |
| **ReactNode title** | Full React component support (not just strings) |
| **Description text** | `<p className="text-body text-secondary">` below header |
| **Max-width constraints** | `max-w-3xl`, `max-w-4xl` for centered headers |
| **Responsive sizing** | Some headers reduce size on mobile |
| **Color variants** | Most use `text-primary`, but FocusSection uses `text-system-grey100` |

---

## Proposed Architecture

### Component API Design

```typescript
interface SectionHeaderProps {
  // Content (required)
  title: string | React.ReactNode;

  // Size variants (required)
  size: 'hero' | 'section' | 'subsection' | 'card' | 'xsmall';

  // Optional content
  description?: string | React.ReactNode;
  eyebrow?: string;  // Small label above title

  // Layout
  align?: 'left' | 'center';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none';

  // Spacing
  marginBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  // Styling
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;

  // Semantic HTML
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

  // Accessibility
  id?: string;  // For anchor links
}
```

### Size Variant Specifications

```typescript
const sizeVariants = {
  hero: {
    typography: 'text-header-title-emphasized',  // 64px desktop, 48px mobile
    defaultAs: 'h1',
    defaultMargin: 'lg',  // mb-8
    defaultMaxWidth: 'xl',  // max-w-6xl
    responsive: true,  // Reduce size on mobile
  },

  section: {
    typography: 'text-section-title-emphasized',  // 48px desktop, 40px mobile
    defaultAs: 'h2',
    defaultMargin: 'xl',  // mb-16
    defaultMaxWidth: 'lg',  // max-w-4xl
    responsive: true,
  },

  subsection: {
    typography: 'text-title1-emphasized',  // 34px
    defaultAs: 'h2',
    defaultMargin: 'md',  // mb-6
    defaultMaxWidth: 'none',
    responsive: false,
  },

  card: {
    typography: 'text-title2-emphasized',  // 28px
    defaultAs: 'h3',
    defaultMargin: 'sm',  // mb-3
    defaultMaxWidth: 'none',
    responsive: false,
  },

  xsmall: {
    typography: 'text-title3-emphasized',  // 22px
    defaultAs: 'h3',
    defaultMargin: 'sm',  // mb-3
    defaultMaxWidth: 'none',
    responsive: false,
  },
};
```

### Usage Examples

```typescript
// Hero header with gradient (Homepage)
<SectionHeader
  size="hero"
  align="center"
  title={
    <>
      <span className="text-primary">Crea </span>
      <GradientText>facturas conformes</GradientText>
      <span className="text-primary"> en 30 segundos</span>
    </>
  }
  description="Software de facturación conforme con Verifactu..."
/>

// Section header with gradient (InvoicingSection)
<SectionHeader
  size="section"
  align="center"
  title={
    <>
      Facturación <GradientText>simplificada</GradientText>
    </>
  }
  description="Aprende cómo crear facturas en 3 pasos simples"
/>

// Subsection header (Calculator SEO)
<SectionHeader
  size="subsection"
  title="Cómo usar esta calculadora"
  description="Sigue estos pasos para calcular tu precio por hora"
  marginBottom="lg"
/>

// Card header (CTA card)
<SectionHeader
  size="card"
  align="center"
  title="Deja de calcular. Empieza a facturar."
/>

// XSmall header (FAQ question)
<SectionHeader
  size="xsmall"
  title="¿Qué es Verifactu?"
  as="h3"
/>

// With eyebrow label
<SectionHeader
  size="section"
  eyebrow="Características"
  title="Todo lo que necesitas"
  description="Descubre las funcionalidades de Invoo"
/>

// Custom max-width and margins
<SectionHeader
  size="section"
  title="Pricing claro. Sin sorpresas."
  maxWidth="md"
  marginBottom="xl"
  className="custom-spacing"
/>
```

---

## Implementation Plan

### Phase 1: Core Component Creation

**File**: `/src/components/ui/SectionHeader.tsx`

**Structure**:

1. **Size configuration object**: Maps each size to typography class, defaults
2. **Spacing helpers**: Map marginBottom prop to Tailwind classes
3. **MaxWidth helpers**: Map maxWidth prop to Tailwind max-width classes
4. **Main component**: Render title, description, eyebrow with proper semantics

**Key implementation details**:

```typescript
'use client';

import { cn } from '@/lib/utils';

// Size configurations
const SIZE_CONFIG = {
  hero: {
    typography: 'text-header-title-emphasized',
    defaultAs: 'h1',
    defaultMargin: 'mb-8',
    defaultMaxWidth: 'max-w-6xl',
  },
  section: {
    typography: 'text-section-title-emphasized',
    defaultAs: 'h2',
    defaultMargin: 'mb-16',
    defaultMaxWidth: 'max-w-4xl',
  },
  subsection: {
    typography: 'text-title1-emphasized',
    defaultAs: 'h2',
    defaultMargin: 'mb-6',
    defaultMaxWidth: '',
  },
  card: {
    typography: 'text-title2-emphasized',
    defaultAs: 'h3',
    defaultMargin: 'mb-3',
    defaultMaxWidth: '',
  },
  xsmall: {
    typography: 'text-title3-emphasized',
    defaultAs: 'h3',
    defaultMargin: 'mb-3',
    defaultMaxWidth: '',
  },
} as const;

// Margin bottom mapping
const MARGIN_CLASSES = {
  none: '',
  sm: 'mb-3',
  md: 'mb-6',
  lg: 'mb-8',
  xl: 'mb-16',
} as const;

// Max width mapping
const MAX_WIDTH_CLASSES = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  none: '',
} as const;

interface SectionHeaderProps {
  title: string | React.ReactNode;
  size: 'hero' | 'section' | 'subsection' | 'card' | 'xsmall';
  description?: string | React.ReactNode;
  eyebrow?: string;
  align?: 'left' | 'center';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  marginBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  id?: string;
}

export function SectionHeader({
  title,
  size,
  description,
  eyebrow,
  align = 'left',
  maxWidth,
  marginBottom,
  className,
  titleClassName,
  descriptionClassName,
  as,
  id,
}: SectionHeaderProps) {
  const config = SIZE_CONFIG[size];

  // Determine HTML tag
  const Component = as || config.defaultAs;

  // Build container classes
  const containerClasses = cn(
    align === 'center' && 'text-center',
    maxWidth ? MAX_WIDTH_CLASSES[maxWidth] : config.defaultMaxWidth,
    align === 'center' && (maxWidth || config.defaultMaxWidth) && 'mx-auto',
    marginBottom ? MARGIN_CLASSES[marginBottom] : config.defaultMargin,
    className
  );

  // Build title classes
  const titleClasses = cn(
    config.typography,
    'text-primary',
    titleClassName
  );

  // Build description classes
  const descClasses = cn(
    'text-body text-secondary',
    align === 'center' && 'max-w-3xl mx-auto',
    description && !eyebrow && 'mt-4',
    description && eyebrow && 'mt-3',
    descriptionClassName
  );

  return (
    <div className={containerClasses}>
      {/* Eyebrow label */}
      {eyebrow && (
        <p className="text-callout-emphasized text-accent-blue-main uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}

      {/* Title */}
      <Component className={titleClasses} id={id}>
        {title}
      </Component>

      {/* Description */}
      {description && (
        typeof description === 'string' ? (
          <p className={descClasses}>
            {description}
          </p>
        ) : (
          <div className={descClasses}>
            {description}
          </div>
        )
      )}
    </div>
  );
}
```

### Phase 2: Migration Strategy

**Migration Order**: Low risk → High risk

#### 2.1 Replace Simple Headers (Low Risk)

Start with headers that have no gradient, simple text:

**Files to migrate**:
- `src/components/IntroSection.tsx` (Line 22)
- `src/components/FAQSection.tsx` (Line 26)
- `src/components/calculators/CalculatorSEOContent.tsx` (multiple)
- `src/components/blog/CategoryBlock.tsx` (Line 33)

**Before**:
```typescript
<h2 className="text-section-title-emphasized text-center text-primary mb-12">
  {t(titleKey)}
</h2>
```

**After**:
```typescript
<SectionHeader
  size="section"
  align="center"
  title={t(titleKey)}
  marginBottom="lg"
/>
```

#### 2.2 Replace Headers with Descriptions (Low-Medium Risk)

**Files to migrate**:
- `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorHowTo, CalculatorInfoGrid)

**Before**:
```typescript
<h2 className="text-title1-emphasized text-primary mb-4">
  {title}
</h2>
<p className="text-body text-secondary mb-8">
  {description}
</p>
```

**After**:
```typescript
<SectionHeader
  size="subsection"
  title={title}
  description={description}
  marginBottom="lg"
/>
```

#### 2.3 Replace Headers with Gradient Text (Medium Risk)

**Files to migrate**:
- `src/components/HeroSection.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/freelancers/page.tsx`
- `src/app/[locale]/gestorias/page.tsx`
- `src/components/InvoicingSection.tsx`
- `src/components/WhyChooseSection.tsx`
- `src/components/PricingSection.tsx`

**Before**:
```typescript
<h2 className="text-section-title-emphasized text-center text-primary max-w-4xl mx-auto mb-16">
  {locale === "es" ? (
    <>Facturación <GradientText>simplificada</GradientText></>
  ) : (
    <>Invoicing made <GradientText>simple</GradientText></>
  )}
</h2>
```

**After**:
```typescript
<SectionHeader
  size="section"
  align="center"
  title={
    locale === "es" ? (
      <>Facturación <GradientText>simplificada</GradientText></>
    ) : (
      <>Invoicing made <GradientText>simple</GradientText></>
    )
  }
/>
```

#### 2.4 Replace HeroSection Component (High Risk)

**Current HeroSection** serves multiple purposes:
- Renders header
- Renders description
- Renders CTA button

**Refactoring strategy**:

**Option A**: Keep HeroSection but use SectionHeader internally
```typescript
// src/components/HeroSection.tsx
export default function HeroSection({ title, paragraph, buttonText, buttonHref }) {
  return (
    <section className="flex items-center justify-center px-4 md:px-6 pt-40 max-md:pt-20 pb-0">
      <div className="max-w-6xl mx-auto text-center">
        <SectionHeader
          size="hero"
          align="center"
          title={title}
          description={paragraph}
          marginBottom="lg"
        />

        {buttonText && (
          <div className="flex justify-center">
            {/* Button logic */}
          </div>
        )}
      </div>
    </section>
  );
}
```

**Option B**: Replace HeroSection entirely with composition
```typescript
// In pages
<section className="flex items-center justify-center px-4 md:px-6 pt-40 max-md:pt-20 pb-0">
  <div className="max-w-6xl mx-auto text-center">
    <SectionHeader
      size="hero"
      align="center"
      title={<><span>Crea </span><GradientText>facturas conformes</GradientText>...</>}
      description={t("home.hero.description")}
    />
    <DrawerComponent triggerText={t("home.hero.cta")} />
  </div>
</section>
```

**Recommendation**: Option A (safer, maintains existing API)

#### 2.5 Replace Card Headers (Medium Risk)

**Files to migrate**:
- `src/components/calculators/CalculatorCTA.tsx`
- `src/components/PricingCard.tsx`
- `src/components/WhyChooseSection.tsx`
- `src/components/InvoicingSection.tsx`

**Before**:
```typescript
<h3 className="text-title2-emphasized text-primary mb-3">
  {t('title')}
</h3>
<p className="text-body text-secondary mb-6 max-w-xl mx-auto">
  {t('description')}
</p>
```

**After**:
```typescript
<SectionHeader
  size="card"
  align="center"
  title={t('title')}
  description={t('description')}
  marginBottom="md"
  maxWidth="md"
/>
```

### Phase 3: Testing & Validation

**Visual regression testing**:
1. Take screenshots of all pages before migration
2. Migrate component by component
3. Compare screenshots after migration
4. Verify pixel-perfect match

**Accessibility testing**:
1. Verify heading hierarchy (h1 → h2 → h3)
2. Check screen reader announcements
3. Validate landmark regions

**Responsive testing**:
1. Test all breakpoints (mobile, tablet, desktop)
2. Verify text wrapping
3. Check max-width constraints

### Phase 4: Cleanup & Documentation

**Deprecation path**:
1. Keep existing header patterns for 1-2 weeks
2. Add console warnings recommending SectionHeader
3. Update CLAUDE.md with new pattern
4. Remove old patterns after full migration

**Documentation updates**:
- Add SectionHeader to `.claude/agents/design-leader.md`
- Update `.claude/agents/nextjs-developer.md` with examples
- Add usage examples to CLAUDE.md

---

## Migration Checklist

### Pre-Migration
- [ ] Create `SectionHeader.tsx` component
- [ ] Add TypeScript types
- [ ] Add unit tests for all size variants
- [ ] Test with gradient text
- [ ] Test with description prop
- [ ] Test with eyebrow prop
- [ ] Test all alignment variants
- [ ] Verify responsive behavior

### Migration (46 files identified)

#### Simple Headers
- [ ] `src/components/IntroSection.tsx`
- [ ] `src/components/FAQSection.tsx`
- [ ] `src/components/blog/CategoryBlock.tsx`

#### Calculator SEO Components
- [ ] `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorHowTo)
- [ ] `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorInfoGrid)
- [ ] `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorWhyUse)
- [ ] `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorMethodology)
- [ ] `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorRelatedTools)

#### Calculator Pages (12 files)
- [ ] `src/components/calculators/pages/PrecioHoraCalculatorPage.tsx`
- [ ] `src/components/calculators/pages/SueldoNetoAutonomoCalculatorPage.tsx`
- [ ] `src/components/calculators/pages/CuotaAutonomosCalculatorPage.tsx`
- [ ] `src/components/calculators/pages/IRPFAutonomosCalculatorPage.tsx`
- [ ] `src/components/calculators/pages/Modelo130CalculatorPage.tsx`
- [ ] `src/components/calculators/pages/Modelo303CalculatorPage.tsx`
- [ ] `src/components/calculators/pages/IVACalculatorPage.tsx`
- [ ] `src/components/calculators/pages/FacturaCalculatorPage.tsx`
- [ ] `src/components/calculators/pages/GastosDeduciblesCalculatorPage.tsx`
- [ ] `src/components/calculators/pages/AutonomoVsEmpresaCalculatorPage.tsx`

#### Section Components with Gradients
- [ ] `src/components/InvoicingSection.tsx`
- [ ] `src/components/WhyChooseSection.tsx`
- [ ] `src/components/MoreThanInvoiceSection.tsx`
- [ ] `src/components/BuildForGestoriasSection.tsx`
- [ ] `src/components/PricingSection.tsx`
- [ ] `src/components/FocusSection.tsx`

#### CTA Components
- [ ] `src/components/calculators/CalculatorCTA.tsx`

#### Page-level Headers
- [ ] `src/app/[locale]/page.tsx` (Homepage)
- [ ] `src/app/[locale]/freelancers/page.tsx`
- [ ] `src/app/[locale]/gestorias/page.tsx`
- [ ] `src/app/[locale]/pymes/page.tsx`
- [ ] `src/app/[locale]/about/page.tsx`
- [ ] `src/app/[locale]/blog/page.tsx`

#### HeroSection Component
- [ ] Refactor `src/components/HeroSection.tsx` to use SectionHeader internally

### Post-Migration
- [ ] Run `npm run build` - verify no TypeScript errors
- [ ] Run `npm run test` - verify E2E tests pass
- [ ] Visual regression test on all pages
- [ ] Lighthouse accessibility audit
- [ ] Update CLAUDE.md with SectionHeader pattern
- [ ] Update agent documentation
- [ ] Add migration notes

---

## Benefits of Unification

### Code Reduction
- **Before**: 46+ inline header patterns (~920 lines total)
- **After**: 1 unified component (~180 lines) + usage (~230 lines)
- **Savings**: ~510 lines, -55%

### Consistency Improvements
- Single source of truth for header styling
- Consistent spacing across all pages
- Unified max-width handling
- Easier dark mode maintenance
- Design token compliance

### Developer Experience
- Simpler API (one component to learn)
- Clear size semantics (`hero`, `section`, `subsection`, etc.)
- Better TypeScript autocomplete
- Gradient text support built-in
- Easier to add new variants

### Accessibility Benefits
- Consistent heading hierarchy
- Proper semantic HTML
- Better screen reader experience
- Unified ARIA support

### Maintenance Benefits
- Change typography globally from one place
- Update spacing rules universally
- Add new features to all headers at once
- Easier to refactor design system

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Visual regressions during migration | High | High | Side-by-side screenshot comparison; migrate one file at a time |
| Breaking gradient text splits | Medium | High | Preserve exact ReactNode title support; test all gradient examples |
| Heading hierarchy issues | Low | Medium | Use correct `as` prop; audit all pages for h1→h2→h3 flow |
| Performance impact from extra div wrapper | Low | Low | Minimal; component is lightweight |
| Translation key changes needed | Low | Low | No changes needed; title/description are pass-through props |
| Breaking max-width on mobile | Medium | Medium | Test all breakpoints; preserve responsive max-width behavior |

---

## Success Metrics

- [ ] Zero visual regressions detected
- [ ] All 46 files migrated successfully
- [ ] All pages build successfully
- [ ] E2E tests pass
- [ ] No TypeScript errors
- [ ] Lighthouse accessibility score unchanged or improved
- [ ] Bundle size reduced by removing duplicate code
- [ ] Developer satisfaction (easier to use in future)

---

## Future Extensions

Once unified SectionHeader is established, consider:

1. **Animation variants**: Fade-in, slide-up on scroll
2. **Badge support**: Add badge/pill above title (like "New" or "Beta")
3. **Action buttons**: Optional CTA button in header (e.g., "Learn more →")
4. **Breadcrumb integration**: Add breadcrumb trail above title
5. **Icon support**: Optional icon before/after title
6. **Color variants**: Support for colored backgrounds (e.g., gradient backgrounds)
7. **Storybook documentation**: Interactive component playground

---

## Related Documentation

- [Design System Patterns](../../CLAUDE.md#styling)
- [Typography System](../../src/app/globals.css)
- [Component Guidelines](../../CLAUDE.md#components)
- [Accessibility Standards](../../CLAUDE.md#accessibility)
- [ContentCard Unification Plan](./unified-content-card.md)

---

## Decision Rationale

### Why Not Extend Typography Component?

We have an existing `Typography.tsx` component, but SectionHeader is better because:

1. **Semantic context**: Headers have specific layout requirements (centering, max-width, description)
2. **Spacing logic**: Headers need consistent margin-bottom patterns
3. **Gradient support**: Header-specific feature
4. **Layout patterns**: Center vs. left alignment is header-specific
5. **Eyebrow labels**: Common in headers, not general typography

Typography component should remain focused on low-level text rendering. SectionHeader is a higher-level composition.

### Why Size-Based Instead of Semantic?

We chose `size: 'hero' | 'section' | 'subsection'` instead of `variant: 'primary' | 'secondary'` because:

1. **Clearer intent**: "hero" immediately communicates scale and importance
2. **Matches design system**: Figma design tokens use size-based naming
3. **Easier to learn**: Developers know when to use which size
4. **Fewer decisions**: No confusion about "is this primary or secondary?"

---

## Approval & Sign-off

**Architect**: nextjs-architect (this document)
**Implementation**: nextjs-developer (to be assigned)
**Review**: code-reviewer (post-implementation)
**Design Review**: design-leader (visual consistency check)

**Status**: Draft - Awaiting approval
**Created**: 2026-01-18
**Version**: 1.0
