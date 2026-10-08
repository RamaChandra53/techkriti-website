import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--surface)",
        night: "var(--night)",
        paper: "var(--text)",
        electric: "var(--plum)",
        acid: "var(--ember-hover)",
        coral: "var(--ember)",
        halloween: "var(--ember)",
        sky: "var(--muted)"
      },
      boxShadow: { editorial: "var(--shadow-card)" },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-geist)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
} satisfies Config;
