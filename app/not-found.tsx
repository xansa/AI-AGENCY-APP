import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-brand-500 font-bold text-sm uppercase tracking-wider mb-4">
          404
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Pagina niet gevonden
        </h1>
        <p className="text-dark-400 max-w-md mx-auto mb-8 leading-relaxed">
          De pagina die je zoekt bestaat niet of is verplaatst. Geen zorgen,
          hieronder vind je de weg terug.
        </p>
        <Button href="/" size="lg">
          <Home className="w-4 h-4" />
          Terug naar home
        </Button>
      </div>
    </div>
  );
}
