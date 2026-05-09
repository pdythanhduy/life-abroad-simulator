import type { CapacitorConfig } from "@capacitor/cli";

// Offline-bundled config. We deliberately do NOT set `server.url` —
// the iOS app must ship and run from the local Vite `dist/` bundle,
// not load the live Vercel URL. The Vercel deploy is for browser play;
// the App Store build is fully self-contained.
const config: CapacitorConfig = {
  appId: "com.pdythanhduy.lifeabroadsimulator",
  appName: "Life Abroad Simulator",
  webDir: "dist",
  ios: {
    contentInset: "always",
    backgroundColor: "#05070b",
  },
};

export default config;
