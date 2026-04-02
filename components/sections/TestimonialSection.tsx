"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function TestimonialSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-10 lg:p-14 text-center"
        >
          {/* Result badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {t("testimonial.badge")}
          </div>

          <blockquote className="font-serif text-3xl lg:text-4xl text-slate-900 italic leading-snug text-balance mb-8">
            &ldquo;{t("testimonial.quote")}&rdquo;
          </blockquote>

          <p className="text-slate-500 text-sm font-medium">
            {t("testimonial.author")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
