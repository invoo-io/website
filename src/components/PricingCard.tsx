"use client";

import { Check } from "lucide-react";
import Button from "./ui/button";

interface PricingCardProps {
  title: string;
  description?: string;
  price: string;
  period?: string;
  badge?: string;
  badgeColor?: string;
  buttonText: string;
  buttonVariant?: "primary" | "gradient" | "outline";
  buttonHref?: string;
  buttonOnClick?: () => void;
  features: string[];
  isHighlighted?: boolean;
  subtitle?: string | React.ReactNode;
}

export default function PricingCard({
  title,
  description,
  price,
  period,
  badge,
  badgeColor,
  buttonText,
  buttonVariant = "gradient",
  buttonHref,
  buttonOnClick,
  features,
  isHighlighted = false,
  subtitle,
}: PricingCardProps) {
  return (
    <div
      className="relative h-full flex flex-col rounded-3xl p-8"
      style={{
        background: 'var(--background-secondary)',
        border: isHighlighted ? '2px solid var(--accent-blue-main)' : '1px solid var(--strokes-primary)',
      }}
    >
      <div className="flex-1">
        <h3 className="text-title1-emphasized text-primary mb-3">
          {title}
        </h3>

        {description && (
          <p className="text-footnote text-secondary mb-6">
            {description}
          </p>
        )}

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-large-title-emphasized text-primary" style={{ fontSize: '48px', fontWeight: 700 }}>
              {price}
            </span>
            {period && (
              <span className="text-callout text-secondary">
                {period}
              </span>
            )}
            {badge && (
              <span className="text-footnote-emphasized ml-2 text-accent-green-main">
                {badge}
              </span>
            )}
          </div>

          {subtitle && (
            <div className="text-footnote mt-2 text-secondary">
              {subtitle}
            </div>
          )}
        </div>

        <div className="mb-8">
          <Button
            href={buttonHref}
            onClick={buttonOnClick}
            variant={buttonVariant}
            className="w-full justify-center"
          >
            {buttonText}
          </Button>
        </div>

        <div className="border-t border-strokes-primary pt-6">
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check size={20} className="text-accent-green-main flex-shrink-0 mt-0.5" />
                <span className="text-footnote text-primary">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}