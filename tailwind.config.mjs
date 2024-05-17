/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#018fd0",
        "custom-black": "#171717",
      },
    },
  },
  plugins: [],
};
