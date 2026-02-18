import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * Custom tailwind-merge configuration to handle our design system classes.
 *
 * The typography classes (text-callout-emphasized, text-body, etc.) control
 * font properties, while text-* color classes (text-primary, etc.)
 * control color. These should NOT conflict with each other.
 *
 * By adding typography classes to a custom group, tailwind-merge won't
 * strip them when merging with color classes.
 */
const twMerge = extendTailwindMerge<'font-typography'>({
  extend: {
    classGroups: {
      // Typography classes - these set font-family, size, weight, letter-spacing, line-height
      'font-typography': [
        'text-header-title',
        'text-header-title-emphasized',
        'text-section-title',
        'text-section-title-emphasized',
        'text-step-number',
        'text-large-title',
        'text-large-title-emphasized',
        'text-title1',
        'text-title1-emphasized',
        'text-title2',
        'text-title2-emphasized',
        'text-title3',
        'text-title3-emphasized',
        'text-headline',
        'text-headline-italic',
        'text-body',
        'text-body-emphasized',
        'text-body-italic',
        'text-body-emphasized-italic',
        'text-callout',
        'text-callout-emphasized',
        'text-callout-italic',
        'text-callout-emphasized-italic',
        'text-subheadline',
        'text-subheadline-emphasized',
        'text-subheadline-italic',
        'text-subheadline-emphasized-italic',
        'text-footnote',
        'text-footnote-emphasized',
        'text-footnote-italic',
        'text-footnote-emphasized-italic',
        'text-caption1',
        'text-caption1-emphasized',
        'text-caption1-italic',
        'text-caption1-emphasized-italic',
        'text-caption2',
        'text-caption2-emphasized',
        'text-caption2-italic',
        'text-caption2-emphasized-italic',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(path: string): string {
  // Deploying to root domain, no base path needed
  return path;
}

export function getBasePath(path: string): string {
  // Ensure trailing slash to match next.config.ts trailingSlash: true
  // Skip paths with hash fragments or query strings
  if (path.includes('#') || path.includes('?')) return path;
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * Pick specific namespaces from messages object.
 * Used to reduce translation bundle size sent to client.
 */
export function pickMessages<T extends Record<string, unknown>>(
  messages: T,
  namespaces: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};
  for (const ns of namespaces) {
    if (messages[ns]) {
      result[ns] = messages[ns];
    }
  }
  return result;
}
