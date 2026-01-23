"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { WaitlistDrawer } from "@/components/forms/WaitlistDrawer";
import GradientText from "@/components/ui/GradientText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getImagePath } from "@/lib/utils";

export default function FocusSection() {
  const t = useTranslations("home.focus");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative min-h-[400px] flex flex-col items-center justify-center py-[164px] px-4 md:px-6 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImagePath("/focussectionbgimg.jpg")}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Black overlay with opacity */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <SectionHeader
          size="section"
          align="center"
          title={locale === "es" ? (
            <><GradientText>Céntrate en tu trabajo.</GradientText> Nosotros nos encargamos del papeleo</>
          ) : (
            <><GradientText>Focus on your work.</GradientText> We&apos;ll handle the paperwork</>
          )}
          description={t("description")}
          titleClassName="text-system-grey100"
          descriptionClassName="text-callout text-system-grey100"
          marginBottom="lg"
        />

        <div className="flex justify-center">
          <WaitlistDrawer triggerText={t("cta")} />
        </div>
      </div>
    </section>
  );
}