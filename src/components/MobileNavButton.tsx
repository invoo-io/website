"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "relative w-full text-primary rounded-xl transition-all duration-200",
        "px-5 py-4 flex items-center justify-start text-body-emphasized",
        "bg-transparent hover:bg-fill-tertiary/50 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </button>
  );
}
