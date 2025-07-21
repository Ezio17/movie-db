import type { Response } from '@shared/types';
import { useFetch } from 'nuxt/app';

const useRecommendations = <T>(path: string) => {
  return useFetch<Response<T>>(path, {
    method: 'GET',
    query: {
      page: 1,
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
