## Client-app CI/CD Pipeline

# Getting Started

The ci/cd pipeline is responsible for building, testing, deploying, and releasing the azure resources.

## Pipeline

[`azure-pipelines-build.yml`](/.pipelines/app/azure-pipeline-build.yml) - is responsible for validating a quality build and is run automatically with each pull request.
[`azure-pipelines-release.yml`](/.pipelines/app/azure-pipelines-release.yml) - is responsible for releasing the application into each environment and is run automatically with merges to master branch.

## Build Process

The build process runs the following stages:

1. Validate - validate stage creates the resources groups and verifies the resources can be created successfully
2. Dev - Deploys resources to this environment
3. QA - Deploys resources to this environment
4. Prod - Deploys resources to this environment

## Pipeline

- [azure-pipeline.yml](/.pipelines/resources/azure-pipelines.yml) - Orchestrates the stages of the pipeline
  - [azDeploy.yml](/.pipelines/resources/templates/azDeploy.yml) - Creates, or validates, resources from the main.bicep. In detail, it orchestrates the `az cli` command.
  - [deploy.yml](/.pipelines/resources/templates/deploy.yml) - Calls `azDeploy.yml` to **create** azure resources
  - [validate.yml](/.pipelines/resources/templates/validate.yml) - Calls `azDeploy.yml` to **validate** azure resources

## Bicep

- [main.bicep](/.pipelines/resources/bicep/main.bicep) - Orchestrates the resources to be created using the modules listed below
  - [appInsights.bicep](/.pipelines/resources/bicep/appInsights.bicep)
  - [appService.bicep](/.pipelines/resources/bicep/appService.bicep)
  - [keyVault.bicep](/.pipelines/resources/bicep/keyVault.bicep)

## Troubleshooting

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

az keyvault recover --location westus2 --name demo-nextjs-template-dev --resource-group demo-nextjs-template-dev-east
az keyvault recover --name demo-nextjs-template-dev --resource-group demo-nextjs-template-dev-east
