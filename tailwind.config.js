/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "rgb(var(--c-forest) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        lime: "rgb(var(--c-lime) / <alpha-value>)",
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        sage: "rgb(var(--c-sage) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        clay: "rgb(var(--c-clay) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "Space Grotesk", "system-ui", "sans-serif"],
        sans: ['"DM Sans Variable"', "DM Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        editorial: "92rem",
        prose: "42rem",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 4.5rem)",
        section: "clamp(5rem, 11vw, 10.5rem)",
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [String(index), String(index / 100)]),
      ),
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        "pulse-ring": "pulse-ring 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
