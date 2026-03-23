"use client";

import { Button } from "@/components/ui/Button";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-red-400 font-bold text-sm uppercase tracking-wider mb-4">
          Fout
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Er ging iets mis
        </h1>
        <p className="text-dark-400 max-w-md mx-auto mb-8 leading-relaxed">
          Er is een onverwachte fout opgetreden. Probeer het opnieuw of ga terug
          naar de homepagina.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="lg" variant="primary">
            <RefreshCw className="w-4 h-4" />
            Probeer opnieuw
          </Button>
          <Button
            href="/"
            size="lg"
            variant="outline"
            className="border-dark-700 text-white hover:bg-dark-800"
          >
            <Home className="w-4 h-4" />
            Terug naar home
          </Button>
        </div>
      </div>
    </div>
  );
}
