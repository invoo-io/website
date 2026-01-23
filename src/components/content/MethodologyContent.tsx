import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen, CheckCircle, RefreshCw, FileText, Scale, AlertCircle } from "lucide-react";

interface MethodologyContentProps {
  locale: string;
}

export default async function MethodologyContent({ locale }: MethodologyContentProps) {
  const t = await getTranslations({ locale, namespace: "methodology" });

  const renderParagraphs = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="text-body text-secondary mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const sources = [
    {
      icon: <FileText className="w-5 h-5 text-accent-blue-main" />,
      name: "AEAT",
      description: t("sources.aeat"),
      url: "https://sede.agenciatributaria.gob.es"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-accent-blue-main" />,
      name: "BOE",
      description: t("sources.boe"),
      url: "https://www.boe.es"
    },
    {
      icon: <Scale className="w-5 h-5 text-accent-blue-main" />,
      name: "Seguridad Social",
      description: t("sources.seguridadSocial"),
      url: "https://www.seg-social.es"
    },
    {
      icon: <FileText className="w-5 h-5 text-accent-blue-main" />,
      name: t("sources.autonomicTitle"),
      description: t("sources.autonomic"),
    }
  ];

  const process = [
    {
      icon: <BookOpen className="w-6 h-6 text-accent-blue-main" />,
      title: t("process.research.title"),
      description: t("process.research.description")
    },
    {
      icon: <FileText className="w-6 h-6 text-accent-purple-main" />,
      title: t("process.writing.title"),
      description: t("process.writing.description")
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-accent-green-main" />,
      title: t("process.verification.title"),
      description: t("process.verification.description")
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-accent-orange-main" />,
      title: t("process.update.title"),
      description: t("process.update.description")
    }
  ];

  const commitments = [
    t("commitment.items.accuracy"),
    t("commitment.items.sources"),
    t("commitment.items.dates"),
    t("commitment.items.updates")
  ];

  return (
    <section className="flex items-center justify-center px-6 mb-32 mt-16">
      <div className="max-w-4xl w-full flex flex-col gap-16 text-left">

        {/* Block 1: How we create content */}
        <div>
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block1.title")}
            marginBottom="lg"
          />
          <div className="mb-8">
            {renderParagraphs(t("block1.description"))}
          </div>

          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-background-secondary rounded-[16px] p-6 border border-border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background-tertiary flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-title3-emphasized text-primary mb-2">
                      {step.title}
                    </h4>
                    <p className="text-callout text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2: Our sources */}
        <div>
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block2.title")}
            marginBottom="lg"
          />
          <div className="mb-8">
            {renderParagraphs(t("block2.description"))}
          </div>

          {/* Sources list */}
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-background-secondary rounded-[12px] border border-border-primary"
              >
                <div className="flex-shrink-0 mt-1">
                  {source.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-body-emphasized text-primary">
                      {source.name}
                    </h4>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-footnote text-accent-blue-main hover:underline"
                      >
                        {source.url.replace('https://', '')}
                      </a>
                    )}
                  </div>
                  <p className="text-callout text-secondary">
                    {source.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3: Our commitment */}
        <div>
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block3.title")}
            marginBottom="lg"
          />
          <div className="mb-8">
            {renderParagraphs(t("block3.description"))}
          </div>

          {/* Commitment items */}
          <div className="bg-background-secondary rounded-[16px] p-6 border border-border-primary">
            <ul className="space-y-4">
              {commitments.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-green-main flex-shrink-0 mt-0.5" />
                  <span className="text-body text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Block 4: Limitations */}
        <div>
          <SectionHeader
            size="subsection"
            align="left"
            title={t("block4.title")}
            marginBottom="md"
          />
          <div className="bg-accent-orange-subtle/10 rounded-[16px] p-6 border border-accent-orange-main/20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-accent-orange-main flex-shrink-0 mt-1" />
              <div>
                {renderParagraphs(t("block4.description"))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
