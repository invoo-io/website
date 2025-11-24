export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
}

export interface BlogPostMetadata {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
}
