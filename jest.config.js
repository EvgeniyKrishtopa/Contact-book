const nextJest = require('next/jest');

// Loads next.config.js / .env files into the test environment.
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // Mirrors tsconfig.json's baseUrl: "src", so absolute imports like
  // `store/firebase` or `testUtils` resolve the same way they do in the app.
  modulePaths: ['<rootDir>/src'],
  // Clears mock.calls/mock.results before each test so call assertions
  // (e.g. `.not.toHaveBeenCalled()`) can't see a previous test's calls.
  // Doesn't touch mockReturnValue wiring, so store/__mocks__/firebase.js's
  // resetFirebaseMock() pattern still works unchanged.
  clearMocks: true,
};

module.exports = createJestConfig(customJestConfig);
