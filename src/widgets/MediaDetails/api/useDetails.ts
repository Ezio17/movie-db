import { useFetch } from 'nuxt/app';
import type { TvDetailsResponse, MovieDetailsResponse } from '@shared/types';

type DetailTypeMap = {
  movie: MovieDetailsResponse;
  tv: TvDetailsResponse;
};

const useDetails = <T extends keyof DetailTypeMap>(id: number, type: T) => {
  return useFetch<DetailTypeMap[T]>(`/api/${type}/${id}`);
};

export default useDetails;
