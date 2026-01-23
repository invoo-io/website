"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  href: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export default function MobileNavLink({
  href,
  onClick,
  children,
  className = "",
  external = false,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "block rounded-lg transition-all duration-200",
        "text-callout text-secondary hover:text-primary",
        "px-4 py-3 text-left",
        "hover:bg-fill-tertiary/50 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </Link>
  );
}
