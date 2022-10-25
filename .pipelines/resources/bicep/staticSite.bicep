param webAppName string
param location string = resourceGroup().location
param instrumentationKey string


resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: webAppName
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    APPINSIGHTS_INSTRUMENTATIONKEY: instrumentationKey
  }
  // properties: {
  //   repositoryUrl: 'https://github.com/FreakinWard/nextjs-boilerplate'
  //   branch: 'azure-static-web-app'
  //   stagingEnvironmentPolicy: 'Enabled'
  //   allowConfigFileUpdates: true
  //   provider: 'GitHub'
  //   enterpriseGradeCdnStatus: 'Disabled'
  // }
}
