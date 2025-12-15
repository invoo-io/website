import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ArticleCard } from './ArticleCard'
import type { BlogPostMetadata } from '@/types/blog'

interface CategoryBlockProps {
  categoryName: string
  categorySlug: string
  posts: BlogPostMetadata[]
  locale: string
}

export async function CategoryBlock({ categoryName, categorySlug, posts, locale }: CategoryBlockProps) {
  // Only show if we have posts
  if (posts.length === 0) {
    return null
  }

  // Limit to 3 articles per category block
  const displayPosts = posts.slice(0, 3)

  // Get translations
  const articleT = await getTranslations({ locale })
  const blogT = await getTranslations({ locale })

  return (
    <section className="w-full mb-24" aria-labelledby={`category-${categoryName}`}>
      {/* Category Title and View All Button */}
      <div className="flex items-center justify-between mb-8">
        <h2
          id={`category-${categoryName}`}
          className="text-title1-emphasized text-label"
        >
          {categoryName}
        </h2>
        <Link
          href={`/${locale}/blog/${categorySlug}`}
          className="flex items-center gap-2 text-callout-emphasized text-accent-blue-main hover:text-accent-blue-dark transition-colors"
        >
          {blogT('blog.viewAll')}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Articles Grid - 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => {
          // Format translations with the specific post data
          const translations = {
            readArticle: articleT('blog.article.readArticle', { title: post.title }),
            coverImageAlt: articleT('blog.article.coverImageAlt', { title: post.title }),
            publishedOn: articleT('blog.article.publishedOn')
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
