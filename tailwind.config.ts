import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terminal: {
          bg: "#000000",
          text: "#EAEAEA",
          secondary: "#6E7681",
          accent: "#22D3EE",
          accentHover: "#4DD0E1",
        },
        ai: {
          bg: "#000000",
          text: "#EAEAEA",
          accent: "#C084FC",
          accentHover: "#D8B4FE",
          overlay: "rgba(192,132,252,0.02)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        'terminal': ['16px', '1.5'],
        'terminal-mobile': ['18px', '1.5'],
      },
      animation: {
        "cursor-blink": "blink 1s infinite",
        "typing": "typing 0.03s ease-in-out",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "mode-transition": "modeTransition 0.5s ease",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        typing: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 25px rgba(34,211,238,0.06)" },
          "50%": { boxShadow: "0 0 35px rgba(34,211,238,0.12)" },
        },
        modeTransition: {
          "0%": { backgroundColor: "rgba(34,211,238,0.02)" },
          "100%": { backgroundColor: "rgba(192,132,252,0.02)" },
        },
      },
      boxShadow: {
        'terminal-glow': '0 0 25px rgba(34,211,238,0.06)',
        'terminal-glow-intense': '0 0 35px rgba(34,211,238,0.12)',
        'ai-glow': '0 0 25px rgba(192,132,252,0.06)',
        'ai-glow-intense': '0 0 35px rgba(192,132,252,0.12)',
      },
      textShadow: {
        'glow': '0 0 4px currentColor',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
