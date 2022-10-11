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

module keyVault './bicep/keyVault.bicep' = {
  name: 'keyVault'
  scope: resourceGroup()
  params: {
    webAppNameShort: webAppNameShort
    location: location
    policyObjectId: 'fd280c5a-9bc5-4829-b331-70e854f1c84e'  // TODO: determine how to set the principal user/group objectId dynamically
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
