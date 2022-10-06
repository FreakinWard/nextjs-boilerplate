Validate `main.bicep`

```bash
az deployment group validate \
    --resource-group demo-nextjs-template-dev-east \
    --template-file .pipelines/templates-resources/main.bicep \
    --parameters appName=nextjs-template \
        environmentName=dev \
        regionName=east \
        resourceGroupPrefix=demo
```
