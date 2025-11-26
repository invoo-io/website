interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
  id?: string;
}

/**
 * Renders JSON-LD structured data as a script tag.
 *
 * IMPORTANT: This component works in development mode, but due to Next.js 15
 * static export limitations with client components (BAILOUT_TO_CLIENT_SIDE_RENDERING),
 * the global JSON-LD is injected via a post-build script (scripts/inject-jsonld.mjs).
 *
 * This component can still be used for page-specific schemas that are rendered
 * within page components, but for guaranteed inclusion in static HTML output,
 * add schemas to the post-build injection script.
 *
 * Note: Placing JSON-LD scripts in body is valid and recommended by Google.
 * They can appear anywhere in the HTML document.
 */
export function JsonLd({ data, id = "json-ld" }: JsonLdProps) {
  const jsonString = JSON.stringify(data);

  return (
    <script
      id={id}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
