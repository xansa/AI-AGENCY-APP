"use client";

import { services } from "@/content/services";
import { useTranslation, l } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Search,
  Bot,
  BarChart3,
  Target,
  Palette,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "websites-webshops": Globe,
  "seo-content": Search,
  "ai-chatbots-automatisering": Bot,
  "dashboards-data": BarChart3,
  "lead-generation": Target,
  "branding-design": Palette,
};

export function ServicesV2() {
  const { locale } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section header, asymmetric editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Wat we doen
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight text-balance">
              Zes disciplines, <em className="italic">een</em> aanspreekpunt.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="text-slate-muted text-[17px] leading-relaxed max-w-lg text-pretty">
              Van technische bouw tot strategie en design. Alles wat normaal verspreid zit over drie bureaus, geleverd door een persoon die elk onderdeel zelf bouwt en oplevert.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-line rounded-2xl overflow-hidden ring-1 ring-slate-950/8">
          {services.map((service, i) => {
            const Icon = iconMap[service.slug] ?? Globe;
            return (
              <motion.div
                key={service.slug}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <Link
                  href={`/diensten/${service.slug}`}
                  className="group relative flex flex-col h-full bg-cream p-8 md:p-10 transition-colors duration-300 hover:bg-cream-deep"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-11 h-11 rounded-xl bg-slate-950/5 ring-1 ring-slate-950/8 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-ink" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-meta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-serif text-[1.5rem] md:text-[1.65rem] leading-[1.1] font-medium text-slate-ink tracking-tight mb-3 break-words">
                    {l(service, "title", locale)}
                  </h3>

                  <p className="text-[14.5px] leading-relaxed text-slate-muted line-clamp-3 min-h-[4.5em]">
                    {l(service, "description", locale)}
                  </p>

                  <div className="flex-1" />

                  <div className="mt-8 pt-6 border-t border-slate-950/8 flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-slate-ink tracking-wide">
                      Meer bekijken
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-muted transition-all duration-300 group-hover:text-arka group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
