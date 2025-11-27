"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBasePath } from "@/lib/utils";

type ConsentStatus = "accepted" | "rejected" | null;

const CONSENT_KEY = "cookieConsent";
const CONSENT_TIMESTAMP_KEY = "cookieConsentTimestamp";
const CONSENT_EXPIRY_DAYS = 365;

function isConsentExpired(timestamp: string | null): boolean {
  if (!timestamp) return true;

  const consentDate = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24));

  return diffDays >= CONSENT_EXPIRY_DAYS;
}

function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;

  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    const timestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);

    if (!consent || isConsentExpired(timestamp)) {
      return null;
    }

    return consent as ConsentStatus;
  } catch {
    // localStorage unavailable (private browsing, etc.)
    return null;
  }
}

function setConsent(status: "accepted" | "rejected"): void {
  try {
    localStorage.setItem(CONSENT_KEY, status);
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
  } catch {
    // localStorage unavailable - consent will be asked again next visit
    console.warn("Unable to persist cookie consent preference");
  }

  // Always dispatch event even if storage fails
  window.dispatchEvent(new CustomEvent("cookieConsentChanged", { detail: { status } }));
}

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const params = useParams();
  const locale = params.locale as string;

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consent = getStoredConsent();
    setIsVisible(consent === null);
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    setConsent("rejected");
    setIsVisible(false);
  };

  // Don't render anything on the server or if not mounted yet
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label={t("ariaLabel")}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-bg-secondary border border-strokes-primary rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Message */}
          <p className="flex-1 text-callout text-text-secondary">
            {t("message")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
            <button
              onClick={handleReject}
              className="px-5 py-2.5 text-callout-emphasized text-text-secondary border border-strokes-primary rounded-full hover:bg-bg-tertiary hover:text-text-primary transition-colors"
            >
              {t("reject")}
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 text-callout-emphasized text-system-grey100 bg-accent-blue-main rounded-full hover:bg-accent-blue-light transition-colors"
            >
              {t("accept")}
            </button>
            <Link
              href={getBasePath(`/${locale}/cookies`)}
              className="px-5 py-2.5 text-callout-emphasized text-accent-blue-main text-center hover:underline transition-colors"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export utility functions for use in other components
export { getStoredConsent, setConsent, CONSENT_KEY, CONSENT_TIMESTAMP_KEY };
export type { ConsentStatus };
