// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = withBundleAnalyzer({
  env: {
    appName: packageJson.name,
    appVersion: packageJson.version,
    ciBuildNumber: packageJson.buildNumber,
    APPLICATIONINSIGHTS_CONNECTION_STRING: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.margot.ddev.site',
  },
  output: 'standalone',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: isProduction,
  },
  typescript: {
    ignoreBuildErrors: isProduction,
  },
});
