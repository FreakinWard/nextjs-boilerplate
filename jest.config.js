// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // Resolve .css and similar files to identity-obj-proxy instead.
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    // Resolve .jpg and similar files to __mocks__/file-mock.js
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  coveragePathIgnorePatterns: ['src/core/mocks'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  reporters: [
    'default',
    ['jest-junit', { outputName: 'coverage/jest-junit/junit.xml' }],
    [
      'jest-html-reporters',
      {
        publicPath: './coverage',
        filename: 'html-report.html',
        expand: false,
        pageTitle: packageJson.name,
      },
    ],
  ],
  coverageReporters: ['text', 'cobertura'],
};
