import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginPlaywright from 'eslint-plugin-playwright'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import { createConfig } from 'eslint-plugin-boundaries/config'
import skipFormatting from 'eslint-config-prettier/flat'

/**
 * Architecture rules — dependencies only flow one way:
 *   app → pages → features → shared
 * A feature may use another feature only through its index.ts.
 */
const architecture = createConfig({
  name: 'app/architecture',
  files: ['src/**/*.{ts,vue}'],
  settings: {
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      { type: 'app', pattern: 'src/app' },
      { type: 'page', pattern: 'src/pages' },
      { type: 'feature', pattern: 'src/features/*', capture: ['featureName'] },
      { type: 'shared', pattern: 'src/shared' },
    ],
  },
  rules: {
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        // Also check npm packages (to restrict axios). Imports inside one element are never checked.
        checkAllOrigins: true,
        policies: [
          { from: { element: { type: 'app' } }, allow: { to: { element: { types: '*' } } } },
          {
            from: { element: { type: 'page' } },
            allow: { to: { element: { types: ['feature', 'shared'] } } },
          },
          {
            from: { element: { type: 'feature' } },
            allow: { to: { element: { type: 'shared' } } },
          },
          // Feature → another feature: public API only
          {
            from: { element: { type: 'feature' } },
            allow: { to: { element: { type: 'feature', fileInternalPath: 'index.ts' } } },
          },
          // Everything may use npm packages...
          { allow: { to: { module: { origin: ['external', 'core'] } } } },
          // ...except axios: only `shared` talks HTTP directly (later policies win)
          {
            from: { element: { types: ['app', 'page', 'feature'] } },
            disallow: { to: { module: { origin: 'external', source: 'axios' } } },
          },
        ],
      },
    ],
  },
})

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    'src/shared/api/generated/**',
  ]),

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/import-resolver',
    // Lets eslint-plugin-boundaries resolve the `@/` alias
    settings: { 'import/resolver': { typescript: { alwaysTryTypes: true } } },
  },
  architecture,

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/*.spec.ts'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
)
