param appName string
param environmentName string
param location string = resourceGroup().location
param regionName string
param resourceGroupPrefix string

var webAppName = '${resourceGroupPrefix}-${appName}-${environmentName}-${regionName}'
var webAppNameShort = '${resourceGroupPrefix}-${appName}-${environmentName}'

module appInsights './appInsights.bicep' = {
  name: 'appInsights'
  scope: resourceGroup()
  params: {
    webAppNameShort: webAppNameShort
    location: location
  }
}

module keyVault './keyVault.bicep' = {
  name: 'keyVault'
  scope: resourceGroup()
  params: {
    webAppNameShort: webAppNameShort
    location: location
    policyObjectId: 'fd280c5a-9bc5-4829-b331-70e854f1c84e'  // TODO: determine how to set the principal user/group objectId dynamically
  }
}

// TODO: implement when using appService
// module appServicePlan './appService.bicep' = {
//   name: 'appServicePlan'
//   scope: resourceGroup()
//   params: {
//     webAppName: webAppName
//     location: location
//     connectionString: appInsights.outputs.ConnectionString
//   }
// }

module staticSite './staticSite.bicep' = {
  name: 'staticSite'
  scope: resourceGroup()
  params: {
    webAppName: webAppName
    location: location
    connectionString: appInsights.outputs.ConnectionString
  }
}
