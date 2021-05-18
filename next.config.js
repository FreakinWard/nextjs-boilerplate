// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: {
    appInsightsKey: 'e6c58f4e-ef31-4af7-b218-fe6b5ade0d61',
  },
});
