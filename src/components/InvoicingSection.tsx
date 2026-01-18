"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import InvoicingButton from "./InvoicingButton";
import GradientText from "./ui/GradientText";
import { SectionHeader } from "./ui/SectionHeader";

export default function InvoicingSection() {
  const t = useTranslations("home.invoicing");
  const params = useParams();
  const locale = params.locale as string;

  const steps = [
    {
      number: "1",
      title: t("step1.title"),
      description: t("step1.description"),
      extended: t("step1Extended")
    },
    {
      number: "2",
      title: t("step2.title"),
      description: t("step2.description"),
      extended: t("step2Extended")
    },
    {
      number: "3",
      title: t("step3.title"),
      description: t("step3.description"),
      extended: t("step3Extended")
    }
  ];

  return (
    <section className="py-[156px] max-md:py-10 px-4 md:px-6 bg-background-primary">
      {/* Title - "Facturación simplificada" / "Invoicing made simple" */}
      <SectionHeader
        size="section"
        align="center"
        title={locale === "es" ? (
          <>Facturación <GradientText>simplificada</GradientText></>
        ) : (
          <>Invoicing made <GradientText>simple</GradientText></>
        )}
        description={t("intro")}
      />

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto mb-16">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Circle with number */}
            <div className="w-[100px] h-[100px] rounded-full border-2 border-accent-purple-main flex items-center justify-center mb-6">
              <span className="text-step-number text-primary">
                {step.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-title2-emphasized text-primary mb-3">
              {step.title}
            </h3>

            {/* Extended description */}
            <p className="text-body text-secondary max-w-sm leading-relaxed">
              {step.extended}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Snippet */}
      <div className="max-w-3xl mx-auto mb-16 bg-background-secondary rounded-3xl p-8">
        <h3 className="text-title2-emphasized text-primary mb-4">
          {t("faq.question")}
        </h3>
        <p className="text-body text-secondary leading-relaxed">
          {t("faq.answer")}
        </p>
      </div>

      {/* Button */}
      <InvoicingButton />
    </section>
  );
}