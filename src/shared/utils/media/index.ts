import type { MovieOrTvShow, Movie } from '@shared/types';

export const isMovie = (media: MovieOrTvShow): media is Movie => {
  return 'title' in media;
};
