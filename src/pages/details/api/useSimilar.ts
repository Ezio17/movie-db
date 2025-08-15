import { useFetch } from 'nuxt/app';
import type { Response, MediaTypeMap } from '@shared/types';

export type DetailTypeMap = Omit<MediaTypeMap, 'person'>;

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
