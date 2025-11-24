"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Button from "./ui/Button";
import { DrawerComponent } from "./DrawerComponent";
import { Check } from "lucide-react";

interface BuildForGestoriasSectionProps {
  title: string;
  paragraph: string;
  features: string[];
  buttonText: string;
  buttonHref?: string;
  buttonOnClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  showImagePlaceholder?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  offsetImage?: boolean;
  maxImageWidth?: number;
  applyHeroStyling?: boolean; // Apply shadow and border radius for hero images
}

export default function BuildForGestoriasSection({
  title,
  paragraph,
  features,
  buttonText,
  buttonHref,
  buttonOnClick,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  showImagePlaceholder = false,
  imageWidth = 800,
  imageHeight = 700,
  offsetImage = true,
  maxImageWidth,
  applyHeroStyling = false
}: BuildForGestoriasSectionProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use provided imageSrc or determine based on theme for Gestoria image
  const themedImageSrc = imageSrc ||
    (mounted && theme === "dark" ? "/gestoria-dark.png" : "/gestoria-light.png");
  const textContent = (
    <div className="max-w-full max-md:text-center" style={{ width: '500px' }}>
      <h2 className="text-large-title-emphasized text-text-primary mb-6" style={{ fontSize: '48px' }}>
        {title}
      </h2>

      <p className="text-callout text-text-secondary mb-8">
        {paragraph}
      </p>

      {/* Features List */}
      <div className="flex flex-col gap-4 mb-8 max-md:mx-auto max-md:w-fit">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check size={20} className="text-accent-green-main" />
            <span className="text-callout text-text-primary">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-start max-md:justify-center w-fit max-md:w-full">
        {buttonHref === "#waitlist" ? (
          <DrawerComponent
            triggerText={buttonText}
          />
        ) : (
          <Button
            variant="gradient"
            showArrow
            href={buttonHref}
            onClick={buttonOnClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );

  const imageContent = themedImageSrc ? (
    <div
      className={offsetImage ? (imagePosition === 'right' ? 'max-md:mr-0 lg:mr-[-300px]' : 'max-md:mr-0 lg:mr-[300px]') : ''}
      style={{
        width: 'auto',
        maxWidth: maxImageWidth ? `${maxImageWidth}px` : undefined,
        height: 'auto',
      }}>
      <Image
        src={themedImageSrc}
        alt={imageAlt || ''}
        width={imageWidth}
        height={imageHeight}
        className={applyHeroStyling ? "rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.1)]" : ""}
        style={{
          objectFit: 'contain',

        }}
        priority
      />
    </div>
  ) : showImagePlaceholder ? (
    <div style={{
      width: '400px',
      maxWidth: '100%',
      height: '350px',
      borderRadius: '24px',
      backgroundColor: 'transparent'
    }} />
  ) : null;

  return (
    <section className="py-[156px] max-md:py-10 overflow-x-hidden" style={{
      position: 'relative',
      // height: '634px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        // maxWidth: '1200px',
        width: '100%',
        padding: '0 24px',
        flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row',
        flexWrap: 'wrap'
      }}>
        {textContent}
        {imageContent}
      </div>
    </section>
  );
}