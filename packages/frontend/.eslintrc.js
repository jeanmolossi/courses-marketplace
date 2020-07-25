module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
      "plugin:react/recommended",
      "airbnb",
      "plugin:prettier/recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
        "react-hooks"
    ],
    "rules": {
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "off",
      "react/jsx-one-expression-per-line": "off",
      "import/no-unresolved": "error",
      "prettier/prettier": "error",
      "jsx-a11y/media-has-caption": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "import/no-duplicates": "off",

      "camelcase": "off",

      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",

      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "_" }],

      "react-hooks/exhaustive-deps": "warn",

      "import/extensions": [
        "error",
        { extensions: [".ts", ".tsx", ".js", ".jsx"] },
      ],
      "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".ts", ".js", ".jsx"] }],
    },
    settings: {
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
          txt: "never"
        },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
};
