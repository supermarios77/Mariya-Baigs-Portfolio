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
        violet: {
          accent: "#C084FC",
          accentHover: "#D8B4FE",
        },
        emerald: {
          accent: "#10B981",
          accentHover: "#34D399",
        },
        amber: {
          accent: "#F59E0B",
          accentHover: "#FBBF24",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      fontSize: {
        'terminal': ['14px', '1.5'],
        'terminal-mobile': ['16px', '1.5'],
      },
      animation: {
        "cursor-blink": "blink 1s infinite",
        "typing": "typing 0.03s ease-in-out",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "theme-transition": "themeTransition 0.5s ease",
        "smooth-scroll": "smoothScroll 0.3s ease-out",
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
          "0%": { transform: "translateY(2px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(34,211,238,0.06)" },
          "50%": { boxShadow: "0 0 40px rgba(34,211,238,0.12)" },
        },
        themeTransition: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(180deg)" },
        },
        smoothScroll: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        'terminal-glow': '0 0 30px rgba(34,211,238,0.06)',
        'terminal-glow-intense': '0 0 40px rgba(34,211,238,0.12)',
        'ai-glow': '0 0 30px rgba(192,132,252,0.06)',
        'ai-glow-intense': '0 0 40px rgba(192,132,252,0.12)',
        'violet-glow': '0 0 30px rgba(192,132,252,0.06)',
        'emerald-glow': '0 0 30px rgba(16,185,129,0.06)',
        'amber-glow': '0 0 30px rgba(245,158,11,0.06)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
