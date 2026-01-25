"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  getStoredConsent,
  setConsent,
  type ConsentStatus,
} from "@/components/utilities/CookieBanner";

export default function CookiePolicyContent() {
  const t = useTranslations("cookiePolicy");
  const tBanner = useTranslations("cookieBanner");

  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Listen for consent changes from the banner
  const handleConsentChange = useCallback((event: CustomEvent<{ status: string }>) => {
    setConsentStatus(event.detail.status as ConsentStatus);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setConsentStatus(getStoredConsent());

    // Listen for changes from the cookie banner
    window.addEventListener("cookieConsentChanged", handleConsentChange as EventListener);

    return () => {
      window.removeEventListener("cookieConsentChanged", handleConsentChange as EventListener);
    };
  }, [handleConsentChange]);

  const handleAccept = () => {
    setConsent("accepted");
    setConsentStatus("accepted");
  };

  const handleReject = () => {
    setConsent("rejected");
    setConsentStatus("rejected");
  };

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

  const getStatusText = () => {
    if (!isMounted) return "";
    if (consentStatus === "accepted") return tBanner("consentStatus.accepted");
    if (consentStatus === "rejected") return tBanner("consentStatus.rejected");
    return tBanner("consentStatus.notSet");
  };

  const getStatusColor = () => {
    if (consentStatus === "accepted") return "text-green-500";
    if (consentStatus === "rejected") return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <section aria-labelledby="cookie-policy-title" className="min-h-screen bg-background-primary pt-40 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 id="cookie-policy-title" className="text-5xl font-bold text-primary mb-6">{t("title")}</h1>
        <p className="text-sm text-secondary mb-12">
          {t("lastUpdated")}
        </p>

        {/* Cookie Consent Status Section */}
        {isMounted && (
          <div className="mb-12 p-6 bg-background-secondary rounded-2xl border border-strokes-primary">
            <h2 className="text-xl font-semibold text-primary mb-4">
              {tBanner("yourPreferences")}
            </h2>
            <p className={`text-callout font-medium mb-4 ${getStatusColor()}`}>
              {getStatusText()}
            </p>
            <p className="text-secondary text-sm mb-6">
              {tBanner("changePreference")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReject}
                className={`px-5 py-2.5 text-callout-emphasized rounded-full transition-colors ${
                  consentStatus === "rejected"
                    ? "bg-red-500/20 text-red-500 border border-red-500"
                    : "text-secondary border border-strokes-primary hover:bg-background-tertiary hover:text-primary"
                }`}
              >
                {tBanner("reject")}
              </button>
              <button
                onClick={handleAccept}
                className={`px-5 py-2.5 text-callout-emphasized rounded-full transition-colors ${
                  consentStatus === "accepted"
                    ? "bg-accent-green-main text-system-grey100"
                    : "bg-accent-blue-main text-system-grey100 hover:bg-accent-blue-light"
                }`}
              >
                {tBanner("accept")}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-12">
          {/* Intro */}
          <div>
            {renderParagraphs(t("intro"))}
          </div>

          {/* What are cookies */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("whatAreCookies.title")}</h2>
            {renderParagraphs(t("whatAreCookies.content"))}
          </div>

          {/* Types of cookies */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("cookieTypes.title")}</h2>
            {renderParagraphs(t("cookieTypes.intro"))}

            {/* Technical cookies */}
            <h3 className="text-xl font-semibold text-primary mt-8 mb-4">{t("cookieTypes.technical.title")}</h3>
            {renderParagraphs(t("cookieTypes.technical.content"))}

            {/* Preference cookies */}
            <h3 className="text-xl font-semibold text-primary mt-8 mb-4">{t("cookieTypes.preferences.title")}</h3>
            {renderParagraphs(t("cookieTypes.preferences.content"))}

            {/* Analytics cookies */}
            <h3 className="text-xl font-semibold text-primary mt-8 mb-4">{t("cookieTypes.analytics.title")}</h3>
            {renderParagraphs(t("cookieTypes.analytics.content"))}

            {/* Third-party cookies */}
            <h3 className="text-xl font-semibold text-primary mt-8 mb-4">{t("cookieTypes.thirdParty.title")}</h3>
            {renderParagraphs(t("cookieTypes.thirdParty.content"))}
          </div>

          {/* Specific cookies used */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("specificCookies.title")}</h2>
            {renderParagraphs(t("specificCookies.intro"))}

            {/* Technical */}
            <h3 className="text-xl font-semibold text-primary mt-8 mb-4">{t("specificCookies.technical.title")}</h3>
            {renderParagraphs(t("specificCookies.technical.content"))}

            {/* Analytics */}
            <h3 className="text-xl font-semibold text-primary mt-8 mb-4">{t("specificCookies.analytics.title")}</h3>
            {renderParagraphs(t("specificCookies.analytics.content"))}
            <p className="text-secondary mt-4">
              {t("specificCookies.analytics.googleLink")}{" "}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-primary hover:underline"
              >
                https://policies.google.com/privacy
              </Link>
            </p>
          </div>

          {/* How to manage cookies */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("manageCookies.title")}</h2>
            {renderParagraphs(t("manageCookies.intro"))}
            {renderList(t.raw("manageCookies.options"))}
            {renderParagraphs(t("manageCookies.changeSettings"))}
            {renderParagraphs(t("manageCookies.browserSettings"))}
            <ul className="space-y-2 list-disc list-inside ml-4 mt-4">
              <li className="text-secondary leading-relaxed">
                Chrome:{" "}
                <Link
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-primary hover:underline"
                >
                  https://support.google.com/chrome/answer/95647
                </Link>
              </li>
              <li className="text-secondary leading-relaxed">
                Firefox:{" "}
                <Link
                  href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-primary hover:underline"
                >
                  https://support.mozilla.org/es/kb/Borrar%20cookies
                </Link>
              </li>
              <li className="text-secondary leading-relaxed">
                Safari:{" "}
                <Link
                  href="https://support.apple.com/kb/ph21411"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-primary hover:underline"
                >
                  https://support.apple.com/kb/ph21411
                </Link>
              </li>
              <li className="text-secondary leading-relaxed">
                Edge:{" "}
                <Link
                  href="https://support.microsoft.com/es-es/help/4027947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-primary hover:underline"
                >
                  https://support.microsoft.com/es-es/help/4027947
                </Link>
              </li>
            </ul>
            <p className="text-secondary mt-4">{t("manageCookies.warning")}</p>
          </div>

          {/* Legal basis */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("legalBasis.title")}</h2>
            {renderParagraphs(t("legalBasis.content"))}
          </div>

          {/* International transfers */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("internationalTransfers.title")}</h2>
            {renderParagraphs(t("internationalTransfers.content"))}
          </div>

          {/* Data retention */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("retention.title")}</h2>
            {renderParagraphs(t("retention.content"))}
          </div>

          {/* User rights */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("userRights.title")}</h2>
            {renderParagraphs(t("userRights.content"))}
          </div>

          {/* Policy modifications */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("modifications.title")}</h2>
            {renderParagraphs(t("modifications.content"))}
          </div>
        </div>
      </div>
    </section>
  );
}
