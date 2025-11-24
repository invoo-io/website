"use client";

import { useTranslations } from "next-intl";
import InvoicingButton from "./InvoicingButton";

export default function InvoicingSection() {
  const t = useTranslations("home.invoicing");

  const steps = [
    {
      number: "1",
      title: t("step1.title"),
      description: t("step1.description")
    },
    {
      number: "2",
      title: t("step2.title"),
      description: t("step2.description")
    },
    {
      number: "3",
      title: t("step3.title"),
      description: t("step3.description")
    }
  ];

  return (
    <section className="py-[156px] max-md:py-10 px-6 bg-bg-primary">
      {/* Title */}
      <h2 className="text-large-title-emphasized text-center text-text-primary max-w-4xl mx-auto mb-16" style={{ fontSize: '48px' }}>
        {t("title")}
      </h2>

      {/* Steps Grid */}
      <div className="grid gap-16 max-w-5xl mx-auto mb-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Circle with number */}
            <div className="w-25 h-25 rounded-full border-2 flex items-center justify-center mb-6" style={{ borderColor: 'var(--accent-purple-main)', width: '100px', height: '100px' }}>
              <span className="text-large-title-emphasized text-text-primary" style={{ fontSize: '36px' }}>
                {step.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-title2-emphasized text-text-primary mb-3">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-body text-text-secondary max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <InvoicingButton />
    </section>
  );
}