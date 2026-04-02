"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className="text-5xl lg:text-6xl font-bold text-slate-900 mb-2"
      >
        {value}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-slate-500 text-sm font-medium"
      >
        {label}
      </motion.p>
    </div>
  );
}

export function ResultsSection() {
  const { t } = useTranslation();

  const stats = [
    { value: t("results.stat1.value"), label: t("results.stat1.label") },
    { value: t("results.stat2.value"), label: t("results.stat2.label") },
    { value: t("results.stat3.value"), label: t("results.stat3.label") },
    { value: t("results.stat4.value"), label: t("results.stat4.label") },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {t("results.label")}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-slate-900 text-balance leading-tight">
            {t("results.heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={i}
              value={stat.value}
              label={stat.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
