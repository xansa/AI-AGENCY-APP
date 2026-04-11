"use client";

import { motion, useReducedMotion } from "framer-motion";

// Four-step process row with serial numbers and hairline dividers.
const steps = [
  {
    number: "01",
    title: "Kennismaking",
    body:
      "Gratis gesprek van 30 minuten. Wat wil je bereiken, waar loop je tegenaan, en wat past bij je situatie.",
  },
  {
    number: "02",
    title: "Plan",
    body:
      "Concreet voorstel met scope, planning en prijs. Geen vage offertes in bureau-taal, geen verrassingen achteraf.",
  },
  {
    number: "03",
    title: "Bouwen",
    body:
      "Ik bouw het zelf. Wekelijkse updates, altijd directe lijn. Je ziet voortgang per sprint, niet pas bij oplevering.",
  },
  {
    number: "04",
    title: "Groeien",
    body:
      "Na oplevering blijven we doorbouwen. Maandelijks pakket voor onderhoud, optimalisatie en doorontwikkeling.",
  },
];

export function WerkwijzeV2() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-cream-deep py-24 md:py-32">
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
              <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
              Hoe wij werken
            </p>
            <h2 className="font-serif font-medium text-h1 text-slate-ink tracking-tight text-balance">
              Vier stappen, <em className="italic">een</em> rechte lijn.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-slate-muted text-[17px] leading-relaxed text-pretty">
              Geen eindeloze discovery fases. Geen design-sprints van drie weken voor een loodsje. We pakken snel door, jij houdt overzicht.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 relative"
            >
              <div className="hairline border-slate-ink/15 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-[2rem] leading-none font-medium text-slate-ink">
                    {step.number}
                  </span>
                  <span className="w-8 border-t border-arka/50" />
                </div>
                <h3 className="font-serif text-[1.5rem] leading-tight font-medium text-slate-ink tracking-tight mb-3 break-words">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-slate-muted text-pretty">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
