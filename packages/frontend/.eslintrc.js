module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks'
  ],
  rules: {
    'prettier/prettier': 'error',

    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.ts', '.js', '.jsx'] }],

    'react-hooks/exhaustive-deps': 'warn',

    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'off',
    'import/extensions': [
      'error',
      { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    ],

    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'camelcase': 'off',
    'no-param-reassign': 'off',

    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        txt: 'never',
      },
    ],
  },
};
