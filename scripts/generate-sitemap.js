const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BASE_URL = 'https://invoo.es';

// Static pages that exist for both locales
const staticPages = [
  '',
  '/about',
  '/contact',
  '/faq',
  '/pricing',
  '/privacy',
  '/terms',
  '/cookies',
  '/legal-notice',
  '/freelancers',
  '/pymes',
  '/gestorias',
];

// Blog is Spanish-only
const blogCategories = ['guias', 'consejos', 'analisis', 'comparaciones'];

function getBlogArticles() {
  const articles = [];
  const contentDir = path.join(__dirname, '../content/blog');

  for (const category of blogCategories) {
    const categoryPath = path.join(contentDir, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const filePath = path.join(categoryPath, file);

      try {
        const stat = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);

        // Only include published articles
        if (data.draft === true) continue;

        articles.push({
          slug: file.replace('.md', ''),
          category,
          lastModified: data.date ? new Date(data.date) : stat.mtime,
        });
      } catch (error) {
        console.error(`Error parsing blog file ${filePath}:`, error);
        continue;
      }
    }
  }

  return articles;
}

function generateSitemap() {
  const locales = ['en', 'es'];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages for both locales
  for (const locale of locales) {
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${locale}${page}/</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  // Blog index (Spanish only)
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/es/blog/</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;

  // Blog categories (Spanish only)
  for (const category of blogCategories) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/es/blog/${category}/</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // Blog articles (Spanish only)
  const articles = getBlogArticles();
  for (const article of articles) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/es/blog/${article.category}/${article.slug}/</loc>\n`;
    xml += `    <lastmod>${article.lastModified.toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += '</urlset>';

  // Write to public directory (will be copied to out/ during static export)
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);

  console.log(`✅ Sitemap generated successfully with ${articles.length + staticPages.length * 2 + blogCategories.length + 1} URLs`);
  console.log(`   - ${staticPages.length * 2} static pages (${staticPages.length} × 2 locales)`);
  console.log(`   - 1 blog index`);
  console.log(`   - ${blogCategories.length} blog categories`);
  console.log(`   - ${articles.length} blog articles`);
  console.log(`   → Total: ${articles.length + staticPages.length * 2 + blogCategories.length + 1} URLs`);
  console.log(`   → Saved to: ${outputPath}`);
}

try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
