"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface DropdownItem {
  name: string;
  href: string;
  external?: boolean;
  code?: string;
}

interface NavDropdownProps {
  id: string;
  label: string | ReactNode;
  items: DropdownItem[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  align?: "left" | "right";
  minWidth?: string;
  icon?: ReactNode;
}

export default function NavDropdown({
  label,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  align = "left",
  minWidth = "200px",
  icon,
}: NavDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="flex items-center gap-1.5 text-text-primary hover:text-text-secondary transition-colors text-callout">
        {icon}
        <span>{label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full pt-3 ${align === "right" ? "right-0" : "left-0"}`}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{
              minWidth,
              backgroundColor: "var(--background-secondary)",
              backdropFilter: "blur(20px)",
              animation: "slideDown 0.2s ease-out",
            }}
          >
            {items.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`relative block px-6 py-3 text-callout text-text-secondary hover:text-text-primary transition-all no-underline whitespace-nowrap ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === items.length - 1 ? "rounded-b-xl" : ""}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--background-tertiary)";
                e.currentTarget.style.color = "var(--label-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--label-secondary)";
              }}
            >
              {item.name}
            </Link>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
