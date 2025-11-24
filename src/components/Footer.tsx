"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Facebook, Linkedin, X } from "lucide-react";
import { getImagePath, getBasePath } from "@/lib/utils";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("home.footer");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Match the Navigation component logic
  const logoSrc = mounted && theme === "dark" ? "/Logo-Dark.svg" : "/Logo-White.svg";

  return (
    <footer className="bg-bg-primary text-text-primary px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Logo and description column */}
          <div>
            <div className="mb-6">
              <Image
                src={getImagePath(logoSrc)}
                alt="Invoo"
                width={130}
                height={60}
              />
            </div>
            <p className="text-callout text-text-secondary">
              {t("description")}
            </p>
          </div>

          {/* Invoo column */}
          <div>
            <h3 className="text-headline text-text-primary mb-6">
              {t("invooTitle")}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href={getBasePath(`/${locale}/about`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/terms`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("terms")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/privacy`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("privacy")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/contact`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-headline text-text-primary mb-6">
              {t("servicesTitle")}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href={getBasePath(`/${locale}/freelancers`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("forFreelancers")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/gestorias`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("forGestorias")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/pricing`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("pricing")}</Link></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-headline text-text-primary mb-6">
              {t("resourcesTitle")}
            </h3>
            <ul className="list-none p-0 flex flex-col gap-4">
              <li><Link href={getBasePath(`/${locale}/faq`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("faqs")}</Link></li>
              <li><Link href={getBasePath(`/${locale}/blog`)} className="text-callout no-underline text-text-secondary hover:text-text-primary transition-colors">{t("blog")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex justify-between items-center pt-8 border-t border-strokes-primary">
          <p className="text-footnote text-text-secondary">
            {t("copyright")}
          </p>

          {/* Social icons */}
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/company/invooes" target="_blank" rel="noopener noreferrer" className="text-textd-secondary hover:text-text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/InvooES" target="_blank" rel="noopener noreferrer" className="text-textd-secondary hover:text-text-primary transition-colors">
              <X size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578360993110" target="_blank" rel="noopener noreferrer" className="text-textd-secondary hover:text-text-primary transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}