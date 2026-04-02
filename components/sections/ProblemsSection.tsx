"use client";

import { motion } from "framer-motion";
import { Globe, Search, Clock, BarChart2, Palette } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function ProblemsSection() {
  const { t } = useTranslation();

  const problems = [
    {
      icon: Globe,
      title: t("problems.1.title"),
      description: t("problems.1.desc"),
    },
    {
      icon: Search,
      title: t("problems.2.title"),
      description: t("problems.2.desc"),
    },
    {
      icon: Clock,
      title: t("problems.3.title"),
      description: t("problems.3.desc"),
    },
    {
      icon: BarChart2,
      title: t("problems.4.title"),
      description: t("problems.4.desc"),
    },
    {
      icon: Palette,
      title: t("problems.5.title"),
      description: t("problems.5.desc"),
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
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("problems.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight mb-4">
            {t("problems.heading")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t("problems.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.slice(0, 3).map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                <problem.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{problem.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[calc(66.666%+10px)] lg:max-w-none mx-auto">
          {problems.slice(3).map((problem, i) => (
            <motion.div
              key={i + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 3) * 0.08 }}
              className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                <problem.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">{problem.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
