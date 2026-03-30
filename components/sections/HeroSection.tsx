"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center bg-dark-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-brand-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15)_0%,_transparent_60%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700">
              {t("hero.badge")}
            </Badge>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
            <br />
            <span className="text-brand-400">{t("hero.title3")}</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg lg:text-xl text-dark-300 max-w-2xl leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min"}
              external
              size="lg"
              variant="primary"
              className="group"
            >
              <Calendar className="w-5 h-5" />
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/offerte" size="lg" variant="outline" className="border-dark-700 text-white hover:bg-dark-800 hover:border-dark-600">
              <FileText className="w-5 h-5" />
              {t("hero.cta2")}
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center gap-6 text-sm text-dark-400"
          >
            {[t("hero.stat1"), t("hero.stat2"), t("hero.stat3")].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
