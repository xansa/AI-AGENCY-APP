"use client";

import { cases } from "@/content/cases";
import { useTranslation, l } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

// Use only testimonials from real cases
export function TestimonialsV2() {
  const { locale } = useTranslation();
  const reduce = useReducedMotion();
  const realTestimonials = cases.filter((c) => !c.isExample).map((c) => ({
    quote: l(c.testimonial, "quote", locale),
    author: c.testimonial.author,
    role: l(c.testimonial, "role", locale),
    industry: l(c, "industry", locale),
  }));

  if (realTestimonials.length === 0) return null;

  return (
    <section className="relative bg-cream-deep py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            Wat klanten zeggen
          </p>
          <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight text-balance">
            Directe samenwerking, <em className="italic">directe</em> resultaten.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {realTestimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 relative bg-cream rounded-2xl ring-1 ring-slate-950/8 p-8 md:p-10"
            >
              <span className="absolute top-6 right-8 font-serif text-[5rem] leading-none text-slate-ink/8 select-none pointer-events-none">
                &ldquo;
              </span>
              <blockquote className="relative font-serif text-[22px] md:text-[24px] leading-[1.35] text-slate-ink/90 text-pretty">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-slate-950/8 flex items-center justify-between gap-3 min-w-0">
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-slate-ink truncate">{t.author}</div>
                  <div className="text-[12px] text-slate-meta truncate">{t.role}</div>
                </div>
                <span className="shrink-0 text-[10.5px] font-mono uppercase tracking-wider text-slate-meta">
                  {t.industry}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
