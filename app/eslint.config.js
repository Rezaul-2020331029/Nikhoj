import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Restrict /components/ui everywhere
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/components/ui',
              message:
                'Import UI components from /shared/ui instead of /components/ui',
            },
          ],
          patterns: [
            {
              group: ['@/components/ui/*'],
              message:
                'Import UI components from /shared/ui instead of /components/ui',
            },
          ],
        },
      ],
    },
  },
  {
    // ✅ Override for shared/ui: allow imports from /components/ui
    files: ['**/shared/ui/**/*.{ts,tsx}', '**/components/ui/**/*.{ts,tsx}'],
    rules: {
      // Turn off completely so restrictions don’t merge
      'no-restricted-imports': 'off',
    },
  },
])
