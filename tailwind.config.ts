import type { Config } from "tailwindcss";

/**
 * Tailwind config for the LehLah Design System.
 *
 * IMPORTANT: this file wires Tailwind's theme up to the CSS custom properties
 * defined in `src/styles/tokens.css`, which are the actual source of truth
 * (they mirror the Figma variable names 1:1 — see docs/TOKENS.md). We do NOT
 * hardcode hex/px values here so that re-theming only ever means editing
 * tokens.css.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primitives — raw palette, keyed exactly like the Figma "primitives" variable collection.
        gray: {
          white: "var(--color-grey-white)",
          100: "var(--color-grey-100)",
          200: "var(--color-grey-200)",
          400: "var(--color-grey-400)",
          700: "var(--color-grey-700)",
          1000: "var(--color-grey-1000)",
          black: "var(--color-grey-black)",
        },
        brand: {
          300: "var(--color-lime-300)",
          400: "var(--color-lime-400)",
          500: "var(--color-lime-500)",
        },
        purple: {
          400: "var(--color-purple-400)",
          500: "var(--color-purple-500)",
          600: "var(--color-purple-600)",
        },
        magenta: {
          400: "var(--color-magenta-400)",
          500: "var(--color-magenta-500)",
        },
        orange: {
          300: "var(--color-orange-300)",
          600: "var(--color-orange-600)",
        },
        blue: {
          400: "var(--color-blue-400)",
          500: "var(--color-blue-500)",
          600: "var(--color-blue-600)",
        },
        teal: {
          400: "var(--color-teal-400)",
          600: "var(--color-teal-600)",
        },
        green: {
          600: "var(--color-green-600)",
        },
        amber: {
          600: "var(--color-amber-600)",
        },
        red: {
          600: "var(--color-red-600)",
        },
        // Semantic tokens
        typography: {
          primary: "var(--typography-color-primary)",
          secondary: "var(--typography-color-secondary)",
          "grey-dark": "var(--typography-color-grey-dark)",
          grey: "var(--typography-color-grey)",
          white: "var(--typography-color-white)",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "button-sm": "var(--button-radius-small)",
        "button-lg": "var(--button-radius-large)",
        "surface-sm": "var(--surface-radius-s)",
        "card": "var(--card-corner-radius-card)",
        "card-image": "var(--card-corner-radius-image)",
        "card-tile": "var(--card-corner-radius-tile)",
        "input": "var(--input-field-corner-radius)",
        pill: "var(--notification-corner-radius)",
      },
      spacing: {
        "surface-xs": "var(--surface-spacing-xs)",
        "surface-s": "var(--surface-spacing-s)",
        "surface-m": "var(--surface-padding-m)",
      },
      borderWidth: {
        thin: "var(--border-width-thin)",
        thick: "var(--border-width-thick)",
      },
    },
  },
  plugins: [],
} satisfies Config;
