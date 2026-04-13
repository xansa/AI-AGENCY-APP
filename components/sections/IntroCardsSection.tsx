"use client";

import { motion } from "framer-motion";
import { Layers, MessageCircle, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function IntroCardsSection() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Layers,
      title: t("intro.card1.title"),
      desc: t("intro.card1.desc"),
    },
    {
      icon: MessageCircle,
      title: t("intro.card2.title"),
      desc: t("intro.card2.desc"),
    },
    {
      icon: TrendingUp,
      title: t("intro.card3.title"),
      desc: t("intro.card3.desc"),
    },
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Decorative accent blob */}
      <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-100/40 to-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.1)] transition-shadow duration-500"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-cyan-500/10 border border-accent/20 rounded-xl flex items-center justify-center mb-6">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {card.title}
              </h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
