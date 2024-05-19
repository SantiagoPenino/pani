/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#006494",
        "custom-black": "#171614",
        "custom-gray": "#061826",
        "custom-white": "#DEE5E5",
        "custom-yellow": "#FF9F1C",
      },
    },
  },
  plugins: [],
};
