import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@view": path.resolve(__dirname, "src/view"),
      "@public": path.resolve(__dirname, "public")
    }
  },
  server: {
    host: '127.0.0.1',
  },
});