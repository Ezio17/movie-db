import { useFetch } from 'nuxt/app';
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { MovieResponse } from '@shared/types';
import { debounce } from '@/shared/utils';

const useMovieSearch = (searchValue: Ref<string>) => {
  const debouncedSearchValue = ref(searchValue.value);

  const debouncedUpdate = debounce((value: string) => {
    debouncedSearchValue.value = value;
  }, 500);

  watch(searchValue, (newValue) => {
    debouncedUpdate(newValue);
  });

  return useFetch<MovieResponse | null>('/api/search/movie', {
    method: 'GET',
    query: {
      language: 'uk',
      page: 1,
      include_adult: false,
      query: debouncedSearchValue,
    },
    lazy: true,
    server: false,
    immediate: false,
    watch: [debouncedSearchValue],
  });
};

export default useMovieSearch;
