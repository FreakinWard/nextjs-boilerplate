require('dotenv').config();
const appInsights = require('applicationinsights');

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

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
appInsights.defaultClient.context.tags[cloudRoleKey] = process.env.appName;

appInsights.start();
