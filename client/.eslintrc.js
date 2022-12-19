// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"react-app",
		"prettier",
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "prettier"],
	rules: {
		"jsx-quotes": [1, "prefer-double"],
		"react/prop-types": "off",
	},
};
