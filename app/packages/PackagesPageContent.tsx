"use client";

import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";
import { PackagesContent } from "./PackagesContent";

export function PackagesPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            {t("packagesPage.badge")}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("packagesPage.heading1")}
            <br />
            {t("packagesPage.heading2")}
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto leading-relaxed">
            {t("packagesPage.description")}
          </p>
        </div>
      </section>

      <PackagesContent />
    </>
  );
}
