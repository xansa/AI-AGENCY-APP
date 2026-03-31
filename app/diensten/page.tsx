import { Metadata } from "next";
import { DienstenContent } from "./DienstenContent";

export const metadata: Metadata = {
  title: "Diensten",
  description: "Ontdek onze digitale diensten: van websites en SEO tot AI chatbots, dashboards, lead generation en branding.",
  alternates: { canonical: "https://arkadigital.nl/diensten" },
};

export default function DienstenPage() {
  return (
    <div className="pt-24">
      <DienstenContent />
    </div>
  );
}
