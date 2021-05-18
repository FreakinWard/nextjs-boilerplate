// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
//   publicRuntimeConfig: {
//     appInsightsKey: 'e6c58f4e-ef31-4af7-b218-fe6b5ade0d61',
//   },
// });
//
// module.exports = withBundleAnalyzer({});

module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    appInsightsKey: 'e6c58f4e-ef31-4af7-b218-fe6b5ade0d61',
  },
};
