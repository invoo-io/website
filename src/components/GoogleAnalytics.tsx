"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

// Extend Window interface to include gtag and ga-disable property
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_KEY = "cookieConsent";

function getConsentStatus(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

// Delete GA cookies when consent is rejected (GDPR compliance)
function deleteGACookies(): void {
  const cookies = document.cookie.split(";");
  const gaCookiePrefixes = ["_ga", "_gid", "_gat"];

  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    if (gaCookiePrefixes.some(prefix => name.startsWith(prefix))) {
      // Delete cookie by setting expiry in the past
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      // Also try without domain for cookies set without domain attribute
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
  }
}

// Dynamically load GA scripts
function loadGAScripts(measurementId: string, onLoad: () => void): void {
  // Check if already loaded
  if (window.gtag) {
    onLoad();
    return;
  }

  // Load gtag.js script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  script.onload = () => {
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag as Window["gtag"];
    gtag("js", new Date());
    gtag("config", measurementId, {
      page_path: window.location.pathname,
    });
    onLoad();
  };
  document.head.appendChild(script);
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [shouldRenderScripts, setShouldRenderScripts] = useState(false);
  const hasInitialized = useRef(false);

  // Check consent status on mount
  useEffect(() => {
    const consent = getConsentStatus();
    const isAccepted = consent === "accepted";
    setHasConsent(isAccepted);

    // If user already has consent on mount, render scripts
    if (isAccepted && process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID) {
      setShouldRenderScripts(true);
    }
  }, [GA_MEASUREMENT_ID]);

  // Listen for consent changes
  const handleConsentChange = useCallback((event: CustomEvent<{ status: string }>) => {
    const newStatus = event.detail.status;
    const isAccepted = newStatus === "accepted";
    setHasConsent(isAccepted);

    // If consent was rejected, disable GA and delete cookies
    if (newStatus === "rejected" && GA_MEASUREMENT_ID) {
      // Set the ga-disable property to opt out of GA tracking
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      // Delete existing GA cookies for GDPR compliance
      deleteGACookies();
    }

    // If consent was accepted, load GA dynamically (only in production)
    if (isAccepted && GA_MEASUREMENT_ID && process.env.NODE_ENV === "production") {
      // Remove the disable flag if it was set
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

      // Load scripts dynamically if not already loaded
      if (!scriptsLoaded && !hasInitialized.current) {
        hasInitialized.current = true;
        loadGAScripts(GA_MEASUREMENT_ID, () => {
          setScriptsLoaded(true);
        });
      }
    }
  }, [GA_MEASUREMENT_ID, scriptsLoaded]);

  useEffect(() => {
    window.addEventListener("cookieConsentChanged", handleConsentChange as EventListener);

    return () => {
      window.removeEventListener("cookieConsentChanged", handleConsentChange as EventListener);
    };
  }, [handleConsentChange]);

  // Track page views on route change (only if consent given and scripts loaded)
  useEffect(() => {
    if (!window.gtag || !GA_MEASUREMENT_ID || !hasConsent || !scriptsLoaded) return;

    // Use window.location.search instead of useSearchParams to avoid static export bailout
    const search = typeof window !== "undefined" ? window.location.search : "";
    const url = pathname + search;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, GA_MEASUREMENT_ID, hasConsent, scriptsLoaded]);

  // Only render scripts in production, if measurement ID exists, and consent is given on initial load
  if (
    process.env.NODE_ENV !== "production" ||
    !GA_MEASUREMENT_ID ||
    !shouldRenderScripts
  ) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => setScriptsLoaded(true)}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
