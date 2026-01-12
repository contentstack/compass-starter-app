import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import { fileURLToPath } from 'node:url'
import path from 'node:path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

const patchedConfig = fixupConfigRules([...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
)])

const config = [
    {
        ignores: [
            '.next/*',
            'next-env.d.ts'
        ]
    }, 
    ...patchedConfig,
    {
        languageOptions: {
            globals: {
                ...globals.browser
            },

            parser: tsParser,
            ecmaVersion: 13,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },

        settings: {
            react: {
                version: 'detect'
            }
        },

        rules: {
            'react-hooks/exhaustive-deps': 'off',
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'never'],

            'no-underscore-dangle': ['error', {
                allow: ['_content_type_uid', '_source', '_esClient', '_version', '_metadata', '_', '__dirname', '__filename']
            }],

            'no-shadow': ['error', {
                builtinGlobals: false,
                hoist: 'functions',
                allow: []
            }],

            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'comma-dangle': ['error', 'never'],

            'max-len': ['error', {
                code: 250
            }],

            radix: 'error',

            'key-spacing': ['error', {
                beforeColon: false
            }],

            'dot-notation': 'error',
            'operator-linebreak': ['error', 'before'],
            '@typescript-eslint/no-empty-function': 'off',
            'space-before-function-paren': ['error', 'always'],
            'array-callback-return': 'off',
            'consistent-return': 'off',
            'class-methods-use-this': 'off',
            'no-restricted-syntax': 'off',

            'import/order': [1, {
                groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index']
            }],

            'sort-imports': ['error', {
                ignoreCase: true,
                ignoreDeclarationSort: true
            }],

            'jsx-quotes': ['error', 'prefer-single'],
            'no-param-reassign': 'off',
            'react/no-children-prop': 'off',
            'no-nested-ternary': 'off',

            'react/jsx-key': ['off', {
                checkFragmentShorthand: false
            }],

            'no-plusplus': ['error', {
                allowForLoopAfterthoughts: true
            }],

            'react/forbid-prop-types': 'off',
            'react/require-default-props': 'off',
            'jsx-a11y/anchor-is-valid': 'off',
            'jsx-a11y/anchor-has-content': 'off',
            'jsx-a11y/control-has-associated-label': 'off',
            'no-mixed-operators': 'off',
            'react/no-danger': 'off',
            'react/destructuring-assignment': 0,
            'no-useless-escape': 'off',

            'no-console': ['error', {
                allow: ['warn', 'error', 'debug']
            }],

            'react/react-in-jsx-scope': 'off',

            'react/jsx-filename-extension': [1, {
                extensions: ['.js', '.tsx', '.ts']
            }]
        }
    }
]

export default config