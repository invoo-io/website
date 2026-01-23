import Image from "next/image";
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
              className="w-full h-auto rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.2)]"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  // Render both images, CSS handles visibility based on theme
  const lightImage = `/${imageBaseName}-light.webp`;
  const darkImage = `/${imageBaseName}-dark.webp`;

  return (
    <section className="w-full -mt-40 max-md:-mt-10 pt-32 pb-32 max-md:pt-8 max-md:pb-24">
      <div className="max-w-7xl mx-auto px-6 max-md:px-4">
        <div className="relative w-full">
          {/* Light mode image - hidden in dark mode */}
          <Image
            src={getImagePath(lightImage)}
            alt={dashboardAlt}
            width={1350}
            height={700}
            className="w-full h-auto rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.2)] dark:hidden"
            priority
          />
          {/* Dark mode image - hidden in light mode */}
          <Image
            src={getImagePath(darkImage)}
            alt={dashboardAlt}
            width={1350}
            height={700}
            className="w-full h-auto rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.2)] hidden dark:block"
            priority
          />
        </div>
      </div>
    </section>
  );
}
