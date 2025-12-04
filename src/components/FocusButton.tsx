"use client";

import { useTranslations } from "next-intl";
import { DrawerComponent } from "./DrawerComponent";

export default function FocusButton() {
  const t = useTranslations("home.focus");

  return (
    <DrawerComponent
      triggerText={t("cta")}
    />
  );
}