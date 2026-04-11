"use client";

import { faqItems } from "@/content/faq";
import Link from "next/link";
import { useTranslation, l } from "@/lib/i18n";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function FAQContent() {
  const { t, locale } = useTranslation();
  const reduce = useReducedMotion();

  const localizedItems = faqItems.map((item, idx) => ({
    idx,
    question: l(item, "question", locale),
    answer: l(item, "answer", locale),
    category: l(item, "category", locale),
  }));

  const categories = Array.from(
    new Set(localizedItems.map((f) => f.category).filter(Boolean))
  );

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("faq.label")}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {t("faq.heading")}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {t("faqPage.description")}
          </p>
        </div>
      </section>

      {/* FAQ stack */}
      <section className="relative bg-cream py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto">
            {categories.map((cat) => {
              const items = localizedItems.filter((f) => f.category === cat);
              return (
                <div key={cat} className="mb-16 last:mb-0">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-overline uppercase text-slate-meta font-semibold">
                      {cat}
                    </span>
                    <span className="flex-1 border-t border-slate-950/10" />
                  </div>
                  {items.map((item) => {
                    const isOpen = openIdx === item.idx;
                    return (
                      <motion.div
                        key={item.idx}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.45 }}
                        className="border-t border-slate-950/10 last:border-b"
                      >
                        <button
                          onClick={() => setOpenIdx(isOpen ? null : item.idx)}
                          className="w-full py-6 md:py-7 flex items-center justify-between gap-6 text-left group"
                          aria-expanded={isOpen}
                        >
                          <span className="font-serif text-[19px] md:text-[22px] leading-tight text-slate-ink font-medium break-words min-w-0 flex-1">
                            {item.question}
                          </span>
                          <span className="shrink-0 w-9 h-9 rounded-full ring-1 ring-slate-950/10 flex items-center justify-center text-slate-ink group-hover:bg-slate-950/5 transition-colors">
                            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-7 pr-12">
                                <p className="text-[15px] leading-relaxed text-slate-muted text-pretty max-w-3xl">
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative bg-ink text-cream py-24 md:py-32">
        <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />
        <div className="relative max-w-narrow mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.05] text-balance">
            {t("faqPage.ctaHeading")}
          </h2>
          <p className="mt-6 text-cream/60 text-[17px] leading-relaxed max-w-xl mx-auto text-pretty">
            {t("faqPage.ctaDescription")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
            >
              {t("faqPage.ctaButton")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
