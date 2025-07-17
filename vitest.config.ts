import { defineVitestConfig } from '@nuxt/test-utils/config';
import path from 'path';

export default defineVitestConfig({
  plugins: [],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    environment: 'nuxt',
    include: ['**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@root': path.resolve(__dirname, './'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
});
