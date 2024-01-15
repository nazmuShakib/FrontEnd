module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
		'airbnb',
    'airbnb/hooks'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope' : 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
		'no-unused-vars' : 'warn',
		'indent' : ['error', 'tab'],
    'semi': ['error', 'never'],
    'import/no-absolute-path': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		"react/jsx-indent": [1, 'tab', {checkAttributes: true, indentLogicalExpressions: true}],
		"react/jsx-indent-props": [1, 'tab'],
		"max-len": ['warn', { 'code': 150, 'tabWidth': 2 }],
		"import/no-extraneous-dependencies": ['error', {'devDependencies': true}],
		"react/jsx-indent-props": [1, 'tab'],
		"max-len": ['warn', { 'code': 250, 'tabWidth': 2 }],
		"react/prop-types": [1, { "ignore": ["children"], "skipUndeclared": true }]
  },
}
