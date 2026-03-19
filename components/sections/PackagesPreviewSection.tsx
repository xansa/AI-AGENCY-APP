"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { packages } from "@/content/packages";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export function PackagesPreviewSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Combipackages
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-900">
            Kies het pakket dat past bij jouw fase
          </h2>
          <p className="mt-4 text-dark-500">
            Vaste scope, transparante investering, duidelijke KPI's. Geen verrassingen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                pkg.highlighted
                  ? "border-brand-500 bg-brand-50 shadow-xl shadow-brand-100"
                  : "border-dark-100 bg-white"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="brand" className="px-4">Meest gekozen</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-dark-900">{pkg.name}</h3>
                <p className="text-dark-500 text-sm mt-1">{pkg.tagline}</p>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-dark-900">
                  {pkg.investment}
                </span>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {pkg.deliverables.slice(0, 5).map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-dark-600">
                    <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
                {pkg.deliverables.length > 5 && (
                  <li className="text-sm text-dark-400 pl-6">
                    + {pkg.deliverables.length - 5} meer deliverables
                  </li>
                )}
              </ul>

              <div className="space-y-2">
                <Button
                  href="/offerte"
                  size="md"
                  variant={pkg.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  Vraag offerte aan
                </Button>
                <Button
                  href={`/packages#${pkg.id}`}
                  size="sm"
                  variant="ghost"
                  className="w-full text-dark-500"
                >
                  Meer details
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
