"use client";

import { ReactNode } from "react";

interface MobileNavButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export default function MobileNavButton({
  onClick,
  children,
  className = "",
}: MobileNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-text-primary rounded-lg transition-colors px-6 py-4 flex items-center justify-center ${className}`}
      style={{
        backgroundColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--background-tertiary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </button>
  );
}
