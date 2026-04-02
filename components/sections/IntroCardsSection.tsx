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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center mb-5">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {card.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
