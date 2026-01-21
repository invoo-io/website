import { cn } from "@/lib/utils";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle,
  Target,
  type LucideIcon,
} from "lucide-react";

type InfoCardVariant = "info" | "tip" | "warning" | "success" | "important";

interface InfoCardProps {
  variant?: InfoCardVariant;
  title?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

const variantConfig: Record<
  InfoCardVariant,
  { icon: LucideIcon; bgIcon: string }
> = {
  info: {
    icon: Info,
    bgIcon: "bg-accent-blue-main",
  },
  tip: {
    icon: Lightbulb,
    bgIcon: "bg-accent-yellow-main",
  },
  warning: {
    icon: AlertTriangle,
    bgIcon: "bg-accent-orange-main",
  },
  success: {
    icon: CheckCircle,
    bgIcon: "bg-accent-green-main",
  },
  important: {
    icon: Target,
    bgIcon: "bg-accent-purple-main",
  },
};

const defaultTitles: Record<InfoCardVariant, string> = {
  info: "Información",
  tip: "Consejo",
  warning: "Atención",
  success: "Importante",
  important: "Recuerda",
};

export function InfoCard({
  variant = "info",
  title,
  children,
  icon,
}: InfoCardProps) {
  const config = variantConfig[variant];
  const Icon = icon || config.icon;
  const displayTitle = title || defaultTitles[variant];

  return (
    <section
      className={cn(
        "not-prose my-8 p-6",
        "bg-background-secondary rounded-[16px]",
        "border border-border-primary"
      )}
    >
      {/* Header - matches ArticleSources style */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
            config.bgIcon
          )}
        >
          <Icon className="w-4 h-4 text-system-grey100" />
        </div>
        <h3 className="text-headline text-label-primary m-0 p-0">
          {displayTitle}
        </h3>
      </div>

      {/* Content - force smaller text, override any blog-content styles */}
      <div className="space-y-3 [&_p]:text-subheadline [&_p]:text-label-secondary [&_p]:m-0 [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:text-subheadline [&_li]:text-label-secondary [&_li]:text-subheadline [&_a]:text-accent-blue-main [&_a]:hover:underline [&_strong]:text-label-primary [&_strong]:text-subheadline-emphasized">
        {children}
      </div>
    </section>
  );
}

// Convenience components for common variants
export function TipCard({
  title,
  children,
}: Omit<InfoCardProps, "variant">) {
  return (
    <InfoCard variant="tip" title={title}>
      {children}
    </InfoCard>
  );
}

export function WarningCard({
  title,
  children,
}: Omit<InfoCardProps, "variant">) {
  return (
    <InfoCard variant="warning" title={title}>
      {children}
    </InfoCard>
  );
}

export function ImportantCard({
  title,
  children,
}: Omit<InfoCardProps, "variant">) {
  return (
    <InfoCard variant="important" title={title}>
      {children}
    </InfoCard>
  );
}
