import Image from "next/image";
import { useTranslations } from "next-intl";
import NewsletterForm from "./NewsletterForm";
import { getImagePath } from "@/lib/utils";

export default function NewsletterSection() {
  const t = useTranslations("blog.newsletter");

  return (
    <section className="relative min-h-[400px] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImagePath("/focussectionbgimg.jpg")}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Black overlay with opacity */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--system-overlay)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl w-full">
        <h2 className="text-large-title-emphasized text-label-inverted mb-6 text-4xl md:text-5xl">
          {t("title")}
        </h2>

        <p
          className="text-callout mb-12"
          style={{ color: "var(--label-secondary-dark)" }}
        >
          {t("description")}
        </p>

        <NewsletterForm />
      </div>
    </section>
  );
}
