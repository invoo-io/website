'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import GradientText from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrecioHoraCalculator } from '@/components/calculators/PrecioHoraCalculator';
import { CalculatorCTA } from '@/components/calculators/CalculatorCTA';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import {
  CalculatorHowTo,
  CalculatorInfoGrid,
  CalculatorWhyUse,
  CalculatorRelatedTools,
  CalculatorBenchmarks,
} from '@/components/calculators/CalculatorSEOContent';
import { getBasePath } from '@/lib/utils';

/**
 * PrecioHoraCalculatorPageContent - Shared content component for hourly rate calculator page
 * Used by both Spanish and English routes
 */
export function PrecioHoraCalculatorPageContent() {
  const t = useTranslations('calculators.precioHora');
  const tc = useTranslations('calculators.common');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  // Related calculators - Precio Hora relates to Sueldo Neto, IRPF, and Cuota
  const relatedCalculators = [
    {
      name: tc('related.sueldoNetoAutonomo.name'),
      description: tc('related.sueldoNetoAutonomo.description'),
      href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/sueldo-neto-autonomo` : `/${locale}/tools/calculators/net-salary-freelancer`),
    },
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
  ];

  // FAQ data
  const faqItems = [
    { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
    { question: t('faq.q4.question'), answer: t('faq.q4.answer') },
    { question: t('faq.q5.question'), answer: t('faq.q5.answer') },
    { question: t('faq.q6.question'), answer: t('faq.q6.answer') },
    { question: t('faq.q7.question'), answer: t('faq.q7.answer') },
    { question: t('faq.q8.question'), answer: t('faq.q8.answer') },
  ];

  // Benchmark sectors data
  const benchmarkSectors = [
    {
      name: t('benchmarks.sectors.dev.name'),
      junior: t('benchmarks.sectors.dev.junior'),
      mid: t('benchmarks.sectors.dev.mid'),
      senior: t('benchmarks.sectors.dev.senior'),
      note: t('benchmarks.sectors.dev.note'),
    },
    {
      name: t('benchmarks.sectors.design.name'),
      junior: t('benchmarks.sectors.design.junior'),
      mid: t('benchmarks.sectors.design.mid'),
      senior: t('benchmarks.sectors.design.senior'),
      note: t('benchmarks.sectors.design.note'),
    },
    {
      name: t('benchmarks.sectors.marketing.name'),
      junior: t('benchmarks.sectors.marketing.junior'),
      mid: t('benchmarks.sectors.marketing.mid'),
      senior: t('benchmarks.sectors.marketing.senior'),
      note: t('benchmarks.sectors.marketing.note'),
    },
    {
      name: t('benchmarks.sectors.consulting.name'),
      junior: t('benchmarks.sectors.consulting.junior'),
      mid: t('benchmarks.sectors.consulting.mid'),
      senior: t('benchmarks.sectors.consulting.senior'),
      note: t('benchmarks.sectors.consulting.note'),
    },
    {
      name: t('benchmarks.sectors.content.name'),
      junior: t('benchmarks.sectors.content.junior'),
      mid: t('benchmarks.sectors.content.mid'),
      senior: t('benchmarks.sectors.content.senior'),
      note: t('benchmarks.sectors.content.note'),
    },
  ];

  // How-to steps
  const howToSteps = [
    { title: t('howTo.step1.title'), description: t('howTo.step1.description') },
    { title: t('howTo.step2.title'), description: t('howTo.step2.description') },
    { title: t('howTo.step3.title'), description: t('howTo.step3.description') },
    { title: t('howTo.step4.title'), description: t('howTo.step4.description') },
  ];

  // Key factors info
  const keyFactors = [
    {
      title: t('factors.irpf.title'),
      description: t('factors.irpf.description'),
    },
    {
      title: t('factors.cuota.title'),
      description: t('factors.cuota.description'),
    },
    {
      title: t('factors.gastos.title'),
      description: t('factors.gastos.description'),
    },
    {
      title: t('factors.vacaciones.title'),
      description: t('factors.vacaciones.description'),
    },
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
        <PrecioHoraCalculator />
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

          {/* Key Factors */}
          <CalculatorInfoGrid
            title={t('factors.title')}
            description={t('factors.description')}
            items={keyFactors}
          />

          {/* Sector Benchmarks */}
          <CalculatorBenchmarks
            title={t('benchmarks.title')}
            description={t('benchmarks.description')}
            sectors={benchmarkSectors}
            footnote={t('benchmarks.note')}
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
