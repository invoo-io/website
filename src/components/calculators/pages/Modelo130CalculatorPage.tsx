'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import GradientText from '@/components/ui/GradientText';
import { Modelo130Calculator } from '@/components/calculators/Modelo130Calculator';
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
 * Modelo130CalculatorPageContent - Shared content component for Modelo 130 calculator page
 * Used by both Spanish and English routes
 */
export function Modelo130CalculatorPageContent() {
  const t = useTranslations('calculators.modelo130');
  const tc = useTranslations('calculators.common');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // Related calculators - Modelo 130 relates to IRPF and Modelo 303
  const relatedCalculators = [
    {
      name: tc('related.irpfAutonomos.name'),
      description: tc('related.irpfAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/irpf-autonomos` : `/${locale}/tools/calculators/income-tax-freelancer`),
    },
    {
      name: tc('related.modelo303.name'),
      description: tc('related.modelo303.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/modelo-303` : `/${locale}/tools/calculators/vat-return`),
    },
    {
      name: tc('related.cuotaAutonomos.name'),
      description: tc('related.cuotaAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/cuota-autonomos` : `/${locale}/tools/calculators/self-employed-quota`),
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
    { title: t('concepts.pagoFraccionado.title'), description: t('concepts.pagoFraccionado.description') },
    { title: t('concepts.rendimientoNeto.title'), description: t('concepts.rendimientoNeto.description') },
    { title: t('concepts.retenciones.title'), description: t('concepts.retenciones.description') },
    { title: t('concepts.exencion.title'), description: t('concepts.exencion.description') },
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
        <Modelo130Calculator />
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
            columns={4}
          />

          {/* Filing Deadlines */}
          <section>
            <h2 className="text-title-1 text-primary mb-4">{t('deadlines.title')}</h2>
            <p className="text-body text-secondary mb-6">{t('deadlines.description')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background-secondary rounded-xl p-4 border border-strokes-primary">
                <div className="text-callout-emphasized text-primary mb-1">{t('deadlines.q1.period')}</div>
                <div className="text-footnote text-secondary">{t('deadlines.q1.deadline')}</div>
              </div>
              <div className="bg-background-secondary rounded-xl p-4 border border-strokes-primary">
                <div className="text-callout-emphasized text-primary mb-1">{t('deadlines.q2.period')}</div>
                <div className="text-footnote text-secondary">{t('deadlines.q2.deadline')}</div>
              </div>
              <div className="bg-background-secondary rounded-xl p-4 border border-strokes-primary">
                <div className="text-callout-emphasized text-primary mb-1">{t('deadlines.q3.period')}</div>
                <div className="text-footnote text-secondary">{t('deadlines.q3.deadline')}</div>
              </div>
              <div className="bg-background-secondary rounded-xl p-4 border border-strokes-primary">
                <div className="text-callout-emphasized text-primary mb-1">{t('deadlines.q4.period')}</div>
                <div className="text-footnote text-secondary">{t('deadlines.q4.deadline')}</div>
              </div>
            </div>
          </section>

          {/* Exemption Info */}
          <section>
            <h2 className="text-title-1 text-primary mb-4">{t('exemption.title')}</h2>
            <p className="text-body text-secondary mb-4">{t('exemption.description')}</p>
            <div className="bg-background-secondary rounded-xl p-6 border border-strokes-primary">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-green-main mt-2 flex-shrink-0" />
                  <span className="text-body text-secondary">{t('exemption.condition1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-green-main mt-2 flex-shrink-0" />
                  <span className="text-body text-secondary">{t('exemption.condition2')}</span>
                </li>
              </ul>
            </div>
          </section>

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
