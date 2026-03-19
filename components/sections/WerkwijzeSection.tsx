"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Gratis kennismaking",
    description:
      "We bespreken jouw situatie, doelen en uitdagingen. Je ontvangt een eerlijk advies over wat de meeste impact heeft — zonder verplichting.",
  },
  {
    number: "02",
    title: "Voorstel & planning",
    description:
      "Op basis van ons gesprek stel ik een helder voorstel op met scope, planning en investering. Geen verrassingen, geen kleine lettertjes.",
  },
  {
    number: "03",
    title: "Uitvoering & optimalisatie",
    description:
      "Ik ga aan de slag en houd je op de hoogte. Korte feedbackrondes, snelle oplevering en doorlopende optimalisatie op basis van resultaten.",
  },
];

export function WerkwijzeSection() {
  return (
    <section className="py-20 lg:py-28 bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Werkwijze
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-900">
            Van kennismaking naar resultaat in 3 stappen
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-brand-200 -translate-y-1/2 z-0" style={{ left: "calc(100% + 16px)", width: "calc(100% - 32px)" }} />
              )}
              <div className="relative z-10 p-8 bg-white rounded-2xl border border-dark-100">
                <div className="text-5xl font-black text-brand-100 mb-4 select-none">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{step.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
