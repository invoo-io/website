import { getTranslations } from "next-intl/server";
import { Sparkles } from "lucide-react";

interface AISectionProps {
  locale: string;
}

export async function AISection({ locale }: AISectionProps) {
  const t = await getTranslations({ locale, namespace: "about.ai" });

  return (
    <section className="py-16 max-md:py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-6" aria-hidden="true">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-blue-main/10 to-accent-purple-main/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-accent-purple-main" />
          </div>
        </div>

        {/* Eyebrow */}
        <span className="inline-block text-callout-emphasized text-accent-purple-main mb-4">
          {t("eyebrow")}
        </span>

        {/* Title */}
        <h2 className="text-title1-emphasized text-primary mb-4">
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-body text-secondary mb-8">{t("description")}</p>

        {/* Example */}
        <div className="p-5 bg-background-tertiary rounded-2xl border border-border-primary">
          <p className="text-body text-secondary italic">{t("example")}</p>
        </div>
      </div>
    </section>
  );
}
