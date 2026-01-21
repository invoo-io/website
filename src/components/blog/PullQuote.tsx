import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
}

export function PullQuote({ children, author, source }: PullQuoteProps) {
  return (
    <aside
      role="note"
      aria-label="Pull quote"
      className={cn(
        "my-10 p-6",
        "bg-background-secondary border border-border-primary rounded-[16px]",
        "border-l-4 border-l-accent-blue-main",
        "not-prose [&_p]:m-0 [&_p]:text-title3-emphasized [&_p]:italic [&_p]:text-label-primary [&_p]:leading-relaxed"
      )}
    >
      <div className="quote-content">
        {children}
      </div>
      {(author || source) && (
        <div className="mt-4 text-callout text-label-secondary not-italic">
          {author && <span className="text-callout-emphasized">{author}</span>}
          {author && source && <span> — </span>}
          {source && <span>{source}</span>}
        </div>
      )}
    </aside>
  );
}

interface QuoteListProps {
  children: React.ReactNode;
  title?: string;
}

export function QuoteList({ children, title }: QuoteListProps) {
  return (
    <div
      className={cn(
        "not-prose my-8 p-6",
        "bg-background-secondary border border-border-primary rounded-[16px]"
      )}
    >
      {title && (
        <h4 className="text-headline text-label-primary mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-accent-blue-main" aria-hidden="true" />
          {title}
        </h4>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface QuoteItemProps {
  children: React.ReactNode;
}

export function QuoteItem({ children }: QuoteItemProps) {
  return (
    <div className="flex gap-3 text-callout leading-relaxed text-label-primary">
      <span className="text-accent-blue-main flex-shrink-0 mt-0.5 text-xl leading-none" aria-hidden="true">&ldquo;</span>
      <span>{children}</span>
    </div>
  );
}
