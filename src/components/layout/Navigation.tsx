"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WaitlistDrawer } from "@/components/forms/WaitlistDrawer";
import NavDropdown from "./NavDropdown";
import MobileNavButton from "./MobileNavButton";
import MobileNavLink from "./MobileNavLink";
import { ThemeToggle } from "@/components/utilities/ThemeToggle";
import { getImagePath, getBasePath, cn } from "@/lib/utils";

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
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  const pathname = usePathname();

  // Handle hydration for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: t('freelancers'), href: getBasePath(`/${locale}/freelancers`) },
    { name: t('pymes'), href: getBasePath(`/${locale}/pymes`) },
    { name: t('gestorias'), href: getBasePath(`/${locale}/gestorias`) },
  ];

  const resources = [
    { name: t('faq'), href: getBasePath(`/${locale}/faq`), external: false },
    { name: t('blog'), href: getBasePath(`/${locale}/blog`), external: false },
  ];

  const tools = [
    { name: t('calculatorIVA'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/iva` : `/${locale}/tools/calculators/vat`) },
    { name: t('calculatorModelo303'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/modelo-303` : `/${locale}/tools/calculators/vat-return`) },
    { name: t('calculatorModelo130'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/modelo-130` : `/${locale}/tools/calculators/form-130`) },
    { name: t('calculatorCuotaAutonomos'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/cuota-autonomos` : `/${locale}/tools/calculators/self-employed-quota`) },
    { name: t('calculatorFactura'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/factura` : `/${locale}/tools/calculators/invoice`) },
    { name: t('calculatorIRPF'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/irpf-autonomos` : `/${locale}/tools/calculators/income-tax-freelancer`) },
    { name: t('calculatorSueldoNeto'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/sueldo-neto-autonomo` : `/${locale}/tools/calculators/net-salary-freelancer`) },
    { name: t('calculatorPrecioHora'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/precio-hora` : `/${locale}/tools/calculators/hourly-rate`) },
    { name: t('calculatorGastosDeducibles'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/gastos-deducibles` : `/${locale}/tools/calculators/deductible-expenses`) },
    { name: t('calculatorAutonomoVsEmpresa'), href: getBasePath(locale === 'es' ? `/${locale}/herramientas/calculadoras/autonomo-vs-empresa` : `/${locale}/tools/calculators/freelancer-vs-company`) },
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
        className={cn(
          "w-full fixed top-0 left-0 right-0 transition-all duration-300",
          scrolled
            ? "bg-background-primary/80 backdrop-blur-xl backdrop-saturate-150 border-b border-strokes-primary/10 shadow-sm"
            : "bg-transparent"
        )}
        style={{ zIndex: 100 }}
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
                  src={getImagePath(mounted && theme === "dark" ? "/Logo-Dark.svg" : "/Logo-White.svg")}
                  alt="invoo"
                  width={126}
                  height={32}
                  priority
                  unoptimized
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

              {/* Tools Dropdown */}
              <NavDropdown
                id="tools"
                label={t('tools')}
                items={tools}
                isOpen={activeDropdown === "tools"}
                onMouseEnter={() => handleMouseEnter("tools")}
                onMouseLeave={handleMouseLeave}
              />

              {/* Direct Links */}
              <Link
                href={getBasePath(`/${locale}/pricing`)}
                className="text-primary hover:text-secondary transition-colors text-callout"
              >
                {t('pricing')}
              </Link>
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Theme Toggle */}
              <ThemeToggle />

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
              <WaitlistDrawer triggerText={t("getStarted")} />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary hover:text-secondary p-2"
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
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
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-system-overlay backdrop-blur-sm lg:hidden"
              style={{ zIndex: 150 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[380px] lg:hidden overflow-y-auto border-l border-strokes-primary/10 bg-background-primary/70 backdrop-blur-3xl backdrop-saturate-150"
              style={{ zIndex: 200 }}
              role="dialog"
              aria-modal="true"
              aria-label={t('mobileMenu')}
            >
              {/* Floating Close Button */}
              <div className="absolute top-5 right-5 z-10">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-full bg-fill-tertiary hover:bg-fill-secondary text-secondary hover:text-primary transition-all duration-200"
                  whileTap={{ scale: 0.92 }}
                  aria-label={t('closeMenu')}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Drawer Content */}
              <div className="pt-20 px-5 pb-8">
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
                      <span className="text-primary">{t('services')}</span>
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
                        <ChevronDown className="w-4 h-4 text-secondary" />
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
                      <span className="text-primary">{t('resources')}</span>
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
                        <ChevronDown className="w-4 h-4 text-secondary" />
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

                  {/* Tools Section */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <MobileNavButton
                      onClick={() => setMobileActiveDropdown(mobileActiveDropdown === "tools" ? null : "tools")}
                    >
                      <span className="text-primary">{t('tools')}</span>
                      <motion.div
                        style={{
                          position: "absolute",
                          right: "24px",
                        }}
                        animate={{
                          rotate:
                            mobileActiveDropdown === "tools" ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-secondary" />
                      </motion.div>
                    </MobileNavButton>

                    <AnimatePresence>
                      {mobileActiveDropdown === "tools" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div style={{ padding: "12px 0" }}>
                            {tools.map((tool, index) => (
                              <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                  marginBottom:
                                    index < tools.length - 1 ? "8px" : "0",
                                }}
                              >
                                <MobileNavLink
                                  href={tool.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="mx-4"
                                >
                                  {tool.name}
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
                      className="w-full px-5 py-4 text-body-emphasized text-primary"
                    >
                      {t('pricing')}
                    </MobileNavLink>
                  </motion.div>

                  {/* Settings Section */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3"
                  >
                    {/* Theme & Language Row */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-fill-tertiary/40">
                      <div className="flex items-center gap-3 flex-1">
                        <ThemeToggle />
                        <div className="w-px h-5 bg-strokes-primary/20" />
                        <div className="flex gap-1.5">
                          {languages.map((lang) => (
                            <Link
                              key={lang.code}
                              href={getLanguageSwitchUrl(lang.code)}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-footnote transition-all duration-200",
                                locale === lang.code
                                  ? "bg-accent-blue-main text-white font-medium"
                                  : "text-secondary hover:text-primary hover:bg-fill-tertiary/60"
                              )}
                            >
                              {lang.code.toUpperCase()}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <WaitlistDrawer triggerText={t("getStarted")} />
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
