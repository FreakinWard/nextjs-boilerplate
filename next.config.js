const packageJson = require('./package.json');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = withBundleAnalyzer({
  env: {
    appName: packageJson.name,
    appVersion: packageJson.version,
    appBuildNumber: packageJson.buildNumber,
    APPLICATIONINSIGHTS_CONNECTION_STRING: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: isProduction,
  },
  typescript: {
    ignoreBuildErrors: isProduction,
  },
});
