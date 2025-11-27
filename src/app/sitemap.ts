import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BASE_URL } from "@/lib/constants";

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
  "/gestorias",
  "/verifactu",
];

// Blog is Spanish-only
const blogCategories = ["guias", "consejos", "analisis"];

function getBlogArticles(): { slug: string; category: string; lastModified?: Date }[] {
  const articles: { slug: string; category: string; lastModified?: Date }[] = [];
  const contentDir = path.join(process.cwd(), "content/blog");

  for (const category of blogCategories) {
    const categoryPath = path.join(contentDir, category);
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
          category,
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

  // Blog index and categories (Spanish only)
  entries.push({
    url: `${BASE_URL}/es/blog/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  for (const category of blogCategories) {
    entries.push({
      url: `${BASE_URL}/es/blog/${category}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Blog articles (Spanish only)
  const articles = getBlogArticles();
  for (const article of articles) {
    entries.push({
      url: `${BASE_URL}/es/blog/${article.category}/${article.slug}/`,
      lastModified: article.lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
