"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Solo = direct contact",
    description:
      "Geen accountmanagers, geen tussenlagen. Je werkt rechtstreeks met de persoon die het werk doet. Dat is sneller, persoonlijker en efficiënter.",
    proof: "Elke vraag wordt binnen 48 uur beantwoord — geen doorverwijzingen.",
  },
  {
    title: "Breed inzetbaar, scherp in uitvoering",
    description:
      "Website, SEO, AI chatbot, dashboard, branding — alles komt samen bij één partner. Geen losse leveranciers die langs elkaar heen werken.",
    proof: "Zes disciplines onder één dak: van design tot data.",
  },
  {
    title: "Geen overhead, wel resultaat",
    description:
      "Zonder duur kantoor, management en overhead kan Arka scherper prijzen en sneller leveren. Je betaalt voor waarde, niet voor structuur.",
    proof: "Pakketten vanaf €800/mnd — een fractie van een inhouse team.",
  },
];

export function WhyItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Waarom Arka werkt
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            De voordelen van één digitale partner
          </h2>
          <p className="mt-4 text-dark-400 leading-relaxed">
            Geen groot bureau nodig. Met Arka heb je alles wat je nodig hebt — persoonlijk, snel en zonder poespas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-8 rounded-2xl border border-dark-700 bg-dark-900"
            >
              <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed mb-6">
                {reason.description}
              </p>
              <div className="border-t border-dark-700 pt-4">
                <p className="text-brand-400 text-xs font-medium">{reason.proof}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
