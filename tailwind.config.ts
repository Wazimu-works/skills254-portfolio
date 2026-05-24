import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#040816",
        "base-soft": "#081127",
        panel: "rgba(8, 17, 39, 0.65)",
        turquoise: "#49f2ff",
        indigo: "#5168ff",
        pink: "#ff4fa8",
        line: "rgba(115, 142, 255, 0.18)",
        copy: "#dbedff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(73,242,255,0.18), 0 24px 80px rgba(15, 31, 83, 0.45)",
        neon: "0 0 24px rgba(73,242,255,0.3), 0 0 70px rgba(81,104,255,0.18)",
        pink: "0 0 28px rgba(255,79,168,0.24)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(73,242,255,0.18), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,79,168,0.12), transparent 18%), linear-gradient(180deg, #040816 0%, #070d1e 55%, #03050d 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(0.98)" },
          "50%": { opacity: "1", transform: "scaleX(1.02)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseLine: "pulseLine 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
