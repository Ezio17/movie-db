import type { RouteLocationNormalized } from 'vue-router';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  const id = to.query.id as string | undefined;
  const mediaType = to.params.mediaType as string | undefined;

  if (!id || (mediaType !== 'movie' && mediaType !== 'tv')) {
    return navigateTo('/');
  }

  return true;
});
