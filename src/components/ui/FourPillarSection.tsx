"use client";

import { useTranslations } from "next-intl";
import { Users, Zap, Timer, ShieldCheck, Package, LucideIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import GradientText from "./GradientText";

// Icon mapping for server-to-client component compatibility
const iconMap: Record<string, LucideIcon> = {
  Users,
  Zap,
  Timer,
  ShieldCheck,
  Package,
};

interface PillarConfig {
  key: string;
  icon: string;
  gradient: string;
  iconColor: string;
}

interface FourPillarSectionProps {
  translationKey: string;
  pillars: [PillarConfig, PillarConfig, PillarConfig, PillarConfig];
}

export function FourPillarSection({
  translationKey,
  pillars,
}: FourPillarSectionProps) {
  const t = useTranslations(translationKey);

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6">
      <SectionHeader
        size="section"
        align="center"
        title={
          <>
            {t("title")} <GradientText>{t("titleHighlight")}</GradientText>
          </>
        }
        description={t("description")}
        marginBottom="xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {pillars.map(({ key, icon, gradient, iconColor }) => {
          const Icon = iconMap[icon];
          return (
            <div
              key={key}
              className="rounded-3xl p-8 bg-background-secondary border border-strokes-primary hover:border-accent-blue-main/30 transition-colors"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: gradient }}
                aria-hidden="true"
              >
                {Icon && <Icon className="w-7 h-7" style={{ color: iconColor }} />}
              </div>
              <h3 className="text-title2-emphasized text-primary mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-body text-secondary">{t(`${key}.description`)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
