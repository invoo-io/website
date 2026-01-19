import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BASE_URL } from "@/lib/constants";
import { getAllCategories } from "@/lib/blog";

export const dynamic = "force-static";

// Static pages that exist for both locales
const staticPages = [
  "",
  "/about",
  "/contact",
  "/faq",
  "/pricing",
  "/privacy",
  "/terms",
  "/cookies",
  "/legal-notice",
  "/freelancers",
  "/pymes",
  "/gestorias",
  "/metodologia",
];

// Calculator pages with localized URLs
const calculatorPages = [
  { es: "/herramientas/calculadoras/iva", en: "/tools/calculators/vat" },
  { es: "/herramientas/calculadoras/cuota-autonomos", en: "/tools/calculators/self-employed-quota" },
  { es: "/herramientas/calculadoras/factura", en: "/tools/calculators/invoice" },
  { es: "/herramientas/calculadoras/irpf-autonomos", en: "/tools/calculators/income-tax-freelancer" },
  { es: "/herramientas/calculadoras/sueldo-neto-autonomo", en: "/tools/calculators/net-salary-freelancer" },
  { es: "/herramientas/calculadoras/precio-hora", en: "/tools/calculators/hourly-rate" },
  { es: "/herramientas/calculadoras/modelo-303", en: "/tools/calculators/vat-return" },
  { es: "/herramientas/calculadoras/modelo-130", en: "/tools/calculators/form-130" },
  { es: "/herramientas/calculadoras/gastos-deducibles", en: "/tools/calculators/deductible-expenses" },
  { es: "/herramientas/calculadoras/autonomo-vs-empresa", en: "/tools/calculators/freelancer-vs-company" },
];

function getBlogArticles(): { slug: string; category: string; lastModified?: Date }[] {
  const articles: { slug: string; category: string; lastModified?: Date }[] = [];
  const contentDir = path.join(process.cwd(), "content/blog");
  const categories = getAllCategories();

  for (const cat of categories) {
    const categoryPath = path.join(contentDir, cat.slug);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const filePath = path.join(categoryPath, file);

      try {
        const stat = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(content);

        // Only include published articles
        if (data.draft === true) continue;

        articles.push({
          slug: file.replace(".md", ""),
          category: cat.slug,
          lastModified: data.date ? new Date(data.date) : stat.mtime,
        });
      } catch (error) {
        console.error(`[sitemap] Error parsing blog file ${filePath}:`, error);
        continue;
      }
    }
  }

  return articles;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "es"];
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for both locales
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}/`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  // Blog articles (Spanish only)
  const articles = getBlogArticles();

  // Blog index and categories (Spanish only)
  // Only include categories that have at least one article
  entries.push({
    url: `${BASE_URL}/es/blog/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  const categories = getAllCategories();
  const categoriesWithArticles = new Set(articles.map((a) => a.category));
  for (const cat of categories) {
    // Skip empty categories to avoid thin content in sitemap
    if (!categoriesWithArticles.has(cat.slug)) continue;
    entries.push({
      url: `${BASE_URL}/es/blog/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const article of articles) {
    entries.push({
      url: `${BASE_URL}/es/blog/${article.category}/${article.slug}/`,
      lastModified: article.lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Calculator hub pages (both locales with localized URLs)
  entries.push({
    url: `${BASE_URL}/es/herramientas/calculadoras/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  });
  entries.push({
    url: `${BASE_URL}/en/tools/calculators/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  });

  // Calculator pages (both locales with localized URLs)
  for (const calc of calculatorPages) {
    entries.push({
      url: `${BASE_URL}/es${calc.es}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    entries.push({
      url: `${BASE_URL}/en${calc.en}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
