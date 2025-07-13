import path from 'path';

export default defineNuxtConfig({
  srcDir: 'src',

  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/storybook', '@nuxtjs/i18n'],

  css: ['./src/assets/styles/reset.scss', './src/assets/styles/global.scss'],

  components: [
    { path: '~/shared/ui', pathPrefix: false },
    { path: '~/shared/components', pathPrefix: false },
    { path: '~/features/**', pathPrefix: false },
  ],

  alias: {
    '@': path.resolve(__dirname, 'src'),
    '~': path.resolve(__dirname, 'src'),
    '@root': path.resolve(__dirname, './'),
    '@shared': path.resolve(__dirname, 'src/shared'),
    '@features': path.resolve(__dirname, 'src/features'),
    '@pages': path.resolve(__dirname, 'src/pages'),
  },

  imports: {
    dirs: ['shared/composables', 'features/**/composables', 'pages/**/composables', '**/stores'],
  },

  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'uk',
    locales: [
      { code: 'uk', name: 'Українська', file: 'uk.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
    ],
  },
});
