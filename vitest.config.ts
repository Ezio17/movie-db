import { defineVitestConfig } from '@nuxt/test-utils/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineVitestConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'nuxt',
    include: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.js', '**/*.spec.js'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
    },
  },
});
