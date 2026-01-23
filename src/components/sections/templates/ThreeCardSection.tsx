"use client";

import { useTranslations } from "next-intl";
import {
  Package,
  CalendarClock,
  MessageSquare,
  Mail,
  EyeOff,
  FileX,
  Users,
  AlertTriangle,
  Clock,
  LucideIcon
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

// Icon mapping for server-to-client component compatibility
const iconMap: Record<string, LucideIcon> = {
  Package,
  CalendarClock,
  MessageSquare,
  Mail,
  EyeOff,
  FileX,
  Users,
  AlertTriangle,
  Clock,
};

interface CardConfig {
  key: string;
  icon: string;
  gradient?: string;
}

interface ThreeCardSectionProps {
  translationKey: string;
  cards: [CardConfig, CardConfig, CardConfig];
  iconGradient?: string;
}

export function ThreeCardSection({
  translationKey,
  cards,
  iconGradient = "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
}: ThreeCardSectionProps) {
  const t = useTranslations(translationKey);

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
        {cards.map(({ key, icon, gradient }) => {
          const Icon = iconMap[icon];
          return (
            <div
              key={key}
              className="rounded-3xl p-8 bg-background-primary border border-strokes-primary hover:border-accent-blue-main/30 transition-colors"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: gradient || iconGradient,
                }}
                aria-hidden="true"
              >
                {Icon && <Icon className="w-7 h-7 text-accent-blue-main" />}
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
