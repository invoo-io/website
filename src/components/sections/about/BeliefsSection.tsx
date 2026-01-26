import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

interface BeliefsSectionProps {
  locale: string;
}

export async function BeliefsSection({ locale }: BeliefsSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.beliefs" });

  const beliefs = [
    { key: "belief1", number: "01" },
    { key: "belief2", number: "02" },
    { key: "belief3", number: "03" },
    { key: "belief4", number: "04" },
    { key: "belief5", number: "05" },
  ];

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6 bg-background-secondary">
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-12">
          {beliefs.map((belief) => (
            <div key={belief.key} className="flex gap-6 items-start">
              <span
                className="text-[48px] max-md:text-[32px] font-bold text-accent-purple-main/20 leading-none select-none"
                aria-hidden="true"
              >
                {belief.number}
              </span>
              <div className="pt-2">
                <h3 className="text-title2-emphasized text-primary mb-2">
                  {t(`${belief.key}.title`)}
                </h3>
                <p className="text-body text-secondary max-w-2xl">
                  {t(`${belief.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
