"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Facebook, Linkedin, X } from "lucide-react";
import { getImagePath, getBasePath } from "@/lib/utils";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("home.footer");

  return (
    <footer className="bg-system-grey800 text-label-inverted px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Logo and description column */}
          <div>
            <div className="mb-6">
              <Image
                src={getImagePath("/Logo.svg")}
                alt="Invoo"
                width={130}
                height={60}
              />
            </div>
            <p className="text-callout text-label-inverted-secondary">
              {t("description")}
            </p>
          </div>

          {/* Invoo column */}
          <div>
            <h3 className="text-headline text-label-inverted mb-6">
              {t("invooTitle")}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href={getBasePath(`/${locale}/about`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/terms`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("terms")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/privacy`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("privacy")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/contact`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-headline text-label-inverted mb-6">
              {t("servicesTitle")}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href={getBasePath(`/${locale}/freelancers`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("forFreelancers")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/gestorias`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("forGestorias")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/pricing`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("pricing")}</Link></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-headline text-label-inverted mb-6">
              {t("resourcesTitle")}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href={getBasePath(`/${locale}/faq`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("faqs")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/blog`)} className="text-callout no-underline text-label-inverted-secondary hover:text-label-inverted transition-colors">{t("blog")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-center pt-8 border-t border-strokes-primary">
          <p className="text-footnote text-label-inverted-secondary">
            {t("copyright")}
          </p>

          {/* Social icons */}
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/invooes" target="_blank" rel="noopener noreferrer" className="text-label-inverted-secondary hover:text-label-inverted transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/InvooES" target="_blank" rel="noopener noreferrer" className="text-label-inverted-secondary hover:text-label-inverted transition-colors">
              <X size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578360993110" target="_blank" rel="noopener noreferrer" className="text-label-inverted-secondary hover:text-label-inverted transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}