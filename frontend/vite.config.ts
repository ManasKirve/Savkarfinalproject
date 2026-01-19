import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  // REQUIRED FOR ELECTRON (load via file://)
  base: "./",

  server: {
    port: 8080,
  },

  build: {
    outDir: "build",
    emptyOutDir: true,
  },

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
