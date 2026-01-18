'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Check } from 'lucide-react';

// ============================================================================
// INDICATOR SUB-COMPONENTS
// ============================================================================

interface NumberIndicatorProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  className?: string;
}

/**
 * NumberIndicator - Circular numbered indicator for steps
 * Used in numbered steps, methodology sections
 * Exported for standalone use in methodology lists
 */
export function NumberIndicator({
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

/**
 * IconIndicator - Square icon container with blue accent background
 * Used for calculator icons and tool indicators
 */
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

/**
 * CheckmarkIndicator - Circular green checkmark for benefits/features
 * Used in "why use" sections and benefit lists
 */
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
  // Content (required)
  title: string;
  description?: string;

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

/**
 * ContentCard - Unified card component for all content display patterns
 *
 * Supports:
 * - Number indicators (steps, numbered lists)
 * - Icon indicators (tools, calculators)
 * - Checkmark indicators (benefits, features)
 * - No indicator (plain info cards)
 * - Clickable cards (with href or onClick)
 * - CTA links at bottom
 * - Vertical and horizontal layouts
 *
 * Replaces: StepCard, InfoCard, RelatedCalculatorCard, BenefitCard
 */
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
      {/* Vertical layout with indicator */}
      {indicator !== 'none' && !isHorizontal && (
        <div className="flex items-center gap-3">
          {renderIndicator()}
          <h3 className="text-headline text-primary">
            {title}
          </h3>
        </div>
      )}

      {/* Horizontal layout with indicator */}
      {indicator !== 'none' && isHorizontal && (
        <>
          {renderIndicator()}
          <div className="flex-1">
            <span className="text-body text-primary">
              {title}
            </span>
            {description && (
              <p className="text-footnote text-secondary mt-1">
                {description}
              </p>
            )}
          </div>
        </>
      )}

      {/* No indicator - title only (vertical layout) */}
      {indicator === 'none' && (
        <h3 className="text-headline text-primary">
          {title}
        </h3>
      )}

      {/* Description (vertical layout only, not shown for horizontal) */}
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
            aria-hidden="true"
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
        type="button"
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
  autoNumber?: boolean;  // Auto-add numbers 1, 2, 3... to items
  className?: string;
}

/**
 * ContentCardGrid - Responsive grid wrapper for ContentCard components
 *
 * Features:
 * - Automatic numbering with autoNumber prop
 * - Responsive column layouts (mobile-first)
 * - Max 3 columns for readability
 * - Consistent gap spacing
 *
 * Usage:
 * - Steps: <ContentCardGrid items={steps} columns={3} autoNumber />
 * - Info cards: <ContentCardGrid items={items} columns={3} />
 * - Benefits: <ContentCardGrid items={benefits} columns={2} />
 */
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
