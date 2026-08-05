import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-cream flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_66%)] blur-3xl" />
      </div>
      <div className="relative max-w-md text-center">
        <div className="relative mx-auto w-full max-w-[280px] aspect-square mb-2">
          <Image
            src="/illustrations/404.png"
            alt="Pagina niet gevonden"
            fill
            sizes="280px"
            className="object-contain"
            priority
          />
        </div>
        <p className="text-overline uppercase text-slate-meta font-semibold mb-4">404</p>
        <h1 className="font-serif font-medium text-h1 text-slate-ink tracking-tight mb-4 text-balance">
          Pagina niet gevonden
        </h1>
        <p className="text-slate-muted leading-relaxed mb-8 text-pretty">
          De pagina die je zoekt bestaat niet of is verplaatst. Geen zorgen, hieronder vind je de weg terug.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-arka text-white text-sm font-semibold hover:bg-arka-hover transition-colors"
        >
          Terug naar home
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
