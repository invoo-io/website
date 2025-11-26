"use client";

import { useTranslations } from "next-intl";

export default function PrivacyContent() {
  const t = useTranslations("privacy");

  const renderParagraphs = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="text-text-secondary leading-relaxed mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const renderList = (items: string[]) => {
    return (
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-text-secondary leading-relaxed flex">
            <span className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="min-h-screen bg-bg-primary py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-text-primary mb-6">{t("title")}</h1>
        <p className="text-sm text-text-secondary mb-12">
          {t("lastUpdated")}
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <div>
            <p className="text-text-secondary leading-relaxed">{t("intro")}</p>
          </div>

          {/* Data Controller */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("controller.title")}</h2>
            <p className="text-text-secondary mb-4">{t("controller.content")}</p>
            <div className="p-4 bg-bg-secondary rounded-lg">
              {renderParagraphs(t("controller.details"))}
            </div>
          </div>

          {/* Data We Process */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("dataWeProcess.title")}</h2>
            <p className="text-text-secondary mb-6">{t("dataWeProcess.intro")}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">{t("dataWeProcess.registration.title")}</h3>
                <p className="text-text-secondary">{t("dataWeProcess.registration.content")}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">{t("dataWeProcess.platformUsage.title")}</h3>
                <p className="text-text-secondary mb-4">{t("dataWeProcess.platformUsage.intro")}</p>
                {renderList(t.raw("dataWeProcess.platformUsage.items"))}
                <p className="text-text-secondary mt-4 italic">{t("dataWeProcess.platformUsage.note")}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">{t("dataWeProcess.technical.title")}</h3>
                <p className="text-text-secondary">{t("dataWeProcess.technical.content")}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">{t("dataWeProcess.cookies.title")}</h3>
                <p className="text-text-secondary">{t("dataWeProcess.cookies.content")}</p>
              </div>
            </div>
          </div>

          {/* Purposes of Processing */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("purposes.title")}</h2>
            <p className="text-text-secondary mb-4">{t("purposes.intro")}</p>
            {renderList(t.raw("purposes.items"))}
          </div>

          {/* Legal Basis for Processing */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("legalBasis.title")}</h2>
            <p className="text-text-secondary mb-4">{t("legalBasis.intro")}</p>
            {renderList(t.raw("legalBasis.items"))}
          </div>

          {/* Disclosure of Data to Third Parties */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("dataSharing.title")}</h2>
            <p className="text-text-secondary mb-4">{t("dataSharing.intro")}</p>
            {renderList(t.raw("dataSharing.items"))}
            <p className="text-text-secondary mt-4 italic">{t("dataSharing.note")}</p>
          </div>

          {/* International Transfers */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("internationalTransfers.title")}</h2>
            <p className="text-text-secondary">{t("internationalTransfers.content")}</p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("retention.title")}</h2>
            <p className="text-text-secondary mb-4">{t("retention.content")}</p>
            <p className="text-text-secondary">{t("retention.cookies")}</p>
          </div>

          {/* User Rights */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("userRights.title")}</h2>
            <p className="text-text-secondary mb-4">{t("userRights.intro")}</p>
            {renderList(t.raw("userRights.items"))}
            <p className="text-text-secondary mt-6">{t("userRights.contact")}</p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("security.title")}</h2>
            <p className="text-text-secondary">{t("security.content")}</p>
          </div>

          {/* Third-Party Data Entered by User */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("thirdPartyData.title")}</h2>
            <p className="text-text-secondary">{t("thirdPartyData.content")}</p>
          </div>

          {/* Policy Updates */}
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-6">{t("updates.title")}</h2>
            <p className="text-text-secondary">{t("updates.content")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
