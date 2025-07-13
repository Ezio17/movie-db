import { defineVitestConfig } from '@nuxt/test-utils/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineVitestConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'nuxt',
    include: ['**/*.{test,spec}.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
});
