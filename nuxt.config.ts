// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  pinia: {
    storesDirs: [
      './stores/',
      './modules/**/stores/**',
      './pages/**/stores/**',
      './layout/**/stores/**',
    ],
  },
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
  imports: {
    dirs: ['**/stores'],
  },
});
