import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMetadata, Category } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Validate slug format to prevent path traversal attacks
 * Only allows lowercase letters, numbers, and hyphens
 */
function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Get all blog categories with their metadata
 */
export function getAllCategories(): Category[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  try {
    const categories = fs.readdirSync(BLOG_DIR).filter((item) => {
      const itemPath = path.join(BLOG_DIR, item);
      try {
        return fs.statSync(itemPath).isDirectory();
      } catch (error) {
        console.error(`Error checking directory ${item}:`, error);
        return false;
      }
    });

    return categories.map((categorySlug) => {
      const categoryPath = path.join(BLOG_DIR, categorySlug, "_category.json");

      if (!fs.existsSync(categoryPath)) {
        return {
          slug: categorySlug,
          name: categorySlug,
          description: "",
        };
      }

      try {
        const categoryData = JSON.parse(fs.readFileSync(categoryPath, "utf-8"));
        return {
          slug: categorySlug,
          ...categoryData,
        };
      } catch (error) {
        console.error(`Error parsing category ${categorySlug}:`, error);
        return {
          slug: categorySlug,
          name: categorySlug,
          description: "",
        };
      }
    });
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

/**
 * Get all blog posts from all categories
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  try {
    const categories = fs.readdirSync(BLOG_DIR).filter((item) => {
      const itemPath = path.join(BLOG_DIR, item);
      try {
        return fs.statSync(itemPath).isDirectory();
      } catch (error) {
        console.error(`Error checking directory ${item}:`, error);
        return false;
      }
    });

    const posts: BlogPost[] = [];

    categories.forEach((category) => {
      const categoryPath = path.join(BLOG_DIR, category);

      try {
        const files = fs
          .readdirSync(categoryPath)
          .filter(
            (file) =>
              (file.endsWith(".md") || file.endsWith(".mdx")) &&
              !file.startsWith("_")
          );

        files.forEach((file) => {
          const filePath = path.join(categoryPath, file);

          try {
            const fileContents = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContents);

            posts.push({
              slug: file.replace(/\.mdx?$/, ""),
              category,
              title: data.title || "",
              excerpt: data.excerpt || "",
              publishedAt: data.publishedAt || new Date().toISOString(),
              updatedAt: data.updatedAt,
              author: data.author || "Invoo Team",
              coverImage: data.coverImage,
              tags: data.tags || [],
              readingTime: data.readingTime,
              featured: data.featured || false,
              editorPick: data.editorPick || false,
              keyTakeaways: data.keyTakeaways,
              faq: data.faq,
              content,
            });
          } catch (error) {
            console.error(`Error parsing blog post ${category}/${file}:`, error);
          }
        });
      } catch (error) {
        console.error(`Error reading category ${category}:`, error);
      }
    });

    // Sort by publication date (newest first)
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

/**
 * Get blog posts filtered by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

/**
 * Get a single blog post by category and slug
 */
export function getBlogPost(
  category: string,
  slug: string
): BlogPost | null {
  // Validate slugs to prevent path traversal attacks
  if (!isValidSlug(category) || !isValidSlug(slug)) {
    console.error(
      `Invalid slug format: category="${category}", slug="${slug}"`
    );
    return null;
  }

  try {
    const filePath = path.join(BLOG_DIR, category, `${slug}.mdx`);
    const fallbackPath = path.join(BLOG_DIR, category, `${slug}.md`);

    let targetPath: string | null = null;

    if (fs.existsSync(filePath)) {
      targetPath = filePath;
    } else if (fs.existsSync(fallbackPath)) {
      targetPath = fallbackPath;
    }

    if (!targetPath) {
      return null;
    }

    try {
      const fileContents = fs.readFileSync(targetPath, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        category,
        title: data.title || "",
        excerpt: data.excerpt || "",
        publishedAt: data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt,
        author: data.author || "Invoo Team",
        coverImage: data.coverImage,
        tags: data.tags || [],
        readingTime: data.readingTime,
        featured: data.featured || false,
        editorPick: data.editorPick || false,
        keyTakeaways: data.keyTakeaways,
        faq: data.faq,
        content,
      };
    } catch (error) {
      console.error(`Error reading blog post ${category}/${slug}:`, error);
      return null;
    }
  } catch (error) {
    console.error(`Error accessing blog post ${category}/${slug}:`, error);
    return null;
  }
}

/**
 * Get blog post metadata without content (useful for listing pages)
 * Optimized to not read content body, only frontmatter
 */
export function getAllBlogPostsMetadata(): BlogPostMetadata[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  try {
    const categories = fs.readdirSync(BLOG_DIR).filter((item) => {
      const itemPath = path.join(BLOG_DIR, item);
      try {
        return fs.statSync(itemPath).isDirectory();
      } catch (error) {
        console.error(`Error checking directory ${item}:`, error);
        return false;
      }
    });

    const posts: BlogPostMetadata[] = [];

    categories.forEach((category) => {
      const categoryPath = path.join(BLOG_DIR, category);

      try {
        const files = fs
          .readdirSync(categoryPath)
          .filter(
            (file) =>
              (file.endsWith(".md") || file.endsWith(".mdx")) &&
              !file.startsWith("_")
          );

        files.forEach((file) => {
          const filePath = path.join(categoryPath, file);

          try {
            const fileContents = fs.readFileSync(filePath, "utf-8");
            // Only parse frontmatter, skip content parsing for better performance
            const { data } = matter(fileContents, { excerpt: false });

            posts.push({
              slug: file.replace(/\.mdx?$/, ""),
              category,
              title: data.title || "",
              excerpt: data.excerpt || "",
              publishedAt: data.publishedAt || new Date().toISOString(),
              updatedAt: data.updatedAt,
              author: data.author || "Invoo Team",
              coverImage: data.coverImage,
              tags: data.tags || [],
              readingTime: data.readingTime,
              featured: data.featured || false,
              editorPick: data.editorPick || false,
              keyTakeaways: data.keyTakeaways,
              faq: data.faq,
            });
          } catch (error) {
            console.error(
              `Error parsing blog post metadata ${category}/${file}:`,
              error
            );
          }
        });
      } catch (error) {
        console.error(`Error reading category ${category}:`, error);
      }
    });

    // Sort by publication date (newest first)
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts metadata:", error);
    return [];
  }
}

/**
 * Get blog post metadata by category without content
 * Optimized to filter metadata instead of full posts
 */
export function getBlogPostsMetadataByCategory(
  category: string
): BlogPostMetadata[] {
  return getAllBlogPostsMetadata().filter((post) => post.category === category);
}

/**
 * Get featured blog posts metadata
 * Returns posts marked as featured, sorted by publication date
 */
export function getFeaturedBlogPostsMetadata(): BlogPostMetadata[] {
  return getAllBlogPostsMetadata().filter((post) => post.featured === true);
}

/**
 * Get editor pick blog posts metadata
 * Returns posts marked as editor picks, sorted by publication date
 */
export function getEditorPickBlogPostsMetadata(): BlogPostMetadata[] {
  return getAllBlogPostsMetadata().filter((post) => post.editorPick === true);
}
