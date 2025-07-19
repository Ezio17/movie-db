interface BaseMedia {
  id: number;
  adult: boolean;
  original_language: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface Movie extends BaseMedia {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TvShow extends BaseMedia {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

interface Response<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type MovieResponse = Response<Movie>;
export type TvShowResponse = Response<TvShow>;
export type MovieOrTvShow = Movie | TvShow;
