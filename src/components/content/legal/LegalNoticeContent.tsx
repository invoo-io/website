"use client";

import { useTranslations } from "next-intl";

export default function LegalNoticeContent() {
  const t = useTranslations("legalNotice");

  const renderParagraphs = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-secondary leading-relaxed mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const renderList = (items: string[]) => {
    return (
      <ul className="space-y-2 list-disc list-inside ml-4">
        {items.map((item, index) => (
          <li key={index} className="text-secondary leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section aria-labelledby="legal-notice-title" className="min-h-screen bg-background-primary py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 id="legal-notice-title" className="text-5xl font-bold text-primary mb-6">{t("title")}</h1>
        <p className="text-sm text-secondary mb-12">
          {t("lastUpdated")}
        </p>

        <div className="space-y-12">
          {/* Website Owner */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("owner.title")}</h2>
            {renderParagraphs(t("owner.content"))}
          </div>

          {/* Purpose and Scope */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("scope.title")}</h2>
            {renderParagraphs(t("scope.content"))}
          </div>

          {/* Proper Use */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("properUse.title")}</h2>
            {renderParagraphs(t("properUse.content"))}
          </div>

          {/* Data Accuracy */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("dataAccuracy.title")}</h2>
            {renderParagraphs(t("dataAccuracy.content"))}
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("intellectualProperty.title")}</h2>
            {renderParagraphs(t("intellectualProperty.content"))}
          </div>

          {/* Website Availability */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("availability.title")}</h2>
            {renderParagraphs(t("availability.content"))}
          </div>

          {/* Third-Party Links */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("thirdPartyLinks.title")}</h2>
            {renderParagraphs(t("thirdPartyLinks.content"))}
          </div>

          {/* Disclaimer */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("disclaimer.title")}</h2>
            <p className="text-secondary mb-4">{t("disclaimer.intro")}</p>
            {renderList(t.raw("disclaimer.items"))}
            <p className="text-secondary mt-4">{t("disclaimer.conclusion")}</p>
          </div>

          {/* Personal Data Protection */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("dataProtection.title")}</h2>
            {renderParagraphs(t("dataProtection.content"))}
          </div>

          {/* Modifications */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("modifications.title")}</h2>
            {renderParagraphs(t("modifications.content"))}
          </div>

          {/* Applicable Law and Jurisdiction */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("jurisdiction.title")}</h2>
            {renderParagraphs(t("jurisdiction.content"))}
          </div>
        </div>
      </div>
    </section>
  );
}
