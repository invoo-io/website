import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMetadata, Category } from "@/types/blog";
import {
  featuredArticles,
  editorPickArticles,
  type ArticleReference,
} from "@/config/blog-featured";

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

            // Skip draft posts
            if (data.draft === true) {
              return;
            }

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
              draft: data.draft || false,
              keyTakeaways: data.keyTakeaways,
              faq: data.faq,
              sources: data.sources,
              lastVerified: data.lastVerified,
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
        sources: data.sources,
        lastVerified: data.lastVerified,
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

            // Skip draft posts
            if (data.draft === true) {
              return;
            }

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
              draft: data.draft || false,
              keyTakeaways: data.keyTakeaways,
              faq: data.faq,
              sources: data.sources,
              lastVerified: data.lastVerified,
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
 * Helper to resolve article references to actual posts with validation
 */
function resolveArticleReferences(
  refs: ArticleReference[],
  allPosts: BlogPostMetadata[],
  configName: string
): BlogPostMetadata[] {
  const posts: BlogPostMetadata[] = [];

  for (const ref of refs) {
    const post = allPosts.find(
      (p) => p.category === ref.category && p.slug === ref.slug
    );

    if (post) {
      posts.push(post);
    } else if (process.env.NODE_ENV === "development") {
      console.warn(
        `[${configName}] Article not found: ${ref.category}/${ref.slug}`
      );
    }
  }

  return posts;
}

/**
 * Get featured blog posts metadata
 * Returns posts from the featuredArticles config in exact order specified
 * @param allPosts - Optional pre-fetched posts to avoid duplicate filesystem reads
 */
export function getFeaturedBlogPostsMetadata(
  allPosts?: BlogPostMetadata[]
): BlogPostMetadata[] {
  const posts = allPosts ?? getAllBlogPostsMetadata();
  return resolveArticleReferences(featuredArticles, posts, "featuredArticles");
}

/**
 * Get editor pick blog posts metadata
 * Returns posts from the editorPickArticles config in exact order specified
 * Automatically excludes articles that are already in featuredArticles
 * @param allPosts - Optional pre-fetched posts to avoid duplicate filesystem reads
 */
export function getEditorPickBlogPostsMetadata(
  allPosts?: BlogPostMetadata[]
): BlogPostMetadata[] {
  const posts = allPosts ?? getAllBlogPostsMetadata();

  // Filter out articles that are already in featured to prevent duplicates
  const nonFeaturedRefs = editorPickArticles.filter(
    (ref) =>
      !featuredArticles.some(
        (feat) => feat.category === ref.category && feat.slug === ref.slug
      )
  );

  return resolveArticleReferences(nonFeaturedRefs, posts, "editorPickArticles");
}

/**
 * Get related blog posts based on category and tag similarity
 * Returns posts most relevant to the current post, excluding the current post itself
 */
export function getRelatedBlogPosts(
  currentPost: BlogPostMetadata,
  limit: number = 3
): BlogPostMetadata[] {
  const allPosts = getAllBlogPostsMetadata();

  // Exclude the current post (keep if slug OR category differs)
  const otherPosts = allPosts.filter(
    (post) =>
      post.slug !== currentPost.slug || post.category !== currentPost.category
  );

  // Pre-compute values used in scoring loop
  const now = Date.now();
  const msPerDay = 1000 * 60 * 60 * 24;
  const currentTags = (currentPost.tags || []).map((t) => t.toLowerCase());

  // Calculate relevance score for each post
  const postsWithScore = otherPosts.map((post) => {
    let score = 0;

    // Same category: +10 points
    if (post.category === currentPost.category) {
      score += 10;
    }

    // Calculate shared tags (case-insensitive)
    const postTags = (post.tags || []).map((t) => t.toLowerCase());
    const sharedTagsCount = currentTags.filter((tag) =>
      postTags.includes(tag)
    ).length;

    // Each shared tag: +5 points
    score += sharedTagsCount * 5;

    // Featured bonus: +3 points
    if (post.featured) {
      score += 3;
    }

    // Editor pick bonus: +2 points
    if (post.editorPick) {
      score += 2;
    }

    // Recency bonus: more recent posts get slight priority
    const daysDiff = (now - new Date(post.publishedAt).getTime()) / msPerDay;
    if (daysDiff < 30) {
      score += 1;
    } else if (daysDiff < 60) {
      score += 0.5;
    }

    return { post, score };
  });

  // Sort by score (highest first), then by publication date (newest first)
  const sortedPosts = postsWithScore.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (
      new Date(b.post.publishedAt).getTime() -
      new Date(a.post.publishedAt).getTime()
    );
  });

  // Return top N posts
  return sortedPosts.slice(0, limit).map((item) => item.post);
}
