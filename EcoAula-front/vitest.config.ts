import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
      exclude: [...configDefaults.exclude, 'e2e/**', 'playwright/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'json-summary'],
        reportsDirectory: './coverage',
        all: true,
        include: ['src/**/*.{ts,vue}'],
        exclude: ['src/**/__tests__/**'],
        thresholds: {
          statements: 75,
          branches: 75,
          functions: 75,
          lines: 75,
        },
      },
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
