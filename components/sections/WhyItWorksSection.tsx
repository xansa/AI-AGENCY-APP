"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function WhyItWorksSection() {
  const { t } = useTranslation();

  const reasons = [
    {
      title: t("why.1.title"),
      description: t("why.1.desc"),
      proof: t("why.1.proof"),
    },
    {
      title: t("why.2.title"),
      description: t("why.2.desc"),
      proof: t("why.2.proof"),
    },
    {
      title: t("why.3.title"),
      description: t("why.3.desc"),
      proof: t("why.3.proof"),
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("why.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight mb-4">
            {t("why.heading")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t("why.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-11 h-11 bg-accent/8 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {reason.description}
              </p>
              <div className="border-t border-slate-100 pt-4 mt-6">
                <p className="text-accent text-xs font-medium">{reason.proof}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
