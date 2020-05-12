module.exports = {
  rootDir: '.',
  transform: {
    '.(ts|tsx)$': require.resolve('ts-jest/dist'),
    '.(js|jsx)$': require.resolve('babel-jest'),
  },
  setupFiles: ['<rootDir>/test/setup.ts'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coveragePathIgnorePatterns: ['!*.d.ts'],
  testMatch: ['<rootDir>/test/**/*.(spec|test).{ts,tsx,js,jsx}'],
  testURL: 'http://localhost',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
