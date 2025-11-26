"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import FocusButton from "./FocusButton";
import GradientText from "./ui/GradientText";
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
        <h2 className="text-section-title-emphasized text-system-grey100 mb-6">
          {locale === "es" ? (
            <><GradientText>Céntrate en tu trabajo.</GradientText> Nosotros nos encargamos del papeleo</>
          ) : (
            <><GradientText>Focus on your work.</GradientText> We&apos;ll handle the paperwork</>
          )}
        </h2>

        <p className="text-callout text-system-grey100 mb-12">
          {t("description")}
        </p>

        <div className="flex justify-center">
          <FocusButton />
        </div>
      </div>
    </section>
  );
}