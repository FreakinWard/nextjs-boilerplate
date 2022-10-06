param webAppName string
param webAppNameShort string
param location string = resourceGroup().location

resource kv 'Microsoft.KeyVault/vaults@2021-11-01-preview' = {
  name: '${webAppNameShort}-kv'
  location: location
  properties: {
    enabledForDeployment: enabledForDeployment
    enabledForDiskEncryption: enabledForDiskEncryption
    enabledForTemplateDeployment: enabledForTemplateDeployment
    tenantId: tenantId
    accessPolicies: [
      {
        objectId: objectId
        tenantId: tenantId
        permissions: {
          keys: keysPermissions
          secrets: secretsPermissions
        }
      }
    ]
    sku: {
      name: skuName
      family: 'A'
    }
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
  }
}

resource secret 'Microsoft.KeyVault/vaults/secrets@2021-11-01-preview' = {
  parent: kv
  name: secretName
  properties: {
    value: secretValue
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02-preview' = {
  name: '${webAppNameShort}-appinsights'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2020-06-01' = {
  name: webAppName
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: 'P1V2'
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2020-06-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
      ]
      httpLoggingEnabled: true
      linuxFxVersion: 'node|16-lts'
      logsDirectorySizeLimit: 35
    }
  }
}

resource appServiceStagingSlot 'Microsoft.Web/sites/slots@2020-06-01' = {
  name: '${webAppName}/staging'
  location: location
  dependsOn: [
    appService
  ]
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~3'
        }
      ]
      linuxFxVersion: 'node|16-lts'
    }
  }
}

resource appServiceStagingSlotConfig 'Microsoft.Web/sites/slots/config@2022-03-01' = {
  name: 'web'
  parent: appServiceStagingSlot
  properties: {
    healthCheckPath: '/health'
    httpLoggingEnabled: true
    logsDirectorySizeLimit: 35
  }
}
