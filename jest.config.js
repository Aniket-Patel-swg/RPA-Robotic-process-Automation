// jest.config.js

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.ts'], // Adjust this pattern based on your test file locations
    collectCoverage: true, // Enable this if you want coverage reports
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: './coverage',
  };
  