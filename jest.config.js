module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.test.ts',
        '**/tests/**/*.test.ts'
    ],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/types/**/*'
    ],
    verbose: true
};
  