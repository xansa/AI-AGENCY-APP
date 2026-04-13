"use client";

import { packages } from "@/content/packages";
import { useTranslation, l, la } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PackagesV2() {
  const { locale } = useTranslation();
  const [billing, setBilling] = useState<"monthly" | "onetime">("monthly");
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 canvas-grid opacity-[0.035] pointer-events-none" />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-7">
            <p className="text-overline uppercase text-cream/40 font-semibold mb-6">
              <span className="inline-block w-6 border-t border-cream/30 mr-3 align-middle" />
              Packages
            </p>
            <h2 className="font-serif font-medium text-h1 text-cream tracking-tight text-balance">
              Drie paden, <em className="italic">een</em> doel.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-cream/60 text-[17px] leading-relaxed text-pretty">
              Kies een maandelijks pakket voor doorlopende groei, of een eenmalig project als je een duidelijke afbakening hebt. Alles maatwerk.
            </p>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center mb-14">
          <div className="inline-flex items-center p-1 rounded-full bg-cream/5 ring-1 ring-cream/10">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-200",
                billing === "monthly"
                  ? "bg-cream text-ink"
                  : "text-cream/60 hover:text-cream"
              )}
            >
              Maandelijks
            </button>
            <button
              onClick={() => setBilling("onetime")}
              className={cn(
                "px-5 py-2 text-[13px] font-semibold rounded-full transition-all duration-200",
                billing === "onetime"
                  ? "bg-cream text-ink"
                  : "text-cream/60 hover:text-cream"
              )}
            >
              Eenmalig
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => {
            const price = billing === "monthly" ? pkg.monthlyInvestment : pkg.onetimePrice;
            const items = billing === "monthly" ? la(pkg, "deliverables", locale) : la(pkg, "onetimeDeliverables", locale);
            const highlighted = pkg.highlighted;
            return (
              <motion.div
                key={pkg.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative min-w-0 flex flex-col rounded-2xl p-8 md:p-10 ring-1 transition-all duration-300",
                  highlighted
                    ? "bg-cream text-ink ring-arka/40"
                    : "bg-cream/[0.035] text-cream ring-cream/10 hover:ring-cream/20"
                )}
              >
                {highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-arka text-white text-[11px] font-semibold tracking-wide uppercase">
                    Populair
                  </div>
                )}

                <div className="flex items-baseline justify-between mb-6">
                  <h3 className={cn(
                    "font-serif text-[1.75rem] leading-none font-medium tracking-tight",
                    highlighted ? "text-ink" : "text-cream"
                  )}>
                    {pkg.name}
                  </h3>
                  <span className={cn(
                    "text-[11px] font-mono uppercase tracking-wider",
                    highlighted ? "text-ink/50" : "text-cream/40"
                  )}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className={cn(
                  "text-[14px] leading-relaxed mb-8 text-pretty",
                  highlighted ? "text-ink/70" : "text-cream/60"
                )}>
                  {l(pkg, "tagline", locale)}
                </p>

                <div className={cn(
                  "mb-8 pb-6 border-b",
                  highlighted ? "border-ink/10" : "border-cream/10"
                )}>
                  <div className={cn(
                    "font-serif text-[2rem] md:text-[2.25rem] leading-[1.05] font-medium tracking-tight break-words",
                    highlighted ? "text-ink" : "text-cream"
                  )}>
                    {price}
                  </div>
                  <div className={cn(
                    "mt-2 text-[11.5px] uppercase tracking-wide font-semibold",
                    highlighted ? "text-ink/50" : "text-cream/40"
                  )}>
                    Voor: {l(pkg, "forWho", locale)}
                  </div>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {items.slice(0, 6).map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[13.5px] leading-snug min-w-0">
                      <Check className={cn(
                        "w-4 h-4 mt-0.5 flex-shrink-0",
                        highlighted ? "text-arka" : "text-arka"
                      )} strokeWidth={2} />
                      <span className={cn(
                        "break-words",
                        highlighted ? "text-ink/80" : "text-cream/75"
                      )}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/offerte"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-[13px] font-semibold transition-colors",
                    highlighted
                      ? "bg-ink text-cream hover:bg-ink-light"
                      : "bg-cream text-ink hover:bg-cream-deep"
                  )}
                >
                  Start met {pkg.name}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
