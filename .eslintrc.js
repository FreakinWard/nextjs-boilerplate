module.exports = {
  ignorePatterns: ['/cypress/**'], // TODO: remove and implement eslint-plugin-cypress when eslint 8 is supported - https://github.com/cypress-io/eslint-plugin-cypress/issues/89
  parser: '@typescript-eslint/parser',
  extends: [
    'react-goodies',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
