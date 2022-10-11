Validate `main.bicep` using `az deployment group validate`

```bash
az deployment group validate \
    --resource-group demo-nextjs-template-dev-east \
    --template-file .pipelines/resources/bicep/main.bicep \
    --parameters appName=nextjs-template \
        environmentName=dev \
        regionName=east \
        resourceGroupPrefix=demo
```
