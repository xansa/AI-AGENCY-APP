"use client";

import { Button } from "@/components/ui/Button";
import { cases } from "@/content/cases";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation, l } from "@/lib/i18n";

export function CasesPreviewSection() {
  const { t, locale } = useTranslation();
  const previewCases = cases.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              {t("cases.label")}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight">
              {t("cases.heading")}
            </h2>
          </div>
          <Button
            href="/cases"
            variant="outline"
            size="md"
            className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-100 flex-shrink-0"
          >
            {t("cases.alleCases")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {previewCases.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="inline-block text-xs font-medium text-accent bg-accent/8 px-3 py-1 rounded-full mb-2">
                    {l(c, "industry", locale)}
                  </span>
                  <h3 className="font-semibold text-slate-900">{c.client}</h3>
                </div>
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-accent/8 transition-colors flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {c.results.map((result, j) => (
                  <div key={j} className="text-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="text-lg font-bold text-accent">{result.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{l(result, "metric", locale)}</div>
                  </div>
                ))}
              </div>

              <blockquote className="text-slate-500 text-sm italic leading-relaxed border-l-2 border-slate-200 pl-3">
                &ldquo;{l(c.testimonial, "quote", locale).slice(0, 100)}...&rdquo;
              </blockquote>
              <p className="text-xs text-slate-400 mt-2">
                &ndash; {c.testimonial.author}, {l(c.testimonial, "role", locale)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
