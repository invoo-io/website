import { EditorPickLargeCard } from './EditorPickLargeCard'
import { EditorPickSmallCard } from './EditorPickSmallCard'
import type { BlogPostMetadata } from '@/types/blog'

interface EditorPicksSectionProps {
  posts: BlogPostMetadata[]
  locale: string
  title: string
}

export function EditorPicksSection({ posts, locale, title }: EditorPicksSectionProps) {
  // Need at least 4 posts to show the full layout
  if (posts.length < 4) {
    return null
  }

  const [largePost, ...smallPosts] = posts.slice(0, 4)

  return (
    <section className="w-full" aria-labelledby="editor-picks-title">
      {/* Title */}
      <h2
        id="editor-picks-title"
        className="text-title1-emphasized text-label mb-8"
      >
        {title}
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Large featured article */}
        <div className="w-full">
          <EditorPickLargeCard post={largePost} locale={locale} />
        </div>

        {/* Right: 3 small articles stacked */}
        <div className="flex flex-col gap-4">
          {smallPosts.map((post) => (
            <EditorPickSmallCard
              key={`${post.category}-${post.slug}`}
              post={post}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
