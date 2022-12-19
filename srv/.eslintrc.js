// eslint-disable-next-line no-undef
module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	overrides: [],
	parser: '@babel/eslint-parser', // Парсер для обработки jsx кода
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			babelrc: false,
			configFile: false,
			presets: ['@babel/preset-env', '@babel/preset-react'],
		},
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		'no-unused-vars': 'error',
	},
}
