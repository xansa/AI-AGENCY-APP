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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Arka",
    description: page.metaDescription,
    url: `${baseUrl}/${page.slug}`,
    telephone: "+31646140986",
    email: "info@arkadigital.nl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dordrecht",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    areaServed: {
      "@type": "Place",
      name: "Drechtsteden",
    },
    founder: {
      "@type": "Person",
      name: "Kaan Arslan",
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
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LandingPageContent page={page} />
    </div>
  );
}
