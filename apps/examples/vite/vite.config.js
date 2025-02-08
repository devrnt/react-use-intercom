import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9300,
  },
  plugins: [react()],
  clearScreen: false,
});
