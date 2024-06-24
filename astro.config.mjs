import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import tailwind from "@astrojs/tailwind";

dotenv.config();

export default defineConfig({
  integrations: [tailwind()],
  build: {
    minify: "esbuild",
  },
});
