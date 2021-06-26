// eslint-disable-next-line @typescript-eslint/no-var-requires
const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: 'https://sonarcloud.io/project/links?id=FreakinWard_nextjs-boilerplate',
    token: 'f5e95ad95ac4729f101f56808b84b2c72cd1f7f4',
    options: {
      'sonar.sources': 'src',
      'sonar.tests': './src/**/__tests__',
      'sonar.inclusions': '**',
      // 'sonar.exclusions': '**/__tests__/**',
      'sonar.test.inclusions': './src/**/*.test.tsx',
      // 'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/sonarqube.xml',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);
