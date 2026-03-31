import { Metadata } from "next";
import { OverOnsContent } from "./OverOnsContent";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Leer meer over Arka, jouw digitale afdeling in Dordrecht. Eén aanspreekpunt voor al je digitale behoeften.",
  alternates: { canonical: "https://arkadigital.nl/over-ons" },
  openGraph: {
    title: "Over ons | Arka",
    description: "Leer meer over Arka, jouw digitale afdeling in Dordrecht. Eén aanspreekpunt voor al je digitale behoeften.",
    url: "https://arkadigital.nl/over-ons",
  },
  twitter: {
    title: "Over ons | Arka",
    description: "Leer meer over Arka, jouw digitale afdeling in Dordrecht. Eén aanspreekpunt voor al je digitale behoeften.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Over ons", item: "https://arkadigital.nl/over-ons" },
  ],
};

export default function OverOnsPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <OverOnsContent />
    </div>
  );
}
