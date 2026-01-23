'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import GradientText from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IVACalculator } from '@/components/calculators/IVACalculator';
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
 * IVACalculatorPageContent - Shared content component for IVA calculator page
 * Used by both Spanish and English routes
 */
export function IVACalculatorPageContent() {
  const t = useTranslations('calculators.iva');
  const tc = useTranslations('calculators.common');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // Related calculators - IVA relates to Factura (invoicing) and Cuota (business costs)
  const relatedCalculators = [
    {
      name: tc('related.factura.name'),
      description: tc('related.factura.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/factura` : `/${locale}/tools/calculators/invoice`),
    },
    {
      name: tc('related.cuotaAutonomos.name'),
      description: tc('related.cuotaAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/cuota-autonomos` : `/${locale}/tools/calculators/self-employed-quota`),
    },
    {
      name: tc('related.irpfAutonomos.name'),
      description: tc('related.irpfAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/irpf-autonomos` : `/${locale}/tools/calculators/income-tax-freelancer`),
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
  ];

  // IVA types info
  const ivaTypes = [
    { title: t('ivaTypes.general.title'), description: t('ivaTypes.general.description') },
    { title: t('ivaTypes.reducido.title'), description: t('ivaTypes.reducido.description') },
    { title: t('ivaTypes.superreducido.title'), description: t('ivaTypes.superreducido.description') },
    { title: t('ivaTypes.exento.title'), description: t('ivaTypes.exento.description') },
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
        <IVACalculator />
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

          {/* IVA Types */}
          <CalculatorInfoGrid
            title={t('ivaTypes.title')}
            description={t('ivaTypes.description')}
            items={ivaTypes}
          />

          {/* Why Use */}
          <CalculatorWhyUse
            title={t('whyUse.title')}
            benefits={benefits}
          />

          {/* FAQ */}
          <CalculatorFAQ
            title={t('faq.title')}
            items={faqItems}
          />

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
