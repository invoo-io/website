'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { getBasePath } from '@/lib/utils';
import Button from '@/components/ui/button';

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
        <h3 className="text-title2-emphasized text-primary mb-3">
          {t('title')}
        </h3>
        <p className="text-body text-secondary mb-6 max-w-xl mx-auto">
          {t('description')}
        </p>
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
