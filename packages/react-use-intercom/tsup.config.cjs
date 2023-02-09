const { defineConfig } = require('tsup');

module.exports = defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: ['react'],
  sourcemap: true,
  treeshake: true,
  clean: true,
  splitting: false,
  dts: true,
  minify: true,
});
