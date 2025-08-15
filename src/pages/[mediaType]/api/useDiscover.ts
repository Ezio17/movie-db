import type { Movie, Tv, Response, MediaType } from '@shared/types';
import { useFetch } from 'nuxt/app';

const useDiscover = <T extends Movie | Tv>(
  mediaType: MediaType,
  genre: string,
  page: number = 1
) => {
  return useFetch<Response<T>>(`/api/discover/${mediaType}`, {
    query: {
      with_genres: genre,
      page,
    },
  });
};

export default useDiscover;
