import { getTranslations } from "next-intl/server";
import { Users, Clock, Euro } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

interface TrustBarSectionProps {
  locale: string;
  translationKey?: string;
}

export async function TrustBarSection({
  locale,
  translationKey = "freelancersPage.trustBar"
}: TrustBarSectionProps) {
  const t = await getTranslations({ locale, namespace: translationKey });

  const stats = [
    {
      key: "stat1",
      icon: Users,
      gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
      iconColor: "var(--accent-blue-main)",
    },
    {
      key: "stat2",
      icon: Clock,
      gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
      iconColor: "var(--accent-purple-main)",
    },
    {
      key: "stat3",
      icon: Euro,
      gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
      iconColor: "var(--accent-green-main)",
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
          description={t("subtitle")}
          marginBottom="xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({ key, icon: Icon, gradient, iconColor }) => (
            <div
              key={key}
              className="rounded-3xl p-8 bg-background-primary border border-strokes-primary text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                style={{ background: gradient }}
                aria-hidden="true"
              >
                <Icon className="w-7 h-7" style={{ color: iconColor }} />
              </div>
              <p className="text-title1-emphasized text-primary mb-2">
                {t(`${key}.number`)}
              </p>
              <p className="text-body text-secondary">{t(`${key}.label`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
