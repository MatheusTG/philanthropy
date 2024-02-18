import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    assetsInclude: ['images', 'favicon.ico'],
  },
  base: process.env.mode === "production" ? "/static/" : "/",
  root: ".",
});
