module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    // browser: true, // Enables browser globals like window and document
    // amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
    jest: true,
  },
  plugins: ['simple-import-sort', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
    // 'plugin:jest/style',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules

    './rules/react',
    './rules/jest',
    // './rules/default',
  ],
  rules: {
    'import/prefer-default-export': 'error',
    'prettier/prettier': 'error', // Use our prettier.config.js file as source
    // 'react/react-in-jsx-scope': 'off',
    // 'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // 'jsx-a11y/anchor-is-valid': [
    //   'error',
    //   {
    //     components: ['Link'],
    //     specialLink: ['hrefLeft', 'hrefRight'],
    //     aspects: ['invalidHref', 'preferButton'],
    //   },
    // ],
    // 'jest/no-disabled-tests': 'warn',
    // 'jest/no-focused-tests': 'error',
    // 'jest/no-identical-title': 'error',
    // 'jest/prefer-to-have-length': 'warn',
    // 'jest/valid-expect': 'error',
  },
};

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   root: true, // Make sure eslint picks up the config at the root of the directory
//   parserOptions: {
//     ecmaVersion: 2020, // Use the latest ecmascript standard
//     sourceType: 'module', // Allows using import/export statements
//     ecmaFeatures: {
//       jsx: true, // Enable JSX since we're using React
//     },
//   },
//   settings: {
//     react: {
//       version: 'detect', // Automatically detect the react version
//     },
//   },
//   env: {
//     browser: true, // Enables browser globals like window and document
//     amd: true, // Enables require() and define() as global variables as per the amd spec.
//     node: true, // Enables Node.js global variables and Node.js scoping.
//     jest: true,
//   },
//   plugins: ['simple-import-sort', 'prettier', 'import'],
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:jsx-a11y/recommended',
//     'plugin:@typescript-eslint/eslint-recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:jest/style',
//     'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
//   ],
//   rules: {
//     'prettier/prettier': 'error', // Use our prettier.config.js file as source
//     'react/react-in-jsx-scope': 'off',
//     'react/prop-types': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'error',
//     'simple-import-sort/imports': 'error',
//     'simple-import-sort/exports': 'error',
//     'jsx-a11y/anchor-is-valid': [
//       'error',
//       {
//         components: ['Link'],
//         specialLink: ['hrefLeft', 'hrefRight'],
//         aspects: ['invalidHref', 'preferButton'],
//       },
//     ],
//     'jest/no-disabled-tests': 'warn',
//     'jest/no-focused-tests': 'error',
//     'jest/no-identical-title': 'error',
//     'jest/prefer-to-have-length': 'warn',
//     'jest/valid-expect': 'error',
//   },
// };
