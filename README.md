This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install npm packages

```bash
npm install
```


Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start.

## Features
The purpose of this repo is to accelerate the configuration for starting a new nextjs app. It's configured with opinionated best-practice features to enable faster development.

This application implements the following libraries:
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
    

You can start editing the page by modifying `pages/index.test.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/posts.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
