"use client";

import { Button } from "@/components/ui/Button";
import { packages } from "@/content/packages";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslation, l, la } from "@/lib/i18n";

type PricingMode = "maandelijks" | "eenmalig";

export function PackagesPreviewSection() {
  const [mode, setMode] = useState<PricingMode>("maandelijks");
  const { t, locale } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("packages.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight mb-4">
            {t("packages.heading")}
          </h2>
          <p className="text-slate-500 text-lg">
            {t("packages.description")}
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative inline-flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-slate-900 shadow"
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                width: "calc(50% - 4px)",
                left: mode === "eenmalig" ? "4px" : "calc(50%)",
              }}
            />
            <button
              onClick={() => setMode("eenmalig")}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                mode === "eenmalig" ? "text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("packages.eenmalig")}
            </button>
            <button
              onClick={() => setMode("maandelijks")}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                mode === "maandelijks" ? "text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t("packages.maandelijks")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => {
            const isMonthly = mode === "maandelijks";
            const deliverables = isMonthly
              ? la(pkg, "deliverables", locale)
              : la(pkg, "onetimeDeliverables", locale);

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 flex flex-col bg-white ${
                  pkg.highlighted
                    ? "border-accent shadow-xl shadow-accent/10 scale-[1.02]"
                    : "border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                      {t("packages.meestGekozen")}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{l(pkg, "tagline", locale)}</p>
                </div>

                {/* Price */}
                <div className="mb-6 min-h-[3.5rem] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMonthly ? (
                        <div>
                          <div className="text-3xl font-bold text-slate-900">
                            {pkg.monthlyInvestment}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {l(pkg, "duration", locale).split(",")[0].toLowerCase()}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl font-bold text-slate-900">
                            {pkg.onetimePrice}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {t("packages.eenmaligeInvestering")}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Deliverables */}
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={mode}
                    className="space-y-2.5 mb-8 flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {deliverables.slice(0, 5).map((d, j) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                    {deliverables.length > 5 && (
                      <li className="text-sm text-slate-400 pl-6.5">
                        + {deliverables.length - 5} {t("packages.meer")}
                      </li>
                    )}
                  </motion.ul>
                </AnimatePresence>

                <div className="space-y-2 mt-auto">
                  <Button
                    href="/offerte"
                    size="md"
                    className={`w-full rounded-full ${
                      pkg.highlighted
                        ? "bg-accent hover:bg-accent-dark border-accent text-white shadow-lg shadow-accent/20"
                        : "bg-slate-900 hover:bg-slate-800 border-slate-900 text-white"
                    }`}
                  >
                    {t("packages.offerteAanvragen")}
                  </Button>
                  <Button
                    href={`/packages#${pkg.id}`}
                    size="sm"
                    variant="ghost"
                    className="w-full text-slate-500 rounded-full hover:text-slate-700"
                  >
                    {t("packages.meerDetails")}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
