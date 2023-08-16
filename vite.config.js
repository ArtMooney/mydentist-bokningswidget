import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // Configuring the legacy plugin
      targets: ["defaults", "not IE 11"],
    }),
  ],
  server: {
    // Configuring the server
    rewrite: {
      // Rewrite rule for handling URL routing
      "^/boka/.*$": "/index.html",
    },
  },
  build: {
    assetsInlineLimit: 51200,
  },
});
