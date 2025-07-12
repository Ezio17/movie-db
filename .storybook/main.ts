import type { StorybookConfig } from '@storybook/vue3-vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  stories: ['../shared/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Додайте Vue плагін
    config.plugins = config.plugins || [];
    config.plugins.push(vue());

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
      '~': path.resolve(__dirname, '../'),
      '~/shared': path.resolve(__dirname, '../shared'),
      '~/modules': path.resolve(__dirname, '../modules'),
    };

    config.css = {
      ...config.css,
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "${path.resolve(__dirname, '../shared/styles/variables.scss')}";
          `,
        },
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    };

    config.define = {
      ...config.define,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    };

    return config;
  },
};

export default config;