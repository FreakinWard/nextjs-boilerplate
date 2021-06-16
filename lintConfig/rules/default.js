// TODO: unable to reference this within lintConfig/index - maybe because of the required plugins?
module.exports = {
  root: true,
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
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'prettier/prettier': 'error', // Use our prettier.config.js file as source
    'import/prefer-default-export': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
