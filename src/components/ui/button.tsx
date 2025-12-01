"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Button Design System
 *
 * Unified polymorphic button component that renders as <button> or <Link>.
 *
 * Variants: primary, secondary, outline, tertiary, gradient
 * Sizes: sm, md, lg
 */

const variants = {
  primary: 'bg-accent-blue-main hover:bg-accent-blue-light text-system-grey100',
  secondary: 'bg-fills-secondary hover:bg-fills-primary border-2 border-strokes-primary hover:border-strokes-secondary text-primary',
  outline: 'bg-transparent hover:bg-fills-tertiary border-2 border-accent-blue-main hover:border-accent-blue-light text-primary',
  tertiary: 'bg-transparent text-accent-blue-main hover:text-accent-blue-dark',
  gradient: 'text-system-grey100',
} as const;

const sizes = {
  none: 'p-0 gap-1',
  sm: 'px-3 py-2 gap-1.5',
  md: 'px-4 py-3 gap-2',
  lg: 'px-6 py-4 gap-3',
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  showBackIcon?: boolean;
  disabled?: boolean;
  className?: string;
  disableHoverScale?: boolean;
  'aria-label'?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const motionConfig = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  showBackIcon = false,
  disabled = false,
  className,
  disableHoverScale = false,
  'aria-label': ariaLabel,
  href,
  type = 'button',
  onClick,
}: ButtonProps) {
  const isLink = href && !disabled;

  // Gradient variant uses inline styles for the gradient background
  const isGradient = variant === 'gradient';
  const gradientStyle = isGradient ? {
    background: 'linear-gradient(94.28deg, var(--accent-blue-main) 3.12%, var(--accent-purple-main) 95.84%)',
  } : undefined;

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-[12px] text-callout-emphasized',
    'transition-colors duration-200 cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue-main',
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {showBackIcon && <ChevronLeft className="w-5 h-5" />}
      <span>{children}</span>
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </>
  );

  const animationProps = disableHoverScale ? {} : motionConfig;

  // Render as Link
  if (isLink) {
    const MotionLink = motion.create(Link);
    return (
      <MotionLink
        href={href}
        className={baseClasses}
        style={gradientStyle}
        aria-label={ariaLabel}
        {...animationProps}
      >
        {content}
      </MotionLink>
    );
  }

  // Render as button
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={gradientStyle}
      aria-label={ariaLabel}
      {...animationProps}
    >
      {content}
    </motion.button>
  );
}
