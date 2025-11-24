import { getTranslations } from 'next-intl/server'
import { ArticleCard } from './ArticleCard'
import type { BlogPostMetadata } from '@/types/blog'

interface CategoryBlockProps {
  categoryName: string
  posts: BlogPostMetadata[]
  locale: string
}

export async function CategoryBlock({ categoryName, posts, locale }: CategoryBlockProps) {
  // Only show if we have posts
  if (posts.length === 0) {
    return null
  }

  // Limit to 3 articles per category block
  const displayPosts = posts.slice(0, 3)

  // Get translations for ArticleCard
  const t = await getTranslations({ locale, namespace: 'blog.article' })

  return (
    <section className="w-full mb-16" aria-labelledby={`category-${categoryName}`}>
      {/* Category Title */}
      <h2
        id={`category-${categoryName}`}
        className="text-title1-emphasized text-label mb-8"
      >
        {categoryName}
      </h2>

      {/* Articles Grid - 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => {
          // Format translations with the specific post data
          const translations = {
            readArticle: t('readArticle', { title: post.title }),
            coverImageAlt: t('coverImageAlt', { title: post.title }),
            publishedOn: t('publishedOn')
          }

          return (
            <ArticleCard
              key={`${post.category}-${post.slug}`}
              post={post}
              locale={locale}
              categoryDisplayName={categoryName}
              translations={translations}
            />
          )
        })}
      </div>
    </section>
  )
}
