import { useFetch } from 'nuxt/app';
import type { MovieResponse } from '@shared/types';

const useMovieSearch = () => {
  return useFetch<MovieResponse>('/api/movie/popular', {
    method: 'GET',
    query: {
      language: 'uk',
      page: 1,
    },
  });
};

export default useMovieSearch;
