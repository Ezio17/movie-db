import { useFetch } from 'nuxt/app';
import type { Ref } from 'vue';
import type { MovieResponse } from '@shared/types';

const useMovieSearch = (searchValue: Ref<string>) => {
  return useFetch<MovieResponse | null>('/api/search/movie', {
    method: 'GET',
    query: {
      language: 'uk',
      page: 1,
      include_adult: false,
      query: searchValue,
    },
    lazy: true,
    server: false,
    immediate: false,
    watch: [searchValue],
  });
};

export default useMovieSearch;
