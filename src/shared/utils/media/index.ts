import type { Recommendation, Movie, Tv, Person } from '@shared/types';

export const isMovie = (media: Recommendation): media is Movie => {
  return 'title' in media;
};

export const isTv = (media: Recommendation): media is Tv => {
  return 'first_air_date' in media;
};

export const isPerson = (media: Recommendation): media is Person => {
  return 'gender' in media;
};
