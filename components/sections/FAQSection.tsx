"use client";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { faqItems } from "@/content/faq";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function FAQSection() {
  const { t } = useTranslation();
  const previewFaq = faqItems.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-dark-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
            {t("faq.label")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-900">
            {t("faq.heading")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-dark-100 p-6 mb-8"
        >
          <Accordion items={previewFaq} />
        </motion.div>

        <div className="text-center">
          <Button href="/faq" variant="outline" size="md">
            {t("faq.alleVragen")}
          </Button>
        </div>
      </div>
    </section>
  );
}
