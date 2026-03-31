"use client";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { offerteSchema, type OfferteFormValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "@/lib/i18n";

export function OfferteForm() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfferteFormValues>({ resolver: zodResolver(offerteSchema) });

  const BRANCHES = [
    { value: t("form.opt.saas"), label: t("form.opt.saas") },
    { value: t("form.opt.dienstverlening"), label: t("form.opt.dienstverlening") },
    { value: t("form.opt.logistiek"), label: t("form.opt.logistiek") },
    { value: t("form.opt.productie"), label: t("form.opt.productie") },
    { value: t("form.opt.financieel"), label: t("form.opt.financieel") },
    { value: t("form.opt.zorg"), label: t("form.opt.zorg") },
    { value: t("form.opt.retail"), label: t("form.opt.retail") },
    { value: t("form.opt.bouw"), label: t("form.opt.bouw") },
    { value: t("form.opt.anders"), label: t("form.opt.anders") },
  ];

  const SITUATIES = [
    { value: t("form.opt.geenWebsite"), label: t("form.opt.geenWebsite") },
    { value: t("form.opt.nietGevonden"), label: t("form.opt.nietGevonden") },
    { value: t("form.opt.teHandmatig"), label: t("form.opt.teHandmatig") },
    { value: t("form.opt.geenInzicht"), label: t("form.opt.geenInzicht") },
    { value: t("form.opt.meerLeads"), label: t("form.opt.meerLeads") },
    { value: t("form.opt.completePartner"), label: t("form.opt.completePartner") },
    { value: t("form.opt.anders"), label: t("form.opt.anders") },
  ];

  const DOELEN = [
    { value: t("form.opt.doelWebsite"), label: t("form.opt.doelWebsite") },
    { value: t("form.opt.doelSeo"), label: t("form.opt.doelSeo") },
    { value: t("form.opt.doelAi"), label: t("form.opt.doelAi") },
    { value: t("form.opt.doelData"), label: t("form.opt.doelData") },
    { value: t("form.opt.doelLeads"), label: t("form.opt.doelLeads") },
    { value: t("form.opt.doelBranding"), label: t("form.opt.doelBranding") },
    { value: t("form.opt.doelCombi"), label: t("form.opt.doelCombi") },
  ];

  const BUDGETS = [
    { value: t("form.opt.budgetStarterE"), label: t("form.opt.budgetStarterE") },
    { value: t("form.opt.budgetProfE"), label: t("form.opt.budgetProfE") },
    { value: t("form.opt.budgetEntE"), label: t("form.opt.budgetEntE") },
    { value: t("form.opt.budgetStarterM"), label: t("form.opt.budgetStarterM") },
    { value: t("form.opt.budgetProfM"), label: t("form.opt.budgetProfM") },
    { value: t("form.opt.budgetEntM"), label: t("form.opt.budgetEntM") },
    { value: t("form.opt.budgetOnzeker"), label: t("form.opt.budgetOnzeker") },
  ];

  const TIJDLIJNEN = [
    { value: t("form.opt.asap"), label: t("form.opt.asap") },
    { value: t("form.opt.binnenMaand"), label: t("form.opt.binnenMaand") },
    { value: t("form.opt.1tot3maanden"), label: t("form.opt.1tot3maanden") },
    { value: t("form.opt.orienterend"), label: t("form.opt.orienterend") },
  ];

  const NEXT_STEPS = [
    { step: "1", text: t("offerte.stap1") },
    { step: "2", text: t("offerte.stap2") },
    { step: "3", text: t("offerte.stap3") },
    { step: "4", text: t("offerte.stap4") },
  ];

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
      toast.error(t("toast.offerteFout"));
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
              {t("offerte.aanvraagOntvangen")}
            </h2>
            <p className="text-dark-600 mb-2">
              {t("offerte.aanvraagOntvangenDesc")}
            </p>
            <p className="text-dark-500 text-sm">
              {t("offerte.checkSpam")}
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
                {t("form.contactgegevens")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label={t("form.naam")}
                  required
                  error={errors.naam?.message}
                  inputProps={{
                    ...register("naam"),
                    placeholder: "Jan Jansen",
                  }}
                />
                <FormField
                  label={t("form.bedrijf")}
                  required
                  error={errors.bedrijf?.message}
                  inputProps={{
                    ...register("bedrijf"),
                    placeholder: "Jouw Bedrijf B.V.",
                  }}
                />
                <FormField
                  label={t("form.rol")}
                  required
                  error={errors.rol?.message}
                  inputProps={{
                    ...register("rol"),
                    placeholder: "CEO / Marketing Manager",
                  }}
                />
                <FormField
                  label={t("form.email")}
                  required
                  error={errors.email?.message}
                  inputProps={{
                    ...register("email"),
                    type: "email",
                    placeholder: "jan@bedrijf.nl",
                  }}
                />
                <FormField
                  label={t("form.telefoon")}
                  required
                  error={errors.telefoon?.message}
                  inputProps={{
                    ...register("telefoon"),
                    placeholder: "+31 6 12345678",
                  }}
                />
                <FormField
                  label={t("form.website")}
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
                {t("form.jouwSituatie")}
              </h2>
              <div className="space-y-6">
                <FormField
                  label={t("form.branche")}
                  required
                  error={errors.branche?.message}
                  selectProps={{
                    ...register("branche"),
                    placeholder: t("form.selecteerBranche"),
                    options: BRANCHES,
                  }}
                />
                <FormField
                  label={t("form.huidigeSituatie")}
                  required
                  error={errors.huidige_situatie?.message}
                  selectProps={{
                    ...register("huidige_situatie"),
                    placeholder: t("form.huidigeSituatiePlaceholder"),
                    options: SITUATIES,
                  }}
                />
                <FormField
                  label={t("form.primairDoel")}
                  required
                  error={errors.doel?.message}
                  selectProps={{
                    ...register("doel"),
                    placeholder: t("form.doelPlaceholder"),
                    options: DOELEN,
                  }}
                />
                <FormField
                  label={t("form.doelToelichting")}
                  textareaProps={{
                    ...register("doel_toelichting"),
                    rows: 3,
                    placeholder: t("form.doelToelichtingPlaceholder"),
                  }}
                />
              </div>
            </section>

            {/* Investering */}
            <section>
              <h2 className="text-lg font-bold text-dark-900 mb-6 pb-3 border-b border-dark-100">
                {t("form.investeringPlanning")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label={t("form.budget")}
                  required
                  error={errors.budget?.message}
                  selectProps={{
                    ...register("budget"),
                    placeholder: t("form.selecteerRange"),
                    options: BUDGETS,
                  }}
                />
                <FormField
                  label={t("form.tijdlijn")}
                  required
                  error={errors.tijdlijn?.message}
                  selectProps={{
                    ...register("tijdlijn"),
                    placeholder: t("form.selecteerTijdlijn"),
                    options: TIJDLIJNEN,
                  }}
                />
              </div>
              <div className="mt-6">
                <FormField
                  label={t("form.extra")}
                  textareaProps={{
                    ...register("extra"),
                    rows: 4,
                    placeholder: t("form.extraPlaceholder"),
                  }}
                />
              </div>
            </section>

            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
              <input type="text" autoComplete="off" tabIndex={-1} {...register("_hp")} />
            </div>
            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              className="w-full sm:w-auto"
            >
              {t("form.offerteAanvragen")}
            </Button>
          </form>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-dark-100">
          <h3 className="font-bold text-dark-900 mb-4">
            {t("offerte.watDaarna")}
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
            &#128274; {t("offerte.privacy")}
          </p>
        </div>
      </div>
    </div>
  );
}
