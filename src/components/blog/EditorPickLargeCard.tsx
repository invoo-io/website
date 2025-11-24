import Link from 'next/link'
import Image from 'next/image'
import type { BlogPostMetadata } from '@/types/blog'

interface EditorPickLargeCardProps {
  post: BlogPostMetadata
  locale: string
}

export function EditorPickLargeCard({ post, locale }: EditorPickLargeCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.category}/${post.slug}`}
      className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2 rounded-[24px]"
      aria-label={`Leer artículo: ${post.title}`}
    >
      <article className="flex flex-col h-full bg-bg-secondary rounded-[24px] overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] bg-bg-tertiary">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={`Imagen de portada del artículo: ${post.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20 flex items-center justify-center"
              aria-hidden="true"
              role="presentation"
            >
              <span className="text-6xl font-bold text-label-tertiary/30">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Category label */}
          <div className="mb-3">
            <span className="text-caption1 text-label-secondary uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-title2-emphasized text-label mb-3 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-body text-label-secondary line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
