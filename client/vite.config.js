import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,  // fontos a cookie-k miatt
        secure: false,       // ha nem HTTPS
      },
    },
  },
  plugins: [react()],
});
