"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function ComparisonSection() {
  const { t } = useTranslation();

  const rows = [
    t("comparison.row1"),
    t("comparison.row2"),
    t("comparison.row3"),
    t("comparison.row4"),
    t("comparison.row5"),
    t("comparison.row6"),
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("comparison.label")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-text">
            {t("comparison.heading")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/5 border-b border-white/10">
            <div className="py-4 px-6 col-span-1" />
            <div className="py-4 px-6 text-center text-sm font-semibold text-text-muted border-l border-white/10">
              {t("comparison.traditional")}
            </div>
            <div className="py-4 px-6 text-center text-sm font-bold text-accent border-l border-white/10 bg-accent/10">
              {t("comparison.arka")}
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
            >
              <div className="py-4 px-6 text-sm text-text font-medium flex items-center">
                {row}
              </div>
              <div className="py-4 px-6 flex items-center justify-center border-l border-white/5">
                <X className="w-5 h-5 text-red-400/70" />
              </div>
              <div className="py-4 px-6 flex items-center justify-center border-l border-white/5 bg-accent/5">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
