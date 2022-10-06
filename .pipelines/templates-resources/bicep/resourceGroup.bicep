targetScope = 'subscription'

param webAppName string
param regionName string
param resourceGroupPrefix string

resource rg 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: '${resourceGroupPrefix}-${webAppName}'
  location: '${regionName}us2'
}

output rg object = rg
