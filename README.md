[![Build Status](https://aaronward.visualstudio.com/nextjs-typescript-example/_apis/build/status/FreakinWard.nextjs-boilerplate?branchName=main)](https://aaronward.visualstudio.com/nextjs-typescript-example/_build/latest?definitionId=8&branchName=main)
[![codecov](https://codecov.io/gh/FreakinWard/nextjs-boilerplate/branch/main/graph/badge.svg?token=XL8EYC1YZP)](https://codecov.io/gh/FreakinWard/nextjs-boilerplate)
[![CodeFactor](https://www.codefactor.io/repository/github/freakinward/nextjs-boilerplate/badge)](https://www.codefactor.io/repository/github/freakinward/nextjs-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/25a53970d9a620abcaf8/maintainability)](https://codeclimate.com/github/FreakinWard/nextjs-boilerplate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/25a53970d9a620abcaf8/test_coverage)](https://codeclimate.com/github/FreakinWard/nextjs-boilerplate/test_coverage)
[![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/FreakinWard/nextjs-boilerplate?color=F1CE0C&style=plastic)](https://codeclimate.com/github/FreakinWard/nextjs-boilerplate/issues)

# NextJs Boilerplate

The purpose of this repo is to accelerate startup time when creating a new [NextJs](https://nextjs.org/docs) app.

## Contents

- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Libraries](#libraries)
- [Scripts](#scripts)
- [IDE Configurations](#ide-configuration)
- [Committing Changes](#committing-changes)
- [Storybook](#storybook)

# Getting Started

First, install npm packages

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start.

# Directory Structure

```
📦 src
┣ 📂 __tests__               # tests for pages
┃ ┗ 📜 index.test.tsx
┣ 📂 components              # components used within the app
┃ ┗ 📜 Posts.tsx
┣ 📂 context                 # application context providers
┃ ┗ 📜 AppState.tsx
┣ 📂 core                    # non-feature related core services
┃ ┣ 📂 mocks
┃ ┃ ┣ 📂 seed
┃ ┃ ┃ ┣ 📜 seedPosts.js
┃ ┃ ┃ ┗ 📜 seedStyleMedia.js
┃ ┃ ┣ 📜 mswHandlers.js
┃ ┃ ┗ 📜 mswServer.js
┃ ┗ 📜 test.utils.tsx
┣ 📂 hooks                   # hooks used within the app
┃ ┣ 📂 __tests__
┃ ┃ ┗ 📜 usePosts.test.ts
┃ ┗ 📜 usePosts.ts
┣ 📂 pages                   # pages directory - drives navigation
┃ ┣ 📂 api
┃ ┃ ┗ 📜 posts.ts
┃ ┣ 📜 _app.tsx
┃ ┗ 📜 index.tsx
┗ 📂 services                # feature-related services
┃ ┣ 📂 __tests__
┃ ┃ ┗ 📜 postsService.test.ts
┃ ┗ 📜 postsService.ts
```

# Features

The setup and configuration includes a number of opinionated best-practices in attempt to keep the code clean, safe, and free of bugs.

Code is formatted and linted with each save, if [configured](#ide-configuration), or at least before each commit with the help of husky.

Tests are configured for both unit and integration tests. Unit tests are performed with jest where msw helps avoid mocking http requests, both server and client, which allows for easier integration tests.

# Libraries

| Application                                                   | Description           |
| ------------------------------------------------------------- | --------------------- |
| [react](https://reactjs.org/docs/getting-started.html)        | react framework       |
| [nextJs](https://nextjs.org/docs)                             | nextjs framework      |
| [typescript](https://github.com/typescript-cheatsheets/react) | Enabling typescript   |
| [react-query](https://react-query.tanstack.com/overview)      | Data-fetching library |

| Static-code Analysis                               | Description                |
| -------------------------------------------------- | -------------------------- |
| [eslint](https://www.npmjs.com/package/eslint)     | Helps identify code issues |
| [prettier](https://www.npmjs.com/package/prettier) | code formatting tool       |

| Testing                                                                                   | Description                              |
| ----------------------------------------------------------------------------------------- | ---------------------------------------- |
| [jest-junit](https://www.npmjs.com/package/jest-junit)                                    | Testing Library                          |
| [msw](https://www.npmjs.com/package/msw)                                                  | Used to intercept and mock http requests |
| [testing-library-react](https://www.npmjs.com/package/@testing-library/react)             | Helper for UI component tests            |
| [testing-library-react-hooks](https://www.npmjs.com/package/@testing-library/react-hooks) | Helper for react-hook tests              |
| [jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters)                  | Test reporter for visualizing tests      |

| Git Hooks                                                                  | Description                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [husky](https://www.npmjs.com/package/husky)                               | Creates sharable git-commit hooks                            |
| [lint-staged](https://www.npmjs.com/package/lint-staged)                   | Ensure code is linted before committing to branch            |
| [validate-branch-name](https://www.npmjs.com/package/validate-branch-name) | Ensures a branch is created before committing to master/main |

# Scripts

# Scripts

## Unit tests

```bash
npm run test    # runs all tests, creating test report
```

```bash
npm run test:open    # opens the test report
```

```bash
npm run test:cover    # runs all tests, creating coverage report
```

```bash
npm run test:cover:open    # opens the coverage report
```

## End-to-end (e2e)

```bash
npm run test:e2e    # within the cli, runs end-to-end (e2e) tests
```

```bash
npm run test:e2e:open    # visualize end-to-end (e2e) tests
```

```bash
npm run test:e2e:verify    # validates end-to-end (e2e) tests ability to run
```

```bash
npm run test:e2e:ci    # runs end-to-end (e2e) tests for continuous integration (ci) pipeline
```

```bash
npm run test:e2e:report    # opens html report from end-to-end (e2e) test results
```

## Static code analysis
```bash
npm run lint    # runs lint check, produces report
```

```bash
npm run lint:fix    # runs lint and fixes, produces report
```

## Utility scripts

```bash
npm run prepare   # installs husky hook - this lints the app before each commit
```

```bash
npm run format   # run code format check
```

```bash
npm run format:fix   # run fix code formatting
```

```bash
npm run pre-commit   # this is ran prior to a git commit - runs lint and checks branch name
```

# IDE-configuration

## VS Code

The `.vscode` directory is checked into this repo and serves to share common settings and defaults.

[Recommended Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_recommended-extensions) are configured, be sure to install.

| Setting                  | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| eslint.validate          | Validate and fixes eslint errors. This also fixes prettier issues |
| typescript.suggest.paths | Turned off to enable correct usage within auto-rename-tag         |

| Extension          | Description                             |
| ------------------ | --------------------------------------- |
| code-spell-checker | checks spelling errors withing the code |
| vscode-icons       | Directory icons                         |
| vscode-jest        | Helps renaming tags                     |
| auto-rename-tag    | Helps renaming tags                     |
| vscode-eslint      | Integrate with lint rules               |

### Snippets

```javascript
// entering: desc
describe('', () => {});
```

```javascript
// entering: it
it('should ', () => {
  // arrange
  // act
  // assert
});
```

```javascript
// entering: ita
it('should ', async () => {
  // arrange
  // act
  // assert
});
```

```javascript
// entering: func
export default function () {}
```

```javascript
// entering: hook
export default function use() {}
```

## Webstorm

The `.idea` directory is checked into this repo and serves to share common [run configurations](https://www.jetbrains.com/help/webstorm/run-debug-configuration.html)

| Setting   | Description                 |
| --------- | --------------------------- |
| All Tests | Execute and watch all tests |
| Dev       | Run application             |

# Committing Changes

[Husky](https://typicode.github.io/husky/) makes [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) sharable within a project while also ensuring code conventions are enforced. The hook is installed during `npm install` and should require no further setup.

Husky pre-commit is configured to run the npm task `pre-commit` which does the following:

- Avoid commits to master/main
- Format staged code
- Lint staged code

Should the need arise to ignore the hook, manually commit using `--no-verify`

```shell
# Example
git commit -m "commit message" --no-verify
```

# Storybook

[Storybook](https://storybook.js.org/docs/react/get-started/introduction) is used to document common components and is [published here](https://freakinward.github.io/nextjs-boilerplate)

Run locally

```shell
npm run storybook
```
