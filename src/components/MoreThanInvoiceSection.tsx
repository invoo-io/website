"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import MoreThanInvoiceButton from "./MoreThanInvoiceButton";
import GradientText from "./ui/GradientText";
import { getImagePath } from "@/lib/utils";

export default function MoreThanInvoiceSection() {
  const t = useTranslations("home.moreThanInvoicing");
  const params = useParams();
  const locale = params.locale as string;

  const features = [
    {
      image: getImagePath("/Note.png"),
      title: t("card1.title"),
      description: t("card1.description"),
      extended: t("card1Extended")
    },
    {
      image: getImagePath("/Calendar.png"),
      title: t("card2.title"),
      description: t("card2.description"),
      extended: t("card2Extended")
    },
    {
      image: getImagePath("/Screen.png"),
      title: t("card3.title"),
      description: t("card3.description"),
      extended: t("card3Extended")
    },
    {
      image: getImagePath("/Down.png"),
      title: t("card4.title"),
      description: t("card4.description"),
      extended: t("card4Extended")
    },
  ];

  return (
    <section className="py-[156px] max-md:py-10 px-4 md:px-6 relative min-h-[634px] bg-background-secondary flex items-center justify-center flex-col">
      {/* Title */}
      <h2 className="text-section-title-emphasized text-center text-primary max-w-4xl mx-auto mb-16 relative z-10">
        {locale === "es" ? (
          <><GradientText>Más</GradientText> que facturación</>
        ) : (
          <><GradientText>More</GradientText> than invoicing</>
        )}
      </h2>

      {/* Intro paragraph */}
      <div className="max-w-4xl mx-auto mb-16 relative z-10">
        <p className="text-body text-secondary text-center leading-relaxed">
          {t("intro")}
        </p>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1000px]">
        {/* 2x2 Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background-secondary rounded-3xl p-8 text-center min-h-[150px]"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={100}
                height={100}
                className="object-contain mx-auto pb-6"
              />
              <h3 className="text-title3-emphasized text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-body text-secondary leading-relaxed">
                {feature.extended}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <MoreThanInvoiceButton />
      </div>
    </section>
  );
}
