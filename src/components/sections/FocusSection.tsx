import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { WaitlistDrawer } from "@/components/forms/WaitlistDrawer";
import GradientText from "@/components/ui/GradientText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getImagePath } from "@/lib/utils";

interface FocusSectionProps {
  locale: string;
}

export default async function FocusSection({ locale }: FocusSectionProps) {
  const t = await getTranslations({ locale, namespace: "home.focus" });

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
          title={(() => {
            // Split title on period to apply gradient to first sentence
            const fullTitle = t("title");
            const parts = fullTitle.split(". ");
            return (
              <>
                <GradientText>{parts[0]}.</GradientText> {parts.slice(1).join(". ")}
              </>
            );
          })()}
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