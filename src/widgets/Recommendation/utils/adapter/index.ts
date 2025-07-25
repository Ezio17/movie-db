import type { AdaptedRecommendation, Recommendation } from '@shared/types';
import { isMovie, isPerson, isTv } from '@shared/utils';

function adaptRecommendation(data: Recommendation): AdaptedRecommendation {
  const common = {
    id: data.id,
    name: '',
    type: 'person' as const,
    poster_path: null,
  };

  if (isMovie(data)) {
    return {
      ...common,
      name: data.title,
      type: 'movie',
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      release_date: data.release_date,
    };
  }

  if (isTv(data)) {
    return {
      ...common,
      name: data.name,
      type: 'tv',
      poster_path: data.poster_path,
      vote_average: data.vote_average,
      release_date: data.first_air_date,
    };
  }

  if (isPerson(data)) {
    return {
      ...common,
      name: data.name,
      poster_path: data.profile_path,
    };
  }

  return common;
}

export { adaptRecommendation };
