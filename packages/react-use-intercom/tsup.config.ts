import type { Options } from 'tsup';

export const tsup: Options = {
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: ['react'],
  sourcemap: true,
  treeshake: true,
  clean: true,
  splitting: false,
  dts: true,
  minify: true,
  target: 'es2017',
};
