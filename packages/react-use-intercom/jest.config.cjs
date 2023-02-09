/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: ['test/**/*.{ts,tsx,js,jsx}'],
  testRegex: '(<rootDir>/tests/jest/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
};
