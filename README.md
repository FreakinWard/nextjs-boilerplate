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
- Application
  - [react](https://reactjs.org/docs/getting-started.html)
  - [nextjs](https://nextjs.org/docs)
  - [typescript](https://github.com/typescript-cheatsheets/react)
  - [react-query](https://react-query.tanstack.com/overview)
- Static code analysis
  - [eslint](https://www.npmjs.com/package/eslint)
  - [prettier](https://www.npmjs.com/package/prettier)
- Testing
  - [msw](https://www.npmjs.com/package/msw)
  - [testing-library-react](https://www.npmjs.com/package/@testing-library/react)
  - [testing-library-react-hooks](https://www.npmjs.com/package/@testing-library/react-hooks)
  - [jest-junit](https://www.npmjs.com/package/jest-junit)
  - [jest-html-reporters](https://www.npmjs.com/package/jest-html-reporters)
- Git Hooks
  - [husky](https://www.npmjs.com/package/husky)
  - [lint-staged](https://www.npmjs.com/package/lint-staged)
  - [validate-branch-name](https://www.npmjs.com/package/validate-branch-name)
  
# Scripts

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

- Settings
  - eslint.validate
    - Validate and fixes eslint errors. This also fixes prettier issues
  - typescript.suggest.paths
    - turns off 

- Recommended Extensions
  - code-spell-checker
    - checks spelling errors withing the code
  - vscode-icons
    - directory icons
  - vscode-jest
    - Inline jest test helpers
  - auto-rename-tag
    - Helps renaming tags
  - vscode-eslint
    - Integrate with lint rules

## Webstorm
The `.idea` directory is checked into this repo and serves to share common [run configurations](https://www.jetbrains.com/help/webstorm/run-debug-configuration.html)

- Run Configurations
  - All Tests
    - Execute and watch all tests
  - Dev
    - Run application


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