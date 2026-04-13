"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function LeadMagnetSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-[#0F172A] relative overflow-hidden noise-overlay">
      {/* Animated gradient blobs */}
      <div className="blob blob-2 w-[350px] h-[350px] bg-blue-500/20 -top-20 right-10" />
      <div className="blob blob-1 w-[300px] h-[300px] bg-cyan-400/15 bottom-0 -left-10" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />

      {/* Top fade from light to dark */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-slate-300 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            {t("lead.badge")}
          </div>

          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white text-balance leading-tight mb-6">
            {t("lead.heading1")}
            <br />
            <span className="italic">{t("lead.heading2")}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            {t("lead.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min"}
              external
              size="lg"
              className="rounded-full bg-white text-slate-900 hover:bg-slate-100 border-white font-semibold group"
            >
              <Calendar className="w-5 h-5" />
              {t("lead.cta1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              href="/offerte"
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              {t("lead.cta2")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
