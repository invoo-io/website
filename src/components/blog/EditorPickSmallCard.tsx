import Link from 'next/link'
import Image from 'next/image'
import type { BlogPostMetadata } from '@/types/blog'

interface EditorPickSmallCardProps {
  post: BlogPostMetadata
  locale: string
}

export function EditorPickSmallCard({ post, locale }: EditorPickSmallCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.category}/${post.slug}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2 rounded-[16px]"
      aria-label={`Leer artículo: ${post.title}`}
    >
      <article className="flex gap-4 p-4 bg-bg-secondary rounded-[16px] hover:shadow-md transition-shadow h-full">
        {/* Thumbnail */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-[12px] overflow-hidden bg-bg-tertiary">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={`Imagen de portada del artículo: ${post.title}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20 flex items-center justify-center"
              aria-hidden="true"
              role="presentation"
            >
              <span className="text-2xl font-bold text-label-tertiary/30">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Category label */}
          <div className="mb-2">
            <span className="text-caption2 text-label-secondary uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-body-emphasized text-label mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-caption1 text-label-secondary line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
