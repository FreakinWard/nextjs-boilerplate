Validate `main.bicep` using `az deployment group validate`

```bash
az deployment group validate \
    --resource-group demo-nextjs-template-dev-east \
    --template-file .pipelines/templates-resources/main.bicep \
    --parameters appName=nextjs-template \
        environmentName=dev \
        regionName=east \
        resourceGroupPrefix=demo
```

Validate `main-resourceGroup.bicep` using `az deployment sub validate`

```shell
az deployment sub create  \
  --template-file .pipelines/templates-resources/main-resourceGroup.bicep \
  --location eastus \
  --parameters appName=nextjs-template \
      environmentName=dev \
      regionName=east \
      resourceGroupPrefix=demo
```
