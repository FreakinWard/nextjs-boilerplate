## Azure DevOps CI/CD Pipeline

# Getting Started

The ci/cd pipeline is responsible for building, testing, deploying, and releasing this app.

## Pipeline

[`azure-pipelines-build.yml`](/.pipelines/app/azure-pipeline-build.yml) - is responsible for validating a quality build and is run automatically with each pull request.
[`azure-pipelines-release.yml`](/.pipelines/app/azure-pipelines-release.yml) - is responsible for releasing the application into each environment and is run automatically with merges to master branch.

## Build Process

The build stage ensures the app builds and tests pass before producing the _production-ready_ deployment artifact.

The artifact produces files required for production, excluding `node_modules`.

Additionally, the `ciBuildNumber` is captured in a generated `.env` file as part of the artifact. This is later used in smoke tests and E2E tests. Capturing the build number like this allows us to identify a successful deployment, not just a successful response.

Once the artifact has been deployed to Azure App Service, NPM modules are then installed using [ORYX custom build scripts](https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#customize-build-automation). The identified benefit is to capture the environment variables stored within the appService. This also avoids the transfer of all the `node_modules` allowing for faster deployments.

## Deployment files

[`.deployment`](/.pipelines/app/.deployment)

- Configuration file for Oryx, [see docs](https://github.com/microsoft/Oryx/blob/main/doc/configuration.md) and used as part of [ORYX custom build scripts](https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#customize-build-automation)

[`.artifactignore`](/.pipelines/app/.artifactignore)

- Identify files to reference when building the pipeline artifact

[`.artifactignore`](/.pipelines/app/.artifactignore)

- Identify files to keep or ignore when creating the pipeline artifact

## Pipeline Templates

[`npmInstall.yml`](/.pipelines/app/templates/npmInstall.yml)

> NOTE: For artifactory use, this template utilizes [artifactory-credentials](https://github.carmax.com/CarMax/online-platform-azure-pipelines/blob/master/src/templates/artifactory-credentials.yml) task in additon to `ArtifactoryNpm@2` to authenticate & install.

- caches and installs `npm`, `cypress`, and `nextjs` installations

[`build.yml`](/.pipelines/app/templates/build.yml)

- installs npm using `npmInstall.yml`
- builds and package the app artifact
- runs unit tests, code coverage and publishes reports
- runs mocked e2e tests

[`deploy.yml`](/.pipelines/app/templates/deploy.yml)

- deploys the artifact to specified regions and/or slots
- runs e2e tests against the instance

[`swapSlot.yml`](/.pipelines/app/templates/swapSlot.yml)

- swaps staging slot to production
- runs e2e tests against the instance

[`smokeTest.yml`](/.pipelines/app/templates/smokeTest.yml)

- tests the deployed instance
- validates the specific release is responding
- expects `/api/system/health` to respond with the `ciBuildNumber`: ex: `20220204x1`

## Troubleshooting

| Log Source             | Description                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Azure Pipeline Logs    | Contains logs around the actual build and deployment                                    |
| Deployment Center Logs | Also contains the pipeline logs in addition to the service logs, deployment status, etc |
| Application Insights   | Tracks telemetry once the service is up and running                                     |
