import { useTheme } from "next-themes";
import { useLoader } from "../context/LoaderContext";
import { useState, useEffect } from "react";

export function LoaderOverlay() {
  const { isVisible, label } = useLoader();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm hover:backdrop-filter-none z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4 animate-fade-in-up">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-border" />
            <div className={`absolute inset-0 rounded-full border-4 ${
              resolvedTheme === 'dark' ? 'border-t-white' : 'border-t-black'
            } border-r-transparent border-b-transparent border-l-transparent animate-spin`} />
            <div className="absolute inset-3 rounded-full bg-secondary flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Status text */}
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">Cela peut prendre quelques secondes</p>
          </div>

          {/* Progress bar: au cas ou l'on aurait besoin de le montrer */}
          {/* <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-full animate-shimmer rounded-full" />
          </div>*/}
        </div>
      </div>
    </div>
  );
}
