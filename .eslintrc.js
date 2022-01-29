module.exports = {
  plugins: ['simple-import-sort', 'prettier'],
  extends: ['next/core-web-vitals', 'plugin:cypress/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error', // Use our prettier.config.js file as source
    'import/prefer-default-export': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'import/no-anonymous-default-export': ["error", {"allowObject": true, "allowArray": true}]
  },
};
