import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import { Layers, FileWarning, MessageSquareOff } from "lucide-react";

interface ProblemSectionProps {
  locale: string;
}

export async function ProblemSection({ locale }: ProblemSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.problem" });

  const cards = [
    {
      icon: Layers,
      title: t("card1.title"),
      description: t("card1.description"),
      color: "text-accent-purple-main",
      bgColor: "bg-accent-purple-main/10",
    },
    {
      icon: FileWarning,
      title: t("card2.title"),
      description: t("card2.description"),
      color: "text-accent-orange-main",
      bgColor: "bg-accent-orange-main/10",
    },
    {
      icon: MessageSquareOff,
      title: t("card3.title"),
      description: t("card3.description"),
      color: "text-accent-red-main",
      bgColor: "bg-accent-red-main/10",
    },
  ];

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6 bg-background-secondary">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-background-primary border border-border-primary rounded-[16px] p-6"
            >
              <div
                className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h3 className="text-title3-emphasized text-primary mb-2">
                {card.title}
              </h3>
              <p className="text-body text-secondary">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
