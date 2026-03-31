"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
    <section className="py-20 lg:py-28 bg-white" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
            {t("packages.label")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-900">
            {t("packages.heading")}
          </h2>
          <p className="mt-4 text-dark-500">
            {t("packages.description")}
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative inline-flex bg-dark-100 rounded-xl p-1">
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg bg-brand-600 shadow-lg"
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                width: "calc(50% - 4px)",
                left: mode === "eenmalig" ? "4px" : "calc(50%)",
              }}
            />
            <button
              onClick={() => setMode("eenmalig")}
              className={`relative z-10 px-5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                mode === "eenmalig"
                  ? "text-white"
                  : "text-dark-600 hover:text-dark-900"
              }`}
            >
              {t("packages.eenmalig")}
            </button>
            <button
              onClick={() => setMode("maandelijks")}
              className={`relative z-10 px-5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                mode === "maandelijks"
                  ? "text-white"
                  : "text-dark-600 hover:text-dark-900"
              }`}
            >
              {t("packages.maandelijks")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  pkg.highlighted
                    ? "border-brand-500 bg-brand-50 shadow-xl shadow-brand-100"
                    : "border-dark-100 bg-white"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="brand" className="px-4">
                      {t("packages.meestGekozen")}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-dark-900">
                    {pkg.name}
                  </h3>
                  <p className="text-dark-500 text-sm mt-1">{l(pkg, "tagline", locale)}</p>
                </div>

                {/* Price — animated */}
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
                          <div className="text-2xl font-bold text-dark-900">
                            {pkg.monthlyInvestment}
                          </div>
                          <div className="text-xs text-dark-500 mt-0.5">
                            {l(pkg, "duration", locale).split(",")[0].toLowerCase()}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-2xl font-bold text-dark-900">
                            {pkg.onetimePrice}
                          </div>
                          <div className="text-xs text-dark-500 mt-0.5">
                            {t("packages.eenmaligeInvestering")}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Deliverables — animated */}
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={mode}
                    className="space-y-2 mb-8 flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {deliverables.slice(0, 5).map((d, j) => (
                      <motion.li
                        key={d}
                        className="flex items-start gap-2 text-sm text-dark-600"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: j * 0.03 }}
                      >
                        <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        {d}
                      </motion.li>
                    ))}
                    {deliverables.length > 5 && (
                      <li className="text-sm text-dark-400 pl-6">
                        + {deliverables.length - 5} {t("packages.meer")}
                      </li>
                    )}
                  </motion.ul>
                </AnimatePresence>

                <div className="space-y-2 mt-auto">
                  <Button
                    href="/offerte"
                    size="md"
                    variant={pkg.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    {t("packages.offerteAanvragen")}
                  </Button>
                  <Button
                    href={`/packages#${pkg.id}`}
                    size="sm"
                    variant="ghost"
                    className="w-full text-dark-500"
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
