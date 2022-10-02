param webAppName string
param location string = resourceGroup().location
param environmentType string
param region string

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: webAppName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: 'P1V2'
    tier: 'PremiumV2'
    capacity: 1
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2020-06-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'node|16-lts'
    }
  }
}
