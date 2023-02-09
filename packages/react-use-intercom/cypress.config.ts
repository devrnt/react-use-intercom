import { defineConfig } from 'cypress';

export default defineConfig({
  // Enable cross-domain iframe access
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:5173/#/',
    video: false,
    specPattern: 'cypress/e2e/**/*.ts',
  },
});
