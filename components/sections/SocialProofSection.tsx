"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function SocialProofSection() {
  const { t } = useTranslation();

  const stats = [
    { value: "6", label: t("social.stat1") },
    { value: "100%", label: t("social.stat2") },
    { value: "24u", label: t("social.stat3") },
    { value: "€0", label: t("social.stat4") },
  ];

  return (
    <section className="border-y border-slate-200 bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-xs font-semibold mb-10 uppercase tracking-widest">
          {t("social.heading")}
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-1.5">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
