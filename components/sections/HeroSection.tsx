"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useTranslation();

  const headingWords = t("hero.heading").split(" ");

  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#0F172A] overflow-hidden noise-overlay">
      {/* Animated gradient blobs */}
      <div className="blob blob-1 w-[500px] h-[500px] bg-blue-500/30 -top-40 -left-20" />
      <div className="blob blob-2 w-[400px] h-[400px] bg-cyan-400/20 top-1/3 right-0" />
      <div className="blob blob-3 w-[350px] h-[350px] bg-indigo-500/20 bottom-0 left-1/3" />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(59,130,246,0.12)_0%,transparent_70%)]" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 lg:py-44">
        <div className="max-w-4xl mx-auto text-center">

          {/* Per-word blur-in heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] text-white leading-[1.08] tracking-tight text-balance mb-8">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.045, ease: "easeOut" }}
                className="inline-block mr-[0.25em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min"}
              external
              size="lg"
              variant="primary"
              className="rounded-full bg-accent hover:bg-accent-dark border-accent shadow-lg shadow-accent/20 group"
            >
              <Calendar className="w-5 h-5" />
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              href="/diensten"
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              {t("hero.cta2nav")}
            </Button>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500"
          >
            {[t("hero.stat1"), t("hero.stat2"), t("hero.stat3")].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
