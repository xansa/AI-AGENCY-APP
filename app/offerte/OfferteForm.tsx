"use client";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { offerteSchema, type OfferteFormValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BRANCHES = [
  "SaaS / Tech",
  "Professionele dienstverlening",
  "Logistiek / Supply Chain",
  "Productie / Industrie",
  "Financiële dienstverlening",
  "Zorg / Healthcare",
  "Retail / E-commerce",
  "Bouw & Vastgoed",
  "Anders",
].map((v) => ({ value: v, label: v }));

const SITUATIES = [
  "We hebben geen professionele website",
  "We worden niet gevonden op Google",
  "Onze processen zijn te handmatig",
  "We missen inzicht in onze data",
  "We willen meer leads genereren",
  "We zoeken een complete digitale partner",
  "Anders",
].map((v) => ({ value: v, label: v }));

const DOELEN = [
  "Professionele website of webshop",
  "Beter gevonden worden (SEO & content)",
  "Processen automatiseren met AI",
  "Dashboards en data-inzicht",
  "Meer leads genereren",
  "Branding en design verbeteren",
  "Combinatie van bovenstaande",
].map((v) => ({ value: v, label: v }));

const BUDGETS = [
  "€ 800 – € 1.500/mnd",
  "€ 1.500 – € 2.500/mnd",
  "€ 2.500 – € 3.500/mnd",
  "€ 3.500 – € 5.000/mnd",
  "€ 5.000+/mnd",
  "Nog niet zeker",
].map((v) => ({ value: v, label: v }));

const TIJDLIJNEN = [
  "Zo snel mogelijk (< 2 weken)",
  "Binnen 1 maand",
  "Over 1-3 maanden",
  "Oriënterend, geen directe deadline",
].map((v) => ({ value: v, label: v }));

const NEXT_STEPS = [
  { step: "1", text: "We lezen je aanvraag zorgvuldig door" },
  { step: "2", text: "Binnen 48 uur ontvang je een persoonlijk voorstel" },
  {
    step: "3",
    text: "We plannen een intake gesprek om alles door te nemen",
  },
  { step: "4", text: "Geen verplichtingen — jij beslist of er een match is" },
];

export function OfferteForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfferteFormValues>({ resolver: zodResolver(offerteSchema) });

  async function onSubmit(data: OfferteFormValues) {
    try {
      const res = await fetch("/api/offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      reset();
    } catch {
      toast.error("Er ging iets mis. Probeer het opnieuw of mail ons.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Form */}
      <div className="lg:col-span-2">
        {success ? (
          <div className="bg-white p-10 rounded-2xl border border-brand-200 text-center">
            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark-900 mb-3">
              Aanvraag ontvangen!
            </h2>
            <p className="text-dark-600 mb-2">
              We sturen binnen <strong>48 uur</strong> een persoonlijk voorstel.
            </p>
            <p className="text-dark-500 text-sm">
              Controleer ook je spam als je niks ziet.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl border border-dark-100 p-8 space-y-10"
          >
            {/* Contactgegevens */}
            <section>
              <h2 className="text-lg font-bold text-dark-900 mb-6 pb-3 border-b border-dark-100">
                Contactgegevens
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Naam"
                  required
                  error={errors.naam?.message}
                  inputProps={{
                    ...register("naam"),
                    placeholder: "Jan Jansen",
                  }}
                />
                <FormField
                  label="Bedrijf"
                  required
                  error={errors.bedrijf?.message}
                  inputProps={{
                    ...register("bedrijf"),
                    placeholder: "Jouw Bedrijf B.V.",
                  }}
                />
                <FormField
                  label="Jouw rol"
                  required
                  error={errors.rol?.message}
                  inputProps={{
                    ...register("rol"),
                    placeholder: "CEO / Marketing Manager",
                  }}
                />
                <FormField
                  label="E-mail"
                  required
                  error={errors.email?.message}
                  inputProps={{
                    ...register("email"),
                    type: "email",
                    placeholder: "jan@bedrijf.nl",
                  }}
                />
                <FormField
                  label="Telefoon"
                  required
                  error={errors.telefoon?.message}
                  inputProps={{
                    ...register("telefoon"),
                    placeholder: "+31 6 12345678",
                  }}
                />
                <FormField
                  label="Website"
                  error={errors.website?.message}
                  inputProps={{
                    ...register("website"),
                    placeholder: "https://jouwbedrijf.nl",
                  }}
                />
              </div>
            </section>

            {/* Situatie */}
            <section>
              <h2 className="text-lg font-bold text-dark-900 mb-6 pb-3 border-b border-dark-100">
                Jouw situatie
              </h2>
              <div className="space-y-6">
                <FormField
                  label="Branche"
                  required
                  error={errors.branche?.message}
                  selectProps={{
                    ...register("branche"),
                    placeholder: "Selecteer branche",
                    options: BRANCHES,
                  }}
                />
                <FormField
                  label="Huidige situatie"
                  required
                  error={errors.huidige_situatie?.message}
                  selectProps={{
                    ...register("huidige_situatie"),
                    placeholder: "Wat beschrijft jou het best?",
                    options: SITUATIES,
                  }}
                />
                <FormField
                  label="Primair doel"
                  required
                  error={errors.doel?.message}
                  selectProps={{
                    ...register("doel"),
                    placeholder: "Wat wil je bereiken?",
                    options: DOELEN,
                  }}
                />
                <FormField
                  label="Toelichting op je doel"
                  textareaProps={{
                    ...register("doel_toelichting"),
                    rows: 3,
                    placeholder:
                      "Vertel iets meer over je situatie en wat je wilt bereiken...",
                  }}
                />
              </div>
            </section>

            {/* Investering */}
            <section>
              <h2 className="text-lg font-bold text-dark-900 mb-6 pb-3 border-b border-dark-100">
                Investering &amp; planning
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Budgetrange (maandelijks)"
                  required
                  error={errors.budget?.message}
                  selectProps={{
                    ...register("budget"),
                    placeholder: "Selecteer range",
                    options: BUDGETS,
                  }}
                />
                <FormField
                  label="Gewenste startdatum"
                  required
                  error={errors.tijdlijn?.message}
                  selectProps={{
                    ...register("tijdlijn"),
                    placeholder: "Selecteer tijdlijn",
                    options: TIJDLIJNEN,
                  }}
                />
              </div>
              <div className="mt-6">
                <FormField
                  label="Aanvullende informatie"
                  textareaProps={{
                    ...register("extra"),
                    rows: 4,
                    placeholder:
                      "Alles wat je wilt delen wat ons helpt een goed voorstel te maken...",
                  }}
                />
              </div>
            </section>

            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              className="w-full sm:w-auto"
            >
              Offerte aanvragen
            </Button>
          </form>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-dark-100">
          <h3 className="font-bold text-dark-900 mb-4">
            Wat gebeurt er daarna?
          </h3>
          {NEXT_STEPS.map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 bg-brand-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-brand-600 font-bold text-xs">{step}</span>
              </div>
              <p className="text-dark-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
        <div className="bg-dark-50 p-6 rounded-2xl">
          <p className="text-xs text-dark-400 leading-relaxed">
            🔒 Je gegevens worden vertrouwelijk behandeld en niet gedeeld met
            derden. We gebruiken deze uitsluitend voor het opstellen van jouw
            offerte.
          </p>
        </div>
      </div>
    </div>
  );
}
