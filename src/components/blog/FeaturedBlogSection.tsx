import dynamic from 'next/dynamic'
import { getFeaturedBlogPostsMetadata } from '@/lib/blog'
import GradientText from '@/components/ui/GradientText'

const BlogCarousel = dynamic(
  () => import('./BlogCarousel').then(mod => mod.BlogCarousel),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-accent-blue-main border-t-transparent rounded-full" />
      </div>
    ),
    ssr: true // Keep SSR for SEO
  }
)

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
    <section className="relative w-full py-16 md:py-24 bg-background-primary overflow-hidden">
      {/* Background decoration using radial gradients (no blur filter for mobile perf) */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,125,254,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(121,51,255,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-title1-emphasized md:text-large-title-emphasized mb-4">
            <GradientText>{title}</GradientText>
          </h2>
          <p className="text-body text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Carousel */}
        <BlogCarousel posts={featuredPosts} locale={locale} />
      </div>
    </section>
  )
}
