"use client";

import { useState, useEffect } from "react";
import { Twitter, Linkedin, Facebook, Mail } from "lucide-react";
import TableOfContents from "./TableOfContents";

interface ArticleSidebarProps {
  content: string;
  title: string;
}

export default function ArticleSidebar({ content, title }: ArticleSidebarProps) {
  const [shareLinks, setShareLinks] = useState({
    twitter: "#",
    linkedin: "#",
    facebook: "#",
    email: "#",
  });

  // Set share URLs after component mounts to avoid hydration mismatch
  useEffect(() => {
    const shareUrl = window.location.href;
    const shareTitle = encodeURIComponent(title);

    setShareLinks({
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${shareUrl}`,
      email: `mailto:?subject=${shareTitle}&body=${shareUrl}`,
    });
  }, [title]);

  return (
    <aside className="sticky top-24 space-y-8 mt-8">
      {/* Social Share Section */}
      <div className="bg-background-secondary rounded-xxl p-6 border border-border-primary">
        <h3 className="text-callout font-semibold text-primary mb-4">
          Compartir artículo
        </h3>
        <div className="flex items-center gap-3">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-primary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir en Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-primary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir en LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-primary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir en Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.email}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-primary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir por email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-background-secondary rounded-xxl p-6 border border-border-primary">
        <TableOfContents content={content} />
      </div>
    </aside>
  );
}
