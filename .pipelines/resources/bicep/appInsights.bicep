param webAppNameShort string
param location string = resourceGroup().location

resource appInsights 'Microsoft.Insights/components@2020-02-02-preview' = {
  name: webAppNameShort
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

output InstrumentationKey string = appInsights.properties.InstrumentationKey
output ConnectionString string = appInsights.properties.ConnectionString
