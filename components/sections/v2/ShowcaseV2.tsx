"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, TrendingUp, ArrowUp, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Product-visual showcase (moodboard: steep feature-pages). Coded mini-UIs on a dark
// canvas so they pop, showing concretely what clients get. Doubles as a bold "artstyle"
// break in the section rhythm.
export function ShowcaseV2() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[85%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.14),transparent_66%)] blur-3xl" />
      </div>

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl mb-14 md:mb-16">
          <p className="text-overline uppercase text-cream/40 font-semibold mb-6">
            <span className="inline-block w-6 border-t border-cream/30 mr-3 align-middle" />
            Wat je krijgt
          </p>
          <h2 className="font-serif font-medium text-h1 text-cream tracking-tight leading-[1.06] text-balance">
            Geen abstracte beloftes. <em className="italic">Werkende</em> systemen.
          </h2>
          <p className="mt-6 text-cream/60 text-[17px] leading-relaxed max-w-xl text-pretty">
            Zo ziet jouw digitale afdeling eruit in de praktijk: chatbots die antwoorden, content die rankt, en dashboards die je grip geven.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* ── Chatbot mockup ── */}
          <motion.div {...reveal(0)} className="min-w-0">
            <div className="group rounded-2xl bg-white text-slate-ink ring-1 ring-white/10 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)] p-5 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-arka/10">
                  <Bot className="w-4 h-4 text-arka" strokeWidth={2} />
                </span>
                <span className="text-[12px] font-semibold text-slate-ink">Arka Assistent</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2.5 flex-1">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-ink text-cream text-[12.5px] px-3.5 py-2">
                  Wat kost een nieuwe website?
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-cream-deep text-slate-ink/85 text-[12.5px] px-3.5 py-2">
                  Vanaf €750/mnd of €2.000 eenmalig. Zal ik een voorstel op maat maken?
                </div>
                <div className="ml-auto max-w-[60%] rounded-2xl rounded-br-sm bg-ink text-cream text-[12.5px] px-3.5 py-2">
                  Graag!
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-full bg-cream-deep px-3.5 py-2">
                <span className="text-[12px] text-slate-meta">Typ een bericht…</span>
                <span className="ml-auto w-6 h-6 rounded-full bg-arka" />
              </div>
            </div>
            <p className="mt-4 text-[13.5px] text-cream/70">
              <span className="font-semibold text-cream">AI-chatbot</span> die 24/7 vragen beantwoordt en leads kwalificeert.
            </p>
          </motion.div>

          {/* ── SEO ranking mockup ── */}
          <motion.div {...reveal(0.1)} className="min-w-0">
            <div className="group rounded-2xl bg-white text-slate-ink ring-1 ring-white/10 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)] p-5 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-semibold text-slate-ink">Google-posities</span>
                <TrendingUp className="w-4 h-4 text-arka" strokeWidth={2} />
              </div>
              <div className="space-y-2.5 flex-1">
                {[
                  { k: "webdesign dordrecht", p: 1, up: 6 },
                  { k: "seo bureau", p: 3, up: 4 },
                  { k: "ai chatbot laten maken", p: 2, up: 9 },
                  { k: "website laten maken", p: 5, up: 3 },
                ].map((r) => (
                  <div key={r.k} className="flex items-center gap-3 text-[12.5px]">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cream-deep font-serif font-medium text-slate-ink shrink-0">
                      {r.p}
                    </span>
                    <span className="truncate text-slate-ink/80">{r.k}</span>
                    <span className="ml-auto inline-flex items-center gap-0.5 text-emerald-600 font-semibold shrink-0">
                      <ArrowUp className="w-3 h-3" strokeWidth={2.5} />
                      {r.up}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[13.5px] text-cream/70">
              <span className="font-semibold text-cream">SEO &amp; content</span> die je structureel naar pagina 1 tilt.
            </p>
          </motion.div>

          {/* ── Dashboard mockup ── */}
          <motion.div {...reveal(0.2)} className="min-w-0">
            <div className="group rounded-2xl bg-white text-slate-ink ring-1 ring-white/10 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)] p-5 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-semibold text-slate-ink">Prestaties</span>
                <span className="text-[11px] text-slate-meta">deze maand</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl bg-cream-deep p-3">
                  <div className="text-[10.5px] uppercase tracking-wide text-slate-meta font-semibold">Bezoekers</div>
                  <div className="font-serif text-[1.5rem] leading-none font-medium text-slate-ink mt-1">8.4k</div>
                </div>
                <div className="rounded-xl bg-cream-deep p-3">
                  <div className="text-[10.5px] uppercase tracking-wide text-slate-meta font-semibold">Leads</div>
                  <div className="font-serif text-[1.5rem] leading-none font-medium text-arka mt-1">137</div>
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-20 flex-1">
                {[40, 52, 46, 63, 58, 72, 80, 68, 88, 100].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-arka/25" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                Real-time, geen Excel meer
              </div>
            </div>
            <p className="mt-4 text-[13.5px] text-cream/70">
              <span className="font-semibold text-cream">Dashboards &amp; data</span> die je grip geven op wat werkt.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
