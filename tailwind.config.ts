import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#211521",
        night: "#170f1b",
        paper: "#f2eee7",
        electric: "#7040a1",
        acid: "#e2ff71",
        coral: "#ff5b27",
        halloween: "#ff5b27",
        sky: "#baa5d9"
      },
      boxShadow: { editorial: "8px 8px 0 #190f1a" },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-geist)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
} satisfies Config;
