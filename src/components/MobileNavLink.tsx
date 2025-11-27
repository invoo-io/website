"use client";

import Link from "next/link";
import { ReactNode } from "react";

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
      className={`block text-primary hover:text-primary rounded-lg transition-all text-subheadline text-center px-5 py-3 ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--background-tertiary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </Link>
  );
}
