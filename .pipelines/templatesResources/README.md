Validate `main.bicep` using `az deployment group validate`

```bash
az deployment group validate \
    --resource-group demo-nextjs-template-dev-east \
    --template-file .pipelines/templatesResources/main.bicep \
    --parameters appName=nextjs-template \
        environmentName=dev \
        regionName=east \
        resourceGroupPrefix=demo
```

Validate `main-resourceGroup.bicep` using `az deployment sub validate`

```shell
az deployment sub validate  \
  --template-file .pipelines/templatesResources/main-resourceGroup.bicep \
  --location eastus \
  --parameters appName=nextjs-template \
      environmentName=dev \
      regionName=east \
      resourceGroupPrefix=demo
```
