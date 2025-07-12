import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/storybook'],

  components: [
    { path: '~/shared/ui', pathPrefix: false },
    { path: '~/shared/components', pathPrefix: false },
    { path: '~/modules/**/components', pathPrefix: false },
  ],

  alias: {
    '@shared': path.resolve(__dirname, 'shared'),
    '@modules': path.resolve(__dirname, 'modules'),
    '@pages': path.resolve(__dirname, 'pages'),
  },

  build: {
    transpile: ['@shared', '@modules'],
  },

  nitro: {
    externals: {
      inline: ['@shared', '@modules'],
    },
    rollupConfig: {
      plugins: [vue()],
    },
  },

  imports: {
    dirs: ['**/stores', 'shared/composables', 'modules/**/composables', 'pages/**/composables'],
  },

  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
});
