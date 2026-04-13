"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function WerkwijzeSection() {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("werkwijze.1.title"),
      description: t("werkwijze.1.desc"),
    },
    {
      number: "02",
      title: t("werkwijze.2.title"),
      description: t("werkwijze.2.desc"),
    },
    {
      number: "03",
      title: t("werkwijze.3.title"),
      description: t("werkwijze.3.desc"),
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("werkwijze.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight">
            {t("werkwijze.heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] h-px bg-slate-200" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl font-black text-slate-100 mb-5 leading-none select-none">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
