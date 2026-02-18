"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Facebook, Mail } from "lucide-react";
import BackButton from "./BackButton";

interface ArticleHeaderProps {
  post: {
    title: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    coverImage?: string;
  };
  category: {
    name: string;
    slug: string;
  };
  locale: string;
  backButtonLabel: string;
  backButtonAriaLabel: string;
}

export default function ArticleHeader({
  post,
  category,
  locale,
  backButtonLabel,
  backButtonAriaLabel,
}: ArticleHeaderProps) {
  const [shareLinks, setShareLinks] = useState({
    twitter: "#",
    linkedin: "#",
    facebook: "#",
    email: "#",
  });

  // Set share URLs after component mounts to avoid hydration mismatch
  useEffect(() => {
    const shareUrl = window.location.href;
    const shareTitle = encodeURIComponent(post.title);

    setShareLinks({
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${shareUrl}`,
      email: `mailto:?subject=${shareTitle}&body=${shareUrl}`,
    });
  }, [post.title]);

  return (
    <header className="w-full bg-background-secondary pt-28">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 lg:gap-12">
        {/* Left Column - Metadata */}
        <div className="flex flex-col justify-center">
          {/* Back Button */}
          <div className="mb-4">
            <BackButton
              locale={locale}
              categorySlug={category.slug}
              label={backButtonLabel}
              ariaLabel={backButtonAriaLabel}
            />
          </div>

          {/* Title */}
          <h1 className="text-large-title-emphasized text-primary mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-body text-secondary">
            {post.excerpt}
          </p>

          {/* Category & Date */}
          <div className="flex items-center gap-2 mb-4  mt-4 text-footnote">
            <Link
              href={`/${locale}/blog/${category.slug}/`}
              className="text-accent-blue-main hover:text-accent-blue-dark transition-colors duration-200"
            >
              {category.name}
            </Link>
            <span className="text-tertiary">•</span>
            <time
              dateTime={post.publishedAt}
              className="text-secondary"
            >
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

        </div>


        {/* Right Column - Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video lg:aspect-[4/3] rounded-xxl overflow-hidden bg-background-secondary">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        </div>

        {/* Social Share Icons - Mobile */}
        <div className="flex lg:hidden items-center gap-4 mt-6 pt-6 border-t border-border-primary">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-tertiary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir en Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-tertiary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir en LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-tertiary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir en Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={shareLinks.email}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background-tertiary hover:bg-accent-blue-main hover:text-system-grey100 text-secondary transition-all duration-200"
            aria-label="Compartir por email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
