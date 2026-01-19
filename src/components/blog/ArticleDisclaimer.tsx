"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

export function ArticleDisclaimer() {
  const t = useTranslations("blog.disclaimer");

  return (
    <div className="bg-accent-orange-subtle/10 rounded-[16px] p-6 border border-accent-orange-main/20">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-accent-orange-main flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-title3-emphasized text-label-primary mb-3">
            {t("title")}
          </h3>
          <p className="text-body text-label-secondary mb-4">
            {t("content")}
          </p>
          <p className="text-callout text-label-secondary">
            {t("recommendation")}
          </p>
        </div>
      </div>
    </div>
  );
}
