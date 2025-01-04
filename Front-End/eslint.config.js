import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginTailwind from 'eslint-plugin-tailwindcss';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],

    languageOptions: {
      globals: globals.browser,
    },

    plugins: {
      tailwindcss: pluginTailwind,
      react: pluginReact,
    },

    rules: {
      ...prettierConfig.rules,

      ...pluginTailwind.configs.recommended.rules,
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/no-custom-classname': 'off',

      ...pluginReact.configs['jsx-runtime'].rules,
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
