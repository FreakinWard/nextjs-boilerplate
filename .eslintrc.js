module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'next/core-web-vitals',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error', // Use our prettier.config.js file as source
    'import/no-anonymous-default-export': ['error', { allowObject: true, allowArray: true }],
    'import/prefer-default-export': 'error',
    'import/no-unresolved': 'error',
    'no-console': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
