"use client";

import { useTranslations } from "next-intl";

interface IntroSectionProps {
  titleKey: string;
  paragraphKey: string;
}

export default function IntroSection({ titleKey, paragraphKey }: IntroSectionProps) {
  const t = useTranslations();

  // Support both array format (new) and string format (backward compatible)
  const paragraphContent = t.raw(paragraphKey);
  const paragraphs = Array.isArray(paragraphContent)
    ? paragraphContent
    : [paragraphContent as string];

  return (
    <section className="py-[156px] max-md:py-10 px-4 md:px-6 bg-background-secondary">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-section-title-emphasized text-center text-primary mb-12">
          {t(titleKey)}
        </h2>
        <div className="space-y-6 text-center">
          {paragraphs.map((para: string, index: number) => (
            <p key={index} className="text-body text-secondary leading-loose">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
