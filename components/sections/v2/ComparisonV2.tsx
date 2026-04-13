"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function ComparisonV2() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const rows = [
    t("comparison.row1"),
    t("comparison.row2"),
    t("comparison.row3"),
    t("comparison.row4"),
    t("comparison.row5"),
    t("comparison.row6"),
  ];

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {t("comparison.label")}
          </p>
          <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight text-balance">
            {t("comparison.heading")}
          </h2>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl ring-1 ring-slate-950/10 overflow-hidden bg-cream-deep">
            {/* Header row */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-slate-ink/[0.03] border-b border-slate-950/10">
              <div className="py-5 px-6" />
              <div className="py-5 px-6 text-center text-[11px] font-semibold text-slate-meta uppercase tracking-wider border-l border-slate-950/10">
                {t("comparison.traditional")}
              </div>
              <div className="py-5 px-6 text-center text-[11px] font-semibold text-slate-ink uppercase tracking-wider border-l border-slate-950/10 bg-arka/5">
                {t("comparison.arka")}
              </div>
            </div>

            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-slate-950/8 last:border-0"
              >
                <div className="py-5 px-6 text-[14.5px] text-slate-ink font-medium flex items-center min-w-0">
                  <span className="break-words">{row}</span>
                </div>
                <div className="py-5 px-6 flex items-center justify-center border-l border-slate-950/8">
                  <X className="w-5 h-5 text-slate-meta/60" strokeWidth={1.75} />
                </div>
                <div className="py-5 px-6 flex items-center justify-center border-l border-slate-950/8 bg-arka/[0.04]">
                  <Check className="w-5 h-5 text-arka" strokeWidth={2} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
