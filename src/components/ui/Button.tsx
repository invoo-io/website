import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'tertiary';
  showArrow?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disableHoverScale?: boolean;
}

/**
 * Button Design System
 *
 * Centralized button component with consistent styling:
 * - Font: Callout/Emphasized (16px, weight 500)
 * - Padding: 12px 16px (top-bottom, left-right)
 * - Border: 2px solid
 * - Border Radius: 12px
 * - Hover: Scale(1.05) spring animation using Framer Motion
 *
 * Variants:
 * - PRIMARY: Solid button with system-grey100 text
 * - SECONDARY: Subtle background with label-primary text
 * - OUTLINE: Transparent background with label-primary text
 * - TERTIARY: Text-only button with no border or background
 * - GRADIENT: Gradient background with white text
 */

const buttonVariants = {
  primary: "bg-accent-blue-main hover:bg-accent-blue-light border-accent-blue-main hover:border-accent-blue-light",
  secondary: "bg-fills-secondary hover:bg-fills-primary border-strokes-primary hover:border-strokes-secondary",
  outline: "bg-transparent hover:bg-fills-tertiary border-accent-blue-main hover:border-accent-blue-light",
  tertiary: "bg-transparent hover:bg-fills-tertiary border-transparent hover:border-transparent",
  gradient: "" // Special handling for gradient
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  showArrow = false,
  disabled = false,
  className = "",
  type = 'button',
  disableHoverScale = false
}: ButtonProps) {
  // Determine text color based on variant
  const textColorClass = variant === 'primary'
    ? 'text-system-grey100'
    : variant === 'gradient'
    ? 'text-system-grey100'
    : variant === 'tertiary'
    ? 'text-accent-blue-main hover:text-accent-blue-dark'
    : 'text-label-primary';

  // Special handling for gradient variant
  if (variant === 'gradient') {
    const gradientStyle = {
      fontFamily: 'var(--font-inter)',
      background: 'linear-gradient(94.28deg, var(--accent-blue-main) 3.12%, var(--accent-purple-main) 95.84%)',
      borderRadius: '12px',
      padding: '12px 16px',
      border: 'none'
    };

    const content = (
      <>
        <span>{children}</span>
        {showArrow && <ArrowRight className="w-4 h-4" />}
      </>
    );

    const gradientClasses = `flex items-center justify-center gap-2 text-callout-emphasized ${textColorClass} disabled:opacity-50 disabled:cursor-not-allowed ${className}`.trim();

    const motionProps = disableHoverScale
      ? {}
      : {
          whileHover: { scale: 1.05 },
          transition: { type: "spring" as const, stiffness: 400, damping: 17 }
        };

    if (href && !disabled) {
      return (
        <motion.a href={href} className={gradientClasses} style={gradientStyle} {...motionProps}>
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={gradientClasses}
        style={gradientStyle}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }

  // Standard button variants
  const baseClasses = "flex items-center justify-center gap-2 rounded-[12px] text-callout-emphasized border-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = buttonVariants[variant];
  const paddingClasses = "px-4 py-3"; // 16px left-right, 12px top-bottom

  const allClasses = `${baseClasses} ${variantClasses} ${textColorClass} ${paddingClasses} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </>
  );

  const motionProps = disableHoverScale
    ? {}
    : {
        whileHover: { scale: 1.05 },
        transition: { type: "spring" as const, stiffness: 400, damping: 17 }
      };

  if (href && !disabled) {
    return (
      <motion.a href={href} className={allClasses} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
