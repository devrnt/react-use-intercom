const { defineConfig } = require('tsup');

module.exports = defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: ['react'],
  sourcemap: false,
  treeshake: true,
  clean: true,
  splitting: false,
  dts: true,
  minify: true,
});
