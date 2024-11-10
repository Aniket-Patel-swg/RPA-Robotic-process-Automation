module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.ts'], // Adjust this pattern based on your test file locations
    collectCoverage: false, // Set to true to collect coverage
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: './coverage',
  };
  