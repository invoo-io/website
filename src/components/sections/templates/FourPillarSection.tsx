import { getTranslations } from "next-intl/server";
import {
  Users,
  User,
  Zap,
  Timer,
  ShieldCheck,
  Shield,
  Package,
  Building2,
  History,
  Eye,
  FileCheck,
  FileText,
  Calculator,
  Coins,
  CircleCheck,
  CheckCircle,
  CheckCircle2,
  Receipt,
  Percent,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Wallet,
  Target,
  Clock,
  BadgePercent,
  BadgeCheck,
  Calendar,
  CalendarCheck,
  ArrowRightLeft,
  DollarSign,
  Scale,
  ListChecks,
  CircleOff,
  Gift,
  BookOpen,
  MapPin,
  LucideIcon
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

// Icon mapping for server-to-client component compatibility
const iconMap: Record<string, LucideIcon> = {
  Users,
  User,
  Zap,
  Timer,
  ShieldCheck,
  Shield,
  Package,
  Building2,
  History,
  Eye,
  FileCheck,
  FileText,
  Calculator,
  Coins,
  CircleCheck,
  CheckCircle,
  CheckCircle2,
  Receipt,
  Percent,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Wallet,
  Target,
  Clock,
  BadgePercent,
  BadgeCheck,
  Calendar,
  CalendarCheck,
  ArrowRightLeft,
  DollarSign,
  Scale,
  ListChecks,
  CircleOff,
  Gift,
  BookOpen,
  MapPin,
};

interface PillarConfig {
  key: string;
  icon: string;
  gradient: string;
  iconColor: string;
}

interface FourPillarSectionProps {
  locale: string;
  translationKey: string;
  pillars: [PillarConfig, PillarConfig, PillarConfig, PillarConfig];
  cardBackground?: 'secondary' | 'tertiary';
  sectionBackground?: 'primary' | 'secondary';
}

export async function FourPillarSection({
  locale,
  translationKey,
  pillars,
  cardBackground = 'secondary',
  sectionBackground = 'primary',
}: FourPillarSectionProps) {
  const t = await getTranslations({ locale, namespace: translationKey });

  const sectionBg = sectionBackground === 'secondary' ? 'bg-background-secondary' : '';

  return (
    <section className={`py-[120px] max-md:py-16 px-4 md:px-6 ${sectionBg}`}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {pillars.map(({ key, icon, gradient, iconColor }) => {
          const Icon = iconMap[icon];
          const cardBg = cardBackground === 'tertiary' ? 'bg-background-tertiary' : 'bg-background-secondary';
          return (
            <div
              key={key}
              className={`rounded-3xl p-8 ${cardBg} border border-strokes-primary hover:border-accent-blue-main/30 transition-colors`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: gradient }}
                aria-hidden="true"
              >
                {Icon && <Icon className="w-7 h-7" style={{ color: iconColor }} />}
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
