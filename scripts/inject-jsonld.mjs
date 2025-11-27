/**
 * Post-build script to inject JSON-LD structured data into static HTML files.
 *
 * This script runs after `npm run build` to add JSON-LD schemas to the <head>
 * of all generated HTML pages. This approach is necessary because Next.js 15
 * static export with client components can cause a "bailout" that prevents
 * inline scripts from being pre-rendered.
 *
 * Usage: node scripts/inject-jsonld.mjs
 */

import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "https://invoo.es";
const OUT_DIR = join(__dirname, "..", "out");

// Organization schema - appears on all pages
function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Invoo",
    legalName: "Roques OU",
    url: BASE_URL,
    logo: `${BASE_URL}/images/invoo-logo.png`,
    email: "legal@invoo.es",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ahtri tn 12",
      postalCode: "15551",
      addressLocality: "Tallinn",
      addressCountry: "EE",
    },
    areaServed: {
      "@type": "Country",
      name: "Spain",
    },
    sameAs: [
      "https://twitter.com/invoo_es",
      "https://www.linkedin.com/company/invoo",
    ],
  };
}

// WebSite schema - appears on all pages
function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Invoo",
    url: BASE_URL,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: ["es", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/es/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Global schemas to inject into all pages
const globalSchemas = [generateOrganizationSchema(), generateWebSiteSchema()];

/**
 * Recursively find all HTML files in a directory
 */
async function findHtmlFiles(dir, files = []) {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      await findHtmlFiles(fullPath, files);
    } else if (entry.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Inject JSON-LD script into HTML content
 * Always injects global schemas even if page-specific JSON-LD exists
 */
function injectJsonLd(html, schemas) {
  const globalJsonLdId = "global-json-ld";
  const jsonLdScript = `<script id="${globalJsonLdId}" type="application/ld+json">${JSON.stringify(schemas)}</script>`;

  // Check if our global JSON-LD already exists (from previous build)
  if (html.includes(`id="${globalJsonLdId}"`)) {
    console.log("  - Global JSON-LD already present, skipping");
    return html;
  }

  // Insert before </head>
  if (html.includes("</head>")) {
    return html.replace("</head>", `${jsonLdScript}\n</head>`);
  }

  // Fallback: insert after opening <body> tag
  const bodyMatch = html.match(/<body[^>]*>/);
  if (bodyMatch) {
    return html.replace(bodyMatch[0], `${bodyMatch[0]}\n${jsonLdScript}`);
  }

  console.log("  - Warning: Could not find insertion point");
  return html;
}

/**
 * Main execution
 */
async function main() {
  console.log("JSON-LD Injection Script");
  console.log("========================");
  console.log(`Output directory: ${OUT_DIR}`);
  console.log("");

  try {
    const htmlFiles = await findHtmlFiles(OUT_DIR);
    console.log(`Found ${htmlFiles.length} HTML files`);
    console.log("");

    let injectedCount = 0;

    for (const file of htmlFiles) {
      const relativePath = file.replace(OUT_DIR, "");
      console.log(`Processing: ${relativePath}`);

      const html = await readFile(file, "utf-8");
      const modifiedHtml = injectJsonLd(html, globalSchemas);

      if (modifiedHtml !== html) {
        await writeFile(file, modifiedHtml, "utf-8");
        console.log("  - Injected JSON-LD successfully");
        injectedCount++;
      }
    }

    console.log("");
    console.log(`Done! Injected JSON-LD into ${injectedCount} files.`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
