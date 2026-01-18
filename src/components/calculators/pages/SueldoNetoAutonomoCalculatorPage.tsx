'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import GradientText from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SueldoNetoAutonomoCalculator } from '@/components/calculators/SueldoNetoAutonomoCalculator';
import { CalculatorCTA } from '@/components/calculators/CalculatorCTA';
import { CalculatorErrorBoundary } from '@/components/calculators/CalculatorErrorBoundary';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import {
  CalculatorHowTo,
  CalculatorInfoGrid,
  CalculatorWhyUse,
  CalculatorRelatedTools,
} from '@/components/calculators/CalculatorSEOContent';
import { getBasePath } from '@/lib/utils';

/**
 * SueldoNetoAutonomoCalculatorPageContent - Shared content component for sueldo neto autónomos calculator page
 * Used by both Spanish and English routes
 */
export function SueldoNetoAutonomoCalculatorPageContent() {
  const t = useTranslations('calculators.sueldoNetoAutonomo');
  const tc = useTranslations('calculators.common');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // Related calculators - Sueldo Neto relates to IRPF, Cuota, and Precio Hora
  const relatedCalculators = [
    {
      name: tc('related.irpfAutonomos.name'),
      description: tc('related.irpfAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/irpf-autonomos` : `/${locale}/tools/calculators/income-tax-freelancer`),
    },
    {
      name: tc('related.cuotaAutonomos.name'),
      description: tc('related.cuotaAutonomos.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/cuota-autonomos` : `/${locale}/tools/calculators/self-employed-quota`),
    },
    {
      name: tc('related.precioHora.name'),
      description: tc('related.precioHora.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/precio-hora` : `/${locale}/tools/calculators/hourly-rate`),
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

  // Deductions info
  const deduccionesInfo = [
    { title: t('deducciones.item1.title'), description: t('deducciones.item1.description') },
    { title: t('deducciones.item2.title'), description: t('deducciones.item2.description') },
    { title: t('deducciones.item3.title'), description: t('deducciones.item3.description') },
    { title: t('deducciones.item4.title'), description: t('deducciones.item4.description') },
  ];

  // Benefits
  const benefits = t.raw('benefits') as string[];

  return (
    <>
      {/* Hero Section */}
      <section className="px-4 md:px-6 pt-40 max-md:pt-20 pb-12">
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

          {/* Deductions Info */}
          <CalculatorInfoGrid
            title={t('deducciones.title')}
            description={t('deducciones.description')}
            items={deduccionesInfo}
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
