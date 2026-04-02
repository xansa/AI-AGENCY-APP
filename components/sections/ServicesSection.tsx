"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Search, Bot, BarChart3, Target, Palette } from "lucide-react";
import Link from "next/link";
import { services } from "@/content/services";
import { useTranslation, l } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Search,
  Bot,
  BarChart3,
  Target,
  Palette,
};

export function ServicesSection() {
  const { t, locale } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-white" id="diensten">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("services.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight mb-4">
            {t("services.heading")}
          </h2>
          <p className="text-slate-500 text-lg">
            {t("services.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/5 group-hover:border-accent/20 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {l(service, "title", locale)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {l(service, "description", locale)}
                </p>
                <Link
                  href={`/diensten/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors group-hover:gap-2.5"
                >
                  {t("services.meerInfo")}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
