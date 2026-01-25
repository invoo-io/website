'use client';

import { useTranslations } from 'next-intl';
import GradientText from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrecioHoraCalculator } from '@/components/calculators/PrecioHoraCalculator';
import { HeroGlow } from '@/components/ui/HeroGlow';

/**
 * PrecioHoraCalculatorPageContent - Calculator component for hourly rate page
 * Only contains Hero + Calculator. All other sections are server components in route page.
 */
export function PrecioHoraCalculatorPageContent() {
  const t = useTranslations('calculators.precioHora');

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 md:px-6 py-60 max-md:py-32 overflow-hidden">
        <HeroGlow />
        <SectionHeader
          size="hero"
          align="center"
          title={
            <>
              <GradientText>{t('hero.titleHighlight')}</GradientText>
              <span className="text-primary"> {t('hero.titleEnd')}</span>
            </>
          }
          description={t('hero.description')}
          marginBottom="none"
          descriptionClassName="max-w-2xl"
        />
      </section>

      {/* Calculator Section */}
      <section className="px-4 md:px-6 pb-16">
        <PrecioHoraCalculator />
      </section>
    </>
  );
}
