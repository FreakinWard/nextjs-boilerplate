require('dotenv').config();
const appInsights = require('applicationinsights');
const packageJson = require('./package.json');

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
const ciBuildNumber = packageJson.buildNumber;

if (Boolean(connectionString)) {
  appInsights
    .setup(connectionString)
    .setAutoCollectConsole(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectHeartbeat(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectRequests(true)
    .setAutoDependencyCorrelation(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .setSendLiveMetrics(true)
    .setUseDiskRetryCaching(true);

  appInsights.defaultClient.setAutoPopulateAzureProperties(true);

  const cloudRoleKey = appInsights.defaultClient.context.keys.cloudRole;
  appInsights.defaultClient.context.tags[cloudRoleKey] = packageJson.name;

  const appVersionKey = appInsights.defaultClient.context.keys.applicationVersion;
  appInsights.defaultClient.context.tags[appVersionKey] = ciBuildNumber;

  appInsights.start();
}

global.appInsightsClient = appInsights.defaultClient;
