import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
      'import/order': 'off',
      'import/no-anonymous-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
