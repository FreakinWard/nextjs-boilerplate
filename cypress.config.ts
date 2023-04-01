/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

import packageJson from './package.json';

export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'E2E - nextjs-boilerplate',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
  },
  env: {
    ciBuildNumber: packageJson.buildNumber,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    // baseUrl: 'http://nextjs-template-dev-east-staging.azurewebsites.net',
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.feature',
  },
  video: false,
});
