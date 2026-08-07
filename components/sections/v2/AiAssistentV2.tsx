"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Differentiator-sectie: de AI-assistent als "digitale medewerker" die kosten en
// tijd bespaart. Zet Arka apart van "iedereen genereert een AI-website". Crème,
// als lichte breuk na de donkere ShowcaseV2. Copy hardcoded NL (zoals de v2-buren).

const takenOver = ["Inbox & mail", "Agenda", "Research", "Klantcontact"];

export function AiAssistentV2() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section className="relative bg-cream py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Copy ── */}
          <motion.div {...reveal(0)} className="lg:col-span-7 min-w-0">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Wat ons anders maakt
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight leading-[1.06] text-balance">
              Niet zomaar een website. Een <em className="italic text-arka">digitale medewerker</em>.
            </h2>
            <p className="mt-6 text-slate-muted text-[17px] leading-relaxed max-w-xl text-pretty">
              Iedereen bouwt tegenwoordig een website. Wij gaan verder: een AI-assistent die 24/7 je inbox sorteert, je agenda beheert, research doet en klantcontact afhandelt. Het werk van meerdere medewerkers, voor de prijs van één maandsalaris. Zo bespaar je kosten en tijd, en houd jij je handen vrij voor het echte werk.
            </p>

            {/* ── Wat het uit handen neemt ── */}
            <div className="mt-9">
              <p className="text-[12px] uppercase tracking-wider text-slate-meta font-semibold mb-3">
                24/7 uit handen genomen
              </p>
              <div className="flex flex-wrap gap-2.5">
                {takenOver.map((c) => (
                  <span
                    key={c}
                    className="text-[13.5px] font-medium text-slate-ink bg-white/70 ring-1 ring-slate-950/8 rounded-full px-3.5 py-1.5"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/ai-assistent"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-[14px] font-semibold hover:bg-arka-hover transition-colors"
              >
                Ontdek de AI-assistent
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="text-[14px] font-semibold text-slate-ink hover:text-arka transition-colors"
              >
                Plan kennismaking
              </Link>
            </div>
          </motion.div>

          {/* ── Visual (no-box, chalky direct op crème) ── */}
          <motion.div {...reveal(0.12)} className="lg:col-span-5 relative order-first lg:order-last">
            <div className="relative mx-auto w-[64%] sm:w-[50%] lg:w-full max-w-[360px] aspect-[4/5]">
              <Image
                src="/illustrations/ai-assistent-home.png"
                alt="AI-assistent voor MKB"
                fill
                sizes="(max-width: 1024px) 50vw, 360px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
