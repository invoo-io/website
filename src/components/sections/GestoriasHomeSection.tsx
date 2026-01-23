"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/button";

interface GestoriasHomeSectionProps {
  locale: string;
}

export function GestoriasHomeSection({ locale }: GestoriasHomeSectionProps) {
  const t = useTranslations("home.gestorias");
  const features = t.raw("features") as string[];

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6 bg-background-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader
          size="section"
          align="center"
          title={
            <>
              {t("title")} <GradientText>{t("titleHighlight")}</GradientText>
            </>
          }
          description={t("description")}
          marginBottom="lg"
        />

        <ul className="space-y-4 mb-10 text-left max-w-xl mx-auto">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-green-main/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-accent-green-main" />
              </div>
              <span className="text-body text-primary">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="gradient"
          showArrow
          href={`/${locale}/gestorias`}
        >
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
