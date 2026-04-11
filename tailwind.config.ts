import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Arka V2 editorial light palette ───
        // Light editorial as base, dark ink as contrast
        cream: {
          DEFAULT: "#FAFAF7",
          deep: "#F5F4EE",
          edge: "#EFEEE6",
        },
        ink: {
          DEFAULT: "#0E1116",
          light: "#1A1D24",
          soft: "#2A2E37",
        },
        // Text tokens
        "slate-ink": "#0F172A",
        "slate-muted": "#475569",
        "slate-meta": "#94A3B8",
        "line": "#E5E7EB",
        "line-soft": "#F1F5F9",
        // Arka accent blue
        arka: {
          DEFAULT: "#2F6BFF",
          hover: "#1F4FD6",
          soft: "#EBF1FF",
        },

        // ─── Legacy aliases (backward compat) ───
        primary: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          dark: "#020617",
        },
        accent: {
          DEFAULT: "#2F6BFF",
          light: "#5B87FF",
          dark: "#1F4FD6",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          dark: "#0891B2",
        },
        background: {
          DEFAULT: "#FAFAF7",
          light: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          light: "#F5F4EE",
          dark: "#0E1116",
        },
        text: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          dark: "#94A3B8",
        },
        brand: {
          50: "#EBF1FF",
          100: "#DBE6FF",
          200: "#BFD0FF",
          300: "#93AEFF",
          400: "#5B87FF",
          500: "#2F6BFF",
          600: "#1F4FD6",
          700: "#1A40B0",
          800: "#152C4A",
          900: "#0F172A",
          950: "#020617",
        },
        dark: {
          50: "#FAFAF7",
          100: "#F5F4EE",
          200: "#E5E7EB",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        // Editorial pair
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Instrument Sans", "Inter", "system-ui", "sans-serif"],
        // Legacy alias for logo wordmark which MUST stay Inter
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale
        "display": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "h1": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "h2": ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "h3": ["clamp(1.5rem, 2vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "overline": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        "content": "72rem",
        "narrow": "52rem",
      },
      ringColor: {
        DEFAULT: "rgb(15 23 42 / 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
