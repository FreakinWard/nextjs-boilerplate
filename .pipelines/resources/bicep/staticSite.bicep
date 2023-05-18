param webAppName string
param location string = resourceGroup().location
param connectionString string

resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: '${webAppName}-site'
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {}
}

resource staticSiteConfig 'Microsoft.Web/staticSites/config@2022-03-01' = {
  name: 'appsettings'
  parent: staticSite
  properties: {
    APPLICATIONINSIGHTS_CONNECTION_STRING: connectionString
  }
}
