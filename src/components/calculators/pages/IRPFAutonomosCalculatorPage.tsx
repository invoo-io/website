'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import GradientText from '@/components/ui/GradientText';
import { IRPFAutonomosCalculator } from '@/components/calculators/IRPFAutonomosCalculator';
import { CalculatorCTA } from '@/components/calculators/CalculatorCTA';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import {
  CalculatorHowTo,
  CalculatorInfoGrid,
  CalculatorWhyUse,
  CalculatorRelatedTools,
} from '@/components/calculators/CalculatorSEOContent';
import { getBasePath } from '@/lib/utils';

/**
 * IRPFAutonomosCalculatorPageContent - Shared content component for IRPF autónomos calculator page
 * Used by both Spanish and English routes
 */
export function IRPFAutonomosCalculatorPageContent() {
  const t = useTranslations('calculators.irpfAutonomos');
  const tc = useTranslations('calculators.common');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // Related calculators - IRPF relates to Sueldo Neto, Cuota, and Factura
  const relatedCalculators = [
    {
      name: tc('related.sueldoNetoAutonomo.name'),
      description: tc('related.sueldoNetoAutonomo.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/sueldo-neto-autonomo` : `/${locale}/tools/calculators/net-salary-freelancer`),
    },
    {
      name: tc('related.cuotaAutonomos.name'),
      description: tc('related.cuotaAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/cuota-autonomos` : `/${locale}/tools/calculators/self-employed-quota`),
    },
    {
      name: tc('related.factura.name'),
      description: tc('related.factura.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/factura` : `/${locale}/tools/calculators/invoice`),
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

  // Tax brackets info
  const tramosInfo = [
    { title: t('tramos.tramo1.title'), description: t('tramos.tramo1.description') },
    { title: t('tramos.tramo2.title'), description: t('tramos.tramo2.description') },
    { title: t('tramos.tramo3.title'), description: t('tramos.tramo3.description') },
    { title: t('tramos.tramo4.title'), description: t('tramos.tramo4.description') },
  ];

  // Benefits
  const benefits = t.raw('benefits') as string[];

  return (
    <>
      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 md:px-6 pt-40 max-md:pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-header-title-emphasized text-center mb-6">
            <GradientText>{t('hero.titleHighlight')}</GradientText>
            <span className="text-primary"> {t('hero.titleEnd')}</span>
          </h1>
          <p className="text-body text-secondary max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="px-4 md:px-6 pb-16">
        <IRPFAutonomosCalculator />
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

          {/* Tax Brackets Info */}
          <CalculatorInfoGrid
            title={t('tramos.title')}
            description={t('tramos.description')}
            items={tramosInfo}
            columns={2}
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
