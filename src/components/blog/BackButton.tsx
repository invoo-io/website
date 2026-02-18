'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';

interface BackButtonProps {
  locale: string;
  categorySlug: string;
  label: string;
  ariaLabel: string;
}

export default function BackButton({ locale, categorySlug, label, ariaLabel }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    const referrer = typeof document !== 'undefined' ? document.referrer : '';
    const currentHost = typeof window !== 'undefined' ? window.location.host : '';

    // If referrer is from our site's blog section, use browser back
    if (referrer && referrer.includes(currentHost) && referrer.includes('/blog')) {
      router.back();
    } else {
      // Default: navigate to category page
      router.push(`/${locale}/blog/${categorySlug}/`);
    }
  };

  return (
    <Button
      variant="tertiary"
      size="none"
      onClick={handleBack}
      showBackIcon
      aria-label={ariaLabel}
      disableHoverScale
    >
      {label}
    </Button>
  );
}
