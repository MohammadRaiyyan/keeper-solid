import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "solid", autoCodeSplitting: true }),
    solid(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "~": path.resolve(path.dirname(new URL(import.meta.url).pathname), "./src"),
    },
  },
});
