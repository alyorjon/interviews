import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:4173" } },
  test: { environment: "jsdom", environmentOptions: { jsdom: { url: "http://localhost/" } }, setupFiles: "./src/vitest/setup.ts", css: true, globals: true }
});
