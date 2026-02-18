import Link from 'next/link'
import Image from 'next/image'
import type { BlogPostMetadata } from '@/types/blog'

interface FeaturedArticleCardProps {
  post: BlogPostMetadata
  locale: string
}

export function FeaturedArticleCard({ post, locale }: FeaturedArticleCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.category}/${post.slug}/`}
      className="block"
      aria-label={`Read article: ${post.title}`}
    >
      <article className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Left side: Image (3/4 columns) */}
        <div className="lg:col-span-3 relative rounded-[24px] overflow-hidden bg-background-secondary aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:min-h-[500px]">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20 flex items-center justify-center">
              <span className="text-6xl md:text-8xl font-bold text-tertiary/20">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Right side: Content (1/4 column) */}
        <div className="lg:col-span-1 flex flex-col justify-between py-4">
          <div>
            {/* Article metadata tag */}
            <div className="mb-4">
              <span className="text-caption1 text-secondary tracking-wide">
                Article - {post.readingTime ? `${post.readingTime} min read` : 'Quick read'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-title1-emphasized text-label mb-4">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-body text-secondary mb-6 line-clamp-3">
              {post.excerpt}
            </p>
          </div>

        </div>
      </article>
    </Link>
  )
}
