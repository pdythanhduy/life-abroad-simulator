import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA. No backend, no env-specific logic. Safe defaults for Vercel.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 250,
    assetsInlineLimit: 4096,
  },
});
