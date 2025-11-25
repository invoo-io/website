"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Button from "@/components/ui/button";

interface DrawerComponentProps {
  triggerText: string;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

export function DrawerComponent({
  triggerText,
  externalOpen,
  onExternalOpenChange
}: DrawerComponentProps) {
  const t = useTranslations("waitlist");
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Use external state if provided, otherwise use internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onExternalOpenChange || setInternalOpen;
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    profile: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "35f97ce5-54ad-4ba5-a88d-8f29ea546366",
          subject: "🎯 Waiting List - " + formData.name,
          name: formData.name,
          email: formData.email,
          message: `Profile: ${formData.profile}. User joined the waiting list.`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", profile: "" });
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
        }, 2000);
      } else {
        setError(t("errors.general"));
      }
    } catch {
      setError(t("errors.failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {triggerText && (
        <DrawerTrigger asChild>
          <Button variant="gradient" showArrow>
            {triggerText}
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent className="bg-bg-inverted text-label-inverted border-strokes-primary/50 flex items-center justify-center">
        <div
          style={{
            maxWidth: "450px",
            margin: "0 auto",
            width: "100%",
            paddingTop: "12px",
            paddingBottom: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-title1-emphasized text-label-inverted" style={{ fontSize: '30px' }}>
              {t("title")}
            </DrawerTitle>
            <DrawerDescription className="text-callout text-label-inverted mt-2">
              {t("description")}
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="px-8 flex flex-col gap-6">
          <div>
            <label className="text-footnote mb-2 block text-label-inverted">{t("form.name")}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="text-footnote w-full rounded outline-none transition-all text-label-inverted"
              style={{
                padding: '11px 14px',
                backgroundColor: 'var(--fills-quaternary-dark)',
                border: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--fills-secondary-dark)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--fills-quaternary-dark)';
              }}
              required
            />
          </div>

          <div>
            <label className="text-footnote mb-2 block text-label-inverted">{t("form.email")}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="text-footnote w-full rounded outline-none transition-all text-label-inverted"
              style={{
                padding: '11px 14px',
                backgroundColor: 'var(--fills-quaternary-dark)',
                border: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--fills-secondary-dark)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--fills-quaternary-dark)';
              }}
              required
            />
          </div>

          <div>
            <label className="text-footnote mb-2 block text-label-inverted">{t("form.profile")}</label>
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="profile"
                  value="Autónomo"
                  checked={formData.profile === 'Autónomo'}
                  onChange={(e) => setFormData({...formData, profile: e.target.value})}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                />
                <span className="text-footnote text-label-inverted">{t("form.profileOptions.autonomo")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="profile"
                  value="Pyme"
                  checked={formData.profile === 'Pyme'}
                  onChange={(e) => setFormData({...formData, profile: e.target.value})}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                />
                <span className="text-footnote text-label-inverted">{t("form.profileOptions.pyme")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="profile"
                  value="Gestoría"
                  checked={formData.profile === 'Gestoría'}
                  onChange={(e) => setFormData({...formData, profile: e.target.value})}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                />
                <span className="text-footnote text-label-inverted">{t("form.profileOptions.gestoria")}</span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            disabled={isLoading}
            className="w-full"
            showArrow
          >
            {isLoading ? t("form.sending") : t("form.submit")}
          </Button>

          {error && (
            <p className="text-accent-red-main text-footnote text-center">{error}</p>
          )}
          {success && (
            <p className="text-accent-green-main text-footnote text-center">{t("success")}</p>
          )}
        </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
