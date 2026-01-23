interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
  id?: string;
}

/**
 * Renders JSON-LD structured data as a script tag.
 *
 * This component properly renders JSON-LD schemas in both development and
 * production builds. Global schemas (Organization, WebSite) are rendered in
 * the root layout, while page-specific schemas are rendered within their
 * respective page components.
 *
 * Note: Placing JSON-LD scripts in body is valid and recommended by Google.
 * They can appear anywhere in the HTML document.
 */
export function JsonLd({ data, id = "json-ld" }: JsonLdProps) {
  const jsonString = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      id={id}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
