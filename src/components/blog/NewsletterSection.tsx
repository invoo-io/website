import Image from "next/image";
import { useTranslations } from "next-intl";
import NewsletterForm from "./NewsletterForm";
import { getImagePath } from "@/lib/utils";

export default function NewsletterSection() {
  const t = useTranslations("blog.newsletter");

  return (
    <section style={{
      position: 'relative',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '164px 24px',
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0
      }}>
        <Image
          src={getImagePath("/focussectionbgimg.jpg")}
          alt="Background"
          fill
          style={{
            objectFit: 'cover'
          }}
          priority
        />
        {/* Black overlay with opacity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: '.6'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h2 className="text-large-title-emphasized text-system-grey100 mb-6" style={{ fontSize: '48px' }}>
          {t("title")}
        </h2>

        <p className="text-callout mb-12" style={{ color: 'var(--system-grey100)' }}>
          {t("description")}
        </p>

        <div className="flex justify-center">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
