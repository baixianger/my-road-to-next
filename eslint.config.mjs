import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
// import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  // {
  //   plugins: {
  //     "simple-import-sort": simpleImportSort,
  //   },
  //   rules: {
  //     "simple-import-sort/imports": [
  //       "error",
  //       {
  //         "groups": [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]]
  //       }
  //     ],
  //     "simple-import-sort/exports": "error",
  //   },
  // },
]);