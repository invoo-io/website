"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import validator from "validator";

type SubmissionState = "idle" | "loading" | "success" | "error";

const SUCCESS_MESSAGE_DURATION = 3000;
const REQUEST_TIMEOUT = 10000; // 10 seconds
const SUBMIT_DEBOUNCE_DELAY = 500; // 500ms debounce to prevent spam clicks

export default function NewsletterForm() {
  const t = useTranslations("blog.newsletter");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [validationError, setValidationError] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastSubmitTimeRef = useRef<number>(0);

  // Clear timeout and abort fetch on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    return validator.isEmail(email, {
      allow_utf8_local_part: false,
      require_tld: true,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    // Debounce: Prevent rapid submissions
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTimeRef.current;
    if (timeSinceLastSubmit < SUBMIT_DEBOUNCE_DELAY) {
      // Too fast - ignore this submission
      return;
    }

    // Bot check - honeypot field
    if (honeypot !== "") {
      // Silently pretend to succeed for bots
      setSubmissionState("success");
      setTimeout(() => setSubmissionState("idle"), SUCCESS_MESSAGE_DURATION);
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setValidationError(t("errors.invalidEmail"));
      return;
    }

    // Update last submit time
    lastSubmitTimeRef.current = now;

    // Submit email with visual delay for UX
    setSubmissionState("loading");

    // Create abort controller for timeout
    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(
      () => abortControllerRef.current?.abort(),
      REQUEST_TIMEOUT
    );

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
        signal: abortControllerRef.current.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          setValidationError(t("errors.alreadySubscribed"));
        } else if (response.status === 429) {
          setValidationError(t("errors.tooManyRequests"));
        } else if (response.status === 400) {
          setValidationError(data.error || t("errors.invalidEmail"));
        } else {
          setValidationError(t("errors.generic"));
        }
        setSubmissionState("error");
        return;
      }

      setSubmissionState("success");
      setEmail("");

      // Reset to idle after duration
      timeoutRef.current = setTimeout(() => {
        setSubmissionState("idle");
        timeoutRef.current = null;
      }, SUCCESS_MESSAGE_DURATION);
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        setValidationError(t("errors.timeout"));
      } else {
        setValidationError(t("errors.networkError"));
      }
      setSubmissionState("error");
    }
  };

  const handleRetry = () => {
    setSubmissionState("idle");
    setValidationError("");
  };

  const getButtonContent = () => {
    switch (submissionState) {
      case "loading":
        return (
          <span className="flex items-center justify-center gap-1">
            <span className="sr-only">{t("button.loading")}</span>
            <span className="animate-bounce [animation-delay:0ms]" aria-hidden="true">
              •
            </span>
            <span className="animate-bounce [animation-delay:150ms]" aria-hidden="true">
              •
            </span>
            <span className="animate-bounce [animation-delay:300ms]" aria-hidden="true">
              •
            </span>
          </span>
        );
      case "success":
        return t("button.success");
      case "error":
        return t("button.retry");
      default:
        return t("button.subscribe");
    }
  };

  const getButtonGradientClass = () => {
    switch (submissionState) {
      case "success":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "error":
        return "bg-gradient-to-r from-red-500 to-red-600";
      default:
        return "bg-gradient-to-r from-[#667eea] to-[#764ba2]";
    }
  };

  const isButtonDisabled = submissionState === "loading" || submissionState === "success";

  return (
    <form
      onSubmit={submissionState === "error" ? handleRetry : handleSubmit}
      className="w-full max-w-md mx-auto"
      noValidate
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            className={`w-full px-4 py-3 rounded-lg bg-bg-secondary border ${
              validationError ? "border-red-500" : "border-border-primary"
            } text-label-primary placeholder:text-label-tertiary focus:outline-none focus:ring-2 ${
              validationError ? "focus:ring-red-500" : "focus:ring-tint-blue"
            } transition-colors`}
            disabled={isButtonDisabled}
            aria-label={t("placeholder")}
            aria-invalid={!!validationError}
            aria-describedby={validationError ? "email-error" : undefined}
            required
          />
          {validationError && (
            <div
              id="email-error"
              className="absolute left-0 right-0 top-full mt-2 px-3 py-2 bg-red-500 text-white text-sm rounded-lg shadow-lg z-10 animate-fadeIn"
              role="alert"
            >
              <div className="absolute -top-1 left-4 w-2 h-2 bg-red-500 transform rotate-45" />
              {validationError}
            </div>
          )}
        </div>
        <button
          type={submissionState === "error" ? "button" : "submit"}
          onClick={submissionState === "error" ? handleRetry : undefined}
          disabled={isButtonDisabled}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-white min-w-[120px] ${getButtonGradientClass()}`}
          aria-live="polite"
          aria-atomic="true"
          aria-label={
            submissionState === "loading" ? t("button.loading") : undefined
          }
        >
          {getButtonContent()}
        </button>
      </div>
    </form>
  );
}
