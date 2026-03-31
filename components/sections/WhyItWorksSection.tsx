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
    <section className="py-20 lg:py-28 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">
            {t("why.label")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            {t("why.heading")}
          </h2>
          <p className="mt-4 text-dark-400 leading-relaxed">
            {t("why.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-8 rounded-2xl border border-dark-700 bg-dark-900 flex flex-col"
            >
              <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed flex-1">
                {reason.description}
              </p>
              <div className="border-t border-dark-700 pt-4 mt-6">
                <p className="text-brand-400 text-xs font-medium">{reason.proof}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
