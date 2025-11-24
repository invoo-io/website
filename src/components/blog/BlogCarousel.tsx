'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { FeaturedArticleCard } from './FeaturedArticleCard'
import type { BlogPostMetadata } from '@/types/blog'

interface BlogCarouselProps {
  posts: BlogPostMetadata[]
  locale: string
}

export function BlogCarousel({ posts, locale }: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="relative w-full" role="region" aria-label="Featured articles carousel">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef} aria-live="polite">
        <div className="flex gap-6 md:gap-8">
          {posts.map((post) => (
            <div
              key={`${post.category}-${post.slug}`}
              className="flex-[0_0_100%] min-w-0"
              role="group"
              aria-roledescription="slide"
            >
              <FeaturedArticleCard post={post} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-3 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 cursor-pointer',
                index === selectedIndex
                  ? 'bg-accent-blue-main w-8'
                  : 'bg-label-tertiary w-2 hover:bg-label-secondary'
              )}
              aria-label={`Go to slide ${index + 1} of ${scrollSnaps.length}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
