"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";
import { InfoCard } from "./InfoCard";

export function ArticleDisclaimer() {
  const t = useTranslations("blog.disclaimer");

  return (
    <InfoCard variant="warning" title={t("title")} icon={AlertCircle}>
      <p>{t("content")}</p>
      <p>{t("recommendation")}</p>
    </InfoCard>
  );
}
