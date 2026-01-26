import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import { Briefcase, Building2, ArrowLeftRight } from "lucide-react";

interface TrustTriangleSectionProps {
  locale: string;
}

export async function TrustTriangleSection({
  locale,
}: TrustTriangleSectionProps) {
  const t = await getTranslations({ locale, namespace: "about.trustTriangle" });

  const nodes = [
    {
      key: "autonomo",
      icon: Briefcase,
      color: "text-accent-blue-main",
      bgColor: "bg-accent-blue-main/10",
      borderColor: "border-accent-blue-main/30",
    },
    {
      key: "invoo",
      icon: ArrowLeftRight,
      color: "text-accent-purple-main",
      bgColor: "bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20",
      borderColor: "border-accent-purple-main/50",
      highlight: true,
    },
    {
      key: "gestoria",
      icon: Building2,
      color: "text-accent-green-main",
      bgColor: "bg-accent-green-main/10",
      borderColor: "border-accent-green-main/30",
    },
  ];

  return (
    <section className="py-[120px] max-md:py-16 px-4 md:px-6">
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

        {/* Trust Triangle Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {nodes.map((node) => (
            <div
              key={node.key}
              className={`relative bg-background-secondary border ${node.borderColor} rounded-[16px] p-6 ${
                node.highlight ? "md:scale-105 shadow-lg" : ""
              }`}
            >
              <div
                className={`w-14 h-14 ${node.bgColor} rounded-xl flex items-center justify-center mb-4`}
                aria-hidden="true"
              >
                <node.icon className={`w-7 h-7 ${node.color}`} />
              </div>
              <span className="text-callout text-tertiary uppercase tracking-wider mb-2 block">
                {t(`${node.key}.label`)}
              </span>
              <h3 className="text-title3-emphasized text-primary mb-2">
                {t(`${node.key}.title`)}
              </h3>
              <p className="text-body text-secondary">
                {t(`${node.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Connection lines (visual only on desktop) */}
        <div className="hidden md:flex justify-center items-center gap-4 mb-8" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-accent-blue-main to-accent-purple-main" />
          <div className="w-3 h-3 rounded-full bg-accent-purple-main" />
          <div className="h-px w-24 bg-gradient-to-r from-accent-purple-main to-accent-green-main" />
        </div>

        {/* Conclusion */}
        <p className="text-center text-title3 text-secondary max-w-2xl mx-auto">
          {t("conclusion")}
        </p>
      </div>
    </section>
  );
}
