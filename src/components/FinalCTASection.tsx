"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "./ui/SectionHeader";
import GradientText from "./ui/GradientText";
import { HeroGlow } from "./ui/HeroGlow";
import { DrawerComponent } from "./DrawerComponent";

export function FinalCTASection() {
  const t = useTranslations("home.finalCta");

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

        <DrawerComponent triggerText={t("cta")} />
      </div>
    </section>
  );
}
