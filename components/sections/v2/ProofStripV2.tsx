"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "24u",
    label: "Reactietijd",
  },
  {
    value: "0",
    label: "Overhead",
  },
  {
    value: "100%",
    label: "Code eigendom",
  },
];

export function ProofStripV2() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-cream py-16 md:py-20">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="hairline pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduce ? false : { y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <div className="font-serif text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.95] font-medium text-slate-ink tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-3 text-base font-semibold text-slate-ink/85 break-words">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
