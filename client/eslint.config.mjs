import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "semi": ["error", "never"],
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "eol-last": ["error", "always"],
            "no-trailing-spaces": ["error"],
            "comma-dangle": ["error", "always-multiline"],
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
]
