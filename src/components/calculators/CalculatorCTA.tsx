'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { getBasePath } from '@/lib/utils';
import Button from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface CalculatorCTAProps {
  className?: string;
}

/**
 * CalculatorCTA - Global CTA banner for all calculator pages
 * Pitches Invoo after users complete a calculation
 */
export function CalculatorCTA({ className }: CalculatorCTAProps) {
  const t = useTranslations('calculators.common.cta');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  return (
    <div className={className}>
      <div className="bg-gradient-to-br from-accent-blue-soft/10 to-accent-purple-soft/10 border border-strokes-primary rounded-[20px] p-8 text-center">
        <SectionHeader
          size="card"
          align="center"
          title={t('title')}
          description={t('description')}
          marginBottom="md"
          descriptionClassName="max-w-xl"
        />
        <Button
          variant="gradient"
          showArrow
          href={getBasePath(`/${locale}/#waitlist`)}
        >
          {t('button')}
        </Button>
      </div>
    </div>
  );
}
