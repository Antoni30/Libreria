import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginTailwind from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "prettier/prettier": "error", // Forzar reglas de Prettier
      "tailwindcss/classnames-order": "warn", // Ordenar las clases de Tailwind
      "tailwindcss/enforces-shorthand": "warn", // Aplicar abreviaturas
      "tailwindcss/no-custom-classname": "off", // Permitir clases personalizadas
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginTailwind.configs.recommended,
  prettier,
  pluginPrettier.configs.recommended,
];
