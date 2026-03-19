"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cases } from "@/content/cases";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

export function CasesPreviewSection() {
  const previewCases = cases.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Cases
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-900">
              Resultaten die voor zich spreken
            </h2>
          </div>
          <Button href="/cases" variant="outline" size="md">
            Alle cases
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {previewCases.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-dark-100 p-6 hover:border-brand-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="default" className="mb-2">{c.industry}</Badge>
                  <h3 className="font-bold text-dark-900">{c.client}</h3>
                </div>
                <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {c.results.map((result, j) => (
                  <div key={j} className="text-center p-3 bg-dark-50 rounded-xl">
                    <div className="text-lg font-bold text-brand-600">{result.value}</div>
                    <div className="text-xs text-dark-500 mt-0.5">{result.metric}</div>
                  </div>
                ))}
              </div>

              <blockquote className="text-dark-500 text-sm italic leading-relaxed border-l-2 border-brand-200 pl-3">
                "{c.testimonial.quote.slice(0, 100)}..."
              </blockquote>
              <p className="text-xs text-dark-400 mt-2">
                — {c.testimonial.author}, {c.testimonial.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
