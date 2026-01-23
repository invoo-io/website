"use client";

import { useEffect, useState } from "react";
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

  // Use provided dashboardImage or determine based on theme and imageBaseName
  const themedImage = dashboardImage ||
    (mounted && theme === "dark" ? `/${imageBaseName}-dark.webp` : `/${imageBaseName}-light.webp`);

  return (
    <section className="w-full -mt-40 max-md:-mt-10 pt-32 pb-32 max-md:pt-8 max-md:pb-24">
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        <div className="relative w-full">
          <Image
            src={getImagePath(themedImage)}
            alt={dashboardAlt}
            width={1350}
            height={700}
            className="w-full h-auto rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
