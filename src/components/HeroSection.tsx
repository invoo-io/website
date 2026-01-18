"use client";

import React from "react";
import Button from "./ui/button";
import { DrawerComponent } from "./DrawerComponent";
import { SectionHeader } from "./ui/SectionHeader";

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
    <section className="px-4 md:px-6 pt-40 max-md:pt-20 pb-0">
      <SectionHeader
        size="hero"
        align="center"
        title={title}
        description={paragraph}
        marginBottom="lg"
      />

      {buttonText && (buttonHref || buttonOnClick) && (
        <div className="flex justify-center">
          {buttonHref === "#waitlist" ? (
            <DrawerComponent
              triggerText={buttonText}
            />
          ) : buttonHref?.startsWith('#') ? (
            <Button
              onClick={() => {
                const targetId = buttonHref.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="gradient"
              showArrow={true}
            >
              {buttonText}
            </Button>
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
    </section>
  );
}