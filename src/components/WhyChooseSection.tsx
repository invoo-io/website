"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Button from "./ui/button";
import GradientText from "./ui/GradientText";
import { getImagePath, getBasePath } from "@/lib/utils";

export default function WhyChooseSection() {
  const t = useTranslations("home.whyChoose");
  const params = useParams();
  const locale = params.locale as string;

  const features = [
    {
      image: getImagePath("/clock.png"),
      title: t("card1.title"),
      description: t("card1.description"),
      extended: t("card1Extended")
    },
    {
      image: getImagePath("/paper.png"),
      title: t("card2.title"),
      description: t("card2.description"),
      extended: t("card2Extended")
    },
    {
      image: getImagePath("/Calendar.png"),
      title: t("card3.title"),
      description: t("card3.description"),
      extended: t("card3Extended")
    },
    {
      image: getImagePath("/personbook.png"),
      title: t("card4.title"),
      description: t("card4.description"),
      extended: t("card4Extended")
    },
    {
      image: getImagePath("/Note.png"),
      title: t("card5.title"),
      description: t("card5.description"),
      extended: t("card5Extended")
    }
  ];

  return (
    <section className="py-[156px] max-md:py-10 px-4 md:px-6 bg-background-secondary">
      {/* Title - Split to apply gradient to "Invoo" */}
      <h2 className="text-section-title-emphasized text-center text-primary max-w-4xl mx-auto mb-16">
        {(() => {
          const title = t("title");
          // Split at "Invoo" to apply gradient
          const parts = title.split("Invoo");
          return (
            <>
              {parts[0]}<GradientText>Invoo</GradientText>{parts[1] || ""}
            </>
          );
        })()}
      </h2>

      {/* Intro paragraph */}
      <div className="max-w-4xl mx-auto mb-16">
        <p className="text-body text-secondary text-center leading-relaxed">
          {t("intro")}
        </p>
      </div>

      {/* Features Grid - First row: 3 cards, Second row: 2 cards centered */}
      <div className="max-w-7xl mx-auto mb-16">
        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-background-secondary rounded-3xl p-8">
            {/* Image */}
            <div className="mb-6">
              <Image
                src={feature.image}
                alt={feature.title}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-title2-emphasized text-primary mb-3">
              {feature.title}
            </h3>

            {/* Extended description */}
            <p className="text-body text-secondary max-w-sm leading-relaxed">
              {feature.extended}
            </p>
          </div>
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.slice(3, 5).map((feature, index) => (
            <div key={index + 3} className="flex flex-col items-center text-center bg-background-secondary rounded-3xl p-8">
            {/* Image */}
            <div className="mb-6">
              <Image
                src={feature.image}
                alt={feature.title}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-title2-emphasized text-primary mb-3">
              {feature.title}
            </h3>

            {/* Extended description */}
            <p className="text-body text-secondary max-w-sm leading-relaxed">
              {feature.extended}
            </p>
          </div>
          ))}
        </div>
      </div>

      {/* Outro card with text and buttons */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-background-primary rounded-3xl p-8 md:p-12">
          {/* Outro text */}
          <p className="text-body text-secondary text-center leading-relaxed mb-8">
            {t("outro")}
          </p>

          {/* 3 Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {/* Gestoría button with gradient border */}
            <motion.div
              className="gradient-border-wrapper rounded-xl p-[2px] inline-flex"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" showArrow className="!bg-background-primary !border-0 !text-primary" href={getBasePath(`/${locale}/gestorias`)} disableHoverScale>
                {t("cta1")}
              </Button>
            </motion.div>

            {/* Freelancer button with solid gradient background */}
            <Button variant="gradient" showArrow href={getBasePath(`/${locale}/freelancers`)}>
              {t("cta2")}
            </Button>

            {/* PYMEs button */}
            <Button variant="gradient" showArrow href={getBasePath(`/${locale}/pymes`)}>
              {t("cta3")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}