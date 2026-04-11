"use client";

import { faqItems } from "@/content/faq";
import { useTranslation, l } from "@/lib/i18n";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export function FAQV2() {
  const { locale } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const shown = faqItems.slice(0, 6);

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-5">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Veelgestelde vragen
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight text-balance">
              Antwoorden, <em className="italic">zonder</em> het kleine lettertjeswerk.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="text-slate-muted text-[17px] leading-relaxed max-w-lg text-pretty">
              Nog iets anders? Mail direct naar info@arkadigital.nl of plan een gesprek. Ik beantwoord alles zelf.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {shown.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="border-t border-slate-950/10 last:border-b"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 md:py-7 flex items-center justify-between gap-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-5 min-w-0 flex-1">
                    <span className="text-[11px] font-mono text-slate-meta shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[20px] md:text-[24px] leading-tight text-slate-ink font-medium break-words">
                      {l(item, "question", locale)}
                    </span>
                  </span>
                  <span className="shrink-0 w-9 h-9 rounded-full ring-1 ring-slate-950/10 flex items-center justify-center text-slate-ink group-hover:bg-slate-950/5 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-[3.25rem] pr-12">
                        <p className="text-[15px] leading-relaxed text-slate-muted text-pretty max-w-2xl">
                          {l(item, "answer", locale)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
