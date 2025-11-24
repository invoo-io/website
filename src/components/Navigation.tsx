"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationDrawerButton from "./NavigationDrawerButton";
import NavDropdown from "./NavDropdown";
import MobileNavButton from "./MobileNavButton";
import MobileNavLink from "./MobileNavLink";
import { getImagePath, getBasePath } from "@/lib/utils";

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  const pathname = usePathname();

  const services = [
    { name: t('freelancers'), href: getBasePath(`/${locale}/freelancers`) },
    { name: t('gestorias'), href: getBasePath(`/${locale}/gestorias`) },
  ];

  const resources = [
    { name: t('faq'), href: getBasePath(`/${locale}/faq`), external: false },
    { name: t('blog'), href: getBasePath(`/${locale}/blog`), external: false },
  ];

  const languages = [
    { name: "English", code: "en" },
    { name: "Español", code: "es" },
  ];

  const getLanguageSwitchUrl = (newLocale: string) => {
    // Replace the current locale in the pathname with the new locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    return getBasePath(`/${newLocale}${pathWithoutLocale}`);
  };

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className="w-full relative"
        style={{ zIndex: 100, backgroundColor: 'var(--background-secondary-dark)' }}
      >
        <div className="w-full">
          <div
            className="flex items-center justify-between h-20"
            style={{
              paddingRight: "24px",
              paddingLeft: "24px",
            }}
          >
            {/* Logo */}
            <div className="flex items-center z-50">
              <Link href={getBasePath(`/${locale}`)} className="flex items-center" prefetch={true}>
                <Image
                  src={getImagePath("/Logo.svg")}
                  alt="invoo"
                  width={126}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-12">
              {/* Services Dropdown */}
              <NavDropdown
                id="services"
                label={t('services')}
                items={services}
                isOpen={activeDropdown === "services"}
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              />

              {/* Resources Dropdown */}
              <NavDropdown
                id="resources"
                label={t('resources')}
                items={resources}
                isOpen={activeDropdown === "resources"}
                onMouseEnter={() => handleMouseEnter("resources")}
                onMouseLeave={handleMouseLeave}
              />

              {/* Direct Links */}
              <Link
                href={getBasePath(`/${locale}/pricing`)}
                className="text-label-inverted hover:text-label-inverted-secondary transition-colors text-callout"
              >
                {t('pricing')}
              </Link>

              <Link
                href={getBasePath(`/${locale}/about`)}
                className="text-label-inverted hover:text-label-inverted-secondary transition-colors text-callout"
              >
                {t('about')}
              </Link>

              <Link
                href={getBasePath(`/${locale}/contact`)}
                className="text-label-inverted hover:text-label-inverted-secondary transition-colors text-callout"
              >
                {t('contact')}
              </Link>
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Language Selector */}
              <NavDropdown
                id="language"
                label=""
                items={languages.map(lang => ({
                  name: lang.name,
                  href: getLanguageSwitchUrl(lang.code)
                }))}
                isOpen={activeDropdown === "language"}
                onMouseEnter={() => handleMouseEnter("language")}
                onMouseLeave={handleMouseLeave}
                align="right"
                minWidth="160px"
                icon={<Languages className="w-5 h-5" />}
              />

              {/* CTA Button */}
              <NavigationDrawerButton />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden z-50">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-label-inverted-secondary hover:text-label-inverted p-2 relative"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-system-overlay backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[400px] z-50 lg:hidden overflow-y-auto"
              style={{ backgroundColor: 'var(--background-secondary)' }}
            >
              {/* Drawer Header */}
              <div className="relative border-b border-strokes-primary/20 p-6">
                <div className="flex justify-center">
                  <Image
                    src={getImagePath("/Logo.svg")}
                    alt="invoo"
                    width={100}
                    height={28}
                    className="h-7 w-auto"
                  />
                </div>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-label-inverted-secondary hover:text-label-inverted p-2"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Drawer Content */}
              <div className="p-6">
                <motion.div
                  className="flex flex-col gap-3"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05 },
                    },
                    closed: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  {/* Services Section */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavButton
                      onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "services" ? null : "services")}
                    >
                      <span className="text-callout-emphasized">{t('services')}</span>
                      <motion.div
                        style={{
                          position: "absolute",
                          right: "24px",
                        }}
                        animate={{
                          rotate: mobileActiveDropdown === "services" ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" style={{ color: 'var(--label-secondary-dark)' }} />
                      </motion.div>
                    </MobileNavButton>

                    <AnimatePresence>
                      {mobileActiveDropdown === "services" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div style={{ padding: "12px 0" }}>
                            {services.map((service, index) => (
                              <motion.div
                                key={service.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                  marginBottom:
                                    index < services.length - 1 ? "8px" : "0",
                                }}
                              >
                                <MobileNavLink
                                  href={service.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="mx-4"
                                >
                                  {service.name}
                                </MobileNavLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Resources Section */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavButton
                      onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "resources" ? null : "resources")}
                    >
                      <span className="text-callout-emphasized">{t('resources')}</span>
                      <motion.div
                        style={{
                          position: "absolute",
                          right: "24px",
                        }}
                        animate={{
                          rotate:
                            mobileActiveDropdown === "resources" ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" style={{ color: 'var(--label-secondary-dark)' }} />
                      </motion.div>
                    </MobileNavButton>

                    <AnimatePresence>
                      {mobileActiveDropdown === "resources" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div style={{ padding: "12px 0" }}>
                            {resources.map((resource, index) => (
                              <motion.div
                                key={resource.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                  marginBottom:
                                    index < resources.length - 1 ? "8px" : "0",
                                }}
                              >
                                <MobileNavLink
                                  href={resource.href}
                                  external={resource.external}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="mx-4"
                                >
                                  {resource.name}
                                </MobileNavLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Direct Links */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavLink
                      href={getBasePath(`/${locale}/pricing`)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full px-6 py-4 text-callout-emphasized"
                    >
                      {t('pricing')}
                    </MobileNavLink>
                  </motion.div>

                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavLink
                      href={getBasePath(`/${locale}/about`)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full px-6 py-4 text-callout-emphasized"
                    >
                      {t('about')}
                    </MobileNavLink>
                  </motion.div>

                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavLink
                      href={getBasePath(`/${locale}/contact`)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full px-6 py-4 text-callout-emphasized"
                    >
                      {t('contact')}
                    </MobileNavLink>
                  </motion.div>

                  {/* Divider */}
                  <div className="my-6 border-t border-strokes-primary/20" />

                  {/* Language Dropdown */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavButton
                      onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "language" ? null : "language")}
                    >
                      <Languages className="w-5 h-5 mr-2" style={{ color: 'var(--label-secondary-dark)' }} />
                      <span className="text-callout-emphasized">{t('language')}</span>
                      <motion.div
                        style={{
                          position: "absolute",
                          right: "24px",
                        }}
                        animate={{
                          rotate: mobileActiveDropdown === "language" ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" style={{ color: 'var(--label-secondary-dark)' }} />
                      </motion.div>
                    </MobileNavButton>

                    <AnimatePresence>
                      {mobileActiveDropdown === "language" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div style={{ padding: "12px 0" }}>
                            {languages.map((lang, index) => (
                              <motion.div
                                key={lang.code}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                  marginBottom:
                                    index < languages.length - 1 ? "8px" : "0",
                                }}
                              >
                                <MobileNavLink
                                  href={getLanguageSwitchUrl(lang.code)}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="mx-4"
                                >
                                  {lang.name}
                                </MobileNavLink>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="pt-6 flex justify-center"
                  >
                    <NavigationDrawerButton />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
