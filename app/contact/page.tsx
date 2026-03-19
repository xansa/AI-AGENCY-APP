import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Arka. We reageren altijd binnen 1 werkdag.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            Contact
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Laten we kennis maken
          </h1>
          <p className="text-dark-400 max-w-xl">
            We reageren altijd binnen 1 werkdag.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
