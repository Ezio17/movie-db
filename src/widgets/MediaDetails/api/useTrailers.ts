import type { TrailerResponse, Trailer } from '@shared/types';
import { useFetch } from 'nuxt/app';

const useTrailers = (id: number, type: string) => {
  return useFetch<TrailerResponse>(`/api/${type}/${id}/videos`, {
    method: 'GET',
    transform: (response: TrailerResponse) => {
      return {
        ...response,
        results: response.results.filter(
          (video: Trailer) => video.type === 'Trailer' && video.site === 'YouTube'
        ),
      };
    },
  });
};

export default useTrailers;
