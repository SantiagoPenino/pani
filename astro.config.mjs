import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
dotenv.config();

// https://astro.build/config
export default defineConfig({
  // Necesario para que @astrojs/sitemap genere URLs absolutas (sitemap-index.xml + sitemap-0.xml)
  site: "https://paniconstrucciones.com",
  integrations: [tailwind(), partytown(), sitemap()],
  build: {
    minify: "esbuild"
  }
});
