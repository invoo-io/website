"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import PricingCard from "./PricingCard";
import GradientText from "./ui/GradientText";
import { DrawerComponent } from "./DrawerComponent";
import { SectionHeader } from "./ui/SectionHeader";
import { getBasePath } from "@/lib/utils";
import { HeroGlow } from "./ui/HeroGlow";

export default function PricingSection() {
  const t = useTranslations("pricingPage");
  const params = useParams();
  const locale = params.locale as string;
  const [activeTab, setActiveTab] = useState<"autonomos" | "pymes" | "gestoria">("autonomos");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Split title at the period to apply gradient
  const titleParts = t("header.title").split(". ");

  return (
    <section className="relative py-60 max-md:py-32 px-4 md:px-6 overflow-hidden" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <HeroGlow />

      {/* Header */}
      <SectionHeader
        size="hero"
        align="center"
        maxWidth="lg"
        title={
          <>
            <GradientText>{titleParts[0]}.</GradientText>
            <span className="text-primary"> {titleParts[1]}</span>
          </>
        }
        description={t("header.description")}
        descriptionClassName="text-headline"
        className="mb-16"
      />

      {/* Tab Switcher */}
      <div className="flex gap-10 mb-16 border-b border-strokes-primary relative">
        <button
          onClick={() => setActiveTab("autonomos")}
          className="text-callout-emphasized px-1 py-3 cursor-pointer relative transition-colors"
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === "autonomos" ? 'var(--label-primary)' : 'var(--label-secondary)'
          }}
        >
          {t("tabs.autonomos")}
          {activeTab === "autonomos" && (
            <div className="absolute -bottom-px left-0 right-0 h-0.5 rounded-sm" style={{ background: 'var(--accent-blue-main)' }} />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pymes")}
          className="text-callout-emphasized px-1 py-3 cursor-pointer relative transition-colors"
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === "pymes" ? 'var(--label-primary)' : 'var(--label-secondary)'
          }}
        >
          {t("tabs.pymes")}
          {activeTab === "pymes" && (
            <div className="absolute -bottom-px left-0 right-0 h-0.5 rounded-sm" style={{ background: 'var(--accent-blue-main)' }} />
          )}
        </button>
        <button
          onClick={() => setActiveTab("gestoria")}
          className="text-callout-emphasized px-1 py-3 cursor-pointer relative transition-colors"
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === "gestoria" ? 'var(--label-primary)' : 'var(--label-secondary)'
          }}
        >
          {t("tabs.gestoria")}
          {activeTab === "gestoria" && (
            <div className="absolute -bottom-px left-0 right-0 h-0.5 rounded-sm" style={{ background: 'var(--accent-blue-main)' }} />
          )}
        </button>
      </div>

      {/* Pricing Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: activeTab === "pymes" ? 'repeat(auto-fit, minmax(320px, 1fr))' : 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '32px',
        maxWidth: activeTab === "pymes" ? '1200px' : '900px',
        width: '100%'
      }}>
        {activeTab === "autonomos" && (
          <>
            <h2 className="sr-only">Pricing for Freelancers (Autónomos)</h2>
            {/* Autónomos Free Plan */}
            <PricingCard
              title={t("autonomos.free.title")}
              description={t("autonomos.free.description")}
              price={t("autonomos.free.price")}
              period={t("autonomos.free.period")}
              subtitle={t("autonomos.free.badge")}
              buttonText={t("autonomos.free.cta")}
              buttonVariant="gradient"
              buttonOnClick={() => setDrawerOpen(true)}
              features={t.raw("autonomos.free.features")}
            />

            {/* Autónomos Pro Plan */}
            <PricingCard
              title={t("autonomos.pro.title")}
              description={t("autonomos.pro.description")}
              price={t("autonomos.pro.price")}
              regularPrice={t("autonomos.pro.regularPrice")}
              savingsText={t("autonomos.pro.savingsText")}
              period={t("autonomos.pro.period")}
              badge={t("autonomos.pro.badge")}
              badgeColor="#22C55E"
              subtitle={t("autonomos.pro.subtitle")}
              buttonText={t("autonomos.pro.cta")}
              buttonVariant="gradient"
              buttonOnClick={() => setDrawerOpen(true)}
              features={t.raw("autonomos.pro.features")}
              isHighlighted={true}
            />
          </>
        )}

        {activeTab === "pymes" && (
          <>
            <h2 className="sr-only">Pricing for Small Businesses (PYMEs)</h2>
            {/* Pymes Free Plan */}
            <PricingCard
              title={t("pymes.free.title")}
              description={t("pymes.free.description")}
              price={t("pymes.free.price")}
              period={t("pymes.free.period")}
              subtitle={t("pymes.free.badge")}
              buttonText={t("pymes.free.cta")}
              buttonVariant="gradient"
              buttonOnClick={() => setDrawerOpen(true)}
              features={t.raw("pymes.free.features")}
            />

            {/* Pymes Pro Plan */}
            <PricingCard
              title={t("pymes.pro.title")}
              description={t("pymes.pro.description")}
              price={t("pymes.pro.price")}
              regularPrice={t("pymes.pro.regularPrice")}
              savingsText={t("pymes.pro.savingsText")}
              period={t("pymes.pro.period")}
              badge={t("pymes.pro.badge")}
              badgeColor="#22C55E"
              subtitle={t("pymes.pro.subtitle")}
              buttonText={t("pymes.pro.cta")}
              buttonVariant="gradient"
              buttonOnClick={() => setDrawerOpen(true)}
              features={t.raw("pymes.pro.features")}
              isHighlighted={true}
            />

            {/* Pymes Premium Plan */}
            <PricingCard
              title={t("pymes.premium.title")}
              description={t("pymes.premium.description")}
              price={t("pymes.premium.price")}
              regularPrice={t("pymes.premium.regularPrice")}
              savingsText={t("pymes.premium.savingsText")}
              period={t("pymes.premium.period")}
              badge={t("pymes.premium.badge")}
              badgeColor="#22C55E"
              subtitle={t("pymes.premium.subtitle")}
              buttonText={t("pymes.premium.cta")}
              buttonVariant="gradient"
              buttonOnClick={() => setDrawerOpen(true)}
              features={t.raw("pymes.premium.features")}
            />
          </>
        )}

        {activeTab === "gestoria" && (
          <>
            <h2 className="sr-only">Pricing for Accountants (Gestorías)</h2>
            {/* Gestoría Free Plan */}
            <PricingCard
              title={t("gestoria.free.title")}
              description={t("gestoria.free.description")}
              price={t("gestoria.free.price")}
              period={t("gestoria.free.period")}
              subtitle={t("gestoria.free.badge")}
              buttonText={t("gestoria.free.cta")}
              buttonVariant="gradient"
              buttonHref={getBasePath(`/${locale}/contact`)}
              features={t.raw("gestoria.free.features")}
            />

            {/* Gestoría Enterprise Plan */}
            <PricingCard
              title={t("gestoria.enterprise.title")}
              description={t("gestoria.enterprise.description")}
              price={t("gestoria.enterprise.price")}
              subtitle={t("gestoria.enterprise.badge")}
              buttonText={t("gestoria.enterprise.cta")}
              buttonVariant="gradient"
              buttonHref={getBasePath(`/${locale}/contact`)}
              features={t.raw("gestoria.enterprise.features")}
              isHighlighted={true}
            />
          </>
        )}
      </div>

      {/* Drawer for waiting list */}
      <DrawerComponent
        triggerText=""
        externalOpen={drawerOpen}
        onExternalOpenChange={setDrawerOpen}
      />
    </section>
  );
}