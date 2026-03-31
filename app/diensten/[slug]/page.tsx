import { Metadata } from "next";
import { services } from "@/content/services";
import { notFound } from "next/navigation";
import { DienstDetailContent } from "./DienstDetailContent";

interface Props {
  params: { slug: string };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `${baseUrl}/diensten/${service.slug}`,
    },
  };
}

export default function DienstDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: "Arka",
      url: baseUrl,
    },
    url: `${baseUrl}/diensten/${service.slug}`,
    areaServed: {
      "@type": "Country",
      name: "NL",
    },
  };

  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DienstDetailContent service={service} />
    </div>
  );
}
