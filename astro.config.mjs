import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), partytown()],
  build: {
    minify: "esbuild"
  }
});