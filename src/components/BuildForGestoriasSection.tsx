"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Button from "./ui/button";
import { DrawerComponent } from "./DrawerComponent";
import { SectionHeader } from "./ui/SectionHeader";
import { Check } from "lucide-react";

interface BuildForGestoriasSectionProps {
  title: React.ReactNode;
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
  subheadingKey?: string; // Optional H3 subheading translation key
  testimonialQuote?: string; // Optional testimonial quote
  testimonialAuthor?: string; // Optional testimonial author
  faqQuestion?: string; // Optional FAQ question
  faqAnswer?: string; // Optional FAQ answer
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
  applyHeroStyling = false,
  subheadingKey,
  testimonialQuote,
  testimonialAuthor,
  faqQuestion,
  faqAnswer
}: BuildForGestoriasSectionProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use provided imageSrc or determine based on theme for Gestoria image
  const themedImageSrc = imageSrc ||
    (mounted && theme === "dark" ? "/gestoria-dark.webp" : "/gestoria-light.webp");
  const textContent = (
    <div className="max-w-full max-md:text-center" style={{ width: '500px' }}>
      <SectionHeader
        size="section"
        align="left"
        title={title}
        description={paragraph}
        descriptionClassName="text-callout leading-loose max-w-prose"
        marginBottom="lg"
        className="max-md:text-center"
      />

      {/* Optional H3 subheading */}
      {subheadingKey && (
        <h3 className="text-title2-emphasized text-primary mb-6">
          {subheadingKey}
        </h3>
      )}

      {/* Features List */}
      <div className="flex flex-col gap-4 mb-8 max-md:mx-auto max-md:w-fit">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check size={20} className="text-accent-green-main" />
            <span className="text-callout text-primary">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Optional testimonial */}
      {testimonialQuote && testimonialAuthor && (
        <div className="bg-background-secondary rounded-2xl p-6 mb-8 border-l-4 border-accent-purple-main">
          <p className="text-callout text-secondary italic mb-3 leading-relaxed">
            &ldquo;{testimonialQuote}&rdquo;
          </p>
          <p className="text-callout text-primary font-semibold">
            — {testimonialAuthor}
          </p>
        </div>
      )}

      {/* Optional FAQ */}
      {faqQuestion && faqAnswer && (
        <div className="bg-background-secondary rounded-2xl p-6 mb-8">
          <h3 className="text-title3-emphasized text-primary mb-3">
            {faqQuestion}
          </h3>
          <p className="text-callout text-secondary leading-loose">
            {faqAnswer}
          </p>
        </div>
      )}

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
    <section className="py-[156px] max-md:py-10 px-4 md:px-6 overflow-x-hidden" style={{
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
        width: '100%',
        flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row',
        flexWrap: 'wrap'
      }}>
        {textContent}
        {imageContent}
      </div>
    </section>
  );
}