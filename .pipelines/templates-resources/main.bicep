param appName string
param environmentName string
param location string = resourceGroup().location
param regionName string
param resourceGroupPrefix string

var webAppName = '${resourceGroupPrefix}-${appName}-${environmentName}-${regionName}'
var webAppNameShort = '${resourceGroupPrefix}-${appName}-${environmentName}'

module appInsights './bicep/appInsights.bicep' = {
  name: 'appInsights'
  scope: resourceGroup()
  params: {
    webAppNameShort: webAppNameShort
    location: location
  }
}

module appServicePlan './bicep/appService.bicep' = {
  name: 'appServicePlan'
  scope: resourceGroup()
  params: {
    webAppName: webAppName
    location: location
    instrumentationKey: appInsights.outputs.InstrumentationKey
  }
}
