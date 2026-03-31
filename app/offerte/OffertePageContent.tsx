"use client";

import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";
import { OfferteForm } from "./OfferteForm";

export function OffertePageContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-dark-950 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            {t("offerte.badge")}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("offerte.heading")}
          </h1>
          <p className="text-dark-400 max-w-xl leading-relaxed">
            {t("offerte.description")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-dark-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfferteForm />
        </div>
      </section>
    </>
  );
}
