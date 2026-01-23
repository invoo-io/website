'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import GradientText from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GastosDeduciblesCalculator } from '@/components/calculators/GastosDeduciblesCalculator';
import { CalculatorCTA } from '@/components/calculators/CalculatorCTA';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import {
  CalculatorHowTo,
  CalculatorInfoGrid,
  CalculatorWhyUse,
  CalculatorRelatedTools,
} from '@/components/calculators/CalculatorSEOContent';
import { getBasePath } from '@/lib/utils';
import { HeroGlow } from '@/components/ui/HeroGlow';

/**
 * GastosDeduciblesCalculatorPageContent - Shared content component for Gastos Deducibles calculator page
 * Used by both Spanish and English routes
 */
export function GastosDeduciblesCalculatorPageContent() {
  const t = useTranslations('calculators.gastosDeducibles');
  const tc = useTranslations('calculators.common');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // Related calculators
  const relatedCalculators = [
    {
      name: tc('related.irpfAutonomos.name'),
      description: tc('related.irpfAutonomos.description'),
      href: getBasePath(
        locale === 'es'
          ? `/${locale}/herramientas/calculadoras/irpf-autonomos`
          : `/${locale}/tools/calculators/income-tax-freelancer`
      ),
    },
    {
      name: tc('related.modelo303.name'),
      description: tc('related.modelo303.description'),
      href: getBasePath(
        locale === 'es'
          ? `/${locale}/herramientas/calculadoras/modelo-303`
          : `/${locale}/tools/calculators/vat-return`
      ),
    },
    {
      name: tc('related.sueldoNetoAutonomo.name'),
      description: tc('related.sueldoNetoAutonomo.description'),
      href: getBasePath(
        locale === 'es'
          ? `/${locale}/herramientas/calculadoras/sueldo-neto-autonomo`
          : `/${locale}/tools/calculators/net-salary-freelancer`
      ),
    },
  ];

  // FAQ data
  const faqItems = [
    { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
    { question: t('faq.q4.question'), answer: t('faq.q4.answer') },
    { question: t('faq.q5.question'), answer: t('faq.q5.answer') },
    { question: t('faq.q6.question'), answer: t('faq.q6.answer') },
  ];

  // How-to steps
  const howToSteps = [
    { title: t('howTo.step1.title'), description: t('howTo.step1.description') },
    { title: t('howTo.step2.title'), description: t('howTo.step2.description') },
    { title: t('howTo.step3.title'), description: t('howTo.step3.description') },
    { title: t('howTo.step4.title'), description: t('howTo.step4.description') },
  ];

  // Key concepts info
  const keyConcepts = [
    {
      title: t('concepts.ivaDeducible.title'),
      description: t('concepts.ivaDeducible.description'),
    },
    {
      title: t('concepts.irpfDeducible.title'),
      description: t('concepts.irpfDeducible.description'),
    },
    {
      title: t('concepts.gdj.title'),
      description: t('concepts.gdj.description'),
    },
    {
      title: t('concepts.proporcionalidad.title'),
      description: t('concepts.proporcionalidad.description'),
    },
  ];

  // Benefits
  const benefits = t.raw('benefits') as string[];

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
        <GastosDeduciblesCalculator />
        <CalculatorCTA className="max-w-4xl mx-auto mt-12" />
      </section>

      {/* SEO Content Sections */}
      <div className="px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* How To Use */}
          <CalculatorHowTo
            title={t('howTo.title')}
            description={t('howTo.description')}
            steps={howToSteps}
          />

          {/* Key Concepts */}
          <CalculatorInfoGrid
            title={t('concepts.title')}
            description={t('concepts.description')}
            items={keyConcepts}
          />

          {/* Why Use */}
          <CalculatorWhyUse title={t('whyUse.title')} benefits={benefits} />

          {/* FAQ */}
          <CalculatorFAQ title={t('faq.title')} items={faqItems} />

          {/* Related Calculators */}
          <CalculatorRelatedTools
            title={tc('relatedTitle')}
            calculators={relatedCalculators}
            ctaText={tc('useCalculator')}
          />
        </div>
      </div>
    </>
  );
}
