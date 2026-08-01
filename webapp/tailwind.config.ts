import type { Config } from "tailwindcss";

/**
 * Brand palette — adjust these values to restyle the whole store.
 * `brand` is the deep green used for primary actions, `accent` is the warm highlight.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf6",
          100: "#dcfce9",
          200: "#bbf7d4",
          300: "#86efb5",
          400: "#4ade8f",
          500: "#1faa62",
          600: "#12874c",
          700: "#0f6b3e",
          800: "#0d5433",
          900: "#0a3f28",
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        ink: {
          DEFAULT: "#0b1220",
          soft: "#4b5563",
          muted: "#8a94a6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        headline: ["clamp(2rem, 4.4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 18, 32, 0.04), 0 12px 32px -16px rgba(11, 18, 32, 0.18)",
        lift: "0 24px 60px -28px rgba(11, 18, 32, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        page: "84rem",
      },
    },
  },
  plugins: [],
};
export default config;
