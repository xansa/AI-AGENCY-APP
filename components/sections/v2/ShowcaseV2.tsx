"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, ArrowUp, Check, Search } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Product-visual showcase (moodboard: steep feature-pages). Coded mini-UIs on a dark
// canvas so they pop, with real UI "skeleton" (window chrome, graph grid, rows) and an
// interactive dashboard chart. Doubles as a bold "artstyle" break in the section rhythm.

const bars = [
  { h: 40, v: "420" },
  { h: 52, v: "560" },
  { h: 46, v: "490" },
  { h: 63, v: "680" },
  { h: 58, v: "610" },
  { h: 72, v: "760" },
  { h: 80, v: "840" },
  { h: 68, v: "720" },
  { h: 88, v: "910" },
  { h: 100, v: "1.040" },
];

const seoRows = [
  { k: "webdesign dordrecht", p: 1, up: 6, vol: 90 },
  { k: "seo bureau", p: 3, up: 4, vol: 62 },
  { k: "ai chatbot laten maken", p: 2, up: 9, vol: 48 },
  { k: "website laten maken", p: 5, up: 3, vol: 74 },
];

function Dots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-slate-950/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-slate-950/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-slate-950/15" />
    </div>
  );
}

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
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-950/8">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-arka/10">
                  <Bot className="w-4 h-4 text-arka" strokeWidth={2} />
                </span>
                <span className="text-[12px] font-semibold text-slate-ink">Arkadia</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  online
                </span>
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
              <div className="flex items-center justify-between mb-3">
                <Dots />
                <span className="text-[10.5px] text-slate-meta font-medium">Search Console</span>
              </div>
              {/* search bar skeleton */}
              <div className="flex items-center gap-2 rounded-lg bg-cream-deep px-3 py-2 mb-4">
                <Search className="w-3.5 h-3.5 text-slate-meta shrink-0" strokeWidth={2} />
                <span className="text-[12px] text-slate-ink/70 truncate">webdesign dordrecht</span>
              </div>
              <div className="flex-1">
                {seoRows.map((r, i) => (
                  <div
                    key={r.k}
                    className={`flex items-center gap-3 py-2.5 ${i < seoRows.length - 1 ? "border-b border-slate-950/6" : ""}`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cream-deep font-serif font-medium text-slate-ink shrink-0">
                      {r.p}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] text-slate-ink/80 truncate">{r.k}</div>
                      <div className="mt-1 h-1 rounded-full bg-cream-deep overflow-hidden">
                        <div className="h-full rounded-full bg-arka/40" style={{ width: `${r.vol}%` }} />
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold text-[12px] shrink-0">
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

          {/* ── Dashboard mockup (interactive bars) ── */}
          <motion.div {...reveal(0.2)} className="min-w-0">
            <div className="group rounded-2xl bg-white text-slate-ink ring-1 ring-white/10 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)] p-5 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Dots />
                <span className="text-[10.5px] text-slate-meta font-medium">arka · analytics</span>
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
              {/* interactive bar chart with grid */}
              <div className="relative flex items-end gap-1.5 h-24 flex-1">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="border-t border-dashed border-slate-950/8" />
                  ))}
                </div>
                {bars.map((b, i) => (
                  <div key={i} className="group/bar relative flex-1 flex items-end h-full cursor-pointer">
                    <span
                      className="w-full rounded-sm bg-arka/25 group-hover/bar:bg-arka transition-colors duration-200"
                      style={{ height: `${b.h}%` }}
                    />
                    <span className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-md bg-ink text-cream text-[10.5px] font-medium px-2 py-1 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg">
                      {b.v} bezoekers
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11.5px] text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                Real-time, geen Excel meer
              </div>
            </div>
            <p className="mt-4 text-[13.5px] text-cream/70">
              <span className="font-semibold text-cream">Dashboards &amp; data</span> die je grip geven op wat werkt.
              <span className="block text-cream/40 text-[12px] mt-1">Hover over de balken →</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
