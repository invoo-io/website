"use client";

import { useTranslations } from "next-intl";
import { Package, CalendarClock, MessageSquare } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import GradientText from "./ui/GradientText";

const icons = [Package, CalendarClock, MessageSquare];

export function ProblemSection() {
  const t = useTranslations("home.problems");

  const cards = [
    { key: "card1", icon: icons[0] },
    { key: "card2", icon: icons[1] },
    { key: "card3", icon: icons[2] },
  ];

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6 bg-background-secondary">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="rounded-3xl p-8 bg-background-primary border border-strokes-primary hover:border-accent-blue-main/30 transition-colors"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,125,254,0.1), rgba(121,51,255,0.1))",
              }}
              aria-hidden="true"
            >
              <Icon className="w-7 h-7 text-accent-blue-main" />
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
