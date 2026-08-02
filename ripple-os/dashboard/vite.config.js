import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // graph.json lives at ripple-os/data/, one level above the dashboard.
    // The app reads it straight from there — no copy, no backend, no drift.
    fs: { allow: ['..'] },
  },
});
