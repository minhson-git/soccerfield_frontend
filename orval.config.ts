import { defineConfig } from 'orval'

// Generates typed API clients + TanStack Query hooks from the backend's springdoc spec.
// Run `pnpm api:generate` while the backend is running.
export default defineConfig({
  soccerfield: {
    input: {
      target: process.env.OPENAPI_URL ?? 'http://localhost:8080/v3/api-docs',
    },
    output: {
      mode: 'tags-split',
      target: 'src/shared/api/generated/endpoints',
      schemas: 'src/shared/api/generated/model',
      client: 'vue-query',
      clean: true,
      formatter: 'prettier',
      override: {
        mutator: {
          path: 'src/shared/api/http.ts',
          name: 'httpClient',
        },
      },
    },
  },
})
