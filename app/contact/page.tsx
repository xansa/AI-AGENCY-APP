import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Arka. We reageren altijd binnen 1 werkdag.",
  alternates: { canonical: "https://arkadigital.nl/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactPageContent />
    </div>
  );
}
