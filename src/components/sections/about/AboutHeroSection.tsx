import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import { HeroGlow } from "@/components/ui/HeroGlow";

interface AboutHeroSectionProps {
  locale: string;
}

export async function AboutHeroSection({ locale }: AboutHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.hero" });

  return (
    <section className="relative py-60 max-md:py-32 px-4 md:px-6 overflow-hidden">
      <HeroGlow />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <SectionHeader
          size="hero"
          align="center"
          title={
            <>
              {t("title")} <GradientText>{t("titleHighlight")}</GradientText>
            </>
          }
          description={t("description")}
          marginBottom="none"
        />
      </div>
    </section>
  );
}
