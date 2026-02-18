import { getTranslations } from "next-intl/server";
import { User, Users, Building2, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import Link from "next/link";

interface AudienceSegmentationSectionProps {
  locale: string;
}

const audiences = [
  {
    key: "autonomos",
    icon: User,
    href: "/freelancers",
    gradient: "linear-gradient(135deg, rgba(37,125,254,0.15), rgba(37,125,254,0.05))",
    iconColor: "var(--accent-blue-main)",
    hoverBorder: "hover:border-accent-blue-main/30",
  },
  {
    key: "pymes",
    icon: Users,
    href: "/pymes",
    gradient: "linear-gradient(135deg, rgba(121,51,255,0.15), rgba(121,51,255,0.05))",
    iconColor: "var(--accent-purple-main)",
    hoverBorder: "hover:border-accent-purple-main/30",
  },
  {
    key: "gestorias",
    icon: Building2,
    href: "/gestorias",
    gradient: "linear-gradient(135deg, rgba(48,209,88,0.15), rgba(48,209,88,0.05))",
    iconColor: "var(--accent-green-main)",
    hoverBorder: "hover:border-accent-green-main/30",
  },
];

export async function AudienceSegmentationSection({ locale }: AudienceSegmentationSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.audiences" });

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {audiences.map(({ key, icon: Icon, href, gradient, iconColor, hoverBorder }) => (
          <Link
            key={key}
            href={`/${locale}${href}/`}
            className={`group rounded-3xl p-8 bg-background-primary border border-strokes-primary ${hoverBorder} transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue-main`}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: gradient }}
              aria-hidden="true"
            >
              <Icon className="w-7 h-7" style={{ color: iconColor }} />
            </div>

            <h3 className="text-title2-emphasized text-primary mb-3">
              {t(`${key}.title`)}
            </h3>

            <p className="text-body-emphasized text-primary mb-3">
              {t(`${key}.tagline`)}
            </p>

            <p className="text-callout text-secondary mb-6">
              {t(`${key}.body`)}
            </p>

            <span
              className="inline-flex items-center gap-2 text-callout-emphasized transition-colors group-hover:text-accent-blue-main"
              style={{ color: iconColor }}
            >
              {t(`${key}.cta`)}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
