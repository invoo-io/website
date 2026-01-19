"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SectionHeader } from "./ui/SectionHeader";
import { BookOpen, CheckCircle, FileText } from "lucide-react";
import { getBasePath } from "@/lib/utils";

export default function AboutContent() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = params.locale as string;

  const renderParagraphs = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="text-body text-secondary mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const renderItemContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div>
        <p className="text-body text-primary mb-1">
          {lines[0]}
        </p>
        {lines.slice(1).map((line, index) => (
          <p key={index} className="text-body text-secondary">
            {line}
          </p>
        ))}
      </div>
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 mb-32 mt-32">
      <div className="max-w-4xl w-full flex flex-col gap-10 text-left">
        {/* Block 1: Born from real experience section */}
        <div className="mb-8">
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block1.title")}
            marginBottom="md"
          />
          <div>
            {renderParagraphs(t("block1.description"))}
          </div>
        </div>

        {/* Block 2: Our vision section */}
        <div className="mb-8">
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block2.title")}
            marginBottom="md"
          />
          <div>
            {renderParagraphs(t("block2.description"))}
          </div>
        </div>

        {/* Block 3: Why Invoo section */}
        <div className="mb-8">
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block3.title")}
            marginBottom="lg"
          />
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">🚀</span>
              {renderItemContent(t("block3.items.item1"))}
            </div>
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">🧾</span>
              {renderItemContent(t("block3.items.item2"))}
            </div>
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">🤝</span>
              {renderItemContent(t("block3.items.item3"))}
            </div>
            <div className="flex items-start gap-4">
              <span className="text-body mt-1">💡</span>
              {renderItemContent(t("block3.items.item4"))}
            </div>
          </div>
        </div>

        {/* Block 4: Join us early section */}
        <div className="pt-8">
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block4.title")}
            marginBottom="md"
          />
          <div>
            {renderParagraphs(t("block4.description"))}
          </div>
        </div>

        {/* Block 5: Editorial approach section */}
        <div className="pt-8 mt-8 border-t border-border-primary">
          <SectionHeader
            size="subsection"
            align="left"
            title={t("editorial.title")}
            marginBottom="md"
          />
          <div className="mb-6">
            {renderParagraphs(t("editorial.description"))}
          </div>

          {/* Editorial highlights */}
          <div className="bg-background-secondary rounded-[16px] p-6 border border-border-primary mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-accent-blue-main flex-shrink-0 mt-1" />
                <div>
                  <p className="text-body-emphasized text-primary mb-1">{t("editorial.sources.title")}</p>
                  <p className="text-callout text-secondary">{t("editorial.sources.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent-green-main flex-shrink-0 mt-1" />
                <div>
                  <p className="text-body-emphasized text-primary mb-1">{t("editorial.verification.title")}</p>
                  <p className="text-callout text-secondary">{t("editorial.verification.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-accent-purple-main flex-shrink-0 mt-1" />
                <div>
                  <p className="text-body-emphasized text-primary mb-1">{t("editorial.updates.title")}</p>
                  <p className="text-callout text-secondary">{t("editorial.updates.description")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Link to full methodology */}
          <Link
            href={getBasePath(`/${locale}/metodologia`)}
            className="inline-flex items-center gap-2 text-accent-blue-main hover:text-accent-blue-hover transition-colors text-body-emphasized"
          >
            {t("editorial.cta")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}