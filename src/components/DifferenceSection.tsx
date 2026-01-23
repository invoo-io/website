"use client";

import { useTranslations } from "next-intl";
import { Users, Zap, Timer, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import GradientText from "./ui/GradientText";

const pillars = [
  {
    key: "pillar1",
    icon: Users,
    gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
    iconColor: "var(--accent-blue-main)",
  },
  {
    key: "pillar2",
    icon: Zap,
    gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
    iconColor: "var(--accent-purple-main)",
  },
  {
    key: "pillar3",
    icon: Timer,
    gradient: "linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))",
    iconColor: "var(--accent-orange-main)",
  },
  {
    key: "pillar4",
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
    iconColor: "var(--accent-green-main)",
  },
];

export function DifferenceSection() {
  const t = useTranslations("home.difference");

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
        {pillars.map(({ key, icon: Icon, gradient, iconColor }) => (
          <div
            key={key}
            className="rounded-3xl p-8 bg-background-secondary border border-strokes-primary hover:border-accent-blue-main/30 transition-colors"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: gradient }}
              aria-hidden="true"
            >
              <Icon className="w-7 h-7" style={{ color: iconColor }} />
            </div>
            <h3 className="text-title2-emphasized text-primary mb-3">
              {t(`${key}.title`)}
            </h3>
            <p className="text-body text-secondary">{t(`${key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
