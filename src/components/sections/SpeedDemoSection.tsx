import { getTranslations } from "next-intl/server";
import { User, Plus, Eye, Send } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

const steps = [
  {
    key: "step1",
    icon: User,
    gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
    iconColor: "var(--accent-blue-main)",
  },
  {
    key: "step2",
    icon: Plus,
    gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
    iconColor: "var(--accent-purple-main)",
  },
  {
    key: "step3",
    icon: Eye,
    gradient: "linear-gradient(135deg, rgba(255,159,10,0.15), rgba(255,159,10,0.05))",
    iconColor: "var(--accent-orange-main)",
  },
  {
    key: "step4",
    icon: Send,
    gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
    iconColor: "var(--accent-green-main)",
    isHighlight: true,
  },
];

interface SpeedDemoSectionProps {
  locale: string;
  translationKey?: string;
}

export async function SpeedDemoSection({
  locale,
  translationKey = "freelancersPage.speedDemo"
}: SpeedDemoSectionProps) {
  const t = await getTranslations({ locale, namespace: translationKey });

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

      <div className="max-w-5xl mx-auto">
        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Connecting line */}
          <div
            className="absolute top-7 left-0 right-0 h-0.5 bg-strokes-primary"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          />

          {steps.map(({ key, icon: Icon, gradient, iconColor, isHighlight }) => (
            <div
              key={key}
              className="relative flex flex-col items-center"
              style={{ zIndex: 1, flex: "0 0 auto", width: "200px" }}
            >
              {/* Time label */}
              <div
                className={`mb-4 px-3 py-1 rounded-full text-footnote-emphasized ${
                  isHighlight
                    ? "bg-accent-green-main/10 text-accent-green-main"
                    : "bg-background-primary text-label-secondary"
                }`}
              >
                {t(`${key}.time`)}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  isHighlight ? "ring-2 ring-accent-green-main/30" : ""
                }`}
                style={{ background: gradient }}
                aria-hidden="true"
              >
                <Icon className="w-7 h-7" style={{ color: iconColor }} />
              </div>

              {/* Step info */}
              <h3 className="text-callout-emphasized text-primary text-center mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-footnote text-secondary text-center">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map(({ key, icon: Icon, gradient, iconColor, isHighlight }, idx) => (
            <div key={key} className="relative flex gap-4">
              {/* Vertical line connector */}
              {idx < steps.length - 1 && (
                <div
                  className="absolute left-7 top-14 bottom-0 w-0.5 bg-strokes-primary"
                  aria-hidden="true"
                />
              )}

              {/* Icon column */}
              <div className="relative flex flex-col items-center" style={{ width: "56px" }}>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    isHighlight ? "ring-2 ring-accent-green-main/30" : ""
                  }`}
                  style={{ background: gradient }}
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7" style={{ color: iconColor }} />
                </div>
              </div>

              {/* Content column */}
              <div className="flex-1 pt-1">
                <div
                  className={`inline-block mb-2 px-3 py-1 rounded-full text-footnote-emphasized ${
                    isHighlight
                      ? "bg-accent-green-main/10 text-accent-green-main"
                      : "bg-background-secondary text-label-secondary"
                  }`}
                >
                  {t(`${key}.time`)}
                </div>
                <h3 className="text-callout-emphasized text-primary mb-1">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-footnote text-secondary">{t(`${key}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
