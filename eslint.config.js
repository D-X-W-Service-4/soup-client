import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
      eqeqeq: "error",
      curly: "error",
      quotes: ["error", "single"],
      "comma-style": ["error", "last"],
      "no-unused-vars": ["off", { varsIgnorePattern: "^React$" }],
      "no-console": "warn",
      "no-extra-semi": "error",
      // "no-unused-expressions": "error",
      indent: "off", // prettier 충돌로 인해 off
      semi: ["warn", "always"],
      "no-undef": "error",
      "no-trailing-spaces": "warn",
      "no-multiple-empty-lines": "warn",
      "arrow-spacing": "warn",
      "no-const-assign": "error",
      "no-multi-spaces": "error",
      "prefer-const": "error",
      "no-else-return": "warn",
      "no-floating-decimal": "error",
      "no-new-object": "error",
      "no-param-reassign": "error",
      "prefer-template": "warn",
      radix: "error",
      "no-useless-constructor": "error",
      "no-alert": "warn",
      "no-empty-pattern": "warn",
      "no-eval": "error",
      "no-implicit-globals": "error",
      "no-implied-eval": "error",
      "no-loop-func": "error",
      "no-iterator": "error",
      "no-new-wrappers": "error",
      "no-restricted-globals": "error",
      "no-return-assign": "warn",
      "@typescript-eslint/no-explicit-any": "warn", // any 허용
      "@typescript-eslint/no-unused-vars": ["off", { varsIgnorePattern: "^React$" }], // 'React' 사용 안해도 경고하지 않도록 설정
    },
    languageOptions: {
      sourceType: "module",
      parser: typescriptParser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
