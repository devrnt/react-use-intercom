import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 5173,
  },
  server: {
    // https://vitejs.dev/guide/static-deploy.html#github-pages
    base: '/react-use-intercom/',
  },
  plugins: [react()],
});
