"use client";

// Full-bleed editorial ticker. Decorative (aria-hidden): fills the width and adds
// subtle motion. Pauses on hover; stilled entirely under prefers-reduced-motion
// via the global .marquee-track animation reset in globals.css.
const ITEMS = [
  "Websites & Webshops",
  "SEO & Content",
  "AI Chatbots & Automatisering",
  "Dashboards & Data",
  "Lead Generation",
  "Branding & Design",
  "AI Assistent Setup",
];

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item) => (
        <div key={item} className="flex items-center">
          <span className="font-serif text-[1.6rem] md:text-[2.1rem] leading-none text-slate-ink/25 tracking-tight px-6 md:px-9 whitespace-nowrap">
            {item}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-arka/40 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function MarqueeV2() {
  return (
    <section
      aria-hidden="true"
      className="relative bg-cream border-y border-line py-7 md:py-9 overflow-hidden select-none"
    >
      <div className="marquee-mask">
        <div className="marquee-track">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
