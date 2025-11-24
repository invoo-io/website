"use client";

import { useTranslations } from "next-intl";

export default function AboutContent() {
  const t = useTranslations("about");

  const renderParagraphs = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="text-body text-text-secondary mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const renderItemContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div>
        <p className="text-body text-text-primary mb-1">
          {lines[0]}
        </p>
        {lines.slice(1).map((line, index) => (
          <p key={index} className="text-body text-text-secondary">
            {line}
          </p>
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 mb-32 mt-32">
      <div className="max-w-4xl w-full flex flex-col gap-10 text-left">
        {/* Block 1: Born from real experience section */}
        <div className="mb-8">
          <h2 className="text-title1-emphasized text-text-primary mb-6">
            {t("block1.title")}
          </h2>
          <div>
            {renderParagraphs(t("block1.description"))}
          </div>
        </div>

        {/* Block 2: Our vision section */}
        <div className="mb-8">
          <h3 className="text-title1-emphasized text-text-primary mb-6">
            {t("block2.title")}
          </h3>
          <div>
            {renderParagraphs(t("block2.description"))}
          </div>
        </div>

        {/* Block 3: Why Invoo section */}
        <div className="mb-8">
          <h3 className="text-title1-emphasized text-text-primary mb-8">
            {t("block3.title")}
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">🚀</span>
              {renderItemContent(t("block3.items.item1"))}
            </div>
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">🧾</span>
              {renderItemContent(t("block3.items.item2"))}
            </div>
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">🤝</span>
              {renderItemContent(t("block3.items.item3"))}
            </div>
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">💡</span>
              {renderItemContent(t("block3.items.item4"))}
            </div>
          </div>
        </div>

        {/* Block 4: Join us early section */}
        <div className="pt-8">
          <h3 className="text-title1-emphasized text-text-primary mb-6">
            {t("block4.title")}
          </h3>
          <div>
            {renderParagraphs(t("block4.description"))}
          </div>
        </div>
      </div>
    </section>
  );
}