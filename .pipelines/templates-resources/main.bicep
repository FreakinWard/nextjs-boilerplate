param appName string
param environmentName string
param location string = resourceGroup().location
param regionName string
param resourceGroupPrefix string

var webAppName = '${resourceGroupPrefix}-${appName}-${environmentName}-${regionName}'
var webAppNameShort = '${resourceGroupPrefix}-${appName}-${environmentName}'

module rg './bicep/resourceGroup.bicep' = {
  name: 'resourceGroup'
  scope: subscription()
  params: {
    webAppName: webAppName
    regionName: regionName
    resourceGroupPrefix: resourceGroupPrefix
  }
}

module appInisghts './bicep/appInsights.bicep' = {
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
    instrumentationKey: appInisghts.outputs.InstrumentationKey
  }
}
