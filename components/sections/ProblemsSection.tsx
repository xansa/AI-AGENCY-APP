"use client";

import { motion } from "framer-motion";
import { Globe, Search, Clock, BarChart2, Palette } from "lucide-react";

const problems = [
  {
    icon: Globe,
    title: "Geen professionele website",
    description:
      "Je website is verouderd, traag of bestaat niet eens. Potentiële klanten haken af voordat ze je leren kennen.",
  },
  {
    icon: Search,
    title: "Onvindbaar op Google",
    description:
      "Je concurrenten staan bovenaan, jij nergens. Zonder SEO en content mis je dagelijks klanten die actief zoeken.",
  },
  {
    icon: Clock,
    title: "Te veel handmatig werk",
    description:
      "Offertes, opvolging, rapportages: alles kost te veel tijd. Terwijl slimme automatisering je uren per week bespaart.",
  },
  {
    icon: BarChart2,
    title: "Geen inzicht in je cijfers",
    description:
      "Je weet niet wat werkt en wat niet. Zonder dashboards en data vlieg je blind en mis je kansen.",
  },
  {
    icon: Palette,
    title: "Inconsistente uitstraling",
    description:
      "Je logo, website en socials vertellen allemaal een ander verhaal. Dat kost je geloofwaardigheid en herkenning.",
  },
];

export function ProblemsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Herken je dit?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-900">
            Dit zijn de uitdagingen die digitale groei blokkeren
          </h2>
          <p className="mt-4 text-dark-500 leading-relaxed">
            De meeste bedrijven lopen vast op dezelfde obstakels. Niet door gebrek aan inzet, maar door het ontbreken van de juiste digitale basis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.slice(0, 3).map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-6 rounded-2xl bg-dark-50 border border-dark-100"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                <problem.icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-900 mb-1">{problem.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center max-w-[calc(66.666%+0.75rem)] lg:max-w-none lg:px-[calc(100%/6)] mx-auto">
          {problems.slice(3).map((problem, i) => (
            <motion.div
              key={i + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 3) * 0.08 }}
              className="flex-1 flex gap-4 p-6 rounded-2xl bg-dark-50 border border-dark-100"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                <problem.icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-900 mb-1">{problem.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
