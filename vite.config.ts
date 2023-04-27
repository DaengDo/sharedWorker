import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all"), eslintPlugin()],
  build: {
    sourcemap: "hidden",
    rollupOptions: {
      input: {
        index: "index.html",
        subWindow: "subWindow.html",
      },
    },
  },
});
