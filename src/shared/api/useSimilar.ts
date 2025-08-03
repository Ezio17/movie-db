import { useFetch } from 'nuxt/app';
import type { Response, Movie, Tv } from '@shared/types';

export type DetailTypeMap = {
  movie: Movie;
  tv: Tv;
};

const useSimilar = <T extends keyof DetailTypeMap>(id: string, type: T) => {
  return useFetch<Response<DetailTypeMap[T]>>(`/api/${type}/${id}/similar`, {
    default: () => ({
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    }),
  });
};

export default useSimilar;
