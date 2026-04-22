import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Obsidian base — not pure black; has a faint blue undertone
        obsidian: {
          50: "#f5f6fa",
          900: "#0f1018",
          950: "#0a0a0f",
          975: "#06060a",
          1000: "#000004",
        },
        // Neon accent system
        neon: {
          cyan: "#00e5ff",
          cyan2: "#66f0ff",
          violet: "#8b5cf6",
          violet2: "#c084fc",
          magenta: "#ff2d95",
          lime: "#b6ff4f",
        },
        glass: {
          white: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.10)",
        },
      },
      fontFamily: {
        // Clash Display — sharp, futuristic, NOT Space Grotesk
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        // Satoshi — refined, humanist body
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        // Mono for technical / numeric detail
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // A tighter display scale — editorial proportions
        "display-sm": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(3.5rem, 9vw, 6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(4.5rem, 13vw, 10rem)", { lineHeight: "0.88", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(6rem, 18vw, 16rem)", { lineHeight: "0.85", letterSpacing: "-0.05em" }],
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        "shimmer": "shimmer 2.4s linear infinite",
        "float-slow": "floatSlow 9s ease-in-out infinite",
        "grain": "grain 8s steps(6) infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "noise": "url('/textures/noise.svg')",
        "grid-fade":
          "linear-gradient(to bottom, rgba(10,10,15,0) 0%, rgba(10,10,15,1) 100%)",
        "radial-glow":
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,255,0.08), transparent 60%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 40px -10px rgba(0,229,255,0.6), 0 0 80px -20px rgba(0,229,255,0.3)",
        "neon-violet": "0 0 40px -10px rgba(139,92,246,0.6), 0 0 80px -20px rgba(139,92,246,0.3)",
        "glass": "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 10px 40px -10px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
