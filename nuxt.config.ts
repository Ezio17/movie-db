import { defineNuxtConfig } from 'nuxt/config';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

const isDev = process.env.MODE === 'DEV';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Movie DB',
      meta: [
        {
          name: 'description',
          content:
            'The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  vite: {
    plugins: isDev ? [visualizer({ open: true })] : [],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router'],
            splide: ['@splidejs/vue-splide'],
          },
          entryFileNames: '_nuxt/js/[name]-[hash].js',
          chunkFileNames: '_nuxt/js/[name]-[hash].js',
          assetFileNames: '_nuxt/assets/[name]-[hash].[ext]',
        },
      },
      terserOptions: {
        compress: { drop_console: true, drop_debugger: true, pure_funcs: ['alert'] },
      },
    },
  },

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
