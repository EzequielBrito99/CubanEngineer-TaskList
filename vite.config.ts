import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/CubanEngineer-TaskList/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      '@radix-ui/react-checkbox',
      'lucide-react',
      'react-icons/fi',
      'react-icons/vsc'
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/unit/setupTests.ts',
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.{ts,tsx}'
      ],
      exclude: [
        'src/main.tsx',
        'src/App.tsx',
        'src/vite-env.d.ts',
        '**/*.css',
        '**/*.d.ts',
        'src/components/CustomBadges/index.ts',
        'src/components/CustomBadges/types.ts',
      ],
    },
    projects: [
      {
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
        test: {
          globals: true,
          name: 'unit',
          include: [
            'tests/unit/**/*.{test,spec}.{ts,tsx}',
            'src/**/*.{test,spec}.{ts,tsx}'
          ],
          environment: 'jsdom',
          setupFiles: ['./tests/unit/setupTests.ts'],
        }
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook')
          })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              { browser: 'chromium' }
            ]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }]
  }
});