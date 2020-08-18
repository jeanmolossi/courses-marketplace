module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',

    'import/prefer-default-export': 'off',

    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',

    camelcase: 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
      },
    ],

    'import/no-unresolved': [
      'error',
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
    'import/extensions': [
      'error',
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
