"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "6", label: "Digitale disciplines" },
  { value: "100%", label: "Direct contact" },
  { value: "48u", label: "Reactietijd" },
  { value: "0", label: "Verborgen kosten" },
];

export function SocialProofSection() {
  return (
    <section className="bg-dark-900 border-y border-dark-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-dark-400 text-sm font-medium mb-10 uppercase tracking-widest">
          Eén partner voor al je digitale behoeften
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-dark-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
