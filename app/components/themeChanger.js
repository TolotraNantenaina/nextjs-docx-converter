"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative flex items-center w-13 h-7 p-1 transition-colors duration-300 rounded-full ${
        theme === "dark" ? "bg-gray-200" : "bg-gray-700"
        } outline-none focus:ring-2 focus:ring-blue-400`}
      aria-label="Toggle Theme"
    >
      {/* Cercle coulissant */}
      <div
        className={`flex items-center justify-center w-5 h-5 transition-transform duration-300 transform rounded-full shadow-md ${
          theme === "dark" ? "translate-x-0 bg-white" : "translate-x-6 bg-black"
        }`}
      >
        {/* Icône changeante */}
        {theme === "dark" ? (
          <span className="text-xs">☀️</span>
        ) : (
          <span className="text-xs">🌙</span>
        )}
      </div>
    </button>
  );
}
