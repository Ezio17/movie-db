import type { AdaptedRecommendation } from '@shared/types';
import { isMovie, isPerson, isTv } from '@shared/utils';
import type { Recommendation } from '@/shared/types';

function adaptRecommendation(data: Recommendation): AdaptedRecommendation {
  const baseResult = {
    id: data.id,
    name: '',
    type: 'person' as const,
    poster_path: null,
    vote_average: null,
    release_date: null,
  };

  if (isMovie(data)) {
    return {
      ...baseResult,
      name: data.title,
      type: 'movie',
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      release_date: data.release_date,
    };
  }

  if (isTv(data)) {
    return {
      ...baseResult,
      name: data.name,
      type: 'tv',
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      release_date: data.first_air_date,
    };
  }

  if (isPerson(data)) {
    return {
      ...baseResult,
      name: data.name,
      poster_path: data.profile_path,
    };
  }

  return baseResult;
}

export { adaptRecommendation };
