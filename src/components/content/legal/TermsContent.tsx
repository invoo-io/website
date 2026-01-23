import { getTranslations } from "next-intl/server";

interface TermsContentProps {
  locale: string;
}

export default async function TermsContent({ locale }: TermsContentProps) {
  const t = await getTranslations({ locale, namespace: "terms" });

  const renderParagraphs = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-secondary leading-relaxed mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  const renderList = (items: string[]) => {
    return (
      <ul className="space-y-2 list-disc list-inside ml-4">
        {items.map((item, index) => (
          <li key={index} className="text-secondary leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="min-h-screen bg-background-primary py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-primary mb-6">{t("title")}</h1>
        <p className="text-sm text-secondary mb-12">
          {t("lastUpdated")}
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <div>
            {renderParagraphs(t("intro"))}
          </div>

          {/* Definitions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("definitions.title")}</h2>
            {renderParagraphs(t("definitions.intro"))}

            <div className="space-y-6 mt-6">
              {/* Invoo Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.invoo.title")}</h3>
                {renderParagraphs(t("definitions.invoo.content"))}
              </div>

              {/* User Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.user.title")}</h3>
                {renderParagraphs(t("definitions.user.content"))}
              </div>

              {/* SIF Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.sif.title")}</h3>
                {renderParagraphs(t("definitions.sif.content"))}
              </div>

              {/* Verifacti Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.verifacti.title")}</h3>
                {renderParagraphs(t("definitions.verifacti.content"))}
                <div className="mt-3">
                  {renderList(t.raw("definitions.verifacti.items"))}
                </div>
                <div className="mt-3">
                  {renderParagraphs(t("definitions.verifacti.note"))}
                </div>
              </div>

              {/* Invoice Record Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.invoiceRecord.title")}</h3>
                {renderParagraphs(t("definitions.invoiceRecord.content"))}
              </div>

              {/* Tax Administration Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.taxAdmin.title")}</h3>
                {renderParagraphs(t("definitions.taxAdmin.content"))}
              </div>

              {/* Gestoría Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.gestoria.title")}</h3>
                {renderParagraphs(t("definitions.gestoria.content"))}
              </div>

              {/* User Data Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.userData.title")}</h3>
                {renderParagraphs(t("definitions.userData.content"))}
              </div>

              {/* Plans Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.plans.title")}</h3>
                {renderParagraphs(t("definitions.plans.content"))}
              </div>

              {/* Law Definition */}
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("definitions.law.title")}</h3>
                {renderParagraphs(t("definitions.law.content"))}
              </div>
            </div>
          </div>

          {/* Object of Contract and Service Description */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("object.title")}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.contractObject.title")}</h3>
                {renderParagraphs(t("object.contractObject.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.serviceDescription.title")}</h3>
                {renderParagraphs(t("object.serviceDescription.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.serviceNature.title")}</h3>
                {renderParagraphs(t("object.serviceNature.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.noAdvice.title")}</h3>
                {renderParagraphs(t("object.noAdvice.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.serviceEvolution.title")}</h3>
                {renderParagraphs(t("object.serviceEvolution.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.verifactuRelation.title")}</h3>
                {renderParagraphs(t("object.verifactuRelation.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("object.externalProviders.title")}</h3>
                {renderParagraphs(t("object.externalProviders.content"))}
              </div>
            </div>
          </div>

          {/* Account Registration and Professional Use */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("registration.title")}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("registration.accountCreation.title")}</h3>
                {renderParagraphs(t("registration.accountCreation.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("registration.professionalNature.title")}</h3>
                {renderParagraphs(t("registration.professionalNature.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("registration.accountLimits.title")}</h3>
                {renderParagraphs(t("registration.accountLimits.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("registration.properUse.title")}</h3>
                {renderParagraphs(t("registration.properUse.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("registration.paidPlans.title")}</h3>
                {renderParagraphs(t("registration.paidPlans.content"))}
              </div>
            </div>
          </div>

          {/* Pricing and Payments */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("pricing.title")}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("pricing.plansAndFees.title")}</h3>
                {renderParagraphs(t("pricing.plansAndFees.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("pricing.billingAndPayment.title")}</h3>
                {renderParagraphs(t("pricing.billingAndPayment.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("pricing.renewal.title")}</h3>
                {renderParagraphs(t("pricing.renewal.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("pricing.priceChanges.title")}</h3>
                {renderParagraphs(t("pricing.priceChanges.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("pricing.refunds.title")}</h3>
                {renderParagraphs(t("pricing.refunds.content"))}
              </div>
            </div>
          </div>

          {/* User Obligations */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("userObligations.title")}</h2>
            {renderParagraphs(t("userObligations.content"))}
          </div>

          {/* Verifacti Integration */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("verifactiIntegration.title")}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("verifactiIntegration.technicalIntegration.title")}</h3>
                {renderParagraphs(t("verifactiIntegration.technicalIntegration.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("verifactiIntegration.recordSubmission.title")}</h3>
                {renderParagraphs(t("verifactiIntegration.recordSubmission.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("verifactiIntegration.thirdPartyDependency.title")}</h3>
                {renderParagraphs(t("verifactiIntegration.thirdPartyDependency.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("verifactiIntegration.dataQuality.title")}</h3>
                {renderParagraphs(t("verifactiIntegration.dataQuality.content"))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">{t("verifactiIntegration.regulatoryEvolution.title")}</h3>
                {renderParagraphs(t("verifactiIntegration.regulatoryEvolution.content"))}
              </div>
            </div>
          </div>

          {/* Gestoría Access */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("gestoriaAccess.title")}</h2>
            {renderParagraphs(t("gestoriaAccess.content"))}
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("intellectualProperty.title")}</h2>
            {renderParagraphs(t("intellectualProperty.content"))}
          </div>

          {/* Service Availability */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("serviceAvailability.title")}</h2>
            {renderParagraphs(t("serviceAvailability.content"))}
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("liability.title")}</h2>
            {renderParagraphs(t("liability.content"))}
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("indemnification.title")}</h2>
            {renderParagraphs(t("indemnification.content"))}
          </div>

          {/* Contract Termination */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("termination.title")}</h2>
            {renderParagraphs(t("termination.content"))}
          </div>

          {/* Governing Law and Jurisdiction */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("governingLaw.title")}</h2>
            {renderParagraphs(t("governingLaw.content"))}
          </div>

          {/* Modifications to Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("modifications.title")}</h2>
            {renderParagraphs(t("modifications.content"))}
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">{t("contact.title")}</h2>
            {renderParagraphs(t("contact.content"))}
            <div className="p-4 bg-background-secondary rounded-lg mt-4">
              {renderParagraphs(t("contact.details"))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
