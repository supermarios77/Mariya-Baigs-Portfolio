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
          bg: "#0A0A0F",
          bgSecondary: "#0F0F15",
          text: "#C9D1D9",
          textSecondary: "#8B949E",
          accent: "#00E0FF",
          accentSecondary: "#00B8CC",
          green: "#00FF88",
          violet: "#9D4EDD",
          border: "#21262D",
          glow: "#00E0FF",
        },
        ai: {
          bg: "#0A0A0F",
          bgSecondary: "#0F0F15",
          text: "#C9D1D9",
          textSecondary: "#8B949E",
          accent: "#9D4EDD",
          accentSecondary: "#7C3AED",
          border: "#21262D",
          glow: "#9D4EDD",
        },
        neon: {
          cyan: "#00E0FF",
          violet: "#9D4EDD",
          green: "#00FF88",
          pink: "#FF6B9D",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "cursor-blink": "blink 1s infinite",
        "typing": "typing 0.1s ease-in-out",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scanline": "scanline 2s linear infinite",
        "boot-text": "bootText 0.5s ease-out",
        "terminal-glow": "terminalGlow 3s ease-in-out infinite",
        "ai-activate": "aiActivate 0.8s ease-out",
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
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "0.8"
          },
          "50%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "1"
          },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        bootText: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        terminalGlow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 224, 255, 0.1), 0 0 40px rgba(0, 224, 255, 0.05)",
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(0, 224, 255, 0.2), 0 0 60px rgba(0, 224, 255, 0.1)",
          },
        },
        aiActivate: {
          "0%": { 
            boxShadow: "0 0 20px rgba(0, 224, 255, 0.1)",
            borderColor: "rgba(0, 224, 255, 0.3)"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(157, 78, 221, 0.3), 0 0 80px rgba(157, 78, 221, 0.1)",
            borderColor: "rgba(157, 78, 221, 0.5)"
          },
          "100%": { 
            boxShadow: "0 0 30px rgba(157, 78, 221, 0.2), 0 0 60px rgba(157, 78, 221, 0.05)",
            borderColor: "rgba(157, 78, 221, 0.3)"
          },
        },
      },
      boxShadow: {
        'terminal': '0 0 20px rgba(0, 224, 255, 0.1), 0 0 40px rgba(0, 224, 255, 0.05)',
        'terminal-glow': '0 0 30px rgba(0, 224, 255, 0.2), 0 0 60px rgba(0, 224, 255, 0.1)',
        'ai-glow': '0 0 30px rgba(157, 78, 221, 0.2), 0 0 60px rgba(157, 78, 221, 0.1)',
        'neon-cyan': '0 0 10px #00E0FF, 0 0 20px #00E0FF, 0 0 30px #00E0FF',
        'neon-violet': '0 0 10px #9D4EDD, 0 0 20px #9D4EDD, 0 0 30px #9D4EDD',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
