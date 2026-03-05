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
        hzd: {
          bg: "#080C18",
          "bg-2": "#0D1526",
          "bg-3": "#111E35",
          teal: "#1DD3B0",
          "teal-dim": "#0A8F7A",
          orange: "#FF6B35",
          gold: "#D4A843",
          blue: "#4A9EFF",
          purple: "#A78BFA",
          green: "#4ADE80",
          red: "#EF4444",
          text: "#E8EAF6",
          muted: "#6B7A94",
        },
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "Rajdhani", "sans-serif"],
        heading: ["var(--font-exo2)", "Exo 2", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "IBM Plex Mono", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-flow": "gradient-flow 4s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "materialize": "materialize 1s ease-out forwards",
        "glitch": "glitch 4s infinite",
        "spin-slow": "spin 10s linear infinite",
        "border-flow": "border-flow 3s linear infinite",
        "scan": "scan 4s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "materialize": {
          "0%": { opacity: "0", filter: "brightness(4) blur(8px)", transform: "scale(0.85)" },
          "50%": { opacity: "0.8", filter: "brightness(2) blur(2px)", transform: "scale(1.03)" },
          "100%": { opacity: "1", filter: "brightness(1) blur(0)", transform: "scale(1)" },
        },
        "glitch": {
          "0%, 87%, 100%": { transform: "translate(0, 0)" },
          "88%": { transform: "translate(-2px, 1px)" },
          "90%": { transform: "translate(2px, -1px)" },
          "92%": { transform: "translate(-1px, 2px)" },
          "94%": { transform: "translate(1px, -1px)" },
          "96%": { transform: "translate(-2px, 0px)" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "hzd-grid": "linear-gradient(rgba(29, 211, 176, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 211, 176, 0.04) 1px, transparent 1px)",
        "hzd-hero": "radial-gradient(ellipse 80% 60% at 50% 40%, #0D2A35 0%, #080C18 80%)",
        "hzd-radial": "radial-gradient(ellipse at center, rgba(29,211,176,0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
