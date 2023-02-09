import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/guide/static-deploy.html#github-pages
  base: '/react-use-intercom/',
  preview: {
    port: 5173,
  },
  plugins: [react()],
});
