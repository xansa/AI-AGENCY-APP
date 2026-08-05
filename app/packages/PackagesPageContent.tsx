"use client";

import { useTranslation } from "@/lib/i18n";
import { PackagesV2 } from "@/components/sections/v2/PackagesV2";
import { FAQV2 } from "@/components/sections/v2/FAQV2";
import { ClosingCTAV2 } from "@/components/sections/v2/ClosingCTAV2";

export function PackagesPageContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[130%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.07),transparent_66%)] blur-3xl" />
        </div>
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("packagesPage.badge")}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {t("packagesPage.heading1")}{" "}
            <em className="italic">{t("packagesPage.heading2")}</em>
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {t("packagesPage.description")}
          </p>
        </div>
      </section>

      <PackagesV2 />
      <FAQV2 />
      <ClosingCTAV2 />
    </>
  );
}
