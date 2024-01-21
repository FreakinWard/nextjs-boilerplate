module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier', 'jest-formatting'],
  extends: [
    'plugin:deprecation/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'next/core-web-vitals',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'plugin:jest-formatting/strict',
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
