import Link from 'next/link'
import Image from 'next/image'
import type { BlogPostMetadata } from '@/types/blog'

interface ArticleCardProps {
  post: BlogPostMetadata
  locale: string
  categoryDisplayName?: string
  translations: {
    readArticle: string
    coverImageAlt: string
    publishedOn: string
  }
}

export function ArticleCard({ post, locale, categoryDisplayName, translations }: ArticleCardProps) {
  // Locale mapping for date formatting
  const localeMap: Record<string, string> = {
    'es': 'es-ES',
    'en': 'en-US'
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(localeMap[locale] || 'es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      href={`/${locale}/blog/${post.category}/${post.slug}`}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2"
      aria-label={translations.readArticle}
    >
      <article className="flex flex-col h-full">
        {/* Article Image */}
        <div className="relative w-full aspect-[16/9] bg-background-tertiary rounded-[16px] overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={translations.coverImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20 flex items-center justify-center"
              aria-hidden="true"
              role="presentation"
            >
              <span className="text-6xl font-bold text-tertiary/30">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="flex-1 mt-4 flex flex-col">
          {/* Category Badge and Read Time */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-caption1 text-secondary tracking-wide">
              {categoryDisplayName || post.category}
            </span>
            {post.readingTime && (
              <span className="text-caption2 text-secondary">
                {post.readingTime} min
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-title3-emphasized text-label mb-3 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-body text-secondary line-clamp-3 flex-1 mb-4">
            {post.excerpt}
          </p>

        </div>
      </article>
    </Link>
  )
}
