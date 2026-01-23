"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return skeleton that matches button structure to prevent layout shift
    return (
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full"
        role="button"
        aria-hidden="true"
      >
        <Sun className="w-5 h-5 opacity-0" />
      </div>
    );
  }

  const isDark = theme === "dark";
  const ariaLabel = isDark ? t('themeToggleLightMode') : t('themeToggleDarkMode');

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center text-primary hover:text-secondary transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary active:scale-95"
      aria-label={ariaLabel}
      aria-live="polite"
      title={ariaLabel}
    >
      <div
        className={`transition-transform duration-300 ${isDark ? '' : 'rotate-180'}`}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </div>
    </button>
  );
}
