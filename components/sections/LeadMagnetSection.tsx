"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function LeadMagnetSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-brand-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            {t("lead.badge")}
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t("lead.heading1")}
            <br />
            {t("lead.heading2")}
          </h2>
          <p className="text-brand-200 max-w-xl mx-auto mb-10 leading-relaxed">
            {t("lead.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min"}
              external
              size="lg"
              variant="secondary"
              className="bg-white text-brand-700 hover:bg-brand-50 border-white shadow-lg"
            >
              <Calendar className="w-5 h-5" />
              {t("lead.cta1")}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="/offerte"
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
            >
              {t("lead.cta2")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
