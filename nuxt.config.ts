import { defineNuxtConfig } from 'nuxt/config';
import path from 'path';

export default defineNuxtConfig({
  srcDir: 'src',

  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },

  build: { transpile: ['@splidejs/vue-splide'] },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/storybook',
    [
      '@nuxtjs/i18n',
      {
        strategy: 'no_prefix',
        defaultLocale: 'uk',
        locales: [
          { code: 'uk', name: 'Українська', file: 'uk.json' },
          { code: 'en', name: 'English', file: 'en.json' },
          { code: 'es', name: 'Español', file: 'es.json' },
        ],
      },
    ],
  ],

  css: [
    './src/assets/styles/reset.scss',
    './src/assets/styles/global.scss',
    './src/assets/styles/variables.css',
  ],

  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY,
  },

  components: [{ path: '@shared/ui', pathPrefix: false }],

  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@root': path.resolve(__dirname, './'),
    '@shared': path.resolve(__dirname, 'src/shared'),
    '@widgets': path.resolve(__dirname, 'src/widgets'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  },

  imports: {
    dirs: ['shared/composables', 'widgets/**/composables', 'pages/**/composables', '**/stores'],
  },

  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
});
