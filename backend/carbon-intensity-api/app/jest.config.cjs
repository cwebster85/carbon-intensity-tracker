module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.cjs'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  verbose: true,
};
