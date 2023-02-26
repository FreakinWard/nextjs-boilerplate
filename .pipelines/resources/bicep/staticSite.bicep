param webAppName string
param location string = resourceGroup().location
param instrumentationKey string

resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: '${webAppName}-site'
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
}

resource staticWebAppSettings 'config@2021-01-15' = {
    name: 'appsettings'
    properties: {
      APPINSIGHTS_INSTRUMENTATIONKEY: instrumentationKey
    }
  }

