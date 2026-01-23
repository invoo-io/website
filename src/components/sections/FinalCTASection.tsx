"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { WaitlistDrawer } from "@/components/forms/WaitlistDrawer";

interface FinalCTASectionProps {
  translationKey?: string;
}

export function FinalCTASection({
  translationKey = "home.finalCta"
}: FinalCTASectionProps) {
  const t = useTranslations(translationKey);

  return (
    <section className="relative py-[120px] max-md:py-16 px-4 md:px-6 overflow-hidden">
      <HeroGlow />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
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

        <WaitlistDrawer triggerText={t("cta")} />
      </div>
    </section>
  );
}
