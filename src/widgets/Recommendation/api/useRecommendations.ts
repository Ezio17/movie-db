import type { Response } from '@shared/types';
import { useFetch, useNuxtApp } from 'nuxt/app';

const useRecommendations = <T>(path: string, page: number = 1) => {
  return useFetch<Response<T>>(path, {
    method: 'GET',
    query: { page },
    key: `recommendations-${path}-${page}`,
    server: true,
    getCachedData(key) {
      const { payload, ssrContext } = useNuxtApp();

      return ((payload.data as Record<string, unknown>)[key] ||
        (ssrContext?.cache as Record<string, unknown>)?.[key]) as Response<T> | undefined;
    },
    default: () => ({
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    }),
  });
};

export default useRecommendations;
