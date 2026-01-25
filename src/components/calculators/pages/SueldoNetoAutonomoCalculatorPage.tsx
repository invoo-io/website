'use client';

import { useTranslations } from 'next-intl';
import GradientText from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SueldoNetoAutonomoCalculator } from '@/components/calculators/SueldoNetoAutonomoCalculator';
import { CalculatorErrorBoundary } from '@/components/calculators/CalculatorErrorBoundary';
import { HeroGlow } from '@/components/ui/HeroGlow';

/**
 * SueldoNetoAutonomoCalculatorPageContent - Calculator component for sueldo neto autónomos page
 * Only contains Hero + Calculator. All other sections are server components in route page.
 */
export function SueldoNetoAutonomoCalculatorPageContent() {
  const t = useTranslations('calculators.sueldoNetoAutonomo');

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
        <CalculatorErrorBoundary>
          <SueldoNetoAutonomoCalculator />
        </CalculatorErrorBoundary>
      </section>
    </>
  );
}
