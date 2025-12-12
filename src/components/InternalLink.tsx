"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Internal link component that automatically prepends the locale
 * Used for SEO-friendly contextual internal linking
 */
export default function InternalLink({ href, children, className = "text-accent-purple-main hover:underline" }: InternalLinkProps) {
  const params = useParams();
  const locale = params.locale as string;

  // Ensure href starts with /
  const normalizedHref = href.startsWith("/") ? href : `/${href}`;

  return (
    <Link href={`/${locale}${normalizedHref}`} className={className}>
      {children}
    </Link>
  );
}
