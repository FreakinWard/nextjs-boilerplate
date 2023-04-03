# Getting Started

With the idea of the [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications), integration and E2E tests are executed via [Cypress](https://docs.cypress.io/). These tests are run within the [build](../.pipelines/app/azure-pipeline-build.yml) and [release](../.pipelines/azure-pipelines-release.yml) pipelines. They can also be run locally, too.

## Local development

Running locally offers the ability run both [integration](#integration) and [e2e](#e2e) tests.

To test different environments, make the following changes:

- `cypress.config.ts`
  - Set `baseUrl` to the url of the site to be tested
- `cypress.env.json`
  - Set all environment values from Azure Key Vault

## Integration

Integration tests execute [E2E Tests](#E2E) with the dependent api requests mocked using [msw](https://mswjs.io/docs/). They are executed as part of the [build pipeline](../.pipelines/app/azure-pipeline-build.yml). Build failures are expected given any test failures.

To run, with mocked data, ensure `NEXT_PUBLIC_API_MOCKING=enabled` is set within `.env`

To run, with live data, ensure `NEXT_PUBLIC_API_MOCKING=disabled` is set within `.env`

```json
{
  "NEXTAUTH_SECRET": "set-from-key-vault",
  "CI_BUILD_NUMBER": "set-expected-value"
}
```

## E2E

E2E tests execute against deployed applications. Unlike integration tests, the dependent api requests are not mocked and are expected to exercise dependent api requests. They are executed as part of the [release pipeline](../.pipelines/app/azure-pipelines-release.yml). This offers confidence in answering the question _As a user, is the application running as expected?_

To run, ensure `NEXT_PUBLIC_API_MOCKING=disabled` is set within `.env`

Create `cypress.env.json` in root directory

```json
{
  "USER_NAME": "user.name@gmail.com",
  "USER_PASSWORD": "set-from-key-vault",
  "NEXTAUTH_SECRET": "set-from-key-vault",
  "CLIENT_ID": "set-client-id",
  "AUTH_TOKEN_URL": "well-known-token-url",
  "CI_BUILD_NUMBER": "set-expected-value"
}
```

## Pipeline Workflow

Each stage within the [release-pipeline](./.pipelines/app/azure-pipelines-release.yml) deploys to a staging slot before
swapping into the production slot to serve the running application. The E2E tests are run against both the staging and
production slots. Doing this ensures the following

- Code changes are deployed
- New and regression behaviors work as expected
- Application settings are applied
- Dependent-api services are up and running

Each stage creates `cypress.env.json` file with values fetched from Azure KeyVault.

## Troubleshooting

When running `npm run test:e2e:open`, Cypress may throw the following error. See [Cypress policy guide](https://docs.cypress.io/guides/references/error-messages#Cypress-detected-policy-settings-on-your-computer-that-may-cause-issues) to resolve.

> ❗Cypress detected policy settings on your computer that may cause issues
> When specs don't show up and you get a 404 error
