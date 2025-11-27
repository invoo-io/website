"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Heading {
  text: string;
  id: string;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);

  // Extract H2 headings from markdown content
  useEffect(() => {
    const h2Pattern = /^## (.+)$/gm;
    const matches = content.matchAll(h2Pattern);
    const extractedHeadings: Heading[] = [];

    for (const match of matches) {
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      extractedHeadings.push({ text, id });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  // Track scroll position to highlight active section
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="space-y-4 ">
      <h3 className="text-callout font-semibold text-primary">
        En este artículo
      </h3>
      <ul className="space-y-2">
        {headings.map(({ text, id }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`block text-footnote py-1.5 px-3 rounded-lg transition-all duration-200 ${
                activeId === id
                  ? "bg-accent-blue-main text-system-grey100 font-medium"
                  : "text-secondary hover:bg-background-secondary hover:text-primary"
              }`}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
