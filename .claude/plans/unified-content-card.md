# Unified ContentCard Component - Architecture Plan

## Executive Summary

Consolidate 4+ card pattern variations across the Invoo website into a single, flexible `ContentCard` component with variant-based API. This will reduce code duplication, ensure visual consistency, and simplify future maintenance.

---

## Current State Analysis

### Existing Card Patterns

| Pattern | Location | Usage | Key Features |
|---------|----------|-------|--------------|
| **StepCard** | `src/components/ui/StepCard.tsx` | How-to sections, methodology steps | Numbered circular indicator, title, description |
| **InfoCard** | `src/components/ui/StepCard.tsx` | Information grids | Title, description (no indicator) |
| **RelatedCalculatorCard** | `src/components/calculators/CalculatorSEOContent.tsx` (inline) | Internal tool linking | Icon indicator, title, description, CTA link, hover effects |
| **BenefitCard** | `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorWhyUse) | Why use sections | Green checkmark icon, benefit text |
| **PricingCard** | `src/components/PricingCard.tsx` | Pricing pages | Complex pricing display (excluded from unification) |

**Note**: PricingCard is significantly different (pricing display, features list, badges) and should remain separate.

### Common Styling Patterns

All cards share:
- Border radius: `rounded-2xl` (16px)
- Padding: `p-6` (24px)
- Background: `bg-background-secondary`
- Border: `border border-strokes-primary`
- Text hierarchy: `text-headline` (title), `text-footnote` (description)
- Color scheme: Blue accent (`accent-blue-main`)

### Divergences

| Feature | StepCard | InfoCard | RelatedCalculatorCard | BenefitCard |
|---------|----------|----------|----------------------|-------------|
| Indicator | Numbered circle | None | Icon square | Checkmark circle |
| Layout | Vertical | Vertical | Vertical | Horizontal |
| Interactive | No | No | Yes (link) | No |
| CTA | No | No | Yes (bottom link) | No |
| Hover state | No | No | Yes (border color change) | No |

---

## Proposed Architecture

### Component API Design

```typescript
interface ContentCardProps {
  // Content (required)
  title: string;
  description: string;

  // Indicator variants
  indicator?: 'number' | 'icon' | 'checkmark' | 'none';
  number?: number;                    // For 'number' indicator
  icon?: React.ReactNode;             // For 'icon' indicator

  // Interactivity
  href?: string;                      // Makes card clickable
  ctaText?: string;                   // Bottom CTA text (only with href)
  onClick?: () => void;               // Alternative to href

  // Layout variants
  layout?: 'vertical' | 'horizontal'; // Default: 'vertical'

  // Styling
  indicatorSize?: 'sm' | 'md' | 'lg';
  indicatorVariant?: 'filled' | 'outline';
  className?: string;

  // Accessibility
  ariaLabel?: string;                 // For link/button cards
}
```

### Variant Mapping

```typescript
// Number indicator (StepCard replacement)
<ContentCard
  indicator="number"
  number={1}
  title="First step"
  description="Do this first"
/>

// No indicator (InfoCard replacement)
<ContentCard
  title="Information"
  description="Details here"
/>

// Icon indicator with link (RelatedCalculatorCard replacement)
<ContentCard
  indicator="icon"
  icon={<CalculatorIcon />}
  title="Calculator name"
  description="What it does"
  href="/tools/calculator"
  ctaText="Use calculator"
/>

// Checkmark indicator horizontal (BenefitCard replacement)
<ContentCard
  indicator="checkmark"
  title="Benefit description"
  description=""  // or omit for single-line benefits
  layout="horizontal"
/>
```

### Grid Wrapper Component

```typescript
interface ContentCardGridProps {
  items: Array<Omit<ContentCardProps, 'className'>>;
  columns?: 1 | 2 | 3;
  autoNumber?: boolean;  // Auto-add numbers 1, 2, 3... to items
  className?: string;
}

// Usage examples:
<ContentCardGrid
  items={steps}
  columns={3}
  autoNumber  // Automatically sets indicator="number" and increments
/>

<ContentCardGrid
  items={relatedTools}
  columns={3}
  // Custom indicators per item
/>
```

---

## Implementation Plan

### Phase 1: Core Component Creation

**File**: `/src/components/ui/ContentCard.tsx`

1. Create indicator sub-components:
   - `NumberIndicator` (from StepCard)
   - `IconIndicator` (new, square container)
   - `CheckmarkIndicator` (new, circular green check)

2. Create main `ContentCard` component:
   - Handle all indicator variants
   - Support both vertical/horizontal layouts
   - Implement link wrapper when `href` provided
   - Add hover states for interactive cards
   - Include CTA section at bottom

3. Create `ContentCardGrid` wrapper:
   - Responsive grid (mobile-first)
   - Auto-numbering logic
   - Column presets (1, 2, 3)

### Phase 2: Migration Strategy

Replace existing patterns in order:

#### 2.1 Replace StepCard usage (Low Risk)
- `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorHowTo)
- `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorMethodology)
- All calculator page components (12 files)

**Before**:
```typescript
<StepCardGrid steps={steps} columns={3} />
```

**After**:
```typescript
<ContentCardGrid items={steps} columns={3} autoNumber />
```

#### 2.2 Replace InfoCard usage (Low Risk)
- Same locations as StepCard
- All calculator page components

**Before**:
```typescript
<InfoCardGrid items={items} columns={3} />
```

**After**:
```typescript
<ContentCardGrid items={items} columns={3} />
```

#### 2.3 Replace RelatedCalculatorCard (Medium Risk - has hover states)
- `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorRelatedTools)

**Before**:
```typescript
{calculators.map((calc) => (
  <a href={calc.href} className="group flex flex-col gap-3 p-6...">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-accent-blue-main/10...">
        <svg.../>
      </div>
      <h3>{calc.name}</h3>
    </div>
    <p>{calc.description}</p>
    <div className="flex items-center gap-1.5...">
      <span>{ctaText}</span>
      <svg.../>
    </div>
  </a>
))}
```

**After**:
```typescript
<ContentCardGrid
  items={calculators.map(calc => ({
    indicator: 'icon',
    icon: <CalculatorIcon />,
    title: calc.name,
    description: calc.description,
    href: calc.href,
    ctaText: ctaText,
  }))}
  columns={3}
/>
```

#### 2.4 Replace BenefitCard (Low Risk)
- `src/components/calculators/CalculatorSEOContent.tsx` (CalculatorWhyUse)

**Before**:
```typescript
<li className="flex items-start gap-3 p-4 rounded-xl...">
  <div className="w-6 h-6 rounded-full bg-accent-green-main/20...">
    <svg className="w-4 h-4 text-accent-green-main">
      <path d="M5 13l4 4L19 7"/>
    </svg>
  </div>
  <span>{benefit}</span>
</li>
```

**After**:
```typescript
<ContentCardGrid
  items={benefits.map(benefit => ({
    indicator: 'checkmark',
    title: benefit,
    description: '',
    layout: 'horizontal',
  }))}
  columns={2}
/>
```

### Phase 3: Cleanup

1. Remove old components from `StepCard.tsx`:
   - Keep `StepCard.tsx` for backward compatibility (mark as deprecated)
   - Add console warnings to encourage migration

2. Update exports in `src/components/calculators/index.ts`

3. Update any documentation/storybook

---

## Detailed Component Structure

### File: `/src/components/ui/ContentCard.tsx`

```typescript
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Check, Calculator } from 'lucide-react';

// ============================================================================
// INDICATOR SUB-COMPONENTS
// ============================================================================

interface NumberIndicatorProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  className?: string;
}

function NumberIndicator({
  number,
  size = 'md',
  variant = 'filled',
  className,
}: NumberIndicatorProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 min-w-6 min-h-6 text-caption1-emphasized',
    md: 'w-8 h-8 min-w-8 min-h-8 text-callout-emphasized',
    lg: 'w-10 h-10 min-w-10 min-h-10 text-body-emphasized',
  };

  const variantClasses = {
    filled: 'bg-accent-blue-main text-white',
    outline: 'bg-accent-blue-main/10 text-accent-blue-main',
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {number}
    </div>
  );
}

interface IconIndicatorProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function IconIndicator({
  icon,
  size = 'md',
  className,
}: IconIndicatorProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'rounded-xl bg-accent-blue-main/10 flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        className
      )}
    >
      <div className="text-accent-blue-main">
        {icon}
      </div>
    </div>
  );
}

interface CheckmarkIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function CheckmarkIndicator({
  size = 'md',
  className,
}: CheckmarkIndicatorProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'rounded-full bg-accent-green-main/20 flex items-center justify-center flex-shrink-0',
        sizeClasses[size],
        className
      )}
    >
      <Check className={cn('text-accent-green-main', iconSizeClasses[size])} />
    </div>
  );
}

// ============================================================================
// MAIN CONTENT CARD COMPONENT
// ============================================================================

interface ContentCardProps {
  // Content
  title: string;
  description?: string;

  // Indicator
  indicator?: 'number' | 'icon' | 'checkmark' | 'none';
  number?: number;
  icon?: React.ReactNode;

  // Interactivity
  href?: string;
  ctaText?: string;
  onClick?: () => void;

  // Layout
  layout?: 'vertical' | 'horizontal';

  // Styling
  indicatorSize?: 'sm' | 'md' | 'lg';
  indicatorVariant?: 'filled' | 'outline';
  className?: string;

  // Accessibility
  ariaLabel?: string;
}

export function ContentCard({
  title,
  description,
  indicator = 'none',
  number,
  icon,
  href,
  ctaText,
  onClick,
  layout = 'vertical',
  indicatorSize = 'md',
  indicatorVariant = 'filled',
  className,
  ariaLabel,
}: ContentCardProps) {
  // Render appropriate indicator
  const renderIndicator = () => {
    switch (indicator) {
      case 'number':
        return number !== undefined ? (
          <NumberIndicator
            number={number}
            size={indicatorSize}
            variant={indicatorVariant}
          />
        ) : null;

      case 'icon':
        return icon ? (
          <IconIndicator icon={icon} size={indicatorSize} />
        ) : null;

      case 'checkmark':
        return <CheckmarkIndicator size={indicatorSize} />;

      default:
        return null;
    }
  };

  // Layout classes
  const isHorizontal = layout === 'horizontal';
  const containerClasses = cn(
    'p-6 rounded-2xl bg-background-secondary border border-strokes-primary',
    isHorizontal ? 'flex items-start gap-3' : 'flex flex-col gap-3',
    href && 'hover:border-accent-blue-main/50 transition-all duration-200',
    className
  );

  // Content
  const content = (
    <>
      {/* Indicator + Title Row */}
      {indicator !== 'none' && !isHorizontal && (
        <div className="flex items-center gap-3">
          {renderIndicator()}
          <h3 className="text-headline text-primary">
            {title}
          </h3>
        </div>
      )}

      {/* Horizontal layout */}
      {indicator !== 'none' && isHorizontal && (
        <>
          {renderIndicator()}
          <div className="flex-1">
            <h3 className="text-body text-primary">
              {title}
            </h3>
            {description && (
              <p className="text-footnote text-secondary mt-1">
                {description}
              </p>
            )}
          </div>
        </>
      )}

      {/* No indicator - title only */}
      {indicator === 'none' && (
        <h3 className="text-headline text-primary">
          {title}
        </h3>
      )}

      {/* Description (vertical layout only) */}
      {!isHorizontal && description && (
        <p className="text-footnote text-secondary">
          {description}
        </p>
      )}

      {/* CTA (only for links) */}
      {href && ctaText && (
        <div className="flex items-center gap-1.5 text-callout text-accent-blue-main pt-2">
          <span>{ctaText}</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </>
  );

  // Wrap in link if href provided
  if (href) {
    return (
      <Link
        href={href}
        className={cn('group', containerClasses)}
        aria-label={ariaLabel || title}
      >
        {content}
      </Link>
    );
  }

  // Wrap in button if onClick provided
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn('group text-left w-full', containerClasses)}
        aria-label={ariaLabel || title}
      >
        {content}
      </button>
    );
  }

  // Default: plain div
  return <div className={containerClasses}>{content}</div>;
}

// ============================================================================
// GRID WRAPPER COMPONENT
// ============================================================================

interface ContentCardGridProps {
  items: Array<Omit<ContentCardProps, 'className'>>;
  columns?: 1 | 2 | 3;
  autoNumber?: boolean;
  className?: string;
}

export function ContentCardGrid({
  items,
  columns = 3,
  autoNumber = false,
  className,
}: ContentCardGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {items.map((item, index) => (
        <ContentCard
          key={index}
          {...item}
          {...(autoNumber && {
            indicator: 'number',
            number: index + 1,
          })}
        />
      ))}
    </div>
  );
}
```

---

## Migration Checklist

### Pre-Migration
- [ ] Create new `ContentCard.tsx` component
- [ ] Add unit tests for all variants
- [ ] Test accessibility (keyboard nav, screen readers)
- [ ] Verify responsive behavior on mobile/tablet/desktop

### Migration (12 calculator pages + shared components)
- [ ] Update `CalculatorHowTo` to use ContentCardGrid
- [ ] Update `CalculatorInfoGrid` to use ContentCardGrid
- [ ] Update `CalculatorRelatedTools` to use ContentCardGrid
- [ ] Update `CalculatorWhyUse` to use ContentCardGrid
- [ ] Update `CalculatorMethodology` to use ContentCardGrid
- [ ] Test all 12 calculator pages for visual regressions
- [ ] Update Spanish (es) translations if needed
- [ ] Update English (en) translations if needed

### Post-Migration
- [ ] Mark `StepCard`, `InfoCard` as deprecated
- [ ] Add migration guide to CLAUDE.md
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Run `npm run test` to verify E2E tests pass
- [ ] Update `.claude/agents/design-leader.md` with new pattern

---

## Benefits of Unification

### Code Reduction
- **Before**: 4 separate card patterns (~400 lines total)
- **After**: 1 unified component (~250 lines)
- **Savings**: ~150 lines, -37.5%

### Consistency Improvements
- Single source of truth for card styling
- Consistent hover states across all cards
- Unified spacing/padding
- Easier to maintain dark mode
- Design token compliance

### Developer Experience
- Simpler API (one component to learn)
- Fewer imports
- Better TypeScript autocomplete
- Easier to add new variants
- Clearer intent with explicit variants

### Future Flexibility
- Easy to add new indicator types
- Simple to extend with new layouts
- Straightforward to add animations
- Can add theme variants (e.g., "success", "warning")

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Visual regressions during migration | Medium | High | Create visual regression tests; side-by-side comparison screenshots |
| Breaking hover states on RelatedCalculatorCard | Low | Medium | Careful testing of group hover classes; preserve exact behavior |
| Performance impact from conditional rendering | Low | Low | Use React.memo if needed; current implementation is lightweight |
| Accessibility regressions | Low | High | Run axe-core tests before/after; manual keyboard testing |
| Translation key changes needed | Low | Medium | Review all translation usage; update both en.json and es.json |

---

## Success Metrics

- [ ] Zero visual regressions detected
- [ ] All calculator pages build successfully
- [ ] E2E tests pass
- [ ] No TypeScript errors
- [ ] Lighthouse accessibility score unchanged or improved
- [ ] Bundle size reduced by removing duplicate code
- [ ] Developer satisfaction (easier to use in future)

---

## Future Extensions

Once unified card is established, consider:

1. **Animation variants**: Fade-in, slide-up on scroll
2. **Additional indicators**: Badge, status dot, custom images
3. **Dark/light theme variants**: Explicit theme support beyond CSS variables
4. **Size variants**: Compact, default, large
5. **Storybook documentation**: Interactive component playground
6. **Additional layouts**: Side-by-side (image + content), overlay (image background)

---

## Related Documentation

- [Design System Patterns](../../CLAUDE.md#styling)
- [Component Guidelines](../../CLAUDE.md#components)
- [Accessibility Standards](../../CLAUDE.md#accessibility)

---

## Approval & Sign-off

**Architect**: nextjs-architect (this document)
**Implementation**: nextjs-developer (to be assigned)
**Review**: code-reviewer (post-implementation)
**Design Review**: design-leader (visual consistency check)

**Status**: Draft - Awaiting approval
**Created**: 2026-01-18
**Version**: 1.0
