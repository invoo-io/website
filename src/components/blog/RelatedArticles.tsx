'use client'

import { useTranslations } from 'next-intl'
import type { BlogPostMetadata } from '@/types/blog'
import { ArticleCard } from './ArticleCard'

interface RelatedArticlesProps {
  posts: BlogPostMetadata[]
  locale: string
}

export function RelatedArticles({ posts, locale }: RelatedArticlesProps) {
  const t = useTranslations('blog')

  // Don't render if there are no related posts
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16 bg-background-secondary">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-title1-emphasized text-label-primary mb-8">
          {t('relatedArticles')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <ArticleCard
              key={`${post.category}-${post.slug}`}
              post={post}
              locale={locale}
              translations={{
                readArticle: t('article.readArticle', { title: post.title }),
                coverImageAlt: t('article.coverImageAlt', { title: post.title }),
                publishedOn: t('article.publishedOn'),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
