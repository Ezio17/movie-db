import { useFetch } from 'nuxt/app';
import type { MovieResponse, TvShowResponse } from '@shared/types';

type MovieOrTv = 'movie' | 'tv';

type ResponseType<T extends MovieOrTv> = T extends 'movie' ? MovieResponse : TvShowResponse;

const useMoviesOrTvShows = <T extends MovieOrTv>(path: string) => {
  return useFetch(path, {
    method: 'GET' as const,
    query: {
      page: 1,
    },
    default: () => ({
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    }),
  }) as ReturnType<typeof useFetch<ResponseType<T>>>;
};

export default useMoviesOrTvShows;
