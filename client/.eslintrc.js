module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "airbnb",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  // parser: '@babel/eslint-parser', // Парсер для обработки jsx кода
  parserOptions: {
    // requireConfigFile: false,
    // babelOptions: {
    // 	babelrc: false,
    // 	configFile: false,
    // 	presets: ['@babel/preset-env', '@babel/preset-react'],
    // },
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [],
  plugins: ["react", "prettier"],
  rules: {
    "jsx-quotes": [1, "prefer-double"],
    "react/prop-types": 0,
    "no-console": 0,
    "no-unused-vars": 2,
    "no-param-reassign": 1,
    "react/jsx-props-no-spreading": 0,
  },
};
