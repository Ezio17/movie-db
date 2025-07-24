import type { MovieDetailsResponse, TvDetailsResponse, AdaptedDetails } from '@shared/types';
import { isMovie, isTv } from '@shared/utils';

type Details = MovieDetailsResponse | TvDetailsResponse;

function adaptDetails(data: Details | null): AdaptedDetails {
  if (!data) throw new Error('No data provided');

  function getName<T extends { name: string }>(obj: T): string {
    return obj.name;
  }

  const common = {
    id: data.id,
    overview: data.overview,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    genres: data.genres?.map(getName).join(', '),
    production_companies: data.production_companies?.map(getName).join(', '),
    production_countries: data.production_countries?.map(getName).join(', '),
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    status: data.status,
    tagline: data.tagline,
  };

  if (isMovie(data)) {
    return {
      ...common,
      type: 'movie',
      title: data.title,
      release_date: data.release_date,
      runtime: data.runtime || null,
    };
  }

  if (isTv(data)) {
    return {
      ...common,
      type: 'tv',
      title: data.original_name,
      release_date: data.first_air_date,
      runtime: data.episode_run_time?.[0] || null,
    };
  }

  throw new Error('Unknown media type');
}

export default adaptDetails;
