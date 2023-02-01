module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
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
  },
};
