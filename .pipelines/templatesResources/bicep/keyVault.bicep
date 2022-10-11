param webAppNameShort string
param location string = resourceGroup().location
param policyObjectId string

resource kv 'Microsoft.KeyVault/vaults@2021-11-01-preview' = {
  name: webAppNameShort
  location: location
  properties: {
    accessPolicies: [
      {
        objectId: policyObjectId
        tenantId: subscription().tenantId
        permissions: {
          secrets: [
              'get'
              'list'
            ]
          certificates: [
              'get'
              'list'
            ]
        }
      }
    ]
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
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
  name: 'mySecret'
  properties: {
    value: 'mySecretValue'
  }
}
