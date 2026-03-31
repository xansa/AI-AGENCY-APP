import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Arka. We reageren altijd binnen 1 werkdag.",
  alternates: { canonical: "https://arkadigital.nl/contact" },
  openGraph: {
    title: "Contact | Arka",
    description: "Neem contact op met Arka. We reageren altijd binnen 1 werkdag.",
    url: "https://arkadigital.nl/contact",
  },
  twitter: {
    title: "Contact | Arka",
    description: "Neem contact op met Arka. We reageren altijd binnen 1 werkdag.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://arkadigital.nl/contact" },
  ],
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactPageContent />
    </div>
  );
}
