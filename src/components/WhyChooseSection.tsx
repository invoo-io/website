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
      description: t("card1.description")
    },
    {
      image: getImagePath("/paper.png"),
      title: t("card2.title"),
      description: t("card2.description")
    },
    {
      image: getImagePath("/personbook.png"),
      title: t("card3.title"),
      description: t("card3.description")
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

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        {features.map((feature, index) => (
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

            {/* Description */}
            <p className="text-body text-secondary max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        {/* Gestoría button with gradient border */}
        <motion.div
          className="gradient-border-wrapper rounded-xl p-[2px] inline-flex"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button variant="outline" showArrow className="!bg-background-secondary !border-0 !text-primary" href={getBasePath(`/${locale}/gestorias`)} disableHoverScale>
            {t("cta1")}
          </Button>
        </motion.div>

        {/* Freelancer button with solid gradient background */}
        <Button variant="gradient" showArrow href={getBasePath(`/${locale}/freelancers`)}>
          {t("cta2")}
        </Button>
      </div>
    </section>
  );
}