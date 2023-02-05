import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 5173,
  },
  plugins: [react()],
});
