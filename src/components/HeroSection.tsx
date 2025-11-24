"use client";

import React from "react";
import Button from "./ui/Button";
import { DrawerComponent } from "./DrawerComponent";

interface HeroSectionProps {
  title: React.ReactNode;
  paragraph: string;
  buttonText?: string;
  buttonHref?: string;
  buttonOnClick?: () => void;
}

export default function HeroSection({
  title,
  paragraph,
  buttonText,
  buttonHref,
  buttonOnClick
}: HeroSectionProps) {
  return (
    <section className="flex items-center justify-center px-6 pt-40 max-md:pt-20 pb-0">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="hero-heading mb-8">
          {title}
        </h1>

        <p className="text-body mb-8 max-w-3xl mx-auto text-text-secondary">
          {paragraph}
        </p>

        {buttonText && (buttonHref || buttonOnClick) && (
          <div className="flex justify-center">
            {buttonHref === "#waitlist" ? (
              <DrawerComponent
                triggerText={buttonText}
              />
            ) : (
              <Button
                href={buttonHref}
                onClick={buttonOnClick}
                variant="gradient"
                showArrow={true}
              >
                {buttonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}