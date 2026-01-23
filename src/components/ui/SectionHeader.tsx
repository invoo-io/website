import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Size configurations for SectionHeader
 *
 * Typography scale:
 * - hero: 64px (48px mobile) - Page-level headers
 * - section: 48px (40px mobile) - Major section dividers
 * - subsection: 28px - Content subsections
 * - card: 22px - Card/module titles
 * - xsmall: 19px - Smallest headers
 */
const SIZE_CONFIG = {
  hero: {
    typography: "text-header-title-emphasized",
    descriptionTypography: "text-title3",
    descriptionColor: "text-secondary",
    defaultAs: "h1" as const,
    defaultMargin: "mb-8",
    defaultGap: "mt-6",
    defaultMaxWidth: "max-w-4xl",
  },
  section: {
    typography: "text-section-title-emphasized",
    descriptionTypography: "text-body",
    descriptionColor: "text-secondary",
    defaultAs: "h2" as const,
    defaultMargin: "mb-16",
    defaultGap: "mt-6",
    defaultMaxWidth: "max-w-4xl",
  },
  subsection: {
    typography: "text-title1-emphasized",
    descriptionTypography: "text-body",
    descriptionColor: "text-secondary",
    defaultAs: "h3" as const,
    defaultMargin: "mb-6",
    defaultGap: "mt-2",
    defaultMaxWidth: "",
  },
  card: {
    typography: "text-title2-emphasized",
    descriptionTypography: "text-callout",
    descriptionColor: "text-secondary",
    defaultAs: "h4" as const,
    defaultMargin: "mb-3",
    defaultGap: "mt-2",
    defaultMaxWidth: "",
  },
  xsmall: {
    typography: "text-title3-emphasized",
    descriptionTypography: "text-callout",
    descriptionColor: "text-secondary",
    defaultAs: "h5" as const,
    defaultMargin: "mb-3",
    defaultGap: "mt-2",
    defaultMaxWidth: "",
  },
} as const;

// Margin bottom mapping
const MARGIN_CLASSES = {
  none: "",
  sm: "mb-3",
  md: "mb-6",
  lg: "mb-8",
  xl: "mb-16",
} as const;

// Gap (title to description) mapping
const GAP_CLASSES = {
  none: "",
  xs: "mt-2",
  sm: "mt-3",
  md: "mt-4",
  lg: "mt-6",
} as const;

// Max width mapping
const MAX_WIDTH_CLASSES = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  none: "",
} as const;

/**
 * SectionHeader - Standardized heading component for pages and sections
 *
 * Works in both Server and Client Components (pure presentational).
 *
 * @example Hero section
 * ```tsx
 * <SectionHeader
 *   size="hero"
 *   align="center"
 *   title={<><GradientText>Highlight</GradientText> rest of title</>}
 *   description="Page description"
 * />
 * ```
 *
 * @example Content subsection
 * ```tsx
 * <SectionHeader
 *   size="subsection"
 *   title="Section Title"
 *   description="Optional description"
 *   marginBottom="md"
 * />
 * ```
 */
interface SectionHeaderProps {
  /** Main heading text or React node */
  title: string | ReactNode;
  /** Visual size and semantic level */
  size: "hero" | "section" | "subsection" | "card" | "xsmall";
  /** Optional descriptive text below the title */
  description?: string | ReactNode;
  /** Optional small label above the title */
  eyebrow?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Maximum width constraint */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "none";
  /** Spacing below the header */
  marginBottom?: "none" | "sm" | "md" | "lg" | "xl";
  /** Spacing between title and description */
  gap?: "none" | "xs" | "sm" | "md" | "lg";
  /** Additional container classes */
  className?: string;
  /** Additional title classes */
  titleClassName?: string;
  /** Additional description classes */
  descriptionClassName?: string;
  /** HTML tag to render (overrides default from size config) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  /** Optional ID for anchor linking */
  id?: string;
}

export function SectionHeader({
  title,
  size,
  description,
  eyebrow,
  align = "left",
  maxWidth,
  marginBottom,
  gap,
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
    align === "center" && "text-center",
    maxWidth ? MAX_WIDTH_CLASSES[maxWidth] : config.defaultMaxWidth,
    align === "center" && (maxWidth || config.defaultMaxWidth) && "mx-auto",
    marginBottom ? MARGIN_CLASSES[marginBottom] : config.defaultMargin,
    className,
  );

  // Build title classes
  const titleClasses = cn(config.typography, "text-primary", titleClassName);

  // Build description classes
  const descClasses = cn(
    config.descriptionTypography,
    config.descriptionColor,
    align === "center" && "mx-auto",
    gap ? GAP_CLASSES[gap] : config.defaultGap,
    descriptionClassName,
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
      {description &&
        (typeof description === "string" ? (
          <p className={descClasses}>{description}</p>
        ) : (
          <div className={descClasses}>{description}</div>
        ))}
    </div>
  );
}

SectionHeader.displayName = "SectionHeader";
