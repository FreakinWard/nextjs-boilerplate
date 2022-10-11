targetScope = 'subscription'

param appName string
param environmentName string
param regionName string
param resourceGroupPrefix string

var webAppName = '${resourceGroupPrefix}-${appName}-${environmentName}-${regionName}'

resource rg 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: webAppName
  location: '${regionName}us2'
}
