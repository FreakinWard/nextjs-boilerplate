// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  env: {
    APPSETTING_APPINSIGHTS_INSTRUMENTATIONKEY: '',
  },
  publicRuntimeConfig: {
    appInsightsKey: process.env.APPSETTING_APPINSIGHTS_INSTRUMENTATIONKEY,
  },
});
