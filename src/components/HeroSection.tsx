"use client";

import React from "react";
import { Check } from "lucide-react";
import Button from "./ui/button";
import { DrawerComponent } from "./DrawerComponent";
import { SectionHeader } from "./ui/SectionHeader";
import { HeroGlow } from "./ui/HeroGlow";

interface HeroSectionProps {
  title: React.ReactNode;
  paragraph: string;
  buttonText?: string;
  buttonHref?: string;
  buttonOnClick?: () => void;
  highlights?: string[];
}

export default function HeroSection({
  title,
  paragraph,
  buttonText,
  buttonHref,
  buttonOnClick,
  highlights,
}: HeroSectionProps) {
  return (
    <section className="relative px-4 md:px-6 py-60 max-md:py-32 overflow-hidden">
      <HeroGlow />

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
            <DrawerComponent triggerText={buttonText} />
          ) : buttonHref?.startsWith("#") ? (
            <Button
              onClick={() => {
                const targetId = buttonHref.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: "smooth" });
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

      {highlights && highlights.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 list-none">
          {highlights.map((item, index) => (
            <li
              key={index}
              className="inline-flex items-center gap-1.5 text-footnote text-secondary"
            >
              <Check className="w-4 h-4 text-accent-green-main" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
