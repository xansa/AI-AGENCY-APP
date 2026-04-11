"use client";

import { useTranslation } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

export function ContactPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("contact.badge")}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-3xl text-balance">
            {t("contact.heading")}
          </h1>
          <p className="mt-6 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-xl text-pretty">
            {t("contact.description")}
          </p>
        </div>
      </section>

      <section className="relative bg-cream pb-24 md:pb-32">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
