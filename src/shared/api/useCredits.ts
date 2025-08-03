import { useFetch } from 'nuxt/app';
import type { Person } from '@shared/types';

interface Response {
  cast: Person[];
  crew: unknown[];
  id: number;
}

const useCredits = (id: string, type: string) => {
  return useFetch(`/api/${type}/${id}/credits`, {
    transform: (response: Response): Person[] => {
      return response.cast.slice(0, 12) || [];
    },
    default: () => [],
  });
};

export default useCredits;
