import { getFeaturedBlogPostsMetadata } from '@/lib/blog'
import { BlogCarousel } from './BlogCarousel'
import GradientText from '@/components/ui/GradientText'

interface FeaturedBlogSectionProps {
  locale: string
  title?: string
  subtitle?: string
}

export function FeaturedBlogSection({
  locale,
  title = 'Featured Articles',
  subtitle = 'Explore our latest insights on invoicing, compliance, and business management',
}: FeaturedBlogSectionProps) {
  const featuredPosts = getFeaturedBlogPostsMetadata()

  // Don't render if no featured posts
  if (featuredPosts.length === 0) {
    return null
  }

  return (
    <section className="relative w-full py-16 md:py-24 bg-bg-primary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue-main opacity-5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-purple-main opacity-5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-title1-emphasized md:text-large-title-emphasized text-label-inverted mb-4">
            <GradientText>{title}</GradientText>
          </h2>
          <p className="text-body text-label-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <BlogCarousel posts={featuredPosts} locale={locale} />
      </div>
    </section>
  )
}
