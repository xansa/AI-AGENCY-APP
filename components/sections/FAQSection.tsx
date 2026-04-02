"use client";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqItems } from "@/content/faq";
import { motion } from "framer-motion";
import { useTranslation, l } from "@/lib/i18n";

export function FAQSection() {
  const { t, locale } = useTranslation();
  const previewFaq = faqItems.slice(0, 8).map((item) => ({
    question: l(item, "question", locale),
    answer: l(item, "answer", locale),
  }));

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("faq.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight">
            {t("faq.heading")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 mb-8"
        >
          <Accordion items={previewFaq} />
        </motion.div>

        <div className="text-center">
          <Button href="/faq" variant="outline" size="md" className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50">
            {t("faq.alleVragen")}
          </Button>
        </div>
      </div>
    </section>
  );
}
