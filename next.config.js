// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: {
    appInsightsConnectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    azureApplicationId: process.env.AZURE_APPLICATION_ID,
    azureCloudInstanceId: process.env.AZURE_CLOUD_INSTANCE_ID,
    azureTenantInfo: process.env.AZURE_TENANT_INFO,
    azureRedirectUri: process.env.AZURE_REDIRECT_URI,
    globalMsGraphUri: process.env.GLOBAL_MS_GRAPH_URI,
    logoutRedirectUri: process.env.LOGOUT_REDIRECT_URI,
  },
});
