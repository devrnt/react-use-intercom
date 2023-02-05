import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/#/',
    supportFile: 'cypress/support/index.ts',
    video: false,
    specPattern: 'cypress/e2e/**/*.ts',
  },
});
