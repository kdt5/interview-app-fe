import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { namingConvention } from "./eslint.rules.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "public/mockServiceWorker.js"] },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: [
      js.configs.recommended,
      eslintConfigPrettier,
      ...tseslint.configs.recommended,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
      },
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/naming-convention": ["error", ...namingConvention],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
    },
  }
);
