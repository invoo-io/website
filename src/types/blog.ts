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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Source {
  name: string;
  url?: string;
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
  featured?: boolean;
  editorPick?: boolean;
  draft?: boolean;
  keyTakeaways?: string[];
  faq?: FAQItem[];
  sources?: Source[];
  lastVerified?: string;
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
  featured?: boolean;
  editorPick?: boolean;
  draft?: boolean;
  keyTakeaways?: string[];
  faq?: FAQItem[];
  sources?: Source[];
  lastVerified?: string;
}
