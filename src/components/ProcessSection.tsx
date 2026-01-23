"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "./ui/SectionHeader";
import GradientText from "./ui/GradientText";

export function ProcessSection() {
  const t = useTranslations("home.process");

  const steps = ["step1", "step2", "step3"];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={step} className="text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(121,51,255,0.1), rgba(37,125,254,0.1))",
                border: "2px solid var(--accent-purple-main)",
              }}
              aria-hidden="true"
            >
              <span className="text-[32px] font-semibold text-accent-purple-main">
                {index + 1}
              </span>
            </div>
            <h3 className="text-title2-emphasized text-primary mb-3">
              {t(`${step}.title`)}
            </h3>
            <p className="text-body text-secondary max-w-xs mx-auto">
              {t(`${step}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
