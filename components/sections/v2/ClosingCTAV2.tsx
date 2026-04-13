"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export function ClosingCTAV2() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-cream py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hairline-strong pt-16 md:pt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                Start
              </p>
              <h2 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.02] text-balance">
                Laten we <em className="italic">praten</em>
                <span className="text-arka">.</span>
              </h2>
              <p className="mt-6 text-slate-muted text-[17px] leading-relaxed max-w-xl text-pretty">
                Dertig minuten, gratis en zonder verplichtingen. Ik luister, stel scherpe vragen en zeg eerlijk of ik je kan helpen.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right space-y-3">
              <div className="flex lg:justify-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-ink-light transition-colors"
                >
                  Plan kennismaking
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <div className="flex lg:justify-end gap-4 text-[13px] text-slate-muted pt-4">
                <a href="mailto:info@arkadigital.nl" className="inline-flex items-center gap-1.5 hover:text-slate-ink transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  info@arkadigital.nl
                </a>
                <a href="tel:+31646140986" className="inline-flex items-center gap-1.5 hover:text-slate-ink transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  +31 6 46140986
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
