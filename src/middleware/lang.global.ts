import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useHead, useNuxtApp } from '#app';

// ~/middleware/lang.ts
export default defineNuxtRouteMiddleware(() => {
  const {
    $i18n: { locale },
  } = useNuxtApp();

  useHead({
    htmlAttrs: { lang: locale },
  });
});
