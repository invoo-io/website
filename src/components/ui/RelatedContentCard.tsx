import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Base props shared by both variants
interface BaseProps {
  title: string
  description: string
  href: string
  className?: string
}

// Article variant props
interface ArticleVariantProps extends BaseProps {
  variant: 'article'
  coverImage?: string
  category: string
  categoryDisplayName?: string
  readingTime?: number
}

// Calculator variant props
interface CalculatorVariantProps extends BaseProps {
  variant: 'calculator'
  icon: React.ReactNode
  category?: string // Default: "Calculadora"
}

// Discriminated union
type RelatedContentCardProps = ArticleVariantProps | CalculatorVariantProps

export function RelatedContentCard(props: RelatedContentCardProps) {
  const { title, description, href, className, variant } = props

  return (
    <Link
      href={href}
      className={cn(
        'group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-main focus-visible:ring-offset-2',
        className
      )}
    >
      <article className="flex flex-col h-full">
        {/* Top: Image or Icon area */}
        <div className="relative w-full aspect-[16/9] bg-background-tertiary rounded-[16px] overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.02]">
          {variant === 'article' ? (
            // Article variant: image or fallback
            props.coverImage ? (
              <Image
                src={props.coverImage}
                alt={`${title} cover image`}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/20 to-accent-purple-main/20 flex items-center justify-center"
                aria-hidden="true"
                role="presentation"
              >
                <span className="text-6xl font-bold text-tertiary/30 transition-transform duration-300 ease-out group-hover:scale-110">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            )
          ) : (
            // Calculator variant: icon with gradient background
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue-main/10 to-accent-purple-main/10 flex items-center justify-center">
              <div className="w-12 h-12 text-accent-blue-main transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden="true">
                {props.icon}
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Content */}
        <div className="flex-1 mt-4 flex flex-col">
          {/* Category Badge and Reading Time (article only) */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-caption1 text-secondary tracking-wide">
              {variant === 'article'
                ? props.categoryDisplayName || props.category
                : props.category || 'Calculadora'}
            </span>
            {variant === 'article' && props.readingTime && (
              <span className="text-caption2 text-secondary">
                {props.readingTime} min
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-title3-emphasized text-label mb-3 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-body text-secondary line-clamp-3 flex-1 mb-4">
            {description}
          </p>
        </div>
      </article>
    </Link>
  )
}

// Related Content Grid Wrapper
interface RelatedContentGridProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function RelatedContentGrid({ title, children, className }: RelatedContentGridProps) {
  // Generate a slug from the title for the aria-labelledby ID
  const headingId = title.toLowerCase().replace(/\s+/g, '-') + '-heading'

  return (
    <section
      aria-labelledby={headingId}
      className={cn('py-12 md:py-16 bg-background-secondary', className)}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 id={headingId} className="text-title1-emphasized text-label-primary mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {children}
        </div>
      </div>
    </section>
  )
}
