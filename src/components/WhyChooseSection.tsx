"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Button from "./ui/Button";
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
    <section className="py-[156px] max-md:py-10 px-6 bg-bg-secondary">
      {/* Title */}
      <h2 className="text-large-title-emphasized text-center text-text-primary max-w-4xl mx-auto mb-16" style={{ fontSize: '48px' }}>
        {t("title")}
      </h2>

      {/* Features Grid */}
      <div className="grid gap-6 max-w-5xl mx-auto mb-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-bg-secondary rounded-3xl p-8">
            {/* Image */}
            <div className="mb-6">
              <Image
                src={feature.image}
                alt={feature.title}
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Title */}
            <h3 className="text-title2-emphasized text-text-primary mb-3">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-body text-text-secondary max-w-xs">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Gestoría button with gradient border */}
        <motion.div
          style={{
            background: 'linear-gradient(94.28deg, var(--accent-blue-main) 3.12%, var(--accent-purple-main) 95.84%)',
            borderRadius: '12px',
            padding: '2px',
            display: 'inline-flex'
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button variant="outline" showArrow className="!bg-bg-secondary !border-0 !text-text-primary" href={getBasePath(`/${locale}/gestorias`)} disableHoverScale>
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