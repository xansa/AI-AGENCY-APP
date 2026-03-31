"use client";

import { packages } from "@/content/packages";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, Calendar, FileText, Clock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, l, la } from "@/lib/i18n";

type PricingMode = "maandelijks" | "eenmalig";

function PricingToggle({
  mode,
  onChange,
  labels,
}: {
  mode: PricingMode;
  onChange: (mode: PricingMode) => void;
  labels: { eenmalig: string; maandelijks: string };
}) {
  return (
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
          onClick={() => onChange("eenmalig")}
          className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
            mode === "eenmalig"
              ? "text-white"
              : "text-dark-600 hover:text-dark-900"
          }`}
        >
          {labels.eenmalig}
        </button>
        <button
          onClick={() => onChange("maandelijks")}
          className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
            mode === "maandelijks"
              ? "text-white"
              : "text-dark-600 hover:text-dark-900"
          }`}
        >
          {labels.maandelijks}
        </button>
      </div>
    </div>
  );
}

export function PackagesContent() {
  const [mode, setMode] = useState<PricingMode>("maandelijks");
  const { t, locale } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingToggle
          mode={mode}
          onChange={setMode}
          labels={{
            eenmalig: t("packages.eenmalig"),
            maandelijks: t("packages.maandelijks"),
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const isMonthly = mode === "maandelijks";
            const deliverables = isMonthly
              ? la(pkg, "deliverables", locale)
              : la(pkg, "onetimeDeliverables", locale);

            return (
              <div
                key={pkg.id}
                id={pkg.id}
                className={`rounded-2xl border p-8 flex flex-col relative ${
                  pkg.highlighted
                    ? "border-brand-500 shadow-xl shadow-brand-100"
                    : "border-dark-200"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="brand">{t("packages.meestGekozen")}</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-dark-900">
                    {pkg.name}
                  </h2>
                  <p className="text-dark-500 text-sm mt-1">{l(pkg, "tagline", locale)}</p>

                  {/* Price */}
                  <div className="mt-4 min-h-[4.5rem] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isMonthly ? (
                          <div>
                            <div className="text-2xl font-bold text-brand-600">
                              {pkg.monthlyInvestment}
                            </div>
                            <div className="text-sm text-dark-500 mt-1">
                              {l(pkg, "duration", locale).split(",")[0].toLowerCase()}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-2xl font-bold text-brand-600">
                              {pkg.onetimePrice}
                            </div>
                            <div className="text-sm text-dark-500 mt-1">
                              {t("packages.eenmaligeInvestering")}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* For who */}
                <div className="p-4 bg-dark-50 rounded-xl mb-6">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-1">
                    {t("packages.voorWie")}
                  </p>
                  <p className="text-dark-700 text-sm">{l(pkg, "forWho", locale)}</p>
                </div>

                {/* Deliverables */}
                <div className="mb-6 flex-1">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">
                    {isMonthly ? t("packages.inbegrepen") : t("packages.watJeKrijgt")}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={mode}
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {deliverables.map((d, i) => (
                        <motion.li
                          key={d}
                          className="flex items-start gap-2 text-sm text-dark-700"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: i * 0.03 }}
                        >
                          <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                          {d}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>

                {/* KPIs (monthly) or Note (onetime) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMonthly ? (
                      <div className="p-4 bg-brand-50 rounded-xl mb-6">
                        <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mb-2">
                          {t("packages.kpisRapporteren")}
                        </p>
                        <ul className="space-y-1">
                          {la(pkg, "kpis", locale).map((kpi, i) => (
                            <li
                              key={i}
                              className="text-sm text-brand-700 flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                              {kpi}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-4 bg-dark-50 rounded-xl mb-6">
                        <p className="text-sm text-dark-600 leading-relaxed">
                          {l(pkg, "onetimeNote", locale)}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Commitment */}
                <div className="flex items-center gap-2 text-xs text-dark-400 mb-6">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isMonthly ? l(pkg, "duration", locale) : t("packages.eenmaligeOplevering")}</span>
                </div>

                {/* CTAs */}
                <div className="space-y-3 mt-auto">
                  <Button
                    href="/offerte"
                    size="md"
                    variant={pkg.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    <FileText className="w-4 h-4" />
                    {t("packages.offerteAanvragen")}
                  </Button>
                  <Button
                    href={
                      process.env.NEXT_PUBLIC_CALENDLY_URL ??
                      "https://calendly.com/arkaecom-proton/30min"
                    }
                    external
                    size="md"
                    variant="ghost"
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4" />
                    {t("packages.planIntake")}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
