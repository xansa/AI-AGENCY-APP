import { Metadata } from "next";
import { landingPages } from "@/content/landing-pages";
import { notFound } from "next/navigation";
import { LandingPageContent } from "./LandingPageContent";

interface Props {
  params: { landing: string };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl";

export async function generateStaticParams() {
  return landingPages.map((lp) => ({ landing: lp.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = landingPages.find((lp) => lp.slug === params.landing);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | Arka`,
      description: page.metaDescription,
      url: `${baseUrl}/${page.slug}`,
    },
  };
}

export default function LandingPage({ params }: Props) {
  const page = landingPages.find((lp) => lp.slug === params.landing);
  if (!page) notFound();

  // Extract target city from slug for areaServed
  const cityMap: Record<string, string> = {
    dordrecht: "Dordrecht",
    drechtsteden: "Drechtsteden",
    rotterdam: "Rotterdam",
    amsterdam: "Amsterdam",
    "den-haag": "Den Haag",
    utrecht: "Utrecht",
    eindhoven: "Eindhoven",
    breda: "Breda",
    tilburg: "Tilburg",
    arnhem: "Arnhem",
    leiden: "Leiden",
    groningen: "Groningen",
  };
  const slugParts = page.slug.split("-");
  const cityKey = slugParts.slice(-1)[0] === "haag" ? "den-haag" : slugParts[slugParts.length - 1];
  const targetCity = cityMap[cityKey] ?? "Drechtsteden";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    url: `${baseUrl}/${page.slug}`,
    provider: {
      "@type": "ProfessionalService",
      "@id": "https://arkadigital.nl/#organization",
      name: "Arka",
      url: baseUrl,
    },
    areaServed: {
      "@type": "City",
      name: targetCity,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "1000",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "EUR",
        price: "1000",
        unitText: "maand",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `${baseUrl}/${page.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LandingPageContent page={page} />
    </>
  );
}
