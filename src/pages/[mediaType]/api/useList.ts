import { useFetch } from 'nuxt/app';
import type { MediaType } from '@shared/types';
import type { List } from '../types';

const useList = (mediaType: MediaType) => {
  return useFetch(`/api/genre/${mediaType}/list`, {
    transform: (res: { genres: List[] }): List[] => res.genres,
  });
};

export default useList;
