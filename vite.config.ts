import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  envPrefix: ["VITE_", "FIREBASE_"],
  server: {
    port: 8080,
    open: true,
  },

  plugins: [react()],
});
