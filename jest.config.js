const nextJest = require('next/jest');
const packageJson = require('./package.json');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: '.' });

// Any custom config you want to pass to Jest
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.[jt]s?(x)', '!src/**/*.stories.[jt]s?(x)'],
  coveragePathIgnorePatterns: ['src/core/msw'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  resetMocks: true,
  reporters: [
    'default',
    ['jest-junit', { outputName: 'coverage/jest-junit/junit.xml' }],
    [
      'jest-html-reporters',
      {
        publicPath: './html-report',
        filename: 'report.html',
        expand: false,
        pageTitle: packageJson.name,
        inlineSource: true,
      },
    ],
  ],
  coverageReporters: ['text', 'cobertura', 'lcov'],
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
