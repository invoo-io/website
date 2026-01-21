"use client";

import { useTranslations } from "next-intl";
import { BookOpen, ExternalLink } from "lucide-react";
import type { Source } from "@/types/blog";

interface ArticleSourcesProps {
  sources: Source[];
  lastVerified?: string;
}

export function ArticleSources({ sources, lastVerified }: ArticleSourcesProps) {
  const t = useTranslations("blog.sources");

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={t("title")}
      className="bg-background-secondary rounded-[16px] p-6 mt-8 mb-8 border border-border-primary"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-accent-blue-main rounded-full">
          <BookOpen className="w-4 h-4 text-system-grey100" />
        </div>
        <h3 className="text-headline text-label-primary">
          {t("title")}
        </h3>
      </div>

      {/* Sources List */}
      <ul className="space-y-3">
        {sources.map((source) => (
          <li
            key={source.name}
            className="flex items-start gap-3"
          >
            <span className="flex-shrink-0 w-1.5 h-1.5 bg-accent-blue-main rounded-full mt-2" />
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subheadline text-accent-blue-main hover:underline flex items-center gap-1.5 group"
              >
                <span>{source.name}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <span className="text-subheadline text-label-secondary">
                {source.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Last Verified */}
      {lastVerified && (
        <p className="text-caption1 text-label-tertiary mt-4 pt-4 border-t border-border-primary">
          {t("lastVerified", { date: lastVerified })}
        </p>
      )}
    </section>
  );
}
