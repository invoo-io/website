"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getImagePath } from "@/lib/utils";

interface HeroImageSectionProps {
  dashboardImage?: string;
  dashboardAlt?: string;
  imageBaseName?: string; // e.g., "homepage", "freelancer", "gestoria"
}

export default function HeroImageSection({
  dashboardImage,
  dashboardAlt = "Invoo Dashboard",
  imageBaseName = "homepage",
}: HeroImageSectionProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // If a specific image is provided, use it directly
  if (dashboardImage) {
    return (
      <section className="w-full -mt-40 max-md:-mt-10 pt-32 pb-32 max-md:pt-8 max-md:pb-24">
        <div className="max-w-7xl mx-auto px-6 max-md:px-4">
          <div className="relative w-full">
            <Image
              src={getImagePath(dashboardImage)}
              alt={dashboardAlt}
              width={1350}
              height={700}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="w-full h-auto rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  // Default to dark image (since dark mode is default theme)
  // Only switch to light image after hydration confirms light theme
  const isLightTheme = mounted && theme === "light";
  const imageSrc = isLightTheme
    ? `/${imageBaseName}-light.webp`
    : `/${imageBaseName}-dark.webp`;

  return (
    <section className="w-full -mt-40 max-md:-mt-10 pt-32 pb-32 max-md:pt-8 max-md:pb-24">
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        <div className="relative w-full">
          <Image
            src={getImagePath(imageSrc)}
            alt={dashboardAlt}
            width={1350}
            height={700}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="w-full h-auto rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
