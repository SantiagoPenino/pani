/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        /* Blues — identidad de marca */
        "custom-original": "#008fd0",
        "custom-blue": "#006494",
        "custom-blue-dark": "#004e75",
        "custom-blue-light": "#0aa8f0",
        "custom-logo": "#0070a8", /* azul del logotipo */
        /* Neutrales */
        "custom-black": "#0d1117",
        "custom-gray": "#061826",
        "custom-gray-mid": "#1e2d3d",
        "custom-white": "#DEE5E5",
        "custom-surface": "#f4f7fa",
        /* Acento dorado para Premium */
        "custom-gold": "#c9972a",
        "custom-gold-light": "#f0c060",
        /* Contacto */
        "custom-yellow": "#FF9F1C",
        "custom-whatsapp": "#25d366",
        "custom-green": "#128C7E",
        "custom-green-dark": "#0a6b5e",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        dmsans: ["DMSans", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      screens: {
        landscape: { raw: "(orientation: landscape)" },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "slide-down": "slideDown 0.3s ease forwards",
        shimmer: "shimmer 2s infinite",
        "count-up": "countUp 1s ease forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      boxShadow: {
        "card-hover": "0 20px 40px rgba(0,100,148,0.18)",
        "card-base": "0 4px 16px rgba(0,0,0,0.08)",
        "header-glass": "0 4px 24px rgba(0,0,0,0.12)",
        "btn-blue": "0 4px 20px rgba(0,100,148,0.4)",
        "btn-gold": "0 4px 20px rgba(201,151,42,0.35)",
      },
    },
  },
  plugins: [],
};

