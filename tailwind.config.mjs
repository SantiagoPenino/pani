/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#008fd0",
        "custom-black": "#171717",
        "custom-gray": "#303030",
        "custom-white": "#f1f1f1",
        "custom-yellow": "#ffbe23",
      },
    },
  },
  plugins: [],
};
