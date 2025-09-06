const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('@docusaurus/eslint-plugin/recommended'),
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
      '@docusaurus/string-literal-i18n-messages': 'off',
    },
  },
  {
    ignores: [
      'build/**',
      '.docusaurus/**',
      'node_modules/**',
    ],
  },
];