import { useFetch } from 'nuxt/app';
import type { Person } from '@shared/types';

interface Response {
  cast: Person[];
  crew: unknown[];
  id: number;
}

const useMovieCredits = (id: string) => {
  return useFetch(`/api/person/${id}/movie_credits`, {
    transform: (response: Response): Person[] => {
      return response.cast.sort((a, b) => b.popularity - a.popularity) || [];
    },
    default: () => [],
  });
};

export default useMovieCredits;
