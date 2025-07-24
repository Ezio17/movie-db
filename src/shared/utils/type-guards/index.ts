import type {
  Recommendation,
  Movie,
  Tv,
  Person,
  MovieDetailsResponse,
  TvDetailsResponse,
} from '@shared/types';

type MovieLike = Movie | MovieDetailsResponse;
type TvLike = Tv | TvDetailsResponse;
type Media = Recommendation | MovieDetailsResponse | TvDetailsResponse;

export const isMovie = (media: Media): media is MovieLike => 'title' in media;

export const isTv = (media: Media): media is TvLike => 'first_air_date' in media;

export const isPerson = (media: Recommendation): media is Person => 'gender' in media;
