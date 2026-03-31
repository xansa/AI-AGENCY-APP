import { Metadata } from "next";
import { CasesContent } from "./CasesContent";

export const metadata: Metadata = {
  title: "Cases",
  description: "Bekijk onze case studies: concrete resultaten voor onze klanten.",
  alternates: { canonical: "https://arkadigital.nl/cases" },
};

export default function CasesPage() {
  return (
    <div className="pt-24">
      <CasesContent />
    </div>
  );
}
