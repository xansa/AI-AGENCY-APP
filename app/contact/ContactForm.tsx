"use client";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactSchema, type ContactFormValues } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "@/lib/i18n";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

const contactDetails = [
  { icon: Mail, label: "info@arkadigital.nl", href: "mailto:info@arkadigital.nl" },
  { icon: Phone, label: "+31 6 46140986", href: "tel:+31646140986" },
  { icon: MapPin, label: "Dordrecht, Nederland", href: null },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/arka-nl" },
] as const;

export function ContactForm() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      reset();
      toast.success(t("toast.berichtVerzonden"));
    } catch {
      toast.error(t("toast.fout"));
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Form */}
      <div className="lg:col-span-2">
        {success ? (
          <div className="p-8 bg-brand-50 rounded-2xl border border-brand-200 text-center">
            <div className="text-4xl mb-4">&#10003;</div>
            <h2 className="text-xl font-bold text-dark-900 mb-2">
              {t("contact.berichtOntvangen")}
            </h2>
            <p className="text-dark-600">
              {t("contact.berichtOntvangenDesc")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label={t("form.naam")}
                required
                error={errors.naam?.message}
                inputProps={{ ...register("naam"), placeholder: "Jan Jansen" }}
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                error={errors.telefoon?.message}
                inputProps={{
                  ...register("telefoon"),
                  placeholder: "+31 6 12345678",
                }}
              />
            </div>
            <FormField
              label={t("form.bericht")}
              required
              error={errors.bericht?.message}
              textareaProps={{
                ...register("bericht"),
                rows: 5,
                placeholder: t("form.berichtPlaceholder"),
              }}
            />
            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
              <input type="text" autoComplete="off" tabIndex={-1} {...register("website_url")} />
            </div>
            <Button type="submit" size="lg" loading={isSubmitting}>
              {t("form.versturen")}
            </Button>
          </form>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="p-6 bg-dark-50 rounded-2xl space-y-4">
          <h3 className="font-bold text-dark-900">{t("contact.contactgegevens")}</h3>
          {contactDetails.map(({ icon: Icon, label, href }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-brand-600 flex-shrink-0" />
              {href ? (
                <a
                  href={href}
                  className="text-dark-700 text-sm hover:text-brand-600 transition-colors"
                >
                  {label}
                </a>
              ) : (
                <span className="text-dark-700 text-sm">{label}</span>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 bg-brand-600 rounded-2xl text-white">
          <Calendar className="w-6 h-6 mb-3 text-brand-200" />
          <h3 className="font-bold mb-2">{t("contact.directPlannen")}</h3>
          <p className="text-brand-200 text-sm mb-4">
            {t("contact.directPlannenDesc")}
          </p>
          <Button
            href={CALENDLY_URL}
            external
            size="sm"
            className="bg-white text-brand-700 hover:bg-brand-50 w-full"
          >
            {t("contact.gesprekPlannen")}
          </Button>
        </div>
      </div>
    </div>
  );
}
